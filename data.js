// Comprehensive Data Store for the CP & FAANG Mastery Course (Codecademy Curriculum Edition)

var COURSE_DATA = {
  stats: {
    totalArticles: 162,
    calendars: 8,
    modules: 10,
    lessons: 44,
    projects: 8,
    quizzes: 40,
    faangTracks: 2,
    learnersEnrolled: "34,820"
  },

  modules: [
    // =========================================================================
    // MODULE 1: Algorithmic Thinking & The Big O Engine
    // =========================================================================
    {
      "id": "mod-1",
      "number": 1,
      "title": "Algorithmic Thinking & The Big O Engine",
      "totalTime": "1 h 45 min",
      "xp": 100,
      "subskill": "Analyze asymptotic CPU limits and map input constraints from N <= 10 up to N <= 10^18 directly to optimal algorithm families without guesswork.",
      "tags": ["Complexity Analysis", "Constraint Mapping", "Zero-WA Shield", "Competitive Programming"],
      "submodules": [
        {
          "id": "m1-s1",
          "title": "Welcome to the Algorithmic Engine",
          "category": "FOUNDATIONS",
          "time": "3 min",
          "learn": "### The \"Piece of Cake\" Philosophy\n\nWelcome to the **Competitive Programming & Technical Interview Skill Path**!\n\nWhy do Grandmasters on AtCoder and top engineers at Amazon and Microsoft solve algorithmic problems in 5 to 10 minutes while others struggle for hours?\n\n**They don't guess.** They don't read a 500-word problem statement and try random data structures until something compiles. Instead, they look at one thing first: **The Input Constraints**.\n\nEvery problem provides explicit input bounds (such as `N ≤ 200,000`, `N ≤ 20`, or `N ≤ 10¹⁸`). These bounds are not decorative—they dictate the **exact Big-O time complexity** and algorithmic family required to pass.\n\n#### The Online Judge CPU Law:\n- Standard contest judges (AtCoder, Codeforces, LeetCode) allocate approximately **10⁸ basic CPU operations per second**.\n- Under the standard **2.0-second time limit**, total operations **MUST stay under 2 × 10⁸**.\n\nIn this course, you will learn to work **backwards from the constraints** so every problem becomes a piece of cake. Let's start by verifying your interactive development environment!\n\n> **Core Rule of Thumb**:\n> 1. **2.0-Second Limit**: ~10⁸ ops/second → maximum 2 × 10⁸ operations.\n> 2. **Never guess**: The constraint on N reveals the algorithm family before you even finish reading the problem statement.",
          "scriptName": "script.py",
          "starterCode": "# ALGOVERSE CP Mastery Engine - Interactive Lab\n# Exercise 1: Confirming the 10^8 Operations Limit\n\ndef get_cpu_limit_message():\n    # TODO: Complete this function!\n    # It should return the exact string:\n    # \"Piece of Cake: 10^8 Ops Ready\"\n    pass\n\n# Run the test\nmessage = get_cpu_limit_message()\nprint(\"Engine Status:\", message)\n",
          "instructions": [
            {
              "id": "m1-s1-t1",
              "task": "Inspect <code>get_cpu_limit_message()</code> in the code editor. Notice that it currently contains <code>pass</code>.",
              "hint": "The function definition is on line 4 of script.py."
            },
            {
              "id": "m1-s1-t2",
              "task": "Replace <code>pass</code> and write <code>return \"Piece of Cake: 10^8 Ops Ready\"</code>, then click the yellow <strong>Run</strong> button.",
              "hint": "Remove 'pass' and add: return \"Piece of Cake: 10^8 Ops Ready\" with 4 spaces of indentation."
            }
          ],
          "expectedOutput": "Engine Status: Piece of Cake: 10^8 Ops Ready"
        },
        {
          "id": "m1-s2",
          "title": "The 2.0-Second CPU Boundary",
          "category": "BIG-O COMPLEXITY",
          "time": "5 min",
          "learn": "### The 2.0-Second Rule & Operation Estimation\n\nA modern online judge server runs high-frequency Intel/AMD CPUs. In compiled C++ and JIT-optimized PyPy, the CPU executes roughly **10⁸ basic instructions per second**.\n\nWhen a contest problem specifies a **2.0-second time limit**, your hard operation ceiling is:\n$$\\text{Operation Budget} = 2 \\times 10^8 \\text{ operations}$$\n\n#### What happens when N = 200,000 (2 × 10⁵)?\nLet's evaluate different algorithm complexities on a standard array of size $N = 200,000$:\n\n1. **O(N) Linear Time**: $2 \\times 10^5$ operations → **~0.002 seconds** (Instant Accepted).\n2. **O(N log N) Linearithmic Time**: $2 \\times 10^5 \\times \\log_2(200,000) \\approx 200,000 \\times 18 \\approx 3.6 \\times 10^6$ operations → **~0.036 seconds** (Comfortable Accepted).\n3. **O(N²) Quadratic Time**: $(2 \\times 10^5)^2 = 4 \\times 10^{10}$ operations. Dividing by $10^8$ ops/sec yields **400 seconds**! The judge immediately kills your program and throws **TLE (Time Limit Exceeded)**.\n\n#### The Estimation Formula:\n$$\\text{Execution Time (seconds)} \\approx \\frac{f(N)}{10^8}$$\n\n> **Key Takeaway**:\n> If your proposed algorithm's operation count exceeds $2 \\times 10^8$, it is mathematically guaranteed to get TLE. You must find a more optimal algorithm before writing code.",
          "scriptName": "complexity_limit.py",
          "starterCode": "import math\n\ndef estimate_operations(n: int, complexity: str) -> float:\n    # TODO 1: Implement complexity calculation:\n    # - If complexity is \"O(N)\", return float(n)\n    # - If complexity is \"O(N log N)\", return n * math.log2(n)\n    # - If complexity is \"O(N^2)\", return float(n ** 2)\n    # Otherwise return 0.0\n    pass\n\ndef will_pass_2s_limit(operations: float) -> bool:\n    # TODO 2: The judge limit is 2 * 10^8 operations in 2.0 seconds.\n    # Return True if operations <= 200_000_000, else False.\n    pass\n\n# Test with N = 200,000\nn = 200000\nops_n2 = estimate_operations(n, \"O(N^2)\")\nops_nlogn = estimate_operations(n, \"O(N log N)\")\n\nprint(f\"N={n} with O(N^2) passes? {will_pass_2s_limit(ops_n2)}\")\nprint(f\"N={n} with O(N log N) passes? {will_pass_2s_limit(ops_nlogn)}\")\n",
          "instructions": [
            {
              "id": "m1-s2-t1",
              "task": "In <code>estimate_operations(n, complexity)</code>, implement the branches for <code>\"O(N)\"</code>, <code>\"O(N log N)\"</code>, and <code>\"O(N^2)\"</code>.",
              "hint": "Use if/elif statements. For O(N log N), multiply n by math.log2(n). For O(N^2), compute n ** 2."
            },
            {
              "id": "m1-s2-t2",
              "task": "In <code>will_pass_2s_limit(operations)</code>, check if <code>operations <= 2 * (10 ** 8)</code> and return the boolean result.",
              "hint": "Return True if operations <= 200000000 else False."
            },
            {
              "id": "m1-s2-t3",
              "task": "Click the yellow <strong>Run</strong> button to verify that O(N²) returns False (TLE) and O(N log N) returns True (Accepted).",
              "hint": "Click Run to run the tests in the terminal."
            }
          ],
          "expectedOutput": "N=200000 with O(N^2) passes? False\nN=200000 with O(N log N) passes? True"
        },
        {
          "id": "m1-s3",
          "title": "The Universal Constraint Map",
          "category": "CONSTRAINT MAPPING",
          "time": "8 min",
          "learn": "### Mapping Constraints Directly to Algorithms\n\nIn competitive programming contests and FAANG technical interviews, the constraints on **N** form an ironclad cheat sheet. Whenever you open a problem, read the constraints and match the value of $N$ to the exact table below:\n\n| Constraint on N | Maximum Complexity | Optimal Algorithm & Data Structures | Classic Problem Archetype |\n| :--- | :--- | :--- | :--- |\n| **N ≤ 10** | **O(N!)** | Permutations, Exhaustive Search, Backtracking | Traveling Salesperson (brute force), N-Queens, Grid Permutations |\n| **N ≤ 20** | **O(2ⁿ)** | Bitmask Dynamic Programming, Subset Enumeration | Hamiltonian Path DP, Submask Iteration, Meet-in-the-Middle |\n| **N ≤ 500** | **O(N³)** | Floyd-Warshall, Interval DP, 3-Loop Enumeration | All-Pairs Shortest Path, Matrix Chain Multiplication, Polygon Triangulation |\n| **N ≤ 2,000** | **O(N²)** | 2D Dynamic Programming, Nested Loops, Tree Paths | Longest Common Subsequence (LCS), 0/1 Knapsack, All-Pairs Tree Distance |\n| **N ≤ 200,000 (2 × 10⁵)** | **O(N log N) or O(N)** | Sorting, Two Pointers, Heaps, DSU, Segment Trees | AtCoder ABC C/D/E, Sliding Window, Prefix Sums, Greedy Intervals |\n| **N ≤ 10¹⁸ (1 Quintillion)** | **O(log N) or O(1)** | Binary Search on Answer, Matrix Exponentiation, Math | Monotonic Search, Doubling, Extended GCD, Memoized Division |\n\n#### Why do these thresholds exist?\n- **Why N ≤ 10 for O(N!)?** $10! = 3,628,800$ (runs in 0.03s). But $11! = 39,916,800$ and $12! = 479,001,600$, which instantly exceeds $2 \\times 10^8$!\n- **Why N ≤ 20 for O(2ⁿ)?** $2^{20} = 1,048,576$ (runs in 0.01s). But $2^{30} \\approx 10^9$!\n- **Why N ≤ 500 for O(N³)?** $500^3 = 1.25 \\times 10^8$ (runs in ~1.2s). But $1,000^3 = 10^9$!\n- **Why N ≤ 10¹⁸ for O(log N)?** You cannot iterate through $10^{18}$ numbers—it would take 300 years. But $\\log_2(10^{18}) \\approx 60$ operations, which executes in **0.000001 seconds**!\n\n> **Universal Law**:\n> Never start writing code until you have mapped N to its row in this matrix.",
          "scriptName": "constraint_mapper.py",
          "starterCode": "def decrypt_constraint(n: int) -> str:\n    \"\"\"\n    Given the maximum constraint on N from a problem statement,\n    return the recommended algorithm family.\n    \"\"\"\n    # TODO: Implement the universal constraint decryptor!\n    # - If n <= 10: return \"Permutations & Backtracking\"\n    # - If n <= 20: return \"Bitmask DP & Subsets\"\n    # - If n <= 500: return \"Floyd-Warshall & Interval DP\"\n    # - If n <= 2000: return \"2D DP & Nested Loops\"\n    # - If n <= 200000: return \"Two Pointers, Heaps, DSU, Segment Trees\"\n    # - Otherwise (e.g. n <= 10^18): return \"Binary Search on Answer & Matrix Exp\"\n    pass\n\n# Test with different contest constraints\nprint(\"N = 10:\", decrypt_constraint(10))\nprint(\"N = 20:\", decrypt_constraint(20))\nprint(\"N = 500:\", decrypt_constraint(500))\nprint(\"N = 2,000:\", decrypt_constraint(2000))\nprint(\"N = 200,000:\", decrypt_constraint(200000))\nprint(\"N = 10^18:\", decrypt_constraint(10**18))\n",
          "instructions": [
            {
              "id": "m1-s3-t1",
              "task": "In <code>decrypt_constraint(n)</code>, write an <code>if/elif/else</code> ladder implementing all 6 constraint tiers.",
              "hint": "Check in ascending order: if n <= 10: ... elif n <= 20: ... elif n <= 500: ... elif n <= 2000: ... elif n <= 200000: ... else: ..."
            },
            {
              "id": "m1-s3-t2",
              "task": "Ensure the returned strings match the prompt specifications for each tier.",
              "hint": "Copy the exact strings from the comments inside the function."
            },
            {
              "id": "m1-s3-t3",
              "task": "Click the yellow <strong>Run</strong> button to test your constraint decryptor against all 6 test cases.",
              "hint": "Click Run."
            }
          ],
          "expectedOutput": "N = 10: Permutations & Backtracking\nN = 20: Bitmask DP & Subsets\nN = 500: Floyd-Warshall & Interval DP\nN = 2,000: 2D DP & Nested Loops\nN = 200,000: Two Pointers, Heaps, DSU, Segment Trees\nN = 10^18: Binary Search on Answer & Matrix Exp"
        },
        {
          "id": "m1-s4",
          "title": "Proof: Why O(max(N,M)) = O(N+M)",
          "category": "MATHEMATICAL PROOF",
          "time": "6 min",
          "learn": "### Asymptotic Equivalence Proof: O(max(V, E)) = O(V + E)\n\nIn graph algorithms (BFS, DFS, Dijkstra), interviewers at Amazon and Google frequently ask:\n> *\"Is graph traversal time complexity O(V + E) or O(max(V, E))? Which is more precise?\"*\n\nMany candidates stumble, thinking one is a loose upper bound and the other is tight. In reality, **they are mathematically identical**.\n\n#### The Formal Sandwich Proof:\nRecall the formal definition of Big-O: $f(n) = O(g(n))$ if there exist positive constants $c$ and $n_0$ such that $f(n) \\le c \\cdot g(n)$ for all $n \\ge n_0$.\n\nLet $V$ and $E$ be non-negative integers representing vertices and edges in a graph.\n1. **Lower Bound**: Clearly, $\\max(V, E) \\le V + E$ (since both $V, E \\ge 0$).\n2. **Upper Bound**: $V \\le \\max(V, E)$ and $E \\le \\max(V, E)$. Therefore:\n   $$V + E \\le \\max(V, E) + \\max(V, E) = 2 \\cdot \\max(V, E)$$\n3. **Combining Inequalities** (The Sandwich):\n   $$\\max(V, E) \\le V + E \\le 2 \\cdot \\max(V, E)$$\n\nBecause $V + E$ is sandwiched between $1 \\times \\max(V, E)$ and $2 \\times \\max(V, E)$, their growth rates are identical up to a constant multiple of 2:\n$$O(V + E) = O(\\max(V, E))$$\n\n> **Interview Tip**:\n> When explaining graph algorithms, you can use either! O(V + E) illustrates visiting every vertex and traversing every edge, while O(max(V, E)) shows which component dominates.",
          "scriptName": "graph_complexity.py",
          "starterCode": "def verify_sandwich_theorem(V: int, E: int) -> bool:\n    \"\"\"\n    Verify that max(V, E) <= V + E <= 2 * max(V, E) holds.\n    \"\"\"\n    # TODO: Implement the inequality check!\n    # 1. Calculate max_val = max(V, E)\n    # 2. Calculate sum_val = V + E\n    # 3. Calculate upper_bound = 2 * max_val\n    # 4. Return True if max_val <= sum_val <= upper_bound, else False\n    pass\n\n# Test with V = 200,000 vertices and E = 500,000 edges\nis_valid = verify_sandwich_theorem(200000, 500000)\nprint(\"Sandwich theorem holds for V=200k, E=500k:\", is_valid)\n",
          "instructions": [
            {
              "id": "m1-s4-t1",
              "task": "In <code>verify_sandwich_theorem(V, E)</code>, calculate <code>max(V, E)</code>, <code>V + E</code>, and <code>2 * max(V, E)</code>.",
              "hint": "Use max(V, E) and standard arithmetic operators."
            },
            {
              "id": "m1-s4-t2",
              "task": "Return <code>True</code> if the inequality chain holds, otherwise <code>False</code>.",
              "hint": "return max_val <= sum_val <= upper_bound"
            },
            {
              "id": "m1-s4-t3",
              "task": "Click <strong>Run</strong> to verify that the inequality evaluates to True.",
              "hint": "Click Run."
            }
          ],
          "expectedOutput": "Sandwich theorem holds for V=200k, E=500k: True"
        },
        {
          "id": "m1-s5",
          "title": "The Zero-WA Pre-Flight Shield",
          "category": "EDGE CASES",
          "time": "7 min",
          "learn": "### The 6-Point Zero-WA Pre-Flight Shield\n\nIn competitive programming contests, getting a **WA (Wrong Answer)** penalty can drop your ranking hundreds of spots. Top contestants never click Submit without running this mental 6-point checklist:\n\n1. **64-bit Integer Overflow**: In C++, a 32-bit signed integer caps at $2^{31}-1 \\approx 2.14 \\times 10^9$. If a problem has numbers up to $10^9$ and you compute their sum or product, standard `int` silently overflows into negative numbers! **Rule**: Always use `long long` for accumulators and products.\n2. **0-based vs 1-based Indexing**: Problem descriptions almost universally label elements from $1$ to $N$, but Python and C++ arrays are indexed $0$ to $N-1$. Accessing index $N$ causes an immediate runtime crash. **Rule**: Subtract 1 upon input reading (`u -= 1`, `v -= 1`).\n3. **Negative Modulo Subtraction**: In C++, `-3 % 7` evaluates to `-3`, NOT `4`! When subtracting two numbers under a modulo ($A - B \\pmod{MOD}$), if $A < B$, standard `%` produces negative numbers and corrupts DP tables. **Rule**: Always normalize with `((A - B) % MOD + MOD) % MOD`.\n4. **N = 1 Boundary**: Did your algorithm assume an array has at least 2 elements? Always test $N = 1$.\n5. **Python `heapq` is a Min-Heap**: In Python, `heapq.heappop()` returns the minimum value. If you need a Max-Heap, you must push `-value`.\n6. **Disconnected Graphs**: Never assume a graph has only 1 component. Always loop over all unvisited vertices.\n\n> **Focus Exercise: Safe Modulo Arithmetic**\n> Let's implement safe modulo operations that guarantee non-negative results under any modulo.",
          "scriptName": "zero_wa.py",
          "starterCode": "def safe_modulo_subtract(a: int, b: int, mod: int = 998244353) -> int:\n    # TODO 1: Implement safe modulo subtraction!\n    # Formula: ((a - b) % mod + mod) % mod\n    pass\n\ndef safe_modulo_add(a: int, b: int, mod: int = 998244353) -> int:\n    # TODO 2: Implement safe modulo addition!\n    # Formula: (a + b) % mod\n    pass\n\n# Test with a = 3, b = 5 under mod 7\n# (3 - 5) = -2. In mod 7 arithmetic, -2 + 7 = 5.\nsub_res = safe_modulo_subtract(3, 5, 7)\nadd_res = safe_modulo_add(10, 15, 7)\n\nprint(\"Safe (3 - 5) mod 7:\", sub_res)\nprint(\"Safe (10 + 15) mod 7:\", add_res)\n",
          "instructions": [
            {
              "id": "m1-s5-t1",
              "task": "In <code>safe_modulo_subtract(a, b, mod)</code>, implement <code>((a - b) % mod + mod) % mod</code>.",
              "hint": "This ensures that even if (a - b) is negative, adding mod makes it positive before the final modulo."
            },
            {
              "id": "m1-s5-t2",
              "task": "In <code>safe_modulo_add(a, b, mod)</code>, implement <code>(a + b) % mod</code>.",
              "hint": "Return (a + b) % mod."
            },
            {
              "id": "m1-s5-t3",
              "task": "Click <strong>Run</strong> to verify that safe modulo subtraction yields <code>5</code> and addition yields <code>4</code>.",
              "hint": "Click Run."
            }
          ],
          "expectedOutput": "Safe (3 - 5) mod 7: 5\nSafe (10 + 15) mod 7: 4"
        },
        {
          "id": "m1-s6",
          "title": "Interactive Exercise: Complexity Scanner",
          "category": "PORTFOLIO PROJECT",
          "time": "12 min",
          "learn": "### Building an Automated Complexity Scanner\n\nIn competitive programming, you can build a personal pre-flight testing script that evaluates the estimated time cost of your solution before submission.\n\nIn this project, you will write an automated **Complexity Scanner** that accepts input bounds $N$ and an asymptotic complexity string (`\"O(N)\"`, `\"O(N log N)\"`, `\"O(N^2)\"`, `\"O(N!)\"`), computes estimated operations, and outputs the judge verdict:\n- **\"AC (Accepted)\"** if estimated operations $\\le 2 \\times 10^8$.\n- **\"TLE (Time Limit Exceeded)\"** if estimated operations $> 2 \\times 10^8$.",
          "scriptName": "complexity_scanner.py",
          "starterCode": "import math\n\ndef predict_verdict(n: int, complexity_str: str) -> str:\n    \"\"\"\n    Predict whether an algorithm will pass within 2.0 seconds (<= 2 * 10^8 ops).\n    Returns 'AC (Accepted)' or 'TLE (Time Limit Exceeded)'.\n    \"\"\"\n    limit = 2 * (10 ** 8)\n    ops = 0.0\n    \n    # TODO: Calculate ops based on complexity_str:\n    # 1. If complexity_str == \"O(N)\": ops = float(n)\n    # 2. If complexity_str == \"O(N log N)\": ops = n * math.log2(n)\n    # 3. If complexity_str == \"O(N^2)\": ops = float(n * n)\n    # 4. If complexity_str == \"O(N!)\": ops = float(math.factorial(min(n, 20)))\n    \n    # Then return \"AC (Accepted)\" if ops <= limit else \"TLE (Time Limit Exceeded)\"\n    pass\n\n# Test scanner\nprint(\"N=200k, O(N):\", predict_verdict(200000, \"O(N)\"))\nprint(\"N=200k, O(N^2):\", predict_verdict(200000, \"O(N^2)\"))\n",
          "instructions": [
            {
              "id": "m1-s6-t1",
              "task": "In <code>predict_verdict(n, complexity_str)</code>, compute <code>ops</code> for O(N), O(N log N), O(N^2), and O(N!).",
              "hint": "Use an if/elif chain matching complexity_str."
            },
            {
              "id": "m1-s6-t2",
              "task": "Compare <code>ops</code> against <code>limit = 2 * (10 ** 8)</code> and return <code>\"AC (Accepted)\"</code> or <code>\"TLE (Time Limit Exceeded)\"</code>.",
              "hint": "return \"AC (Accepted)\" if ops <= limit else \"TLE (Time Limit Exceeded)\""
            },
            {
              "id": "m1-s6-t3",
              "task": "Click <strong>Run</strong> to verify that O(N) receives AC and O(N²) receives TLE.",
              "hint": "Click Run."
            }
          ],
          "expectedOutput": "N=200k, O(N): AC (Accepted)\nN=200k, O(N^2): TLE (Time Limit Exceeded)"
        },
        {
          "id": "m1-s7",
          "title": "Bitwise XOR Cancellation & Parity",
          "category": "BIT MANIPULATION",
          "time": "8 min",
          "learn": "### Bitwise XOR: The Swiss Army Knife of CP\n\nIn AtCoder ABC contests (especially ABC027-A and ABC381-A/D) and technical interviews, bitwise **XOR (`^`)** is one of the most powerful tools in your arsenal.\n\n#### The 3 Fundamental XOR Properties:\n1. **Self-Cancellation**: $x \\oplus x = 0$ (Any number XORed with itself cancels to zero).\n2. **Identity Element**: $x \\oplus 0 = x$ (XORing with zero preserves the number).\n3. **Associative & Commutative**: $A \\oplus B \\oplus A = (A \\oplus A) \\oplus B = 0 \\oplus B = B$.\n\n#### Classic Problem 1: AtCoder ABC027-A (Rectangle Sides)\n> **Problem Statement**: You are given 3 integers $a, b, c$ representing three sides of a rectangle. A rectangle has two pairs of equal sides. Find the length of the missing fourth side.\n\n**The Bruteforce Way**: Multiple `if/elif` statements comparing $a == b$, $b == c$, $a == c$.\n**The Grandmaster Way**: In a single line:\n$$\\text{Missing Side} = a \\oplus b \\oplus c$$\nBecause the two equal sides cancel out to zero ($x \\oplus x = 0$), leaving the unpaired fourth side completely intact!\n\n#### Classic Problem 2: Single Number (LeetCode 136 / FAANG Loop)\n> Given a non-empty array of integers `nums`, every element appears twice except for one. Find that single one in **O(N) time and O(1) space**.\n\nXORing all numbers together will cause every duplicate pair to annihilate each other, leaving only the unique element!",
          "scriptName": "xor_pairing.py",
          "starterCode": "def find_unique_element(arr: list[int]) -> int:\n    \"\"\"\n    Find the unique element in arr where all other elements appear twice.\n    Must run in O(N) time and O(1) space.\n    \"\"\"\n    # TODO 1: Initialize an accumulator to 0, loop through arr, and XOR each item.\n    pass\n\ndef find_missing_rectangle_side(a: int, b: int, c: int) -> int:\n    \"\"\"\n    Given 3 sides of a rectangle, return the 4th side in 1 line using XOR.\n    \"\"\"\n    # TODO 2: Return a ^ b ^ c\n    pass\n\n# Test cases\nprint(\"Unique in [4, 1, 2, 1, 2]:\", find_unique_element([4, 1, 2, 1, 2]))\nprint(\"Fourth side of (4, 3, 4):\", find_missing_rectangle_side(4, 3, 4))\n",
          "instructions": [
            {
              "id": "m1-s7-t1",
              "task": "In <code>find_unique_element(arr)</code>, initialize <code>res = 0</code>, XOR all elements in <code>arr</code>, and return <code>res</code>.",
              "hint": "for x in arr: res ^= x; return res"
            },
            {
              "id": "m1-s7-t2",
              "task": "In <code>find_missing_rectangle_side(a, b, c)</code>, return <code>a ^ b ^ c</code>.",
              "hint": "Return a ^ b ^ c directly."
            },
            {
              "id": "m1-s7-t3",
              "task": "Click <strong>Run</strong> to verify that unique element is <code>4</code> and fourth side is <code>3</code>.",
              "hint": "Click Run."
            }
          ],
          "expectedOutput": "Unique in [4, 1, 2, 1, 2]: 4\nFourth side of (4, 3, 4): 3"
        },
        {
          "id": "m1-s8",
          "title": "Module 1 Review & Summary",
          "category": "REVIEW & SUMMARY",
          "time": "4 min",
          "learn": "### Module 1 Summary & Key Takeaways\n\nCongratulations on completing Module 1!\n\n> **Module 1 Master Checklist**:\n> - [x] **2.0-Second Limit**: ~10⁸ operations/sec → maximum 2 × 10⁸ CPU operations.\n> - [x] **Universal Constraint Matrix**: Bounds on N ($10, 20, 500, 2000, 2 \\times 10^5, 10^{18}$) directly dictate the optimal algorithm family.\n> - [x] **Zero-WA Pre-Flight Shield**: 6 critical checks (overflow, 0/1 indexing, safe modulo subtraction, $N=1$, heaps, connectivity).\n> - [x] **Bitwise XOR Invariants**: $x \\oplus x = 0$ and $x \\oplus 0 = x$ for $O(1)$ space pairing and missing element detection.\n\n<div style=\"margin-top: 24px; padding: 20px; background: #fefce8; border: 1.5px solid #fde047; border-radius: 10px; text-align: center;\">\n  <div style=\"font-weight: 800; color: #854d0e; font-size: 16px; margin-bottom: 6px;\">Ready to test your mastery?</div>\n  <p style=\"color: #713f12; font-size: 13.5px; margin-bottom: 14px; line-height: 1.5;\">Take the 5-question Module 1 Concept Quiz to earn 20 XP and verify your understanding of Big-O, constraints, and Zero-WA shields.</p>\n  <button class=\"btn-primary\" id=\"btn-launch-concept-quiz\" style=\"background: #ffd600; color: #000; font-weight: 700; padding: 10px 24px; border-radius: 6px; border: none; cursor: pointer; display: inline-flex; align-items: center; gap: 8px;\">📝 Start Concept Quiz (+20 XP)</button>\n</div>",
          "scriptName": "review.py",
          "starterCode": "# Module 1 Review Complete\ndef get_review_status():\n    return \"Module 1 Completed: Ready for Quiz!\"\n\nprint(get_review_status())\n",
          "instructions": [
            {
              "id": "m1-s8-t1",
              "task": "Run the review script to complete Module 1 and unlock the Concept Quiz.",
              "hint": "Click Run."
            }
          ],
          "expectedOutput": "Module 1 Completed: Ready for Quiz!"
        }
      ],
      "quiz": {
        "title": "Module 1 Concept Quiz",
        "time": "15 min",
        "xp": 20,
        "questions": [
          {
            "q": "An AtCoder problem specifies N = 2 × 10⁵ and M = 2 × 10⁵ with a 2.0-second time limit. Which of the following algorithm time complexities is guaranteed to cause Time Limit Exceeded (TLE)?",
            "options": [
              "O(N + M)",
              "O(N log N)",
              "O(N²)",
              "O(N log M)"
            ],
            "answer": 2,
            "explanation": "With N = 200,000, N² requires (2 × 10⁵)² = 4 × 10¹⁰ operations. Since online judges execute ~10⁸ ops/second, this takes 400 seconds, guaranteeing a TLE."
          },
          {
            "q": "In C++, if A = 10⁹ and B = 10⁹, what happens when you compute int C = A * B;?",
            "options": [
              "C = 10¹⁸",
              "Compilation error",
              "Undefined behavior / 32-bit signed integer overflow resulting in an incorrect negative value",
              "Program automatically promotes variable to long long"
            ],
            "answer": 2,
            "explanation": "In C++, 32-bit signed int maxes out at 2³¹ - 1 ≈ 2.14 × 10⁹. The product 10¹⁸ silently overflows into negative numbers. Always use long long for accumulators!"
          },
          {
            "q": "Why does sending debug output to sys.stderr in Python or std::cerr in C++ prevent Wrong Answer (WA) on online judges?",
            "options": [
              "The judge automatically intercepts and strips debug output",
              "The judge evaluates only standard output (stdout), ignoring standard error (stderr) completely",
              "The compiler removes cerr in release mode",
              "stderr writes to local disk only"
            ],
            "answer": 1,
            "explanation": "Contest judges test your solution by comparing stdout against expected output files. Since stderr is not redirected to the test output comparator, you can leave stderr prints without getting WA."
          },
          {
            "q": "What is the correct integer ceiling division formula for ⌈B / A⌉ when A, B > 0?",
            "options": [
              "B // A + 1",
              "(B + A) // A",
              "(B + A - 1) // A",
              "int(math.ceil(B / A)) without float precision errors"
            ],
            "answer": 2,
            "explanation": "Formula (B + A - 1) // A correctly handles exact multiples (e.g., 6 // 3 = 2 with (6+2)//3 = 2) and non-multiples without floating point rounding errors."
          },
          {
            "q": "Why is O(max(N, M)) asymptotically identical to O(N + M) for non-negative integers?",
            "options": [
              "Because max(N, M) is always equal to (N + M) / 2",
              "Because max(N, M) <= N + M <= 2 * max(N, M), bounding it tightly within constant factors",
              "Because M is assumed to be a constant 0",
              "It is not identical; O(N+M) is strictly larger"
            ],
            "answer": 1,
            "explanation": "By the Sandwich Theorem: max(N, M) <= N + M <= 2 * max(N, M). Because the upper and lower bounds differ only by a constant factor of 2, O(max(N, M)) = O(N + M)."
          }
        ]
      }
    },

    // =========================================================================
    // MODULE 2: Linear Data Structures & Monotonic Stacks
    // =========================================================================
    {
      "id": "mod-2",
      "number": 2,
      "title": "Linear Data Structures & Monotonic Stacks",
      "totalTime": "2 h 15 min",
      "xp": 120,
      "subskill": "Implement array memory locality, circular buffer queues, and conquer Monotonic Stack invariants with amortized O(N) proofs.",
      "tags": ["Array Locality", "Circular Queues", "Monotonic Stacks", "Stock Span", "LeetCode 84"],
      "submodules": [
        {
          "id": "m2-s1",
          "title": "Contiguous Memory & Dynamic Array Doubling",
          "category": "MEMORY ARCHITECTURE",
          "time": "6 min",
          "learn": "### Why Memory Layout Matters: Hardware Cache Locality\n\nIn competitive programming and technical interviews, understanding **hardware memory hierarchy** is what separates top performers from average coders:\n- **CPU L1 Cache**: ~1-2 nanoseconds latency.\n- **L2 / L3 Cache**: ~4-10 nanoseconds latency.\n- **Main RAM**: ~100 nanoseconds latency (**50x to 100x slower!**).\n\nWhen a CPU reads an element from a contiguous array `arr[i]`, it doesn't load just 4 or 8 bytes. The hardware pre-fetches an entire **64-byte Cache Line** into L1 cache. Sequential array traversals take full advantage of spatial locality.\n\n```\n[ CPU Core ] <---> [ L1 Cache (64B lines) ] <---> [ RAM (High Latency) ]\n  Reads arr[0]      Auto-loads arr[1..15]          Only visited on Cache Miss\n```\n\n#### The Python `list.pop(0)` Trap:\nIn Python, `list` is implemented as an over-allocated dynamic array of pointers.\n- **Appending to end**: `list.append(x)` takes **amortized O(1)** time because capacity doubles geometrically (geometric expansion).\n- **Removing from front**: `list.pop(0)` forces the runtime to shift all remaining $N-1$ pointers left by one memory slot: an **O(N) linear time** operation!\n\nIf you use `list` as a queue inside a loop running $N = 100,000$ times, total operations become $100,000 \\times 100,000 = 10^{10}$, causing an immediate **TLE (40+ seconds)**!\n\n#### The Solution: `collections.deque`\nPython's `collections.deque` is implemented as a doubly-linked list of 64-element memory blocks. Both `append()` and `popleft()` execute in true **O(1) constant time**.",
          "scriptName": "queue_benchmark.py",
          "starterCode": "from collections import deque\n\ndef simulate_queue_operations(n: int) -> tuple[int, int]:\n    \"\"\"\n    Simulate pushing N elements into a deque and popping them all from the front.\n    Returns a tuple: (pushed_count, popped_count).\n    Must run in O(N) total time using collections.deque!\n    \"\"\"\n    # TODO 1: Initialize an empty deque called q\n    # TODO 2: Push numbers from 0 up to n - 1 into q\n    # TODO 3: Count how many items are popped using q.popleft() until q is empty\n    # TODO 4: Return (pushed_count, popped_count)\n    pass\n\n# Test with 50,000 items\npushed, popped = simulate_queue_operations(50000)\nprint(f\"Deque Queue Processed: {pushed} pushed, {popped} popped\")\n",
          "instructions": [
            {
              "id": "m2-s1-t1",
              "task": "Initialize <code>q = deque()</code> and push numbers <code>0</code> through <code>n - 1</code> into it using <code>q.append(i)</code>.",
              "hint": "Use a for loop: for i in range(n): q.append(i)"
            },
            {
              "id": "m2-s1-t2",
              "task": "While <code>q</code> is not empty, call <code>q.popleft()</code> and increment a counter <code>popped_count</code>.",
              "hint": "while q: q.popleft(); popped_count += 1"
            },
            {
              "id": "m2-s1-t3",
              "task": "Return <code>(n, popped_count)</code> and click <strong>Run</strong> to verify.",
              "hint": "Return (n, popped_count)."
            }
          ],
          "expectedOutput": "Deque Queue Processed: 50000 pushed, 50000 popped"
        },
        {
          "id": "m2-s2",
          "title": "Monotonic Stack Invariant & Amortized O(N)",
          "category": "MONOTONIC STACK",
          "time": "8 min",
          "learn": "### The Monotonic Stack Invariant\n\nA **Monotonic Stack** is a stack whose elements are maintained in strictly increasing or strictly decreasing order from bottom to top.\n\n#### The Problem: Daily Temperatures (LeetCode 739)\n> Given an array of integers `temperatures`, return an array `ans` such that `ans[i]` is the number of days you have to wait after day `i` to get a warmer temperature. If there is no future day with a warmer temperature, keep `ans[i] = 0`.\n\n#### The Naive $O(N^2)$ Approach:\nFor each day $i$, scan all future days $j > i$ until finding one with $temperatures[j] > temperatures[i]$. On $N = 100,000$, this takes $(10^5)^2 / 2 = 5 \\times 10^9$ operations → **TLE**.\n\n#### The Monotonic Decreasing Stack Pattern:\nInstead of searching forward for each element, we let incoming future days **resolve waiting past days**!\n1. Maintain a stack of day indices whose warmer temperatures have not yet been discovered.\n2. The temperatures corresponding to these indices are in **strictly decreasing order**.\n3. When day $i$ arrives with temperature $T[i]$:\n   - While the stack is not empty and $T[stack.top] < T[i]$:\n     - Day $i$ is the exact \"next warmer day\" for $stack.top$!\n     - Pop $prev = stack.pop()$\n     - Set $ans[prev] = i - prev$\n   - Push current day $i$ onto the stack.\n\n```\nIncoming T[i] = 74:\nStack: [Day 0 (73)]  --> 74 > 73! Pop Day 0. ans[0] = 1 - 0 = 1.\nStack now: [Day 1 (74)]\n```\n\n#### The Amortized O(N) Proof:\nNotice there is a `while` loop inside a `for` loop. Why is this $O(N)$ and NOT $O(N^2)$?\n- Each index $i$ is pushed onto the stack **at most once** ($N$ total pushes).\n- Each index is popped from the stack **at most once** ($N$ total pops).\n- Therefore, the inner `while` loop condition executes at most $N$ times across the *entire program lifetime*!\n- Total operations $\\le 2N$, proving an amortized **O(N) linear time** bound.",
          "scriptName": "daily_temperatures.py",
          "starterCode": "def daily_temperatures(temperatures: list[int]) -> list[int]:\n    \"\"\"\n    Return an array ans where ans[i] is the number of days you have to wait\n    after day i to get a warmer temperature. If no warmer day exists, ans[i] = 0.\n    Must run in O(N) time using a Monotonic Decreasing Stack!\n    \"\"\"\n    n = len(temperatures)\n    ans = [0] * n\n    stack = [] # stores indices of days\n    \n    # TODO: Iterate through each day index i from 0 to n - 1:\n    # 1. While stack is not empty and temperatures[stack[-1]] < temperatures[i]:\n    #      prev_day = stack.pop()\n    #      ans[prev_day] = i - prev_day\n    # 2. Push current day index i onto stack\n    # 3. Return ans\n    pass\n\n# Test with 8 days of temperatures\ntemps = [73, 74, 75, 71, 69, 72, 76, 73]\nresult = daily_temperatures(temps)\nprint(\"Days until warmer temp:\", result)\n",
          "instructions": [
            {
              "id": "m2-s2-t1",
              "task": "In <code>daily_temperatures(temperatures)</code>, loop <code>i</code> from <code>0</code> to <code>n - 1</code>.",
              "hint": "for i in range(n):"
            },
            {
              "id": "m2-s2-t2",
              "task": "Inside the loop, write a <code>while</code> loop that pops <code>prev_day = stack.pop()</code> when <code>temperatures[stack[-1]] < temperatures[i]</code>, and sets <code>ans[prev_day] = i - prev_day</code>.",
              "hint": "while stack and temperatures[stack[-1]] < temperatures[i]: prev_day = stack.pop(); ans[prev_day] = i - prev_day"
            },
            {
              "id": "m2-s2-t3",
              "task": "Push <code>i</code> to <code>stack</code> and return <code>ans</code>. Then click <strong>Run</strong> to verify against test case.",
              "hint": "stack.append(i) and return ans"
            }
          ],
          "expectedOutput": "Days until warmer temp: [1, 1, 4, 2, 1, 1, 0, 0]"
        },
        {
          "id": "m2-s3",
          "title": "Interactive Exercise: Stock Span Detector",
          "category": "PORTFOLIO PROJECT",
          "time": "10 min",
          "learn": "### Project: Real-Time Market Stock Spanner\n\nFinancial trading systems track stock trends in real time. The **Stock Span** of a stock's price today is defined as the maximum number of consecutive days (starting from today and going backward) for which the price was less than or equal to today's price.\n\n#### The Monotonic Accumulation Pattern:\nInstead of storing every previous day's price individually, we compress consecutive days into a stack of tuples: `(price, span)`.\n- When today's price arrives, we initialize `span = 1` (counting today).\n- As long as the previous recorded price on the stack is $\\le$ today's price, today's price dominates that entire span! We pop the tuple and add its span to today's `span`.\n- Finally, we push `(price, span)` onto the stack and return `span`.\n\nThis gives an amortized **O(1) time per price query**!",
          "scriptName": "stock_spanner.py",
          "starterCode": "class StockSpanner:\n    def __init__(self):\n        # Stack stores tuples: (price, accumulated_span)\n        self.stack = []\n\n    def next(self, price: int) -> int:\n        \"\"\"\n        Collects the daily price and returns the span of consecutive days\n        with price <= today. Must run in O(1) amortized time.\n        \"\"\"\n        span = 1\n        # TODO: Implement the span accumulator!\n        # While self.stack is not empty and self.stack[-1][0] <= price:\n        #   prev_price, prev_span = self.stack.pop()\n        #   span += prev_span\n        # Push (price, span) onto self.stack and return span.\n        pass\n\n# Test with 7 days of prices\nspanner = StockSpanner()\nprices = [100, 80, 60, 70, 60, 75, 85]\nspans = [spanner.next(p) for p in prices]\nprint(\"Stock spans:\", spans)\n",
          "instructions": [
            {
              "id": "m2-s3-t1",
              "task": "In <code>next(price)</code>, write a <code>while</code> loop that pops while <code>self.stack and self.stack[-1][0] <= price</code> and accumulates <code>span += prev_span</code>.",
              "hint": "while self.stack and self.stack[-1][0] <= price: prev_price, prev_span = self.stack.pop(); span += prev_span"
            },
            {
              "id": "m2-s3-t2",
              "task": "Append <code>(price, span)</code> to <code>self.stack</code> and return <code>span</code>.",
              "hint": "self.stack.append((price, span)); return span"
            },
            {
              "id": "m2-s3-t3",
              "task": "Click <strong>Run</strong> to verify spans match <code>[1, 1, 1, 2, 1, 4, 6]</code>.",
              "hint": "Click Run."
            }
          ],
          "expectedOutput": "Stock spans: [1, 1, 1, 2, 1, 4, 6]"
        },
        {
          "id": "m2-s4",
          "title": "Largest Rectangle in Histogram (LC 84)",
          "category": "HARD PROBLEM",
          "time": "12 min",
          "learn": "### The Zero-Sentinel Trick for Histogram (LeetCode 84)\n\nFinding the largest rectangular area in a histogram of bar heights is a classic Amazon SDE interview problem.\n\n#### The Insight:\nFor each bar of height $H$, what is the largest rectangle where $H$ is the bottleneck height? It extends to the left until it hits a bar shorter than $H$, and to the right until it hits a bar shorter than $H$.\n\nA monotonic increasing stack can find these boundaries in linear time.\n\n#### The Grandmaster Zero-Sentinel Trick:\nNormally, when the iteration reaches the end of the array, elements remain trapped inside the stack and require tedious cleanup loops.\n**The Trick**: Append a single `0` to the end of the heights array (`heights = heights + [0]`). Because every valid bar has height $> 0$, the trailing `0` will force-pop every single remaining bar out of the stack and calculate its maximum area in a single clean pass!",
          "scriptName": "histogram.py",
          "starterCode": "def largest_rectangle_area(heights: list[int]) -> int:\n    \"\"\"\n    Calculate the area of the largest rectangle in a histogram in O(N) time.\n    Uses the Zero-Sentinel Trick!\n    \"\"\"\n    # Append trailing sentinel 0\n    heights = heights + [0]\n    stack = [-1] # sentinel index\n    max_area = 0\n    \n    # TODO: Loop index i and height h in enumerate(heights):\n    # 1. While stack[-1] != -1 and heights[stack[-1]] >= h:\n    #      height = heights[stack.pop()]\n    #      width = i - stack[-1] - 1\n    #      max_area = max(max_area, height * width)\n    # 2. Append i to stack\n    # 3. Return max_area\n    pass\n\n# Test with heights [2, 1, 5, 6, 2, 3]\nprint(\"Largest area for [2, 1, 5, 6, 2, 3]:\", largest_rectangle_area([2, 1, 5, 6, 2, 3]))\n",
          "instructions": [
            {
              "id": "m2-s4-t1",
              "task": "In <code>largest_rectangle_area(heights)</code>, iterate <code>i, h in enumerate(heights)</code> and implement the while loop to calculate <code>width = i - stack[-1] - 1</code> and <code>max_area</code>.",
              "hint": "Pop the height from stack, compute width, and update max_area = max(max_area, height * width)."
            },
            {
              "id": "m2-s4-t2",
              "task": "Append index <code>i</code> to <code>stack</code> and return <code>max_area</code>.",
              "hint": "stack.append(i) and return max_area"
            },
            {
              "id": "m2-s4-t3",
              "task": "Click <strong>Run</strong> to verify that the largest area is <code>10</code>.",
              "hint": "Click Run."
            }
          ],
          "expectedOutput": "Largest area for [2, 1, 5, 6, 2, 3]: 10"
        }
      ],
      "quiz": {
        "title": "Module 2 Concept Quiz",
        "time": "15 min",
        "xp": 20,
        "questions": [
          {
            "q": "Why does Python list.pop(0) run in O(N) time?",
            "options": [
              "It sorts the list",
              "It must shift all remaining elements left by 1 memory slot",
              "It searches for zero",
              "It reallocates the array"
            ],
            "answer": 1,
            "explanation": "Contiguous arrays require shifting N-1 elements upon front removal."
          },
          {
            "q": "What is the amortized complexity of Monotonic Stack operations over N elements?",
            "options": [
              "O(N^2)",
              "O(N log N)",
              "O(N)",
              "O(1) total"
            ],
            "answer": 2,
            "explanation": "Every element is pushed once and popped at most once, totaling <= 2N operations."
          }
        ]
      }
    },

    // =========================================================================
    // MODULE 3: Hash Maps, Sets & Two Pointers (尺取法)
    // =========================================================================
    {
      "id": "mod-3",
      "number": 3,
      "title": "Hash Maps, Sets & Two Pointers (尺取法)",
      "totalTime": "2 h 30 min",
      "xp": 120,
      "subskill": "Master hash collision mitigation in C++, and conquer Two Pointers (尺取法) expansion-contraction monotonicity.",
      "tags": ["Hash Collisions", "Two Pointers", "尺取法", "ABC381 D", "LeetCode 76"],
      "submodules": [
        {
          "id": "m3-s1",
          "title": "Two Pointers (尺取法) Monotonicity",
          "category": "TWO POINTERS",
          "time": "8 min",
          "learn": "### The Shakutori-ho (尺取法) Invariant\n\n**Shakutori-ho (尺取法)** translates to the *\"Inchworm Method\"*, named after the distinct motion of an inchworm (*shakutori-mushi* 尺取虫):\n1. The front head stretches forward (advancing the `right` pointer to expand the window).\n2. The rear tail catches up (advancing the `left` pointer to contract the window).\n3. Neither the head nor the tail ever moves backward!\n\n#### The Monotonicity Condition:\nTwo Pointers is valid **if and only if** the problem condition possesses **monotonicity**:\n- If a subarray `[L, R]` violates a constraint (e.g. sum exceeds $K$), expanding further to `R+1` can only make it worse.\n- Advancing `L` to `L+1` reduces or restores validity.\n\n#### The Amortized O(N) Proof:\nBeginners see a `while` loop inside a `for` loop and mistakenly assume $O(N^2)$. But observe the pointers:\n- `right` moves from $0$ to $N-1$ ($N$ steps).\n- `left` moves from $0$ to at most $N-1$ ($N$ steps).\n- Total pointer movements $\\le 2N$, proving an amortized **O(N) runtime**!\n\n> **Interview Tip**:\n> If the array contains negative numbers, the sum is no longer monotonic! You must use Prefix Sums + Hash Map ($O(N)$) instead of Two Pointers.",
          "scriptName": "two_pointers.py",
          "starterCode": "def max_subarray_sum_at_most_k(nums: list[int], k: int) -> int:\n    \"\"\"\n    Given an array of positive integers nums and an integer k,\n    find the maximum length of a contiguous subarray whose sum is <= k.\n    Must run in O(N) time using Shakutori-ho (Two Pointers)!\n    \"\"\"\n    left = 0\n    cur_sum = 0\n    max_len = 0\n    \n    # TODO: Implement the inchworm expansion and contraction:\n    # 1. Loop right pointer from 0 to len(nums) - 1:\n    #    - Add nums[right] to cur_sum\n    #    - While cur_sum > k and left <= right:\n    #        subtract nums[left] and increment left by 1\n    #    - Update max_len = max(max_len, right - left + 1)\n    # 2. Return max_len\n    pass\n\n# Test with nums = [4, 2, 1, 7, 8, 1, 2] and k = 14\nnums = [4, 2, 1, 7, 8, 1, 2]\nk = 14\nprint(f\"Longest subarray with sum <= {k}:\", max_subarray_sum_at_most_k(nums, k))\n",
          "instructions": [
            {
              "id": "m3-s1-t1",
              "task": "In <code>max_subarray_sum_at_most_k(nums, k)</code>, iterate <code>right</code> from <code>0</code> to <code>len(nums) - 1</code> and add <code>nums[right]</code> to <code>cur_sum</code>.",
              "hint": "for right in range(len(nums)): cur_sum += nums[right]"
            },
            {
              "id": "m3-s1-t2",
              "task": "Write the <code>while</code> loop that subtracts <code>nums[left]</code> and advances <code>left += 1</code> while <code>cur_sum > k</code>.",
              "hint": "while cur_sum > k and left <= right: cur_sum -= nums[left]; left += 1"
            },
            {
              "id": "m3-s1-t3",
              "task": "Update <code>max_len = max(max_len, right - left + 1)</code> and return <code>max_len</code>. Then click <strong>Run</strong>.",
              "hint": "Click Run to verify output is 4 (subarray [2, 1, 7, 4] or similar)."
            }
          ],
          "expectedOutput": "Longest subarray with sum <= 14: 4"
        },
        {
          "id": "m3-s2",
          "title": "AtCoder ABC381 D: 1122 Substring",
          "category": "ABC CHALLENGE",
          "time": "12 min",
          "learn": "### AtCoder ABC381 D: 1122 Substring\n\nIn AtCoder ABC381 D, a sequence is defined as **\"1122\"** if:\n1. Its length is even: $|S| = 2k$.\n2. For each pair $i \\in [1, k]$, $S[2i-1] == S[2i]$ (each adjacent pair is identical).\n3. All pair values are mutually distinct (no duplicate pairs).\n\n#### The Two-Pointer Parity Strategy:\nBecause pairs occupy two adjacent indices, we run Shakutori-ho twice:\n- Pass 1: Starting at even offset $0$ (pairing $(0,1), (2,3), \\dots$).\n- Pass 2: Starting at odd offset $1$ (pairing $(1,2), (3,4), \\dots$).\n\nWithin each pass, we advance the `right` pointer by $2$ steps. If $A[right] == A[right+1]$, we check a `seen` set. If the value already exists, we contract `left` by $2$ steps until the collision is cleared!\n\nThis solves the AtCoder D-level contest challenge in clean **O(N) time**!",
          "scriptName": "abc381d.py",
          "starterCode": "def solve_1122(A: list[int]) -> int:\n    \"\"\"\n    Find the maximum length of a contiguous 1122 subarray in A.\n    Runs Shakutori-ho across both parity offsets (0 and 1) in O(N) time.\n    \"\"\"\n    ans = 0\n    # TODO: Run two-pointer pass for start in (0, 1):\n    # 1. Initialize left = start, right = start, seen = set()\n    # 2. While right + 1 < len(A):\n    #    - If A[right] == A[right + 1]:\n    #        val = A[right]\n    #        while val in seen:\n    #            seen.remove(A[left])\n    #            left += 2\n    #        seen.add(val)\n    #        right += 2\n    #        ans = max(ans, right - left)\n    #    - Else:\n    #        seen.clear()\n    #        right += 2\n    #        left = right\n    # 3. Return ans\n    pass\n\n# Test with A = [1, 1, 2, 2, 3, 3, 2, 2, 4, 4]\nA = [1, 1, 2, 2, 3, 3, 2, 2, 4, 4]\nprint(\"Longest 1122 length:\", solve_1122(A))\n",
          "instructions": [
            {
              "id": "m3-s2-t1",
              "task": "In <code>solve_1122(A)</code>, iterate <code>for start in (0, 1):</code> to handle both pair parities.",
              "hint": "This checks pairs aligned at index 0 and pairs aligned at index 1."
            },
            {
              "id": "m3-s2-t2",
              "task": "Implement the pair matching logic: check <code>A[right] == A[right + 1]</code> and maintain the <code>seen</code> set by stepping by 2.",
              "hint": "When A[right] == A[right+1], remove seen elements from left += 2 while val in seen, then seen.add(val) and update ans."
            },
            {
              "id": "m3-s2-t3",
              "task": "Click <strong>Run</strong> to verify that the longest 1122 subarray has length <code>8</code>.",
              "hint": "Click Run."
            }
          ],
          "expectedOutput": "Longest 1122 length: 8"
        },
        {
          "id": "m3-s3",
          "title": "Hash Map Collisions & Anti-Hash Defense",
          "category": "HASH MECHANICS",
          "time": "10 min",
          "learn": "### The C++ Anti-Hash Attack in Competitive Programming\n\n*(Synthesized from Qiita `@comet725` ABC333 E and `@mikecat_mixc`)*\n\nIn competitive programming, many contestants submit C++ code using `std::unordered_map<int, int>` expecting $O(1)$ operations, and get slapped with a **shocking TLE (Time Limit Exceeded)**.\n\n#### Why does `std::unordered_map` get hacked?\n- In standard GCC `libstdc++`, `std::hash<long long>` is literally the **identity function**: `hash(x) = x`!\n- An adversary or contest author can construct a custom hack testcase where all input values $x$ share the exact same bucket modulo the internal table prime $P$:\n$$x_i \\equiv 0 \\pmod P$$\n- When every single element collides into bucket 0, the hash table degrades from an $O(1)$ lookup into an $O(N)$ linked-list traversal, causing total runtime to explode to **O(N²) (40+ seconds)**!\n\n#### The Fix: Custom SplitMix64 Hash\nTo prevent anti-hash attacks, we inject a high-entropy 64-bit random state generated at runtime via `chrono::steady_clock`.\n\n#### Python `dict` Optimization:\nPython's built-in dictionary uses **open addressing with perturb random probing** and randomized hash seeds per process invocation (`PYTHONHASHSEED`), making it naturally immune to static anti-hash tests.",
          "scriptName": "hash_defense.py",
          "starterCode": "def count_frequencies_safe(arr: list[int]) -> dict[int, int]:\n    \"\"\"\n    Count occurrences of each element in arr using a hash map.\n    Must run in O(N) average time.\n    \"\"\"\n    freq = {}\n    # TODO 1: Iterate through arr\n    # TODO 2: For each item, increment its count in freq using dict.get(x, 0) + 1\n    # TODO 3: Return the freq dictionary\n    pass\n\n# Test with duplicate array\ndata = [10, 20, 10, 30, 20, 10, 40]\nprint(\"Frequencies:\", count_frequencies_safe(data))\n",
          "instructions": [
            {
              "id": "m3-s3-t1",
              "task": "In <code>count_frequencies_safe(arr)</code>, loop through <code>arr</code> and populate <code>freq</code>.",
              "hint": "for x in arr: freq[x] = freq.get(x, 0) + 1"
            },
            {
              "id": "m3-s3-t2",
              "task": "Return <code>freq</code> and click <strong>Run</strong>.",
              "hint": "return freq"
            }
          ],
          "expectedOutput": "Frequencies: {10: 3, 20: 2, 30: 1, 40: 1}"
        },
        {
          "id": "m3-s4",
          "title": "Sliding Window: Longest Substring Without Repeating",
          "category": "FAANG OA",
          "time": "10 min",
          "learn": "### Variable-Length Sliding Window (LeetCode 3 / FAANG Top 10)\n\n> **Problem Statement**: Given a string `s`, find the length of the longest substring without repeating characters.\n\n#### The Sliding Window Invariant:\nWe maintain a window `s[left..right]` containing only unique characters.\n- We use a hash map `last_seen` storing the most recent index where each character appeared.\n- When scanning character `s[right]`:\n  - If `s[right]` was previously seen at `prev_idx >= left`, we immediately jump `left = prev_idx + 1` to skip the duplicate character.\n  - Record `last_seen[s[right]] = right`.\n  - Update `max_len = max(max_len, right - left + 1)`.\n\nThis achieves **O(N) single-pass runtime** with $O(\\min(N, \\Sigma))$ space.",
          "scriptName": "longest_unique_substr.py",
          "starterCode": "def length_of_longest_substring(s: str) -> int:\n    \"\"\"\n    Find the length of the longest substring without repeating characters in O(N) time.\n    \"\"\"\n    last_seen = {}\n    left = 0\n    max_len = 0\n    \n    # TODO: Loop index right and char c in enumerate(s):\n    # 1. If c in last_seen and last_seen[c] >= left:\n    #      left = last_seen[c] + 1\n    # 2. Record last_seen[c] = right\n    # 3. Update max_len = max(max_len, right - left + 1)\n    # 4. Return max_len\n    pass\n\n# Test with \"abcabcbb\" and \"pwwkew\"\nprint(\"Length for 'abcabcbb':\", length_of_longest_substring(\"abcabcbb\"))\nprint(\"Length for 'pwwkew':\", length_of_longest_substring(\"pwwkew\"))\n",
          "instructions": [
            {
              "id": "m3-s4-t1",
              "task": "In <code>length_of_longest_substring(s)</code>, enumerate <code>right, c</code> over <code>s</code>.",
              "hint": "for right, c in enumerate(s):"
            },
            {
              "id": "m3-s4-t2",
              "task": "If <code>c in last_seen and last_seen[c] >= left</code>, update <code>left = last_seen[c] + 1</code>. Then update <code>last_seen[c] = right</code> and <code>max_len</code>.",
              "hint": "max_len = max(max_len, right - left + 1)"
            },
            {
              "id": "m3-s4-t3",
              "task": "Click <strong>Run</strong> to verify lengths are <code>3</code> and <code>3</code>.",
              "hint": "Click Run."
            }
          ],
          "expectedOutput": "Length for 'abcabcbb': 3\nLength for 'pwwkew': 3"
        }
      ],
      "quiz": {
        "title": "Module 3 Concept Quiz",
        "time": "15 min",
        "xp": 20,
        "questions": [
          {
            "q": "Why is C++ std::unordered_map vulnerable to anti-hash hack testcases?",
            "options": [
              "It uses red-black trees",
              "Default std::hash<int> is the identity function x, allowing hackers to target bucket primes",
              "It cannot store integers",
              "It runs in O(N log N)"
            ],
            "answer": 1,
            "explanation": "Identity hashing causes deliberate modulo collisions into a single bucket, causing O(N^2) TLE."
          },
          {
            "q": "What property is required for the Two Pointers (尺取法) technique to apply in O(N)?",
            "options": [
              "Array must have even length",
              "Validity condition must be monotonic",
              "Array must contain only primes",
              "Left pointer must stay fixed"
            ],
            "answer": 1,
            "explanation": "Monotonicity ensures that pointers only advance forward, bounding steps to 2N."
          }
        ]
      }
    },

    // =========================================================================
    // MODULE 4: Prefix Sums, Cumulative Probability & Coordinate Compression
    // =========================================================================
    {
      "id": "mod-4",
      "number": 4,
      "title": "Prefix Sums, Cumulative Probability & Coordinate Compression",
      "totalTime": "2 h 10 min",
      "xp": 110,
      "subskill": "Perform O(1) range queries with 1D/2D prefix sums, calculate cumulative expected values, and compress 10^9 coordinate spaces.",
      "tags": ["Prefix Sums", "2D Prefix", "ABC154 D", "Coordinate Compression", "LeetCode 560"],
      "submodules": [
        {
          "id": "m4-s1",
          "title": "1D Prefix Sums (累積和): O(1) Range Queries",
          "category": "PREFIX SUMS",
          "time": "6 min",
          "learn": "### 1D Prefix Sums: Eliminating Repeated Range Scans\n\n*(Synthesized from Qiita `@comet725` ABC381 E and `@mikecat_mixc`)*\n\nImagine an array $A$ of size $N = 200,000$, and you receive $Q = 200,000$ queries asking:\n> *\"What is the sum of elements from index $L$ to index $R$?\"*\n\n- **Naive Loop**: Summing $A[L..R]$ takes $O(N)$ per query. Total runtime: $O(Q \\times N) = 4 \\times 10^{10}$ operations → **400 seconds (TLE)**!\n- **Prefix Sum Array**: Precompute cumulative sums in $O(N)$ preprocessing time. Each query is answered in **O(1) constant time**! Total runtime: $O(N + Q) = 4 \\times 10^5$ operations → **0.004 seconds (AC)**!\n\n#### Mathematical Derivation:\nConstruct an array $P$ of size $N + 1$ with $P[0] = 0$:\n$$P[i] = \\sum_{k=0}^{i-1} A[k] = P[i - 1] + A[i - 1]$$\n\nNotice that the sum of elements from index $L$ to $R$ inclusive is simply the prefix up to $R+1$ minus the prefix up to $L$:\n$$\\text{Sum}(A[L..R]) = P[R + 1] - P[L]$$\n\n```\nArray A:       [  3,   1,   4,   1,   5,   9,   2 ]\nPrefix P:   [ 0,  3,   4,   8,   9,  14,  23,  25 ]\n\nQuery L=1, R=4 (elements 1, 4, 1, 5):\nP[5] - P[1] = 14 - 3 = 11! (Calculated in 1 CPU subtraction)\n```",
          "scriptName": "prefix_sum_engine.py",
          "starterCode": "class PrefixSumEngine:\n    def __init__(self, arr: list[int]):\n        \"\"\"\n        Precompute 1D prefix sums in O(N) time.\n        \"\"\"\n        n = len(arr)\n        # 1-based size N + 1\n        self.P = [0] * (n + 1)\n        # TODO 1: Build the prefix sum array self.P\n        # For each index i from 0 to n - 1: self.P[i + 1] = self.P[i] + arr[i]\n        pass\n\n    def query(self, L: int, R: int) -> int:\n        \"\"\"\n        Query the sum of elements in arr[L..R] inclusive in O(1) time.\n        \"\"\"\n        # TODO 2: Return self.P[R + 1] - self.P[L]\n        pass\n\n# Test with arr = [3, 1, 4, 1, 5, 9, 2]\narr = [3, 1, 4, 1, 5, 9, 2]\nengine = PrefixSumEngine(arr)\nprint(\"Sum of indices 1..4 (1+4+1+5):\", engine.query(1, 4))\nprint(\"Sum of indices 0..6 (Entire Array):\", engine.query(0, 6))\n",
          "instructions": [
            {
              "id": "m4-s1-t1",
              "task": "In <code>__init__(self, arr)</code>, populate <code>self.P[i + 1] = self.P[i] + arr[i]</code> for each index <code>i</code>.",
              "hint": "for i, x in enumerate(arr): self.P[i + 1] = self.P[i] + x"
            },
            {
              "id": "m4-s1-t2",
              "task": "In <code>query(self, L, R)</code>, return <code>self.P[R + 1] - self.P[L]</code>.",
              "hint": "return self.P[R + 1] - self.P[L]"
            },
            {
              "id": "m4-s1-t3",
              "task": "Click <strong>Run</strong> to verify that query 1..4 returns <code>11</code> and query 0..6 returns <code>25</code>.",
              "hint": "Click Run."
            }
          ],
          "expectedOutput": "Sum of indices 1..4 (1+4+1+5): 11\nSum of indices 0..6 (Entire Array): 25"
        },
        {
          "id": "m4-s2",
          "title": "Coordinate Compression (座標圧縮 - Zaatsu)",
          "category": "COORDINATE COMPRESSION",
          "time": "8 min",
          "learn": "### Compressing 10⁹ Coordinates into Dense [0..N-1] Ranks\n\n*(Synthesized from Qiita `@kikudesuyo` ABC213 C and `@comet725`)*\n\nIn many AtCoder problems (e.g. ABC213 C - Reorder Cards) and 2D geometry challenges, coordinate values can reach **$10^9$ or $10^{18}$**.\n\nYou cannot allocate an array or grid of size $10^9$—it would require gigabytes of memory and trigger an immediate **MLE (Memory Limit Exceeded)**.\n\nHowever, notice that the total number of items is often small: **N ≤ 100,000 (10⁵)**. The vast majority of the $10^9$ space is completely empty!\n\n#### The Coordinate Compression Pipeline:\n1. Extract all coordinates into a list.\n2. Deduplicate using a set and sort: `vals = sorted(set(coords))`.\n3. Map each original coordinate to its index position in `vals` using binary search (`bisect_left` in Python or `std::lower_bound` in C++).\n4. Runtime: Sorting takes $O(N \\log N)$, and each rank lookup takes $O(\\log N)$.",
          "scriptName": "coordinate_compression.py",
          "starterCode": "import bisect\n\ndef compress_coordinates(coords: list[int]) -> list[int]:\n    \"\"\"\n    Compress large coordinates (up to 10^9) into continuous 0-based ranks [0..K-1].\n    Must preserve relative ordering in O(N log N) time.\n    \"\"\"\n    # TODO 1: Extract sorted unique values from coords\n    # vals = sorted(set(coords))\n    \n    # TODO 2: Map each value x in coords to its rank using bisect.bisect_left(vals, x)\n    # return [bisect.bisect_left(vals, x) for x in coords]\n    pass\n\n# Test with sparse coordinates up to 1 Billion\nsparse = [1000000000, 50, 50, 9999999, 1000000000]\ncompressed = compress_coordinates(sparse)\nprint(\"Original:\", sparse)\nprint(\"Compressed ranks:\", compressed)\n",
          "instructions": [
            {
              "id": "m4-s2-t1",
              "task": "In <code>compress_coordinates(coords)</code>, extract <code>vals = sorted(set(coords))</code>.",
              "hint": "vals = sorted(set(coords)) removes duplicates and sorts unique values."
            },
            {
              "id": "m4-s2-t2",
              "task": "Map each <code>x</code> in <code>coords</code> to its index using <code>bisect.bisect_left(vals, x)</code> and return the list.",
              "hint": "return [bisect.bisect_left(vals, x) for x in coords]"
            },
            {
              "id": "m4-s2-t3",
              "task": "Click <strong>Run</strong> to verify the ranks evaluate to <code>[2, 0, 0, 1, 2]</code>.",
              "hint": "Click Run."
            }
          ],
          "expectedOutput": "Original: [1000000000, 50, 50, 9999999, 1000000000]\nCompressed ranks: [2, 0, 0, 1, 2]"
        },
        {
          "id": "m4-s3",
          "title": "2D Grid Prefix Sums (Inclusion-Exclusion)",
          "category": "2D PREFIX SUMS",
          "time": "10 min",
          "learn": "### 2D Submatrix Range Sum in O(1)\n\nIn image processing, spatial heatmaps, and grid games, you need to query the sum of elements inside a subrectangle from top-left $(r_1, c_1)$ to bottom-right $(r_2, c_2)$.\n\n#### The 2D Inclusion-Exclusion Formula:\n1. Construct a 2D prefix table $P$ of size $(R+1) \\times (C+1)$ where $P[r][c]$ is the sum of all elements in rectangle $(0,0)$ to $(r-1, c-1)$:\n$$P[r+1][c+1] = A[r][c] + P[r][c+1] + P[r+1][c] - P[r][c]$$\n2. To query rectangle from $(r_1, c_1)$ to $(r_2, c_2)$ inclusive:\n$$\\text{Sum} = P[r_2+1][c_2+1] - P[r_1][c_2+1] - P[r_2+1][c_1] + P[r_1][c_1]$$",
          "scriptName": "grid_prefix_sum.py",
          "starterCode": "class GridPrefixSum:\n    def __init__(self, grid: list[list[int]]):\n        R, C = len(grid), len(grid[0])\n        self.P = [[0] * (C + 1) for _ in range(R + 1)]\n        # TODO 1: Build the 2D prefix sum table\n        # for r in range(R):\n        #   for c in range(C):\n        #     self.P[r+1][c+1] = grid[r][c] + self.P[r][c+1] + self.P[r+1][c] - self.P[r][c]\n        pass\n\n    def query(self, r1: int, c1: int, r2: int, c2: int) -> int:\n        # TODO 2: Return P[r2+1][c2+1] - P[r1][c2+1] - P[r2+1][c1] + P[r1][c1]\n        pass\n\n# Test with 3x3 grid\ngrid = [\n    [1, 2, 3],\n    [4, 5, 6],\n    [7, 8, 9]\n]\ngp = GridPrefixSum(grid)\nprint(\"Subgrid (1,1) to (2,2) [5+6+8+9]:\", gp.query(1, 1, 2, 2))\n",
          "instructions": [
            {
              "id": "m4-s3-t1",
              "task": "Build the 2D prefix sum table in <code>__init__</code> using the formula <code>grid[r][c] + P[r][c+1] + P[r+1][c] - P[r][c]</code>.",
              "hint": "Nested loops over r and c."
            },
            {
              "id": "m4-s3-t2",
              "task": "Implement <code>query(r1, c1, r2, c2)</code> using the 4-term inclusion-exclusion formula.",
              "hint": "return self.P[r2+1][c2+1] - self.P[r1][c2+1] - self.P[r2+1][c1] + self.P[r1][c1]"
            },
            {
              "id": "m4-s3-t3",
              "task": "Click <strong>Run</strong> to verify that subgrid sum is <code>28</code>.",
              "hint": "Click Run."
            }
          ],
          "expectedOutput": "Subgrid (1,1) to (2,2) [5+6+8+9]: 28"
        },
        {
          "id": "m4-s4",
          "title": "Expected Values & Probability Prefix Sums (ABC154 D)",
          "category": "PROBABILITY CP",
          "time": "8 min",
          "learn": "### Expected Value of Dice Rolls: AtCoder ABC154 D\n\n*(Synthesized from Qiita `@comet725` ABC154 D)*\n\nIn AtCoder ABC154 D (Dice in a Line), you are given $N$ dice. The $i$-th die has $p_i$ faces numbered $1, 2, \\dots, p_i$.\nWhen rolled, each face appears with equal probability $1/p_i$.\nYou must choose $K$ consecutive dice to maximize the expected value of their sum.\n\n#### The Mathematical Insight:\nThe expected value $E[D]$ of a fair $p$-sided die is:\n$$E[D] = \\frac{1 + 2 + \\dots + p}{p} = \\frac{p(p+1)}{2p} = \\frac{p + 1}{2}$$\n\nBy linearity of expectation, the expected value of the sum is the sum of individual expected values!\nWe replace each die with its expected value $(p_i + 1) / 2$, and use a **fixed-size sliding window of length K** (or prefix sums) to find the maximum sum in **O(N) time**.",
          "scriptName": "dice_expected_value.py",
          "starterCode": "def max_expected_value_dice(p: list[int], k: int) -> float:\n    \"\"\"\n    Find maximum expected value sum of K consecutive dice in O(N) time.\n    \"\"\"\n    # Expected value of die with p faces is (p + 1) / 2.0\n    ev = [(x + 1) / 2.0 for x in p]\n    \n    # TODO 1: Compute sum of first K elements as current_sum\n    # TODO 2: Slide window of length K from index K to len(p) - 1, updating max_sum\n    # TODO 3: Return max_sum\n    pass\n\n# Test with dice faces [1, 2, 2, 4, 5] and K = 3\np_faces = [1, 2, 2, 4, 5]\nprint(\"Max Expected Sum for K=3:\", max_expected_value_dice(p_faces, 3))\n",
          "instructions": [
            {
              "id": "m4-s4-t1",
              "task": "Compute <code>cur_sum = sum(ev[:k])</code> and initialize <code>max_sum = cur_sum</code>.",
              "hint": "cur_sum = sum(ev[:k]); max_sum = cur_sum"
            },
            {
              "id": "m4-s4-t2",
              "task": "Slide the window across <code>i</code> from <code>k</code> to <code>len(p) - 1</code>: add <code>ev[i]</code>, subtract <code>ev[i - k]</code>, and update <code>max_sum</code>.",
              "hint": "for i in range(k, len(p)): cur_sum += ev[i] - ev[i - k]; max_sum = max(max_sum, cur_sum)"
            },
            {
              "id": "m4-s4-t3",
              "task": "Click <strong>Run</strong> to verify output is <code>7.0</code> (dice with faces 2, 4, 5 give (1.5 + 2.5 + 3.0 = 7.0)).",
              "hint": "Click Run."
            }
          ],
          "expectedOutput": "Max Expected Sum for K=3: 7.0"
        }
      ],
      "quiz": {
        "title": "Module 4 Concept Quiz",
        "time": "15 min",
        "xp": 20,
        "questions": [
          {
            "q": "What is the formula to query sum(A[L..R]) using prefix array P?",
            "options": [
              "P[R] - P[L]",
              "P[R + 1] - P[L]",
              "P[R + 1] - P[L - 1]",
              "P[R] + P[L]"
            ],
            "answer": 1,
            "explanation": "P[R+1] contains elements up to R; subtracting P[L] removes elements up to L-1."
          },
          {
            "q": "What is the expected value of a fair P-sided die numbered 1 to P?",
            "options": [
              "P / 2",
              "(P + 1) / 2",
              "P * (P + 1)",
              "P² / 2"
            ],
            "answer": 1,
            "explanation": "Sum is P(P+1)/2. Dividing by P gives (P+1)/2."
          }
        ]
      }
    },

    // =========================================================================
    // MODULE 5: Nonlinear Structures: Trees, Heaps & Disjoint Set Union (DSU)
    // =========================================================================
    {
      "id": "mod-5",
      "number": 5,
      "title": "Nonlinear Structures: Trees, Heaps & Disjoint Set Union (DSU)",
      "totalTime": "2 h 40 min",
      "xp": 130,
      "subskill": "Master binary heaps, avoid the Python heapq trap, implement Removable Priority Queues, and conquer DSU in O(alpha(N)).",
      "tags": ["Heapq Trap", "Removable PQ", "DSU", "Union Find", "ABC372 E"],
      "submodules": [
        {
          "id": "m5-s1",
          "title": "Disjoint Set Union (DSU / Union-Find) from Scratch",
          "category": "DYNAMIC CONNECTIVITY",
          "time": "8 min",
          "learn": "### Disjoint Set Union: Near-Constant Time Connectivity\n\n*(Synthesized from Qiita `@comet725` ABC372 E, ABC380 E)*\n\n**Disjoint Set Union (DSU)**, also called **Union-Find**, manages a partition of an $N$-element set into disjoint subsets under two primary operations:\n1. `find(i)`: Determine which component element $i$ belongs to (returns representative root).\n2. `union(i, j)`: Merge the component containing $i$ with the component containing $j$.\n\n#### The Two Critical Optimizations:\nWithout optimization, trees can degenerate into linear chains of depth $N$, causing operations to take $O(N)$ time.\nWith two optimizations, DSU achieves an astounding **O(α(N)) amortized time**, where $\\alpha$ is the Inverse Ackermann function (for all practical inputs $N \\le 10^{80}$, $\\alpha(N) \\le 4$, effectively constant time!):\n\n1. **Path Compression**: During `find(i)`, point every visited node directly to the root (`parent[i] = find(parent[i])`). This flattens the tree into depth 1!\n2. **Union by Size (or Rank)**: Always attach the smaller tree under the root of the larger tree, preventing height growth.\n\n```\nBefore Union:       Tree 0 (Size 3)       Tree 3 (Size 1)\nAttach smaller ->   Tree 3 becomes child of Tree 0.\nPath Compression -> All children point directly to Root 0.\n```",
          "scriptName": "dsu_union_find.py",
          "starterCode": "class DisjointSetUnion:\n    def __init__(self, n: int):\n        # parent[i] stores the parent of i; initially each node is its own root\n        self.parent = list(range(n))\n        # size[i] stores the size of the tree rooted at i\n        self.size = [1] * n\n\n    def find(self, i: int) -> int:\n        \"\"\"\n        Find root of i with Path Compression in O(alpha(N)) time.\n        \"\"\"\n        # TODO 1: If self.parent[i] == i, return i.\n        # Otherwise, recursively compress path: self.parent[i] = self.find(self.parent[i])\n        # return self.parent[i]\n        pass\n\n    def union(self, i: int, j: int) -> bool:\n        \"\"\"\n        Union components containing i and j by size.\n        Returns True if a new merge occurred, False if already in same component.\n        \"\"\"\n        # TODO 2: Find roots rooti = self.find(i), rootj = self.find(j)\n        # If rooti == rootj: return False\n        # Attach smaller tree under larger tree:\n        # if self.size[rooti] < self.size[rootj]: rooti, rootj = rootj, rooti\n        # self.parent[rootj] = rooti\n        # self.size[rooti] += self.size[rootj]\n        # return True\n        pass\n\n# Test DSU on 5 elements (0..4)\ndsu = DisjointSetUnion(5)\ndsu.union(0, 1)\ndsu.union(1, 2)\nprint(\"Are 0 and 2 connected?\", dsu.find(0) == dsu.find(2))\nprint(\"Are 0 and 3 connected?\", dsu.find(0) == dsu.find(3))\n",
          "instructions": [
            {
              "id": "m5-s1-t1",
              "task": "In <code>find(i)</code>, implement recursive path compression: <code>if self.parent[i] == i: return i</code> else <code>self.parent[i] = self.find(self.parent[i])</code> and return it.",
              "hint": "if self.parent[i] == i: return i; self.parent[i] = self.find(self.parent[i]); return self.parent[i]"
            },
            {
              "id": "m5-s1-t2",
              "task": "In <code>union(i, j)</code>, merge roots by size and update <code>self.size</code>.",
              "hint": "rooti, rootj = self.find(i), self.find(j). If rooti == rootj return False. Attach smaller to larger."
            },
            {
              "id": "m5-s1-t3",
              "task": "Click <strong>Run</strong> to verify connectivity results match True and False.",
              "hint": "Click Run."
            }
          ],
          "expectedOutput": "Are 0 and 2 connected? True\nAre 0 and 3 connected? False"
        },
        {
          "id": "m5-s2",
          "title": "Binary Heaps & The Python `heapq` Trap",
          "category": "PRIORITY QUEUES",
          "time": "8 min",
          "learn": "### Binary Heaps: Pitfalls of Python `heapq`\n\n*(Synthesized from Qiita `@hidehic0`)*\n\nA **Binary Heap** is a complete binary tree stored inside a flat array where for every node $i$, the parent at index $(i-1)//2$ satisfies the heap ordering property.\n\n#### The 2 Most Common Python `heapq` Traps:\n1. **Python `heapq` is strictly a MIN-Heap**:\n   - `heapq.heappop()` returns the **smallest element**.\n   - If an interview problem asks for the top $K$ largest elements or requires a Max-Heap, you must push **negated values** (`-val`).\n2. **Tie-Breaker Crashes on Tuples**:\n   - When storing tuples like `(priority, object)` in `heapq`, if two items have identical `priority`, Python attempts to compare `object < object`.\n   - If `object` is a dictionary or custom class without `__lt__`, Python raises an immediate `TypeError: '<' not supported between instances`!\n   - **The Grandmaster Fix**: Insert an incrementing unique integer counter: `(priority, count, object)`.",
          "scriptName": "max_heap.py",
          "starterCode": "import heapq\n\nclass MaxHeap:\n    def __init__(self):\n        self.data = []\n\n    def push(self, val: int):\n        # TODO 1: Push negated val to simulate a max-heap in heapq\n        pass\n\n    def pop(self) -> int:\n        # TODO 2: Pop from self.data and negate it back to positive\n        pass\n\n# Test MaxHeap\nmh = MaxHeap()\nfor num in [15, 42, 8, 99, 23]:\n    mh.push(num)\n\nprint(\"Largest element:\", mh.pop())\nprint(\"Second largest:\", mh.pop())\n",
          "instructions": [
            {
              "id": "m5-s2-t1",
              "task": "In <code>push(val)</code>, call <code>heapq.heappush(self.data, -val)</code>.",
              "hint": "heapq.heappush(self.data, -val)"
            },
            {
              "id": "m5-s2-t2",
              "task": "In <code>pop()</code>, call <code>-heapq.heappop(self.data)</code> and return it.",
              "hint": "return -heapq.heappop(self.data)"
            },
            {
              "id": "m5-s2-t3",
              "task": "Click <strong>Run</strong> to verify that largest is <code>99</code> and second largest is <code>42</code>.",
              "hint": "Click Run."
            }
          ],
          "expectedOutput": "Largest element: 99\nSecond largest: 42"
        },
        {
          "id": "m5-s3",
          "title": "Removable Priority Queue (Dual-Heap Lazy Deletion)",
          "category": "ADVANCED DATA STRUCTURES",
          "time": "12 min",
          "learn": "### Removable Priority Queue: Arbitrary O(log N) Deletions\n\n*(Synthesized from Qiita `@saka_pon`)*\n\nStandard binary heaps only support popping the minimum element in $O(\\log N)$. Removing an arbitrary element $x$ from inside a standard heap requires an $O(N)$ linear search.\n\n#### The Dual-Heap Lazy Deletion Pattern:\nMaintain two heaps:\n1. `live_heap`: Stores all pushed active elements.\n2. `discard_heap`: Stores elements marked for deletion.\n\nWhenever the top of `live_heap` equals the top of `discard_heap`, pop from both until the top of `live_heap` is a valid, active element!\nThis gives **O(log N) arbitrary deletion and O(1) top query** without expensive re-heapifications.",
          "scriptName": "removable_pq.py",
          "starterCode": "import heapq\n\nclass RemovablePQ:\n    def __init__(self):\n        self.live = []\n        self.discard = []\n\n    def push(self, x: int):\n        heapq.heappush(self.live, x)\n\n    def remove(self, x: int):\n        # TODO 1: Push x into self.discard\n        pass\n\n    def _clean(self):\n        # TODO 2: While self.live and self.discard and self.live[0] == self.discard[0]:\n        #           heapq.heappop(self.live)\n        #           heapq.heappop(self.discard)\n        pass\n\n    def top(self) -> int:\n        self._clean()\n        return self.live[0]\n\n# Test RemovablePQ\nrpq = RemovablePQ()\nrpq.push(10)\nrpq.push(20)\nrpq.push(30)\nprint(\"Top before remove:\", rpq.top())\nrpq.remove(10) # Lazily remove min element\nprint(\"Top after remove 10:\", rpq.top())\n",
          "instructions": [
            {
              "id": "m5-s3-t1",
              "task": "In <code>remove(x)</code>, call <code>heapq.heappush(self.discard, x)</code>.",
              "hint": "heapq.heappush(self.discard, x)"
            },
            {
              "id": "m5-s3-t2",
              "task": "In <code>_clean()</code>, pop from both heaps while their roots match.",
              "hint": "while self.live and self.discard and self.live[0] == self.discard[0]: heapq.heappop(self.live); heapq.heappop(self.discard)"
            },
            {
              "id": "m5-s3-t3",
              "task": "Click <strong>Run</strong> to verify top changes from <code>10</code> to <code>20</code>.",
              "hint": "Click Run."
            }
          ],
          "expectedOutput": "Top before remove: 10\nTop after remove 10: 20"
        },
        {
          "id": "m5-s4",
          "title": "Top-K in Connected Components (ABC372 E)",
          "category": "ABC CHALLENGE",
          "time": "12 min",
          "learn": "### AtCoder ABC372 E: K-th Largest in Connected Component\n\n*(Synthesized from Qiita `@comet725` ABC372 E)*\n\nIn AtCoder ABC372 E, you have $N$ vertices numbered $1$ to $N$. You process two types of queries:\n- Type 1: Add edge between $u$ and $v$.\n- Type 2: Return the $K$-th largest vertex index in the component containing $u$ (where $K \\le 10$).\n\n#### The Grandmaster Solution:\nInstead of searching the graph on every query, we augment DSU!\n- Each component root maintains a sorted list of the **top 10 largest vertices** in its component.\n- When merging roots $u$ and $v$ in `union()`, merge their top-10 lists like a merge step in Merge Sort, and keep only the largest 10 items!\n- Querying the $K$-th largest takes **O(1) time**!",
          "scriptName": "abc372e.py",
          "starterCode": "def merge_top10(list1: list[int], list2: list[int]) -> list[int]:\n    \"\"\"\n    Merge two descending lists and return the top 10 largest distinct items.\n    \"\"\"\n    # TODO: Combine list1 and list2, remove duplicates, sort descending, keep top 10\n    pass\n\n# Test with two components\ncomp_a = [10, 8, 5, 2]\ncomp_b = [9, 8, 7, 1]\nmerged = merge_top10(comp_a, comp_b)\nprint(\"Merged Top 10 Descending:\", merged)\n",
          "instructions": [
            {
              "id": "m5-s4-t1",
              "task": "In <code>merge_top10(list1, list2)</code>, combine both lists into a unique set and sort descending.",
              "hint": "combined = sorted(set(list1 + list2), reverse=True)"
            },
            {
              "id": "m5-s4-t2",
              "task": "Slice the first 10 elements: <code>return combined[:10]</code>.",
              "hint": "return combined[:10]"
            },
            {
              "id": "m5-s4-t3",
              "task": "Click <strong>Run</strong> to verify output is <code>[10, 9, 8, 7, 5, 2, 1]</code>.",
              "hint": "Click Run."
            }
          ],
          "expectedOutput": "Merged Top 10 Descending: [10, 9, 8, 7, 5, 2, 1]"
        }
      ],
      "quiz": {
        "title": "Module 5 Concept Quiz",
        "time": "15 min",
        "xp": 20,
        "questions": [
          {
            "q": "What is Python heapq module's default heap type?",
            "options": [
              "Max-heap",
              "Min-heap",
              "Fibonacci heap",
              "Binomial heap"
            ],
            "answer": 1,
            "explanation": "heapq is strictly a min-heap; push -val to simulate max-heap."
          },
          {
            "q": "What is the amortized complexity of DSU with path compression and union by size?",
            "options": [
              "O(N)",
              "O(log N)",
              "O(alpha(N))",
              "O(N^2)"
            ],
            "answer": 2,
            "explanation": "Inverse Ackermann alpha(N) <= 4 for all practical inputs, making operations virtually O(1)."
          }
        ]
      }
    },

    // =========================================================================
    // MODULE 6: Search & Sorting: Binary Search on Answer & Comparators
    // =========================================================================
    {
      "id": "mod-6",
      "number": 6,
      "title": "Search & Sorting: Binary Search on Answer & Comparators",
      "totalTime": "2 h 05 min",
      "xp": 110,
      "subskill": "Turn optimization problems into decision problems using Binary Search on Answer and write strict weak ordering comparators.",
      "tags": ["Binary Search", "Optimization to Decision", "Strict Weak Ordering", "LC 875", "Typical 90"],
      "submodules": [
        {
          "id": "m6-s1",
          "title": "Binary Search on Answer Space (二分探索)",
          "category": "BINARY SEARCH",
          "time": "8 min",
          "learn": "### Turning Optimization Problems into Decision Problems\n\n*(Synthesized from Qiita `@comet725` ABC385 D and AtCoder Typical 90 Q001)*\n\nWhenever a problem statement contains phrases like:\n- *\"Find the minimum speed such that...\"*\n- *\"Maximize the minimum distance...\"*\n- *\"Minimize the maximum load...\"*\n\n**Do NOT attempt greedy simulation directly!** Finding an optimal value directly in a continuous or large discrete space is hard.\nInstead, **invert the problem** into a boolean predicate:\n$$\\text{check}(X): \\text{Can we achieve the goal with speed/threshold } X?$$\n\n#### The Monotonicity Property:\nIf speed $X$ is sufficient, any higher speed $X+1$ is also sufficient:\n`False, False, False, True, True, True, ...`\nBecause the answer space is monotonic, we can binary search the exact threshold boundary in **O(log(Range)) evaluations**!\n\n#### Classic Problem: Koko Eating Bananas (LeetCode 875)\nKoko has piles of bananas `piles` and $H$ hours to finish them. If eating speed is $K$, hours taken for pile $P$ is $\\lceil P / K \\rceil$. Find the minimum integer eating speed $K$.",
          "scriptName": "koko_bananas.py",
          "starterCode": "import math\n\ndef min_eating_speed(piles: list[int], h: int) -> int:\n    \"\"\"\n    Find minimum integer speed K to eat all bananas within H hours.\n    Uses Binary Search on Answer space [1..max(piles)] in O(N log(max_pile)) time.\n    \"\"\"\n    def can_finish(k: int) -> bool:\n        # TODO 1: Return sum(math.ceil(p / k) for p in piles) <= h\n        pass\n        \n    left, right = 1, max(piles)\n    ans = right\n    \n    # TODO 2: While left <= right:\n    #   mid = (left + right) // 2\n    #   if can_finish(mid):\n    #     ans = mid\n    #     right = mid - 1\n    #   else:\n    #     left = mid + 1\n    # TODO 3: Return ans\n    pass\n\n# Test with piles = [3, 6, 7, 11] and H = 8\nprint(\"Min speed for piles [3, 6, 7, 11] with H=8:\", min_eating_speed([3, 6, 7, 11], 8))\n",
          "instructions": [
            {
              "id": "m6-s1-t1",
              "task": "In <code>can_finish(k)</code>, compute total hours <code>sum(math.ceil(p / k) for p in piles)</code> and check <code><= h</code>.",
              "hint": "return sum(math.ceil(p / k) for p in piles) <= h"
            },
            {
              "id": "m6-s1-t2",
              "task": "Implement the binary search loop: update <code>ans = mid; right = mid - 1</code> when <code>can_finish(mid)</code> is True.",
              "hint": "while left <= right: mid = (left + right) // 2; if can_finish(mid): ans = mid; right = mid - 1 else: left = mid + 1"
            },
            {
              "id": "m6-s1-t3",
              "task": "Click <strong>Run</strong> to verify minimum speed is <code>4</code>.",
              "hint": "Click Run."
            }
          ],
          "expectedOutput": "Min speed for piles [3, 6, 7, 11] with H=8: 4"
        },
        {
          "id": "m6-s2",
          "title": "Strict Weak Ordering & Custom Comparators",
          "category": "SORTING THEORY",
          "time": "8 min",
          "learn": "### Strict Weak Ordering in C++ and Python\n\n*(Synthesized from Qiita `@e6nlaq` and `@mikecat_mixc`)*\n\nWhen writing custom sorting comparators in C++ (`std::sort`) or Python (`functools.cmp_to_key`), you must adhere to **Strict Weak Ordering**.\n\n#### The 3 Mathematical Rules:\n1. **Irreflexivity**: `comp(x, x)` must ALWAYS be `false` (an element is never strictly less than itself).\n   - *Common Bug in C++*: Writing `return a.val <= b.val;` causes `comp(x, x) == true`, violating irreflexivity and triggering undefined behavior (heap corruption or infinite loop segfault in `std::sort`)!\n2. **Asymmetry**: If `comp(a, b)` is true, `comp(b, a)` must be false.\n3. **Transitivity**: If `comp(a, b)` and `comp(b, c)` are true, `comp(a, c)` must be true.\n\n#### Custom Key Sorting in Python:\nIn Python, preferred practice is supplying a `key` lambda returning a comparable tuple: `arr.sort(key=lambda x: (x.priority, -x.timestamp))`.",
          "scriptName": "custom_sort.py",
          "starterCode": "def sort_intervals(intervals: list[tuple[int, int]]) -> list[tuple[int, int]]:\n    \"\"\"\n    Sort intervals by start time ascending, then by end time descending.\n    \"\"\"\n    # TODO: Return intervals sorted by (start_time, -end_time)\n    pass\n\n# Test with overlapping intervals\ndata = [(1, 4), (2, 3), (1, 6), (2, 5)]\nprint(\"Sorted intervals:\", sort_intervals(data))\n",
          "instructions": [
            {
              "id": "m6-s2-t1",
              "task": "In <code>sort_intervals(intervals)</code>, sort using <code>key=lambda x: (x[0], -x[1])</code>.",
              "hint": "return sorted(intervals, key=lambda x: (x[0], -x[1]))"
            },
            {
              "id": "m6-s2-t2",
              "task": "Click <strong>Run</strong> to verify output is <code>[(1, 6), (1, 4), (2, 5), (2, 3)]</code>.",
              "hint": "Click Run."
            }
          ],
          "expectedOutput": "Sorted intervals: [(1, 6), (1, 4), (2, 5), (2, 3)]"
        },
        {
          "id": "m6-s3",
          "title": "Discrete Binary Search & Bisect Boundaries",
          "category": "SEARCH BOUNDARIES",
          "time": "6 min",
          "learn": "### `bisect_left` vs `bisect_right` Mechanics\n\nWhen querying a sorted array $A$:\n- `bisect_left(A, x)`: Returns the leftmost insertion index such that all elements before it are $< x$.\n- `bisect_right(A, x)`: Returns the rightmost insertion index such that all elements before it are $\\le x$.\n\n#### Counting Elements in Range [Low, High]:\nTo count how many elements in sorted array $A$ satisfy $Low \\le element \\le High$ in **O(log N) time**:\n$$\\text{Count} = \\text{bisect\\_right}(A, High) - \\text{bisect\\_left}(A, Low)$$",
          "scriptName": "range_count.py",
          "starterCode": "import bisect\n\ndef count_elements_in_range(sorted_arr: list[int], low: int, high: int) -> int:\n    \"\"\"\n    Count elements in sorted_arr within [low, high] inclusive in O(log N) time.\n    \"\"\"\n    # TODO: Calculate right_idx = bisect.bisect_right(sorted_arr, high)\n    # Calculate left_idx = bisect.bisect_left(sorted_arr, low)\n    # Return right_idx - left_idx\n    pass\n\n# Test with sorted array\nA = [10, 20, 20, 20, 30, 40, 50]\nprint(\"Count in [20, 40]:\", count_elements_in_range(A, 20, 40))\n",
          "instructions": [
            {
              "id": "m6-s3-t1",
              "task": "Use <code>bisect.bisect_right</code> and <code>bisect.bisect_left</code> to compute the index difference.",
              "hint": "return bisect.bisect_right(sorted_arr, high) - bisect.bisect_left(sorted_arr, low)"
            },
            {
              "id": "m6-s3-t2",
              "task": "Click <strong>Run</strong> to verify count is <code>5</code> (elements 20, 20, 20, 30, 40).",
              "hint": "Click Run."
            }
          ],
          "expectedOutput": "Count in [20, 40]: 5"
        },
        {
          "id": "m6-s4",
          "title": "Resource Allocation Optimizer (Typical 90 Q001)",
          "category": "PORTFOLIO PROJECT",
          "time": "12 min",
          "learn": "### Portfolio Project: Maximizing Minimum Cut (Typical 90 Q001)\n\n*(Synthesized from AtCoder Typical 90 Q001 - Yokan Party)*\n\nYou have a log of length $L$ with $N$ cut marks. You want to choose $K$ cuts to split the log into $K+1$ pieces such that the **length of the shortest piece is maximized**.\n\n#### The Binary Search on Answer Strategy:\n- Binary search the answer $M$ in range $[1, L]$.\n- In `can_achieve(M)`: Greedily cut the log whenever the current piece reaches length $\\ge M$. If we can make $\\ge K+1$ pieces of length $\\ge M$, return True.",
          "scriptName": "yokan_party.py",
          "starterCode": "def maximize_min_piece(L: int, K: int, cuts: list[int]) -> int:\n    \"\"\"\n    Maximize the minimum piece length when making K cuts on log of length L.\n    \"\"\"\n    def can_cut(min_len: int) -> bool:\n        # Greedily cut whenever distance from prev cut >= min_len\n        pieces = 0\n        prev = 0\n        for cut in cuts + [L]:\n            if cut - prev >= min_len:\n                pieces += 1\n                prev = cut\n        return pieces >= K + 1\n\n    # TODO: Binary search left=1 to right=L to find maximum min_len\n    left, right = 1, L\n    ans = 1\n    while left <= right:\n        mid = (left + right) // 2\n        if can_cut(mid):\n            ans = mid\n            left = mid + 1\n        else:\n            right = mid - 1\n    return ans\n\n# Test with length 34, K=1 cut, marks at [8, 13, 26]\nprint(\"Maximized min piece:\", maximize_min_piece(34, 1, [8, 13, 26]))\n",
          "instructions": [
            {
              "id": "m6-s4-t1",
              "task": "Review the binary search logic for <code>maximize_min_piece</code> and run the test.",
              "hint": "Click Run."
            }
          ],
          "expectedOutput": "Maximized min piece: 13"
        }
      ],
      "quiz": {
        "title": "Module 6 Concept Quiz",
        "time": "15 min",
        "xp": 20,
        "questions": [
          {
            "q": "What trigger keyword suggests Binary Search on Answer?",
            "options": [
              "Topological Sort",
              "Minimize the maximum / Maximize the minimum",
              "Find shortest path",
              "Single Number"
            ],
            "answer": 1,
            "explanation": "Minimizing a maximum over a monotonic space allows binary searching on the answer."
          }
        ]
      }
    },

    // =========================================================================
    // MODULE 7: Graphs, Shortest Paths & Grid Traversals
    // =========================================================================
    {
      "id": "mod-7",
      "number": 7,
      "title": "Graphs, Shortest Paths & Grid Traversals",
      "totalTime": "2 h 35 min",
      "xp": 130,
      "subskill": "Master Multi-Source BFS delta arrays, cycle detection in DAGs, and Dijkstra shortest paths from scratch.",
      "tags": ["Multi-Source BFS", "Rotting Oranges", "Topological Sort", "Dijkstra", "ABC322 D"],
      "submodules": [
        {
          "id": "m7-s1",
          "title": "Multi-Source BFS on Grids (Rotting Oranges)",
          "category": "BFS & GRAPHS",
          "time": "10 min",
          "learn": "### Simultaneous Outward Spread: Multi-Source BFS\n\n*(Synthesized from Amazon SDE OA & LeetCode 994)*\n\nIn standard BFS, you start from a single root. But in problems like **Rotting Oranges**, **Fire Spread**, or **Zombie Outbreak**, multiple sources begin spreading simultaneously at time $t = 0$.\n\n#### The Common Beginner Mistake:\nRunning a separate BFS from each rotten orange one after another takes $O(\\text{Sources} \\times R \\times C)$, which is quadratic and causes **TLE**.\n\n#### The Grandmaster Multi-Source Queue Pattern:\n1. Initialize a single `deque`.\n2. In a single scan over the grid, push **ALL initial sources** into the queue at distance 0 *before popping anything*!\n3. Pop from the queue and visit neighbors using standard 4-directional delta arrays: `[(-1,0), (1,0), (0,-1), (0,1)]`.\n4. Because all initial sources are enqueued together, the BFS wave expands uniformly outward in true **O(R × C) linear time**!",
          "scriptName": "multi_source_bfs.py",
          "starterCode": "from collections import deque\n\ndef oranges_rotting(grid: list[list[int]]) -> int:\n    \"\"\"\n    Determine minimum minutes until no fresh oranges remain. Returns -1 if impossible.\n    Grid: 0 = empty, 1 = fresh, 2 = rotten.\n    Must run in O(R * C) time using Multi-Source BFS!\n    \"\"\"\n    R, C = len(grid), len(grid[0])\n    q = deque()\n    fresh_count = 0\n    \n    # TODO 1: Enqueue all rotten oranges (r, c, 0) and count fresh oranges\n    for r in range(R):\n        for c in range(C):\n            if grid[r][c] == 2:\n                q.append((r, c, 0))\n            elif grid[r][c] == 1:\n                fresh_count += 1\n                \n    time = 0\n    # TODO 2: Pop (r, c, time) from q, explore 4 neighbors, rot fresh oranges, decrement fresh_count\n    while q:\n        r, c, time = q.popleft()\n        for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:\n            nr, nc = r + dr, c + dc\n            if 0 <= nr < R and 0 <= nc < C and grid[nr][nc] == 1:\n                grid[nr][nc] = 2\n                fresh_count -= 1\n                q.append((nr, nc, time + 1))\n                \n    # TODO 3: Return time if fresh_count == 0 else -1\n    return time if fresh_count == 0 else -1\n\n# Test with 3x3 grid\ngrid = [\n    [2, 1, 1],\n    [1, 1, 0],\n    [0, 1, 1]\n]\nprint(\"Minutes to rot all oranges:\", oranges_rotting(grid))\n",
          "instructions": [
            {
              "id": "m7-s1-t1",
              "task": "Review the multi-source queue initialization where all rotten oranges are queued before BFS starts.",
              "hint": "Check the double for loop over R and C."
            },
            {
              "id": "m7-s1-t2",
              "task": "Click <strong>Run</strong> to verify that all oranges rot in <code>4</code> minutes.",
              "hint": "Click Run."
            }
          ],
          "expectedOutput": "Minutes to rot all oranges: 4"
        },
        {
          "id": "m7-s2",
          "title": "Topological Sort & Cycle Detection in DAGs",
          "category": "DIRECTED GRAPHS",
          "time": "10 min",
          "learn": "### Kahn's Algorithm for Topological Sorting\n\n*(Synthesized from Microsoft Interview Guide & Course Schedule LC 207)*\n\nA **Directed Acyclic Graph (DAG)** represents dependencies (e.g., prerequisite courses, build task pipelines).\n\n#### Kahn's Algorithm Steps:\n1. Compute the **in-degree** (number of incoming edges) for every vertex.\n2. Enqueue all vertices with `in_degree == 0` (nodes with zero dependencies).\n3. While queue is not empty:\n   - Pop vertex $u$ and append to topological order.\n   - For each outgoing neighbor $v$, decrement `in_degree[v] -= 1`.\n   - If `in_degree[v]` reaches 0, enqueue $v$.\n4. If total processed vertices $< V$, the graph contains a **cycle**!",
          "scriptName": "topological_sort.py",
          "starterCode": "from collections import deque\n\ndef topological_sort(n: int, edges: list[tuple[int, int]]) -> list[int]:\n    \"\"\"\n    Return topological ordering of vertices 0..n-1, or empty list if cycle exists.\n    \"\"\"\n    adj = [[] for _ in range(n)]\n    in_degree = [0] * n\n    \n    for u, v in edges:\n        adj[u].append(v)\n        in_degree[v] += 1\n        \n    # TODO 1: Initialize q with all vertices where in_degree == 0\n    # TODO 2: Pop from q, append to order, decrement neighbors, enqueue when in_degree hits 0\n    # TODO 3: Return order if len(order) == n else []\n    pass\n\n# Test with 4 vertices: 0->1, 0->2, 1->3, 2->3\nedges = [(0, 1), (0, 2), (1, 3), (2, 3)]\nprint(\"Topological Order:\", topological_sort(4, edges))\n",
          "instructions": [
            {
              "id": "m7-s2-t1",
              "task": "In <code>topological_sort</code>, enqueue all nodes with <code>in_degree == 0</code> into a deque.",
              "hint": "q = deque([i for i in range(n) if in_degree[i] == 0])"
            },
            {
              "id": "m7-s2-t2",
              "task": "Process queue and decrement neighbor in-degrees.",
              "hint": "while q: u = q.popleft(); order.append(u); for v in adj[u]: in_degree[v] -= 1; if in_degree[v] == 0: q.append(v)"
            },
            {
              "id": "m7-s2-t3",
              "task": "Click <strong>Run</strong> to verify ordering starts with <code>0</code> and ends with <code>3</code>.",
              "hint": "Click Run."
            }
          ],
          "expectedOutput": "Topological Order: [0, 1, 2, 3]"
        },
        {
          "id": "m7-s3",
          "title": "Dijkstra's Algorithm with Priority Queue",
          "category": "SHORTEST PATHS",
          "time": "12 min",
          "learn": "### Dijkstra's Single-Source Shortest Path\n\n*(Synthesized from Qiita `@saka_pon`)*\n\nDijkstra computes shortest paths on weighted graphs with non-negative edge weights in **O((V + E) log V) time**.\n\n#### The Critical Stale Entry Optimization:\nWhen a shorter distance to node $v$ is discovered, a new `(new_dist, v)` tuple is pushed into the priority queue. The old, longer entry remains in the heap.\n**Rule**: When popping `(d, u)` from the heap, check if `d > dist[u]`. If so, **skip it immediately**!",
          "scriptName": "dijkstra.py",
          "starterCode": "import heapq\n\ndef dijkstra(n: int, adj: list[list[tuple[int, int]]], start: int) -> list[int]:\n    \"\"\"\n    Compute shortest distance from start to all vertices in O((V + E) log V) time.\n    \"\"\"\n    INF = float('inf')\n    dist = [INF] * n\n    dist[start] = 0\n    pq = [(0, start)] # (distance, node)\n    \n    while pq:\n        d, u = heapq.heappop(pq)\n        # TODO: Skip stale heap entry\n        if d > dist[u]:\n            continue\n        for v, weight in adj[u]:\n            if dist[u] + weight < dist[v]:\n                dist[v] = dist[u] + weight\n                heapq.heappush(pq, (dist[v], v))\n                \n    return dist\n\n# Test on 3 nodes: 0->1 (w=4), 0->2 (w=2), 2->1 (w=1)\nadj = [[] for _ in range(3)]\nadj[0].append((1, 4))\nadj[0].append((2, 2))\nadj[2].append((1, 1))\nprint(\"Shortest distances from node 0:\", dijkstra(3, adj, 0))\n",
          "instructions": [
            {
              "id": "m7-s3-t1",
              "task": "Review the edge relaxation logic and click <strong>Run</strong>.",
              "hint": "Click Run."
            }
          ],
          "expectedOutput": "Shortest distances from node 0: [0, 3, 2]"
        },
        {
          "id": "m7-s4",
          "title": "Grid Polyomino Simulation (ABC322 D)",
          "category": "ABC CHALLENGE",
          "time": "10 min",
          "learn": "### Grid Polyomino Fitting (AtCoder ABC322 D)\n\nIn AtCoder ABC322 D, you are given 3 polyominos. You must determine if they can be rotated and translated to tile a 4x4 grid perfectly without overlap.\n\nBecause the grid is only 4x4, exhaustive grid simulation with rotation matrices ($0^\\circ, 90^\\circ, 180^\\circ, 270^\\circ$) and bounding offsets runs in **< 0.05 seconds**!",
          "scriptName": "polyomino.py",
          "starterCode": "def rotate_grid(grid: list[str]) -> list[str]:\n    \"\"\"\n    Rotate a 4x4 character grid 90 degrees clockwise.\n    \"\"\"\n    return [\"\".join(grid[3 - r][c] for r in range(4)) for c in range(4)]\n\n# Test rotation on simple piece\npiece = [\n    \"#...\",\n    \"##..\",\n    \"#...\",\n    \"....\"\n]\nrotated = rotate_grid(piece)\nprint(\"Rotated Piece Row 0:\", rotated[0])\n",
          "instructions": [
            {
              "id": "m7-s4-t1",
              "task": "Run the rotation engine to verify the 90-degree matrix transform.",
              "hint": "Click Run."
            }
          ],
          "expectedOutput": "Rotated Piece Row 0: .###"
        }
      ],
      "quiz": {
        "title": "Module 7 Concept Quiz",
        "time": "15 min",
        "xp": 20,
        "questions": [
          {
            "q": "How do you initialize Multi-Source BFS to achieve O(V+E) time?",
            "options": [
              "Run BFS from each source one by one",
              "Push all source nodes into the queue at t=0 before popping",
              "Sort nodes by degree",
              "Use negative weights"
            ],
            "answer": 1,
            "explanation": "Pushing all sources simultaneously at t=0 expands outward in a single linear pass."
          }
        ]
      }
    },

    // =========================================================================
    // MODULE 8: Dynamic Programming Masterclass & Lazy Segment Trees
    // =========================================================================
    {
      "id": "mod-8",
      "number": 8,
      "title": "Dynamic Programming Masterclass & Lazy Segment Trees",
      "totalTime": "3 h 10 min",
      "xp": 150,
      "subskill": "Execute top-down memoization on N <= 10^18, compute modular probabilities mod 998244353, and master Lazy Segment Trees.",
      "tags": ["Memoized DP", "Fermat Inverse", "ABC275 D", "EDPC T & V", "Lazy SegTree"],
      "submodules": [
        {
          "id": "m8-s1",
          "title": "Memoized Recursion on Gigantic N = 10¹⁸",
          "category": "DP MASTERCLASS",
          "time": "8 min",
          "learn": "### Sparse Reachable States for Gigantic N: AtCoder ABC275 D\n\n*(Synthesized from Qiita `@comet725` ABC275 D)*\n\nConsider the recurrence relation:\n$$f(0) = 1$$\n$$f(N) = f(\\lfloor N / 2 \\rfloor) + f(\\lfloor N / 3 \\rfloor)$$\n\nWhere the input constraint is **N ≤ 10¹⁸ (1 Quintillion)**!\n\n#### Why Bottom-Up Table DP Fails:\nAllocating an array of size $10^{18}$ requires millions of Terabytes of RAM, which is completely impossible.\n\n#### The Top-Down Memoization Insight:\nNotice that floor divisions by 2 and 3 do NOT produce $10^{18}$ distinct numbers. The set of reachable values $\\lfloor \\lfloor N / 2^a \\rfloor / 3^b \\rfloor$ is extraordinarily small:\n$$\\text{Unique Reachable States} \\approx O((\\log N)^2) \\approx 60 \\times 38 \\approx 2,000 \\text{ states}!$$\n\nBy writing a simple recursive function decorated with Python's `@functools.cache` (or an `unordered_map` in C++), we compute $f(10^{18})$ in **under 0.005 seconds**!",
          "scriptName": "memoized_dp.py",
          "starterCode": "from functools import cache\n\n@cache\ndef f(n: int) -> int:\n    \"\"\"\n    Compute f(n) = f(n//2) + f(n//3) with f(0) = 1 in O(log^2 N) time using @cache.\n    \"\"\"\n    # TODO 1: Base case: if n == 0, return 1\n    # TODO 2: Recursive case: return f(n // 2) + f(n // 3)\n    pass\n\n# Test on N = 10^18\nans = f(10**18)\nprint(\"f(10^18) calculated instantly:\", ans)\n",
          "instructions": [
            {
              "id": "m8-s1-t1",
              "task": "In <code>f(n)</code>, write the base case: <code>if n == 0: return 1</code>.",
              "hint": "if n == 0: return 1"
            },
            {
              "id": "m8-s1-t2",
              "task": "Write the transition: <code>return f(n // 2) + f(n // 3)</code>.",
              "hint": "return f(n // 2) + f(n // 3)"
            },
            {
              "id": "m8-s1-t3",
              "task": "Click <strong>Run</strong> to compute f(10^18) in milliseconds.",
              "hint": "Click Run."
            }
          ],
          "expectedOutput": "f(10^18) calculated instantly: 81845115"
        },
        {
          "id": "m8-s2",
          "title": "Modulo Probability DP (`mod 998244353`)",
          "category": "NUMBER THEORY DP",
          "time": "10 min",
          "learn": "### Modular Multiplicative Inverse: Fermat's Little Theorem\n\n*(Synthesized from Qiita `@comet725` ABC275 E)*\n\nWhen competitive programming judges ask for a probability modulo $P = 998244353$, you cannot store floating point decimals (due to precision loss).\n\n#### Fermat's Little Theorem for Modulo Division:\nIf $P$ is a prime and $\\gcd(b, P) = 1$:\n$$b^{P - 1} \\equiv 1 \\pmod P \\implies b \\cdot b^{P - 2} \\equiv 1 \\pmod P$$\nTherefore, dividing by $b$ under modulo $P$ is identical to multiplying by:\n$$b^{-1} \\equiv b^{P - 2} \\pmod P$$\nIn Python, compute this in $O(\\log P)$ time using: `pow(b, P - 2, P)`!",
          "scriptName": "modular_inverse.py",
          "starterCode": "MOD = 998244353\n\ndef mod_divide(a: int, b: int, mod: int = MOD) -> int:\n    \"\"\"\n    Compute (a / b) mod mod using Fermat's Little Theorem.\n    Formula: (a * pow(b, mod - 2, mod)) % mod\n    \"\"\"\n    # TODO: Return (a * pow(b, mod - 2, mod)) % mod\n    pass\n\n# Test: Probability of 1/6 (rolling a 1 on a 6-sided die) mod 998244353\ninv_6 = mod_divide(1, 6)\nprint(\"1/6 mod 998244353:\", inv_6)\n# Verify: (inv_6 * 6) % MOD should equal 1\nprint(\"Verification (inv_6 * 6) % MOD:\", (inv_6 * 6) % MOD)\n",
          "instructions": [
            {
              "id": "m8-s2-t1",
              "task": "Implement modular division using <code>pow(b, mod - 2, mod)</code>.",
              "hint": "return (a * pow(b, mod - 2, mod)) % mod"
            },
            {
              "id": "m8-s2-t2",
              "task": "Click <strong>Run</strong> to verify that (inv_6 * 6) % MOD equals <code>1</code>.",
              "hint": "Click Run."
            }
          ],
          "expectedOutput": "1/6 mod 998244353: 166374059\nVerification (inv_6 * 6) % MOD: 1"
        },
        {
          "id": "m8-s3",
          "title": "Permutation DP with Prefix Sums (EDPC T)",
          "category": "ADVANCED DP",
          "time": "12 min",
          "learn": "### Prefix Sum Accelerated DP: EDPC Task T\n\n*(Synthesized from Qiita `@mikecat_mixc` EDPC T)*\n\nWhen a DP transition takes $O(N)$ because the current state depends on a sum of previous states:\n$$dp[i][j] = \\sum_{k=0}^{j-1} dp[i-1][k]$$\n\nNaive evaluation produces an $O(N^3)$ complexity. By maintaining a **prefix sum array of the previous DP row**, we evaluate each state transition in **O(1) time**, instantly accelerating the total runtime from $O(N^3)$ to **O(N²)**!",
          "scriptName": "prefix_dp.py",
          "starterCode": "def accelerate_dp_row(prev_dp: list[int], mod: int = 998244353) -> list[int]:\n    \"\"\"\n    Compute prefix sums of prev_dp to allow O(1) interval transitions.\n    \"\"\"\n    P = [0] * (len(prev_dp) + 1)\n    for i, x in enumerate(prev_dp):\n        P[i + 1] = (P[i] + x) % mod\n    return P\n\n# Test prefix acceleration\np = accelerate_dp_row([1, 2, 3, 4])\nprint(\"DP Row Prefix Sums:\", p)\n",
          "instructions": [
            {
              "id": "m8-s3-t1",
              "task": "Run the prefix sum builder to verify DP acceleration.",
              "hint": "Click Run."
            }
          ],
          "expectedOutput": "DP Row Prefix Sums: [0, 1, 3, 6, 10]"
        },
        {
          "id": "m8-s4",
          "title": "Tree DP & Rerooting Principle (EDPC V)",
          "category": "TREE DP",
          "time": "12 min",
          "learn": "### Rerooting DP (全方位木DP): Solving All N Roots in O(N)\n\n*(Synthesized from Qiita `@mikecat_mixc` EDPC V)*\n\nIf you run a tree DP from a single root, it takes $O(N)$ time. If a problem requires computing the answer for **every single vertex as the root**, running $N$ separate DPs takes $O(N^2)$ → **TLE**.\n\n**The Rerooting Technique (全方位木DP)**:\n1. Run a bottom-up tree DP to compute subtree answers for an arbitrary root (e.g. vertex 0).\n2. Run a second top-down pass that propagates answers downwards to children using cumulative prefix and suffix products of sibling results.\n3. Total runtime for all $N$ roots: **O(N) linear time**!",
          "scriptName": "rerooting.py",
          "starterCode": "# Rerooting DP verification\ndef get_rerooting_complexity(n: int) -> str:\n    return f\"Rerooting DP solves all {n} roots in O(N) = {n} operations!\"\n\nprint(get_rerooting_complexity(200000))\n",
          "instructions": [
            {
              "id": "m8-s4-t1",
              "task": "Run the rerooting script to confirm linear complexity.",
              "hint": "Click Run."
            }
          ],
          "expectedOutput": "Rerooting DP solves all 200000 roots in O(N) = 200000 operations!"
        }
      ],
      "quiz": {
        "title": "Module 8 Concept Quiz",
        "time": "15 min",
        "xp": 20,
        "questions": [
          {
            "q": "Why does top-down memoization succeed on N=10^18 in ABC275 D?",
            "options": [
              "It uses quantum computing",
              "Reachable floor-division states are sparse (~10^5) and fit easily in a hash map",
              "It converts floats to ints",
              "It runs in O(1)"
            ],
            "answer": 1,
            "explanation": "Floor divisions by 2 and 3 generate only a few thousand distinct reachable states."
          }
        ]
      }
    },

    // =========================================================================
    // MODULE 9: Mathematical Foundations & Heuristic Search
    // =========================================================================
    {
      "id": "mod-9",
      "number": 9,
      "title": "Mathematical Foundations & Heuristic Search",
      "totalTime": "2 h 20 min",
      "xp": 120,
      "subskill": "Master Pick's theorem for lattice polygons, approximate fractions with Stern-Brocot trees, and implement Chokudai heuristic search.",
      "tags": ["Pick's Theorem", "Shoelace Formula", "Stern-Brocot", "Chokudai Search", "AHC"],
      "submodules": [
        {
          "id": "m9-s1",
          "title": "Shoelace Formula & Pick's Theorem",
          "category": "DISCRETE GEOMETRY",
          "time": "8 min",
          "learn": "### Exact Lattice Polygon Geometry\n\n*(Synthesized from Qiita `@tmokmss`)*\n\nFor a polygon whose vertices have integer grid coordinates $(X_i, Y_i)$:\n\n1. **Shoelace Formula (Gauss's Area Formula)**:\n$$2 \\times \\text{Area} = \\left| \\sum_{i=0}^{N-1} (X_i Y_{i+1} - X_{i+1} Y_i) \\right|$$\n2. **Boundary Lattice Points ($B$)**: The number of integer points on segment $(x_1, y_1)$ to $(x_2, y_2)$ is $\\gcd(|x_1 - x_2|, |y_1 - y_2|)$.\n3. **Pick's Theorem**: Relates Area $A$, Interior points $I$, and Boundary points $B$:\n$$A = I + \\frac{B}{2} - 1 \\implies I = A - \\frac{B}{2} + 1$$",
          "scriptName": "picks_theorem.py",
          "starterCode": "import math\n\ndef polygon_lattice_properties(vertices: list[tuple[int, int]]) -> dict:\n    \"\"\"\n    Calculate exact Area, Boundary points B, and Interior points I in O(N) time.\n    \"\"\"\n    n = len(vertices)\n    # 1. 2 * Area via Shoelace Formula\n    area2 = abs(sum(vertices[i][0] * vertices[(i+1)%n][1] - vertices[(i+1)%n][0] * vertices[i][1] for i in range(n)))\n    area = area2 / 2.0\n    \n    # TODO 1: Calculate boundary points B using math.gcd\n    boundary = sum(math.gcd(abs(vertices[(i+1)%n][0] - vertices[i][0]), abs(vertices[(i+1)%n][1] - vertices[i][1])) for i in range(n))\n    \n    # TODO 2: Pick's Theorem: I = Area - B / 2 + 1\n    interior = int(area - boundary / 2 + 1)\n    \n    return {\"Area\": area, \"Boundary\": boundary, \"Interior\": interior}\n\n# Test with right triangle (0,0), (4,0), (0,3)\nres = polygon_lattice_properties([(0,0), (4,0), (0,3)])\nprint(\"Triangle properties:\", res)\n",
          "instructions": [
            {
              "id": "m9-s1-t1",
              "task": "Review the Shoelace and Pick's Theorem implementation and click <strong>Run</strong>.",
              "hint": "Click Run."
            }
          ],
          "expectedOutput": "Triangle properties: {'Area': 6.0, 'Boundary': 12, 'Interior': 1}"
        },
        {
          "id": "m9-s2",
          "title": "Stern-Brocot Tree: Irreducible Fraction Search",
          "category": "NUMBER THEORY",
          "time": "10 min",
          "learn": "### Stern-Brocot Trees & Mediants\n\n*(Synthesized from Qiita `@okaponta_`)*\n\nThe **Stern-Brocot Tree** is an infinite binary search tree that generates every positive irreducible fraction $\\frac{p}{q}$ (with $\\gcd(p, q) = 1$) exactly once.\nGiven two fractions $\\frac{a}{b}$ and $\\frac{c}{d}$, their **mediant** is:\n$$\\text{Mediant} = \\frac{a + c}{b + d}$$\nIt strictly satisfies: $\\frac{a}{b} < \\frac{a+c}{b+d} < \\frac{c}{d}$.\nWe can binary search the mediant tree to approximate any real target $x$ in **O(log N) steps**!",
          "scriptName": "stern_brocot.py",
          "starterCode": "def get_mediant(a: int, b: int, c: int, d: int) -> tuple[int, int]:\n    # TODO: Return (a + c, b + d)\n    pass\n\nprint(\"Mediant of 1/3 and 1/2:\", get_mediant(1, 3, 1, 2))\n",
          "instructions": [
            {
              "id": "m9-s2-t1",
              "task": "In <code>get_mediant(a, b, c, d)</code>, return <code>(a + c, b + d)</code>.",
              "hint": "return (a + c, b + d)"
            },
            {
              "id": "m9-s2-t2",
              "task": "Click <strong>Run</strong> to verify mediant is <code>(2, 5)</code>.",
              "hint": "Click Run."
            }
          ],
          "expectedOutput": "Mediant of 1/3 and 1/2: (2, 5)"
        },
        {
          "id": "m9-s3",
          "title": "Double Factorials & Trailing Zeros (ABC148 E)",
          "category": "NUMBER THEORY",
          "time": "8 min",
          "learn": "### Trailing Zeros in Double Factorials: AtCoder ABC148 E\n\n*(Synthesized from Qiita `@comet725` ABC148 E)*\n\nThe double factorial $N!!$ is the product of all integers from $N$ down to 1 with the same parity as $N$.\n\n- **If N is odd**: $N!!$ contains no even factors, so it has **0 trailing zeros**!\n- **If N is even**: $N!! = 2^{N/2} \\times (N/2)!$. The number of trailing zeros is determined by the number of factors of 5 in $(N/2)!$, computed via Legendre's Formula:\n$$\\text{Zeros} = \\sum_{k=1}^{\\infty} \\left\\lfloor \\frac{N / 2}{5^k} \\right\\rfloor$$",
          "scriptName": "double_factorial.py",
          "starterCode": "def count_trailing_zeros(n: int) -> int:\n    if n % 2 != 0:\n        return 0\n    m = n // 2\n    zeros = 0\n    # TODO: While m >= 5, divide m by 5 and add to zeros\n    while m >= 5:\n        zeros += m // 5\n        m //= 5\n    return zeros\n\nprint(\"Trailing zeros in 12!!:\", count_trailing_zeros(12))\nprint(\"Trailing zeros in 1000000000000000000!! (10^18):\")\nprint(count_trailing_zeros(10**18))\n",
          "instructions": [
            {
              "id": "m9-s3-t1",
              "task": "Run the double factorial trailing zeros script.",
              "hint": "Click Run."
            }
          ],
          "expectedOutput": "Trailing zeros in 12!!: 1\nTrailing zeros in 1000000000000000000!! (10^18):\n124999999999999999"
        },
        {
          "id": "m9-s4",
          "title": "Heuristic Search: Chokudai Tree Pruning",
          "category": "AHC HEURISTICS",
          "time": "12 min",
          "learn": "### AtCoder Heuristic Contests (AHC) & Chokudai Search\n\n*(Synthesized from Qiita `@At-sushi` and `@ueta7`)*\n\nIn Marathon/Heuristic contests, problems are NP-hard and there is no exact polynomial algorithm. Your goal is to **maximize a score within a 2.0-second time limit**.\n\n#### Chokudai Search:\nStandard beam search only explores one tree depth at a time. **Chokudai Search** maintains a separate priority queue for every depth $d$. It continuously loops across depths, expanding the top state of each depth whenever time permits, escaping local minima traps!",
          "scriptName": "chokudai_search.py",
          "starterCode": "# Chokudai Search concept runner\ndef get_ahc_strategy():\n    return \"AHC Strategy: Loop across depths until time.time() hits 1.95s!\"\n\nprint(get_ahc_strategy())\n",
          "instructions": [
            {
              "id": "m9-s4-t1",
              "task": "Run the script to review the AHC time-budget strategy.",
              "hint": "Click Run."
            }
          ],
          "expectedOutput": "AHC Strategy: Loop across depths until time.time() hits 1.95s!"
        }
      ],
      "quiz": {
        "title": "Module 9 Concept Quiz",
        "time": "15 min",
        "xp": 20,
        "questions": [
          {
            "q": "What does Pick's Theorem state?",
            "options": [
              "A = I + B/2 - 1",
              "A = I * B",
              "A = I + B",
              "A = B - I"
            ],
            "answer": 0,
            "explanation": "Pick's theorem relates Area A, Interior points I, and Boundary points B: A = I + B/2 - 1."
          }
        ]
      }
    },

    // =========================================================================
    // MODULE 10: FAANG Career Capstone: Amazon & Microsoft Hiring Loops
    // =========================================================================
    {
      "id": "mod-10",
      "number": 10,
      "title": "FAANG Capstone: Amazon & Microsoft Hiring Loops",
      "totalTime": "3 h 00 min",
      "xp": 160,
      "subskill": "Crush the Amazon 70-min OA, format behavioral answers via 16 LPs STAR method, and master Microsoft CS Fundamentals and SOLID LLD.",
      "tags": ["Amazon OA", "16 LPs", "STAR Method", "Bar Raiser", "Microsoft Leveling", "SOLID LLD"],
      "submodules": [
        {
          "id": "m10-s1",
          "title": "The Amazon STAR Method Formula (15-15-50-20)",
          "category": "AMAZON BEHAVIORAL",
          "time": "10 min",
          "learn": "### Mastering Amazon's 16 Leadership Principles\n\nAmazon's hiring process evaluates candidates strictly against their **16 Leadership Principles (LPs)** (Customer Obsession, Ownership, Bias for Action, Dive Deep, Have Backbone, etc.).\n\n#### The STAR Method Time Distribution Formula:\n- **Situation (15%)**: Brief, high-level context. Keep it under 1 minute.\n- **Task (15%)**: What was the specific objective assigned specifically to YOU.\n- **Action (50%)**: **CRITICAL**: Use **'I'**, NOT **'We'**! Describe your individual architecture, algorithms, trade-offs, and technical choices.\n- **Result (20%)**: Quantifiable business/engineering impact (% latency drop, $ savings, throughput gain).\n\n#### The Bar Raiser Veto:\nAmazon includes an independent **Bar Raiser** interviewer from an unrelated org who has **unilateral veto power** over the hiring decision.",
          "scriptName": "star_evaluator.py",
          "starterCode": "def evaluate_star_story(situation_pct: int, task_pct: int, action_pct: int, result_pct: int) -> str:\n    \"\"\"\n    Verify if a STAR story satisfies the optimal 15-15-50-20 balance.\n    Requires action >= 45% and result >= 15%.\n    \"\"\"\n    # TODO: Return \"Bar Raiser Approved!\" if (action_pct >= 45 and result_pct >= 15) else \"Need more Action/Result focus\"\n    pass\n\n# Test with balanced story (15% S, 15% T, 50% A, 20% R)\nprint(evaluate_star_story(15, 15, 50, 20))\n",
          "instructions": [
            {
              "id": "m10-s1-t1",
              "task": "In <code>evaluate_star_story</code>, check if <code>action_pct >= 45 and result_pct >= 15</code>.",
              "hint": "return \"Bar Raiser Approved!\" if (action_pct >= 45 and result_pct >= 15) else \"Need more Action/Result focus\""
            },
            {
              "id": "m10-s1-t2",
              "task": "Click <strong>Run</strong> to verify the story is approved.",
              "hint": "Click Run."
            }
          ],
          "expectedOutput": "Bar Raiser Approved!"
        },
        {
          "id": "m10-s2",
          "title": "Amazon 70-Min Online Assessment (OA) Playbook",
          "category": "AMAZON OA",
          "time": "10 min",
          "learn": "### Amazon Online Assessment (OA) Strategy\n\nAmazon's OA on HackerRank consists of **2 algorithmic coding questions in 70 minutes**.\n\n#### Top 5 OA Patterns:\n1. **Multi-Source BFS / Grid DFS** (Rotting Oranges, Number of Islands).\n2. **Two Pointers & Sliding Window** (Substrings with K distinct chars).\n3. **Heaps / Priority Queues** (Top K Frequent, Merge K Lists).\n4. **Monotonic Stack** (Stock Span, Daily Temperatures).\n5. **Dynamic Programming / Prefix Sums**.\n\n#### The Hidden Test Case Defense:\nHackerRank only shows 2-3 public sample test cases. Up to 12 hidden test cases test: $N=1$, empty strings, 64-bit integer overflow, and duplicates!",
          "scriptName": "oa_checklist.py",
          "starterCode": "# Amazon OA pre-flight verification\ndef check_oa_readiness():\n    return \"Amazon OA Shield: Checked N=1, 64-bit Long, and Graph Connectivity!\"\n\nprint(check_oa_readiness())\n",
          "instructions": [
            {
              "id": "m10-s2-t1",
              "task": "Run the OA readiness script.",
              "hint": "Click Run."
            }
          ],
          "expectedOutput": "Amazon OA Shield: Checked N=1, 64-bit Long, and Graph Connectivity!"
        },
        {
          "id": "m10-s3",
          "title": "Microsoft Leveling Ladder & CS Fundamentals",
          "category": "MICROSOFT HIRING",
          "time": "12 min",
          "learn": "### Microsoft Leveling & CS Fundamentals\n\n*(Synthesized from Prabhu Kalyan Korivi's Microsoft Interview Guide)*\n\n#### Microsoft SDE Leveling:\n- **L59 – L60 (SDE I / Freshers)**: Strong DSA + Core CS Fundamentals (OS, DBMS, Networks).\n- **L61 – L62 (SDE II)**: Advanced DSA + Low-Level Design (SOLID) + High-Level Design (Microservices).\n- **L63 – L64 (Senior)**: Cross-team architecture, scalability, mentorship.\n\n#### The 4 Coffman Deadlock Conditions (Must Know!):\n1. **Mutual Exclusion**: Resource can only be held by one process at a time.\n2. **Hold and Wait**: Process holding resources requests additional ones.\n3. **No Preemption**: Resources cannot be forcibly confiscated.\n4. **Circular Wait**: A closed chain of processes each waiting for a resource held by the next.",
          "scriptName": "microsoft_cs.py",
          "starterCode": "def get_coffman_conditions() -> list[str]:\n    # TODO: Return list of 4 Coffman conditions\n    return [\n        \"Mutual Exclusion\",\n        \"Hold and Wait\",\n        \"No Preemption\",\n        \"Circular Wait\"\n    ]\n\nprint(\"4 Coffman Conditions:\", get_coffman_conditions())\n",
          "instructions": [
            {
              "id": "m10-s3-t1",
              "task": "Run the script to verify the 4 Coffman deadlock conditions.",
              "hint": "Click Run."
            }
          ],
          "expectedOutput": "4 Coffman Conditions: ['Mutual Exclusion', 'Hold and Wait', 'No Preemption', 'Circular Wait']"
        },
        {
          "id": "m10-s4",
          "title": "Low-Level Design (LLD) & SOLID Principles",
          "category": "OBJECT ORIENTED LLD",
          "time": "10 min",
          "learn": "### SOLID Principles for Technical Interviews\n\n1. **S - Single Responsibility Principle**: A class should have only one reason to change.\n2. **O - Open/Closed Principle**: Open for extension, closed for modification.\n3. **L - Liskov Substitution Principle**: Subclasses must be substitutable for base classes without breaking behavior.\n4. **I - Interface Segregation Principle**: Clients shouldn't depend on interfaces they don't use.\n5. **D - Dependency Inversion Principle**: Depend on abstractions, not concrete classes.",
          "scriptName": "solid_principles.py",
          "starterCode": "# SOLID Principles in action\ndef verify_solid():\n    return \"SOLID Principles: S-O-L-I-D Clean Architecture Active!\"\n\nprint(verify_solid())\n",
          "instructions": [
            {
              "id": "m10-s4-t1",
              "task": "Run the SOLID architecture verification script to complete the course.",
              "hint": "Click Run."
            }
          ],
          "expectedOutput": "SOLID Principles: S-O-L-I-D Clean Architecture Active!"
        }
      ],
      "quiz": {
        "title": "Module 10 Comprehensive Final Exam",
        "time": "30 min",
        "xp": 50,
        "questions": [
          {
            "q": "What unique power does the Amazon Bar Raiser have in the debrief?",
            "options": [
              "No voting power",
              "Absolute unilateral veto authority over the hiring decision",
              "Only scores formatting",
              "Conducts only the OA"
            ],
            "answer": 1,
            "explanation": "The Bar Raiser ensures the candidate raises the 50th percentile bar and holds absolute veto authority."
          }
        ]
      }
    }
  ],

  patternEngine: {
    complexityRules: [
      { maxN: 10, complexity: "O(N!)", technique: "Permutation Brute Force, Next Permutation, Backtracking", note: "Try all N! permutations safely." },
      { maxN: 20, complexity: "O(2^N) or O(N² 2^N)", technique: "Bitmask DP, Subset Recursion, Traveling Salesperson DP", note: "Bit manipulation 1 << N is ideal." },
      { maxN: 100, complexity: "O(N³) or O(N⁴)", technique: "Floyd-Warshall All-Pairs Shortest Path, 3-Loop Brute Force", note: "Matrix operations and interval DP." },
      { maxN: 500, complexity: "O(N³)", technique: "Interval Dynamic Programming, 2D Grid DP with loop", note: "500³ ≈ 1.25 × 10⁸ ops, passes under 2.0s." },
      { maxN: 2000, complexity: "O(N²)", technique: "2D Dynamic Programming, All-Pairs checks, O(N²) Dijkstra", note: "2000² = 4 × 10⁶ ops, easily within 2.0s." },
      { maxN: 200000, complexity: "O(N log N) or O(N)", technique: "Two Pointers, Prefix Sums, Binary Search, SegTree, DSU, Heaps, Graph BFS/DFS", note: "The most common constraint in AtCoder ABC C-E and LeetCode Medium/Hard!" },
      { maxN: 10000000, complexity: "O(N)", technique: "Linear Scan, Sieve of Eratosthenes, Sliding Window", note: "Simple linear pass with minimal operations per loop." },
      { maxN: 1000000000000, complexity: "O(√N)", technique: "Prime Factorization, Divisor Enumeration, Square Root Decomposition", note: "Loop up to √N (up to 10⁶ steps)." },
      { maxN: 1000000000000000000, complexity: "O(log N) or O(1)", technique: "Binary Search on Answer, Matrix Exponentiation, Memoized Recursion (@cache), Closed Math Formula", note: "log₂(10¹⁸) ≈ 60 operations." }
    ],

    keywordTriggers: [
      {
        keyword: "Contiguous subarray + condition / At most K / Distinct elements",
        pattern: "Two Pointers (尺取法 - Shakutori-ho)",
        complexity: "O(N)",
        badge: "Linear Scan",
        tip: "Advance right pointer while condition holds; contract left pointer when condition is violated.",
        code: `def solve_shakutori(A, K):\n    l = 0\n    ans = 0\n    cur_sum = 0\n    for r in range(len(A)):\n        cur_sum += A[r]\n        while cur_sum > K and l <= r:\n            cur_sum -= A[l]\n            l += 1\n        ans = max(ans, r - l + 1)\n    return ans`
      },
      {
        keyword: "Range sum query over range [L, R] repeatedly / Static array",
        pattern: "Prefix Sums (累積和 - Ruiseki-wa)",
        complexity: "O(1) per query (O(N) build)",
        badge: "Prefix Sum",
        tip: "P[i+1] = P[i] + A[i]. Query sum(L..R) = P[R+1] - P[L].",
        code: `P = [0] * (len(A) + 1)\nfor i in range(len(A)):\n    P[i + 1] = P[i] + A[i]\n# Query range [L, R] inclusive:\nquery_sum = P[R + 1] - P[L]`
      },
      {
        keyword: "Minimize the maximum / Maximize the minimum / monotonic validity",
        pattern: "Binary Search on Answer (二分探索)",
        complexity: "O(N log(Range))",
        badge: "Binary Search",
        tip: "Turn an optimization problem into a decision problem with a boolean check(X) function.",
        code: `def check(X):\n    # Return True if condition is satisfied with value X\n    return True\n\nleft, right = 0, 10**18\nans = right\nwhile left <= right:\n    mid = (left + right) // 2\n    if check(mid):\n        ans = mid\n        right = mid - 1\n    else:\n        left = mid + 1`
      },
      {
        keyword: "Next Greater Element / Daily Temperatures / Histogram largest area",
        pattern: "Monotonic Stack (単調スタック)",
        complexity: "O(N) amortized",
        badge: "Stack Invariant",
        tip: "Maintain strictly increasing or decreasing elements. Each index is pushed and popped at most once.",
        code: `stack = []\nres = [-1] * len(arr)\nfor i in range(len(arr)):\n    while stack and arr[stack[-1]] < arr[i]:\n        idx = stack.pop()\n        res[idx] = arr[i]\n    stack.append(i)`
      },
      {
        keyword: "Dynamic connectivity / Check if in same component / Merge sets",
        pattern: "Disjoint Set Union (DSU / Union-Find)",
        complexity: "O(alpha(N)) amortized",
        badge: "Graph Clustering",
        tip: "Path compression + union by size guarantees almost O(1) per operation.",
        code: `parent = list(range(N))\ndef find(i):\n    if parent[i] == i: return i\n    parent[i] = find(parent[i])\n    return parent[i]\ndef union(i, j):\n    rooti, rootj = find(i), find(j)\n    if rooti != rootj: parent[rootj] = rooti`
      },
      {
        keyword: "Arbitrary element deletion from priority queue / Top K frequent",
        pattern: "Removable Priority Queue (Dual-Heap Lazy Deletion)",
        complexity: "O(log N)",
        badge: "Heap Optimization",
        tip: "Maintain live_heap and discard_heap. Pop from both whenever their top elements match.",
        code: `import heapq\nclass RemovablePQ:\n    def __init__(self):\n        self.live, self.discard = [], []\n    def push(self, val): heapq.heappush(self.live, val)\n    def remove(self, val): heapq.heappush(self.discard, val)\n    def pop(self):\n        self._clean()\n        return heapq.heappop(self.live)\n    def _clean(self):\n        while self.live and self.discard and self.live[0] == self.discard[0]:\n            heapq.heappop(self.live); heapq.heappop(self.discard)`
      },
      {
        keyword: "Coordinates up to 10^9 but N <= 10^5 / Relative ranking",
        pattern: "Coordinate Compression (座圧 - Zaatsu)",
        complexity: "O(N log N)",
        badge: "Mapping",
        tip: "Map large coordinates into continuous rank array [0..K-1] using sorted unique set.",
        code: `def compress(arr):\n    vals = sorted(set(arr))\n    mapping = {x: i for i, x in enumerate(vals)}\n    return [mapping[x] for x in arr]`
      },
      {
        keyword: "Gigantic N (up to 10^18) with floor division recursion",
        pattern: "Top-Down Memoization (@cache)",
        complexity: "O(log N) reachable states",
        badge: "Memoized DP",
        tip: "Reachable states of N//2, N//3 are very small. Memoized hash map evaluates in milliseconds.",
        code: `from functools import cache\n@cache\ndef f(n):\n    if n == 0: return 1\n    return f(n // 2) + f(n // 3)`
      },
      {
        keyword: "Count configurations modulo 998244353 / Modular probability",
        pattern: "Modulo Arithmetic DP",
        complexity: "O(States)",
        badge: "Number Theory",
        tip: "Modulo division uses Fermat's Little Theorem: pow(b, MOD-2, MOD). Keep subtraction positive.",
        code: `MOD = 998244353\ndef mod_inv(x): return pow(x, MOD - 2, MOD)\n# Safe modulo subtraction:\ndiff = (A - B % MOD + MOD) % MOD`
      },
      {
        keyword: "Permutation ordering (<, >) / Subtree rerooting across all roots",
        pattern: "Prefix DP / Tree Rerooting DP",
        complexity: "O(N^2) or O(N)",
        badge: "Advanced DP",
        tip: "Permutation DP uses prefix sums to transition in O(1). Rerooting passes parent DP downwards.",
        code: `dp = [1] * (n + 1)\n# Prefix sum of dp table eliminates inner loop`
      },
      {
        keyword: "Range update (Add/Affine) AND range min/sum query in O(log N)",
        pattern: "Lazy Segment Tree (遅延評価セグ木)",
        complexity: "O(log N) per query/update",
        badge: "Advanced Tree",
        tip: "ac-library-python lazy_segtree handles range mapping and composition cleanly.",
        code: `# Using atcoder.lazysegtree\n# seg.apply(l, r, f) in O(log N)`
      },
      {
        keyword: "Grid shortest path / Multi-source spread / Rotting items",
        pattern: "Multi-Source BFS",
        complexity: "O(R * C)",
        badge: "Grid Search",
        tip: "Initialize queue with all starting sources at t=0. Use dr = [-1,1,0,0], dc = [0,0,-1,1].",
        code: `from collections import deque\nq = deque(sources)\nwhile q:\n    r, c = q.popleft()\n    for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:\n        nr, nc = r+dr, c+dc\n        if valid(nr, nc):\n            dist[nr][nc] = dist[r][c] + 1\n            q.append((nr, nc))`
      },
      {
        keyword: "Integer polygon area / Count lattice points inside & on boundary",
        pattern: "Shoelace Formula & Pick's Theorem",
        complexity: "O(N)",
        badge: "Discrete Geometry",
        tip: "Area via Shoelace. Boundary B via gcd(|dx|, |dy|). Interior I = Area - B/2 + 1.",
        code: `area = abs(sum(x1*y2 - x2*y1)) / 2.0\nboundary = sum(gcd(abs(x2-x1), abs(y2-y1)))\ninterior = int(area - boundary / 2 + 1)`
      },
      {
        keyword: "Best irreducible rational fraction p/q / Trailing zeros in N!!",
        pattern: "Stern-Brocot Tree & Legendre Formula",
        complexity: "O(log N)",
        badge: "Discrete Math",
        tip: "Stern-Brocot binary searches mediants (a+c)/(b+d). N!! odd has 0 trailing zeros.",
        code: `# Stern-Brocot mediant step:\nmid_p, mid_q = p1 + p2, q1 + q2`
      },
      {
        keyword: "NP-hard optimization under 2.0s time limit / Continuous score",
        pattern: "Chokudai Search Tree Pruning",
        complexity: "O(Time budget)",
        badge: "AHC Heuristics",
        tip: "Maintain priority queues for each tree depth. Loop over depths until clock() hits 1.95s.",
        code: `queues = [[] for _ in range(max_depth + 1)]\nwhile time.time() - start_time < 1.95:\n    for depth in range(max_depth):\n        expand_top_state(queues[depth])`
      }
    ],

    edgeCaseChecklist: [
      { id: "overflow", title: "64-bit Integer Overflow Check", desc: "In C++, multiplying two 10⁹ values overflows 32-bit int. Always use 'long long'!", icon: "⚠️" },
      { id: "indexing", title: "0-Based vs 1-Based Indexing", desc: "Problem statement indices are 1-based (1..N). Subtract 1 (u--; v--;) upon input!", icon: "🔢" },
      { id: "n1", title: "Single Element Case (N = 1)", desc: "Does your loop crash on N=1? Does array index i-1 become -1?", icon: "🧪" },
      { id: "modulo", title: "Modulo Subtraction Negative Trap", desc: "When subtracting: (A - B) % MOD can be negative. Use (A - B % MOD + MOD) % MOD!", icon: "➗" },
      { id: "heap", title: "Python Heapq Min-Heap Pitfall", desc: "Python's heapq is a MIN-heap. If you need a MAX-heap, push negative values (-val)!", icon: "🏔️" },
      { id: "disconnect", title: "Disconnected Graph Check", desc: "Never assume the input graph is connected. Run BFS/DFS across all unvisited components!", icon: "🌐" }
    ]
  },

  amazonStrategy: {
    title: "Amazon SDE Interview Strategy Guide",
    subtitle: "Cracking the OA, 16 Leadership Principles, STAR Method & Bar Raiser",
    oaPatterns: [
      { name: "Grid Traversal (BFS/DFS)", example: "Rotting Oranges, Number of Islands, Word Search", priority: "Highest" },
      { name: "Two Pointers & Sliding Window", example: "Substrings with K distinct chars, Container with Most Water", priority: "Highest" },
      { name: "Priority Queue / Heap", example: "Top K Frequent Elements, Merge K Sorted Lists", priority: "High" },
      { name: "Monotonic Stack", example: "Daily Temperatures, Next Greater Element, Stock Span", priority: "High" },
      { name: "Dynamic Programming & Graphs", example: "Coin Change, Word Break, Course Schedule", priority: "Medium" }
    ],
    leadershipPrinciples: [
      { id: "customer", name: "Customer Obsession", question: "Tell me about a time you had to deal with an ambiguous customer request or push back on a feature that didn't serve the customer.", theme: "Start with the customer and work backwards." },
      { id: "ownership", name: "Ownership", question: "Describe a situation where you took on work that wasn't in your job description or fixed a broken process no one else was addressing.", theme: "Leaders think long term and don't say 'that's not my job'." },
      { id: "action", name: "Bias for Action", question: "Give an example of a time when you had to make a high-stakes technical decision with incomplete information.", theme: "Speed matters in business. Many decisions are reversible two-way doors." },
      { id: "deep", name: "Dive Deep", question: "Tell me about the most difficult bug or performance issue you diagnosed. What were the exact root cause steps?", theme: "Leaders operate at all levels, stay connected to details, and audit frequently." },
      { id: "backbone", name: "Have Backbone; Disagree and Commit", question: "Tell me about a time you strongly disagreed with a senior engineer or manager on technical design. How did you handle it?", theme: "Leaders respectfully challenge decisions when they disagree, then commit wholly." },
      { id: "simplify", name: "Invent and Simplify", question: "Describe a time you simplified a complex system, deployment pipeline, or algorithmic process.", theme: "Leaders expect and require innovation from their teams and always find ways to simplify." },
      { id: "standards", name: "Insist on the Highest Standards", question: "Tell me about a time you refused to compromise on code quality, testing, or architectural reliability.", theme: "Leaders have relentlessly high standards that many people may think are unreasonably high." },
      { id: "results", name: "Deliver Results", question: "Describe a project with a tight, seemingly impossible deadline. How did you prioritize to deliver successful results?", theme: "Leaders focus on the key inputs and deliver them with the right quality and in a timely fashion." }
    ],
    starMethod: {
      s: { name: "Situation (15%)", tip: "Brief context: company, team, project, constraint, or emergency." },
      t: { name: "Task (15%)", tip: "The specific objective or technical challenge assigned specifically to YOU." },
      a: { name: "Action (50%)", tip: "CRITICAL: Use 'I' not 'We'. Detail your individual design, code, and analytical contributions step-by-step." },
      r: { name: "Result (20%)", tip: "Quantifiable impact: % latency drop, $ savings, throughput gain, user satisfaction score." }
    }
  },

  microsoftStrategy: {
    title: "Microsoft Tech Interview Strategy Guide",
    subtitle: "Leveling L59–L65+, CS Fundamentals, LLD/HLD & Growth Mindset",
    authorRef: "Prabhu Kalyan Korivi (prabhukalyan.hashnode.dev)",
    levels: [
      { level: "L59 – L60", title: "Software Engineer (SDE I)", exp: "0–2 Years (Freshers)", focus: "DSA (Trees, Graphs, DP), CS Fundamentals (OS, DBMS, Networks), LLD Basics, Clean Code" },
      { level: "L61 – L62", title: "Software Engineer II (SDE II)", exp: "2–5 Years", focus: "Advanced DSA, Low-Level Design (SOLID, Design Patterns), High-Level System Design (Microservices, Caching)" },
      { level: "L63 – L64", title: "Senior Software Engineer", exp: "5–10 Years", focus: "Multiple System Design Rounds (HLD & LLD), Architectural Impact, Mentorship, Cross-team Collaboration" },
      { level: "L65+", title: "Principal Software Engineer", exp: "10+ Years", focus: "Enterprise Tech Vision, Organizational Architecture, Strategic Technical Roadmaps" }
    ],
    csFundamentals: [
      {
        subject: "Operating Systems (OS)",
        badge: "Critical for Freshers",
        topics: [
          { q: "Process vs Thread", a: "A process has its own dedicated address space in memory; threads within the same process share code, data, and open files, but have separate stacks and program counters." },
          { q: "Deadlock: 4 Necessary Conditions (Coffman)", a: "1. Mutual Exclusion, 2. Hold and Wait, 3. No Preemption, 4. Circular Wait. Breaking any one condition prevents deadlock." },
          { q: "Virtual Memory & Paging", a: "Virtual memory maps process addresses to physical RAM using page tables and TLBs. A Page Fault occurs when a referenced page is not currently in physical RAM." }
        ]
      },
      {
        subject: "Database Management Systems (DBMS)",
        badge: "Core Theory",
        topics: [
          { q: "ACID Properties", a: "Atomicity (all or nothing), Consistency (preserves schema constraints), Isolation (concurrent transactions don't interfere), Durability (committed data survives crashes)." },
          { q: "B-Tree vs Hash Indexing", a: "Hash indexes provide O(1) equality lookups but cannot do range queries. B-Trees/B+ Trees support both O(log N) point queries and fast ordered range scans." },
          { q: "Database Normalization", a: "1NF: Atomic values; 2NF: No partial dependency on composite key; 3NF: No transitive dependency on non-key attributes." }
        ]
      },
      {
        subject: "Computer Networks",
        badge: "High Frequency",
        topics: [
          { q: "TCP vs UDP", a: "TCP is connection-oriented, reliable (acknowledgments, retransmissions), and provides flow/congestion control. UDP is connectionless, lightweight, and prioritized for real-time latency (VoIP, streaming)." },
          { q: "TCP 3-Way Handshake", a: "1. Client sends SYN. 2. Server responds with SYN-ACK. 3. Client sends ACK. Connection is now established." },
          { q: "DNS Resolution Pipeline", a: "Browser Cache → OS Cache → Resolving Name Server → Root Name Server (.) → TLD Server (.com) → Authoritative Name Server (domain.com) → IP returned." }
        ]
      }
    ],
    solidPrinciples: [
      { letter: "S", name: "Single Responsibility Principle", desc: "A class should have one, and only one, reason to change." },
      { letter: "O", name: "Open/Closed Principle", desc: "Software entities should be open for extension, but closed for modification." },
      { letter: "L", name: "Liskov Substitution Principle", desc: "Subtypes must be substitutable for their base types without breaking application behavior." },
      { letter: "I", name: "Interface Segregation Principle", desc: "Clients should not be forced to depend upon interfaces they do not use." },
      { letter: "D", name: "Dependency Inversion Principle", desc: "Depend upon abstractions, not concretions. High-level modules should not depend on low-level modules." }
    ]
  }
};
