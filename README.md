# 🚀 ALGOVERSE: The Ultimate Competitive Programming & FAANG Mastery Course
> **A Comprehensive Skill Path Designed in the Style of Codecademy & Educative**  
> *Master Computer Science Algorithms from Scratch, Climb AtCoder (Gray → Cyan), and Crack Amazon & Microsoft SDE Interviews.*

---

## 🌟 Skill Path Overview

[![Rating](https://img.shields.io/badge/Rating-4.9%20%2F%205.0-brightgreen.svg)](https://atcoder.jp)
[![Learners](https://img.shields.io/badge/Learners-34%2C820%20Enrolled-blue.svg)](https://leetcode.com)
[![Units](https://img.shields.io/badge/Units-10%20Units%20•%2045%20Lessons-purple.svg)](./content/)
[![Projects](https://img.shields.io/badge/Projects-8%20Portfolio%20Projects-orange.svg)](./content/)
[![Quizzes](https://img.shields.io/badge/Quizzes-40%20Concept%20Quizzes-yellow.svg)](./content/)
[![FAANG](https://img.shields.io/badge/FAANG-Amazon%20%26%20Microsoft%20Ready-red.svg)](./content/unit_10_faang_amazon_microsoft_capstone.md)

| Field | Detail |
| :--- | :--- |
| **Skill Level** | Beginner to Advanced (Zero to Hero) |
| **Estimated Duration** | 60 Hours (Self-paced) |
| **Prerequisites** | Basic syntax in Python or C++ (loops, conditionals, functions) |
| **Primary Languages** | Python 3.11+, C++20 (with `atcoder::ac-library`), Swift, and Low-Level C |
| **Source Pedagogy** | Synthesized from **162+ Qiita Advent Calendar Articles (2021–2025)**, **Medium Amazon OA & 16 LPs**, and **Prabhu Kalyan Korivi's Microsoft Guide** |
| **Included Deliverables** | 🛠️ 8 Portfolio Projects • 📝 40 Concept Quizzes • 🏆 Certificate of Completion |

---

## 🎯 About This Skill Path

Once you know basic syntax, the real challenge is passing technical interviews at tier-1 tech giants (like **Amazon** and **Microsoft**) and achieving competitive ratings on platforms like **AtCoder** and **LeetCode**.

This course is built around the **"Piece of Cake" Problem-Solving Engine**: a deterministic framework that maps any problem's input constraints ($N \le 10$ to $N \le 10^{18}$) directly to its required Big-$O$ time complexity and algorithmic patterns, completely removing the guesswork.

```
┌────────────────────────────────────────────────────────────────────────────┐
│                    THE 5-STEP PROBLEM-SOLVING PIPELINE                     │
│                                                                            │
│  [Problem Statement]                                                       │
│          │                                                                 │
│          ▼                                                                 │
│  [Step 1: Constraint Analysis] ➔ Maps N bounds to required Big-O           │
│          │                                                                 │
│          ▼                                                                 │
│  [Step 2: Trigger Decoding]    ➔ Scans trigger keywords for exact pattern  │
│          │                                                                 │
│          ▼                                                                 │
│  [Step 3: Invariant Model]     ➔ Understands mathematical correctness      │
│          │                                                                 │
│          ▼                                                                 │
│  [Step 4: Plug-in Template]    ➔ Uses battle-tested Python / C++ snippets  │
│          │                                                                 │
│          ▼                                                                 │
│  [Step 5: Zero-WA Shield]      ➔ Runs 6 pre-flight checks before submit    │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## 📚 Complete 10-Unit Curriculum Index

Click on any unit below to access its complete, in-depth textbook chapter:

### [Unit 1: Foundations of Algorithmic Thinking & The Big O Engine](./content/unit_01_foundations_and_big_o.md)
- **Lesson 1.1**: Asymptotic Complexity & The Constraint-to-Complexity Map ($N \le 10^{18}$). Proof of $O(\max(N,M)) \equiv O(N+M)$ (*`@NAVYSHUNTA`*).
- **Lesson 1.2**: The Zero-WA Pre-Flight Shield (64-bit integer overflow, 0/1 indexing, modulo subtraction).
- **Lesson 1.3**: Automated CLI Workflows with Docker, `atcoder-cli`, and `oj-tools` (*`@malleroid`*, *`@seigot`*). Stderr debugging (*`@amaguri0408`*).
- **Lesson 1.4**: 25 ABC-A Speed Drills by *`@azubiwa`* (digit sums, XOR rectangle logic `a ^ b ^ c`, math ceilings).
- **🛠️ Project 1**: *Build an Automated Complexity Validator & Edge-Case Scanner in Python*.
- **📝 Quiz 1**: 5 questions on Big-O limits and online judge mechanics.

### [Unit 2: Linear Data Structures & Monotonic Stacks](./content/unit_02_linear_data_structures.md)
- **Lesson 2.1**: Dynamic Array Memory Locality, amortized doubling, and the `list.pop(0)` anti-pattern (*`@tatsukikitamura`*).
- **Lesson 2.2**: Stacks, Linked Lists & Circular Buffer Queues from scratch.
- **Lesson 2.3**: Monotonic Stack Theory & Invariants ($O(N)$ amortized runtime by *`@imoty`*).
- **🛠️ Project 2**: *Real-Time Market Anomaly & Stock Span Detector*.
- **🎯 Benchmark Challenges**: Typical 90 Q076, LeetCode 739 (Daily Temperatures), LeetCode 84 (Histogram Area).
- **📝 Quiz 2**: 5 questions on stack invariants and amortized complexity.

### [Unit 3: Hash Maps, Sets & Two Pointers (尺取法)](./content/unit_03_hash_maps_and_two_pointers.md)
- **Lesson 3.1**: Hash Map Internals, Chaining vs Open Addressing, and Anti-DoS custom hashing in C++.
- **Lesson 3.2**: Low-Level Integer-Key Hash Maps in C (*`@mikecat_mixc`*).
- **Lesson 3.3**: Two Pointers (尺取法 - Shakutori-ho) Monotonic Invariant (*`@comet725` ABC381 D*).
- **Lesson 3.4**: Variable-Length Sliding Windows.
- **🛠️ Project 3**: *Continuous 1122 Substring Pattern Extractor (AtCoder ABC381 D Solver)*.
- **🎯 Benchmark Challenges**: AtCoder ABC381 D, LeetCode 3, LeetCode 76 (Minimum Window Substring).
- **📝 Quiz 3**: 5 questions on hash collisions and pointer invariants.

### [Unit 4: Prefix Sums, Cumulative Probability & Coordinate Compression](./content/unit_04_prefix_sums_and_compression.md)
- **Lesson 4.1**: 1D Prefix Sums: $O(1)$ range queries via $P[R+1] - P[L]$ (*`@comet725` ABC381 E*).
- **Lesson 4.2**: 2D Grid Prefix Sums & Inclusion-Exclusion Submatrix Queries.
- **Lesson 4.3**: Expected Value & Probability Prefix Sums (*`@comet725` ABC154 D Dice in a Line*).
- **Lesson 4.4**: Coordinate Compression: Mapping $10^9$ coordinate spaces down to $O(N)$ (*`@kikudesuyo` ABC213 C*).
- **🛠️ Project 4**: *2D Spatial Heatmap & Compressed Range Query Engine*.
- **🎯 Benchmark Challenges**: ABC154 D, ABC213 C, LeetCode 560 (Subarray Sum Equals K).
- **📝 Quiz 4**: 5 questions on prefix offsets and rank indexing.

### [Unit 5: Nonlinear Structures: Trees, Heaps & Disjoint Set Union (DSU)](./content/unit_05_trees_heaps_and_dsu.md)
- **Lesson 5.1**: Binary Search Trees (BST) & Traversal Invariants (Pre, In, Post, Level-Order).
- **Lesson 5.2**: Binary Heaps & The Python `heapq` Min-Heap Trap (*`@hidehic0`*).
- **Lesson 5.3**: Removable Priority Queue via Dual-Heap Lazy Deletion (*`@saka_pon`*).
- **Lesson 5.4**: Disjoint Set Union (DSU / Union-Find) with Path Compression & Union by Size ($O(\alpha(N))$ by *`@comet725`*).
- **🛠️ Project 5**: *Social Network Clustering & Top-K Leaderboard Engine (AtCoder ABC372 E Solver)*.
- **🎯 Benchmark Challenges**: ABC372 E, ABC297 E, LeetCode 547, LeetCode 295.
- **📝 Quiz 5**: 5 questions on heap indexing and Ackermann complexity.

### [Unit 6: Search & Sorting: Binary Search on Answer & Custom Comparators](./content/unit_06_search_and_sorting.md)
- **Lesson 6.1**: Binary Search Mechanics, lower vs upper midpoints, and infinite loop prevention.
- **Lesson 6.2**: Binary Search on the Answer Space (二分探索): Turning optimization into decision (*`@comet725` ABC385 D*).
- **Lesson 6.3**: Strict Weak Ordering in Custom Comparators (*`@mikecat_mixc` qsort*, *`@kikudesuyo` ABC308*).
- **Lesson 6.4**: 10 Essential C++ Competitive Templates (*`@e6nlaq`*).
- **🛠️ Project 6**: *Cloud Server Capacity & Resource Allocation Optimizer*.
- **🎯 Benchmark Challenges**: Typical 90 Q001 (Yokan Party), ABC385 D, LeetCode 875 (Koko Eating Bananas).
- **📝 Quiz 6**: 5 questions on monotonic predicates and sorting invariants.

### [Unit 7: Graphs, Shortest Paths & Grid Traversals (BFS / DFS / Dijkstra)](./content/unit_07_graphs_and_grid_traversal.md)
- **Lesson 7.1**: Graph Representations: Adjacency Matrices vs Adjacency Lists and memory bounds.
- **Lesson 7.2**: Grid BFS & Multi-Source Traversal (*`@ponzoie` ABC322 D Polyomino*, Amazon OA Patterns).
- **Lesson 7.3**: Depth-First Search, Cycle Detection (3-Color), and Kahn's Topological Sort.
- **Lesson 7.4**: Dijkstra’s Algorithm from scratch with Priority Queue (*`@saka_pon`*).
- **🛠️ Project 7**: *Multi-Source Disaster Spread & Emergency Evacuation Simulator (Rotting Oranges Engine)*.
- **🎯 Benchmark Challenges**: ABC322 D, LeetCode 994 (Rotting Oranges), LeetCode 200 (Number of Islands).
- **📝 Quiz 7**: 5 questions on BFS multi-source queues and Dijkstra non-negative edge constraints.

### [Unit 8: Dynamic Programming Masterclass & Lazy Segment Trees](./content/unit_08_dynamic_programming_masterclass.md)
- **Lesson 8.1**: Top-Down Memoized Recursion (`@cache`) on $N \le 10^{18}$ (*`@comet725` ABC275 D, ABC300 E*).
- **Lesson 8.2**: Modulo Probability DP (`mod 998244353`) and Fermat's Modular Inverse (*`@comet725` ABC275 E*).
- **Lesson 8.3**: Permutation DP with Prefix Sum Optimization on EDPC Task T ($O(N^3) \to O(N^2)$ by *`@mikecat_mixc`*).
- **Lesson 8.4**: Tree Rerooting DP (全方位木DP) in $O(N)$ on EDPC Task V (*`@mikecat_mixc`*).
- **Lesson 8.5**: Lazy Segment Trees (遅延セグ木) Cheat Sheet for $O(\log N)$ range affine/min/sum (*`@manuo`*).
- **🛠️ Project 8**: *Modular Stochastic Game Probability Engine & Segment Tree Library*.
- **🎯 Benchmark Challenges**: ABC275 D, ABC275 E, EDPC T, EDPC V, LeetCode 688, LeetCode 307.
- **📝 Quiz 8**: 5 questions on state formulations and lazy propagation.

### [Unit 9: Mathematical Foundations, Discrete Geometry & Heuristic Search](./content/unit_09_math_and_heuristics.md)
- **Lesson 9.1**: Shoelace Formula & Pick’s Theorem ($A = I + B/2 - 1$) with boundary $\gcd$ counting (*`@tmokmss`*).
- **Lesson 9.2**: Stern-Brocot Tree for Logarithmic Fraction Approximation (*`@okaponta_`*).
- **Lesson 9.3**: Double Factorials ($N!!$) Trailing Zeros via Legendre's Formula (*`@comet725` ABC148 E*).
- **Lesson 9.4**: Heuristic Optimization (AHC) & Chokudai Search Tree Pruning (*`@At-sushi`*, *`@ueta7` AHC016*).
- **🛠️ Project 9**: *Lattice Polygon Solver & Chokudai Heuristic Search Engine*.
- **🎯 Benchmark Challenges**: ABC148 E, AHC016 (Graph Reconstruction).
- **📝 Quiz 9**: 5 questions on Pick's theorem and heuristic search cycles.

### [Unit 10: FAANG Career Capstone: Amazon & Microsoft Hiring Loops](./content/unit_10_faang_amazon_microsoft_capstone.md)
- **Lesson 10.1**: The Amazon Online Assessment (OA) Playbook (70-minute 2-question coding sprint).
- **Lesson 10.2**: The 16 Amazon Leadership Principles & STAR Method Formula ($15\% - 15\% - 50\% - 20\%$).
- **Lesson 10.3**: Defending against the Bar Raiser's Veto Questioning.
- **Lesson 10.4**: Microsoft Role Hierarchy (L59–L65+) based on Prabhu Kalyan Korivi’s guide.
- **Lesson 10.5**: Microsoft CS Fundamentals Crash Course (OS Threads/Deadlocks/Paging, DBMS ACID/B-Trees/Normalization, Networks TCP/UDP/DNS).
- **Lesson 10.6**: Low-Level Design (LLD) & The 5 SOLID Principles with Extensible Strategy Code.
- **Lesson 10.7**: Live Coding 4-Step Protocol & Growth Mindset Hint Responses.
- **🛠️ Capstone Project**: *Full FAANG Mock Interview Simulation & LP Portfolio*.
- **📝 Final Exam**: 40-question comprehensive evaluation.

---

## ⚡ The "Piece of Cake" Pattern Recognition Quick Reference

| Problem Trigger Words in Statement | Underlying Pattern | Target Complexity | Primary Unit |
| :--- | :--- | :--- | :--- |
| *"Contiguous subarray satisfying condition / at most K / distinct elements"* | **Two Pointers (尺取法)** | $O(N)$ | [Unit 3](./content/unit_03_hash_maps_and_two_pointers.md) |
| *"Repeated range sum queries on static array / subarray sum = K"* | **Prefix Sums (累積和)** | $O(1)$ query | [Unit 4](./content/unit_04_prefix_sums_and_compression.md) |
| *"Minimize the maximum / Maximize the minimum / Monotonic predicate"* | **Binary Search on Answer** | $O(N \log(\text{Range}))$ | [Unit 6](./content/unit_06_search_and_sorting.md) |
| *"Next greater element / Daily temperatures / Histogram area"* | **Monotonic Stack** | $O(N)$ | [Unit 2](./content/unit_02_linear_data_structures.md) |
| *"Dynamic connectivity / Check same group / Merge components"* | **Disjoint Set Union (DSU)** | $O(\alpha(N)) \approx O(1)$ | [Unit 5](./content/unit_05_trees_heaps_and_dsu.md) |
| *"Top K frequent / Dynamic deletion of arbitrary non-top items"* | **Removable Priority Queue** | $O(\log N)$ | [Unit 5](./content/unit_05_trees_heaps_and_dsu.md) |
| *"Coordinates up to 10⁹ but N ≤ 10⁵ / Relative rank mapping"* | **Coordinate Compression** | $O(N \log N)$ | [Unit 4](./content/unit_04_prefix_sums_and_compression.md) |
| *"N ≤ 10¹⁸ / f(N) = f(N/2) + f(N/3) / Sparse reachable states"* | **Memoized Recursion (`@cache`)** | $O(\log N)$ | [Unit 8](./content/unit_08_dynamic_programming_masterclass.md) |
| *"Count valid configurations mod 998244353 / Modular probability"* | **Modulo DP** | $O(\text{States})$ | [Unit 8](./content/unit_08_dynamic_programming_masterclass.md) |
| *"Permutations with (<, >) order / Tree answer for all roots in O(N)"* | **Permutation & Rerooting DP** | $O(N^2) \text{ or } O(N)$ | [Unit 8](./content/unit_08_dynamic_programming_masterclass.md) |
| *"Range Add/Affine updates AND range min/sum queries in O(log N)"* | **Lazy Segment Tree** | $O(\log N)$ | [Unit 8](./content/unit_08_dynamic_programming_masterclass.md) |
| *"Grid shortest path / Multi-source spread / Rotting items"* | **Multi-Source BFS** | $O(R \times C)$ | [Unit 7](./content/unit_07_graphs_and_grid_traversal.md) |
| *"Area of integer polygon / Lattice points inside and on boundary"* | **Shoelace + Pick's Theorem** | $O(N)$ | [Unit 9](./content/unit_09_math_and_heuristics.md) |
| *"Closest irreducible fraction p/q / Trailing zeros in N!!"* | **Stern-Brocot & Double Factorial** | $O(\log N)$ | [Unit 9](./content/unit_09_math_and_heuristics.md) |
| *"NP-hard optimization under 2.0s time limit / Continuous score"* | **Chokudai Search Pruning** | Any budget | [Unit 9](./content/unit_09_math_and_heuristics.md) |

---

## 💻 How to Run the Interactive Course Platform Locally

In addition to reading the Markdown textbooks, you can launch the live interactive course web platform:

```bash
# Inside this directory:
python3 -m http.server 3000
```
Open your browser to: **`http://localhost:3000`** to access:
- The **Interactive Complexity Slider** ($N \le 10$ to $N \le 10^{18}$).
- The **Signal-to-Pattern Keyword Decoder** with instant code copy.
- The **25 ABC-A Speed Drill filterable player**.
- The **Amazon Interactive STAR Story Drafter**.
- The **Microsoft CS Fundamentals Flashcard Deck**.

---

## 🏆 Graduation & Certification

Complete all 10 Units, execute all 8 Portfolio Projects, and score $\ge 80\%$ on all Quizzes to earn your **Certified Competitive Programming & FAANG Technical Interview Specialist Credential**!
