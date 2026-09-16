#!/usr/bin/env python3
"""
CP Sensei — Local Development Server with AI Proxy
Serves static files and proxies LLM requests to avoid browser CORS restrictions.
"""

import http.server
import socketserver
import urllib.request
import urllib.error
import json
import sys
import os

PORT = 3000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class ProxyHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_POST(self):
        if self.path.startswith('/api/proxy'):
            self.handle_proxy()
        else:
            self.send_error(404, "Not Found")

    def do_GET(self):
        if self.path.startswith('/api/unsloth-status'):
            self.handle_unsloth_status()
        else:
            super().do_GET()

    def handle_unsloth_status(self):
        """Check if Unsloth is running and return available/loaded models."""
        try:
            req = urllib.request.Request(
                'http://127.0.0.1:8888/v1/models',
                headers={'Authorization': 'Bearer sk-unsloth-0dcbffd787cb1cd4e7a5ba2c2757980a'}
            )
            with urllib.request.urlopen(req, timeout=3) as resp:
                data = json.loads(resp.read().decode('utf-8'))
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'online': True, 'models': data.get('data', [])}).encode('utf-8'))
        except Exception as e:
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'online': False, 'error': str(e)}).encode('utf-8'))

    def handle_proxy(self):
        content_length = int(self.headers.get('Content-Length', 0))
        post_data = self.rfile.read(content_length)

        try:
            payload = json.loads(post_data.decode('utf-8'))
            target_url = payload.get('url', 'http://127.0.0.1:8888/v1/chat/completions')
            headers = payload.get('headers', {})
            body = payload.get('body', {})

            req_data = json.dumps(body).encode('utf-8')
            req = urllib.request.Request(target_url, data=req_data, method='POST')
            for k, v in headers.items():
                req.add_header(k, v)

            is_stream = body.get('stream', False)

            try:
                with urllib.request.urlopen(req, timeout=120) as resp:
                    self.send_response(resp.status)
                    if is_stream:
                        self.send_header('Content-Type', 'text/event-stream')
                        self.send_header('Cache-Control', 'no-cache')
                        self.send_header('Connection', 'keep-alive')
                    else:
                        self.send_header('Content-Type', 'application/json')
                    self.end_headers()

                    while True:
                        chunk = resp.read(512)
                        if not chunk:
                            break
                        try:
                            self.wfile.write(chunk)
                            self.wfile.flush()
                        except (BrokenPipeError, ConnectionResetError):
                            break

            except (BrokenPipeError, ConnectionResetError):
                pass
            except urllib.error.HTTPError as e:
                err_body = e.read()
                try:
                    self.send_response(e.code)
                    self.send_header('Content-Type', 'application/json')
                    self.end_headers()
                    self.wfile.write(err_body)
                except (BrokenPipeError, ConnectionResetError):
                    pass
            except Exception as e:
                try:
                    self.send_response(502)
                    self.send_header('Content-Type', 'application/json')
                    self.end_headers()
                    self.wfile.write(json.dumps({'error': f"Proxy request failed: {str(e)}"}).encode('utf-8'))
                except (BrokenPipeError, ConnectionResetError):
                    pass

        except Exception as e:
            try:
                self.send_response(400)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'error': f"Bad proxy payload: {str(e)}"}).encode('utf-8'))
            except (BrokenPipeError, ConnectionResetError):
                pass


class ThreadingHTTPServer(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True
    allow_reuse_address = True


if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else PORT
    with ThreadingHTTPServer(('0.0.0.0', port), ProxyHandler) as server:
        print(f"🚀 CP Sensei server running on http://localhost:{port}")
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server.")
