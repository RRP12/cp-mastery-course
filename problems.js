/* ═══════════════════════════════════════════════════════════
   CP Sensei — Problem Bank
   Curated ~100 problems organized by pattern & difficulty
   ═══════════════════════════════════════════════════════════ */

const Problems = (() => {
  const DIFFICULTY = { EASY: 'Easy', MEDIUM: 'Medium', HARD: 'Hard' };

  const bank = [
    // ════════════════════════════════════════════════
    // ARRAYS & HASHING
    // ════════════════════════════════════════════════
    {
      id: 'ah-1', title: 'Two Sum', difficulty: DIFFICULTY.EASY,
      pattern: ['arrays', 'hashing'],
      link: 'https://leetcode.com/problems/two-sum/',
      hints: ['Think about what complement you need for each number', 'Can you look up the complement in O(1)?', 'Use a hash map to store numbers you\'ve seen'],
      testCases: [
        { input: '4\n2 7 11 15\n9', output: '0 1' },
        { input: '3\n3 2 4\n6', output: '1 2' },
      ],
    },
    {
      id: 'ah-2', title: 'Contains Duplicate', difficulty: DIFFICULTY.EASY,
      pattern: ['arrays', 'hashing'],
      link: 'https://leetcode.com/problems/contains-duplicate/',
      hints: ['What data structure allows O(1) lookups?', 'A set stores unique elements — compare set size with array size'],
      testCases: [
        { input: '4\n1 2 3 1', output: 'True' },
        { input: '4\n1 2 3 4', output: 'False' },
      ],
    },
    {
      id: 'ah-3', title: 'Valid Anagram', difficulty: DIFFICULTY.EASY,
      pattern: ['arrays', 'hashing'],
      link: 'https://leetcode.com/problems/valid-anagram/',
      hints: ['Count frequency of each character', 'Compare the frequency maps'],
      testCases: [
        { input: 'anagram\nnagaram', output: 'True' },
        { input: 'rat\ncar', output: 'False' },
      ],
    },
    {
      id: 'ah-4', title: 'Group Anagrams', difficulty: DIFFICULTY.MEDIUM,
      pattern: ['arrays', 'hashing'],
      link: 'https://leetcode.com/problems/group-anagrams/',
      hints: ['What do all anagrams have in common when sorted?', 'Use sorted string as a hash key'],
      testCases: [],
    },
    {
      id: 'ah-5', title: 'Top K Frequent Elements', difficulty: DIFFICULTY.MEDIUM,
      pattern: ['arrays', 'hashing'],
      link: 'https://leetcode.com/problems/top-k-frequent-elements/',
      hints: ['Count frequencies first', 'Use a heap or bucket sort'],
      testCases: [],
    },
    {
      id: 'ah-6', title: 'Product of Array Except Self', difficulty: DIFFICULTY.MEDIUM,
      pattern: ['arrays'],
      link: 'https://leetcode.com/problems/product-of-array-except-self/',
      hints: ['Can you use prefix and suffix products?', 'No division allowed — think about left and right passes'],
      testCases: [
        { input: '4\n1 2 3 4', output: '24 12 8 6' },
      ],
    },
    {
      id: 'ah-7', title: 'Longest Consecutive Sequence', difficulty: DIFFICULTY.MEDIUM,
      pattern: ['arrays', 'hashing'],
      link: 'https://leetcode.com/problems/longest-consecutive-sequence/',
      hints: ['Put everything in a set', 'Only start counting from the beginning of a sequence (where num-1 is not in set)'],
      testCases: [],
    },

    // ════════════════════════════════════════════════
    // TWO POINTERS
    // ════════════════════════════════════════════════
    {
      id: 'tp-1', title: 'Valid Palindrome', difficulty: DIFFICULTY.EASY,
      pattern: ['two-pointers'],
      link: 'https://leetcode.com/problems/valid-palindrome/',
      hints: ['Use two pointers from both ends', 'Skip non-alphanumeric characters'],
      testCases: [
        { input: 'A man, a plan, a canal: Panama', output: 'True' },
        { input: 'race a car', output: 'False' },
      ],
    },
    {
      id: 'tp-2', title: 'Two Sum II (Sorted)', difficulty: DIFFICULTY.MEDIUM,
      pattern: ['two-pointers'],
      link: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/',
      hints: ['Array is sorted — use two pointers', 'If sum too small, move left pointer right. If too large, move right pointer left.'],
      testCases: [],
    },
    {
      id: 'tp-3', title: '3Sum', difficulty: DIFFICULTY.MEDIUM,
      pattern: ['two-pointers'],
      link: 'https://leetcode.com/problems/3sum/',
      hints: ['Sort the array first', 'Fix one element, then use two pointers for the remaining pair', 'Skip duplicates'],
      testCases: [],
    },
    {
      id: 'tp-4', title: 'Container With Most Water', difficulty: DIFFICULTY.MEDIUM,
      pattern: ['two-pointers'],
      link: 'https://leetcode.com/problems/container-with-most-water/',
      hints: ['Two pointers at both ends', 'Move the shorter line inward — why does this work?'],
      testCases: [],
    },
    {
      id: 'tp-5', title: 'Trapping Rain Water', difficulty: DIFFICULTY.HARD,
      pattern: ['two-pointers'],
      link: 'https://leetcode.com/problems/trapping-rain-water/',
      hints: ['Water at each position = min(leftMax, rightMax) - height', 'Can you compute this with two pointers?'],
      testCases: [],
    },

    // ════════════════════════════════════════════════
    // SLIDING WINDOW
    // ════════════════════════════════════════════════
    {
      id: 'sw-1', title: 'Best Time to Buy and Sell Stock', difficulty: DIFFICULTY.EASY,
      pattern: ['sliding-window'],
      link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',
      hints: ['Track the minimum price seen so far', 'At each step, compute profit if selling today'],
      testCases: [
        { input: '6\n7 1 5 3 6 4', output: '5' },
      ],
    },
    {
      id: 'sw-2', title: 'Longest Substring Without Repeating Characters', difficulty: DIFFICULTY.MEDIUM,
      pattern: ['sliding-window', 'hashing'],
      link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
      hints: ['Use a set to track characters in current window', 'When you find a duplicate, shrink the window from the left'],
      testCases: [
        { input: 'abcabcbb', output: '3' },
        { input: 'bbbbb', output: '1' },
      ],
    },
    {
      id: 'sw-3', title: 'Minimum Window Substring', difficulty: DIFFICULTY.HARD,
      pattern: ['sliding-window', 'hashing'],
      link: 'https://leetcode.com/problems/minimum-window-substring/',
      hints: ['Expand right to include all chars, then shrink left to minimize', 'Use a frequency map to track matches'],
      testCases: [],
    },
    {
      id: 'sw-4', title: 'Maximum Sum Subarray of Size K', difficulty: DIFFICULTY.EASY,
      pattern: ['sliding-window'],
      link: 'https://practice.geeksforgeeks.org/problems/max-sum-subarray-of-size-k5313/1',
      hints: ['Maintain a window of exactly K elements', 'Slide by adding right, removing left'],
      testCases: [
        { input: '5 3\n1 4 2 10 2', output: '16' },
      ],
    },
    {
      id: 'sw-5', title: 'Longest Repeating Character Replacement', difficulty: DIFFICULTY.MEDIUM,
      pattern: ['sliding-window'],
      link: 'https://leetcode.com/problems/longest-repeating-character-replacement/',
      hints: ['Window is valid when windowSize - maxFreq <= k', 'Track the maximum frequency char in the window'],
      testCases: [],
    },
    {
      id: 'sw-6', title: 'Sliding Window Maximum', difficulty: DIFFICULTY.HARD,
      pattern: ['sliding-window', 'stacks'],
      link: 'https://leetcode.com/problems/sliding-window-maximum/',
      hints: ['Use a deque (monotonic decreasing)', 'Front of deque is always the maximum in current window'],
      testCases: [],
    },

    // ════════════════════════════════════════════════
    // BINARY SEARCH
    // ════════════════════════════════════════════════
    {
      id: 'bs-1', title: 'Binary Search', difficulty: DIFFICULTY.EASY,
      pattern: ['binary-search'],
      link: 'https://leetcode.com/problems/binary-search/',
      hints: ['Classic template: lo, hi, mid', 'Think about what happens at boundaries'],
      testCases: [
        { input: '6\n-1 0 3 5 9 12\n9', output: '4' },
      ],
    },
    {
      id: 'bs-2', title: 'Search in Rotated Sorted Array', difficulty: DIFFICULTY.MEDIUM,
      pattern: ['binary-search'],
      link: 'https://leetcode.com/problems/search-in-rotated-sorted-array/',
      hints: ['One half is always sorted', 'Determine which half target is in, then search that half'],
      testCases: [],
    },
    {
      id: 'bs-3', title: 'Find Minimum in Rotated Sorted Array', difficulty: DIFFICULTY.MEDIUM,
      pattern: ['binary-search'],
      link: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/',
      hints: ['Compare mid with right boundary', 'Minimum is at the rotation point'],
      testCases: [],
    },
    {
      id: 'bs-4', title: 'Koko Eating Bananas', difficulty: DIFFICULTY.MEDIUM,
      pattern: ['binary-search'],
      link: 'https://leetcode.com/problems/koko-eating-bananas/',
      hints: ['Binary search on the answer (eating speed)', 'For each speed, check if Koko can finish in time'],
      testCases: [],
    },
    {
      id: 'bs-5', title: 'Median of Two Sorted Arrays', difficulty: DIFFICULTY.HARD,
      pattern: ['binary-search'],
      link: 'https://leetcode.com/problems/median-of-two-sorted-arrays/',
      hints: ['Binary search on partition point of the smaller array', 'Ensure left partition max ≤ right partition min'],
      testCases: [],
    },
    {
      id: 'bs-6', title: 'Search a 2D Matrix', difficulty: DIFFICULTY.MEDIUM,
      pattern: ['binary-search'],
      link: 'https://leetcode.com/problems/search-a-2d-matrix/',
      hints: ['Treat the 2D matrix as a 1D sorted array', 'Convert 1D index to 2D: row = idx // cols, col = idx % cols'],
      testCases: [],
    },

    // ════════════════════════════════════════════════
    // STACKS & QUEUES
    // ════════════════════════════════════════════════
    {
      id: 'st-1', title: 'Valid Parentheses', difficulty: DIFFICULTY.EASY,
      pattern: ['stacks'],
      link: 'https://leetcode.com/problems/valid-parentheses/',
      hints: ['Push opening brackets, pop on closing', 'Check if popped bracket matches'],
      testCases: [
        { input: '()[]{}', output: 'True' },
        { input: '(]', output: 'False' },
      ],
    },
    {
      id: 'st-2', title: 'Min Stack', difficulty: DIFFICULTY.MEDIUM,
      pattern: ['stacks'],
      link: 'https://leetcode.com/problems/min-stack/',
      hints: ['Store (value, current_min) pairs', 'Or use two stacks — one for values, one for minimums'],
      testCases: [],
    },
    {
      id: 'st-3', title: 'Next Greater Element', difficulty: DIFFICULTY.MEDIUM,
      pattern: ['stacks'],
      link: 'https://leetcode.com/problems/next-greater-element-i/',
      hints: ['Use a monotonic decreasing stack', 'Process from right to left'],
      testCases: [],
    },
    {
      id: 'st-4', title: 'Daily Temperatures', difficulty: DIFFICULTY.MEDIUM,
      pattern: ['stacks'],
      link: 'https://leetcode.com/problems/daily-temperatures/',
      hints: ['Monotonic stack — store indices', 'When you find a warmer day, pop and compute the difference'],
      testCases: [],
    },
    {
      id: 'st-5', title: 'Largest Rectangle in Histogram', difficulty: DIFFICULTY.HARD,
      pattern: ['stacks'],
      link: 'https://leetcode.com/problems/largest-rectangle-in-histogram/',
      hints: ['Use a stack to track increasing heights', 'When a shorter bar is found, calculate area with popped bar as height'],
      testCases: [],
    },

    // ════════════════════════════════════════════════
    // TREES & BFS/DFS
    // ════════════════════════════════════════════════
    {
      id: 'tr-1', title: 'Maximum Depth of Binary Tree', difficulty: DIFFICULTY.EASY,
      pattern: ['trees'],
      link: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/',
      hints: ['Recursive: max(depth(left), depth(right)) + 1', 'Base case: empty node returns 0'],
      testCases: [],
    },
    {
      id: 'tr-2', title: 'Same Tree', difficulty: DIFFICULTY.EASY,
      pattern: ['trees'],
      link: 'https://leetcode.com/problems/same-tree/',
      hints: ['Compare root values, then recursively compare left and right subtrees', 'Both null = same, one null = different'],
      testCases: [],
    },
    {
      id: 'tr-3', title: 'Invert Binary Tree', difficulty: DIFFICULTY.EASY,
      pattern: ['trees'],
      link: 'https://leetcode.com/problems/invert-binary-tree/',
      hints: ['Swap left and right children, then recurse'],
      testCases: [],
    },
    {
      id: 'tr-4', title: 'Binary Tree Level Order Traversal', difficulty: DIFFICULTY.MEDIUM,
      pattern: ['trees'],
      link: 'https://leetcode.com/problems/binary-tree-level-order-traversal/',
      hints: ['Use BFS with a queue', 'Process all nodes at current level before moving to next'],
      testCases: [],
    },
    {
      id: 'tr-5', title: 'Validate Binary Search Tree', difficulty: DIFFICULTY.MEDIUM,
      pattern: ['trees'],
      link: 'https://leetcode.com/problems/validate-binary-search-tree/',
      hints: ['Pass min/max bounds down the recursion', 'Left child must be less than parent, right child must be greater'],
      testCases: [],
    },
    {
      id: 'tr-6', title: 'Lowest Common Ancestor of BST', difficulty: DIFFICULTY.MEDIUM,
      pattern: ['trees'],
      link: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/',
      hints: ['If both values < root, go left. If both > root, go right. Otherwise, root is LCA.'],
      testCases: [],
    },
    {
      id: 'tr-7', title: 'Serialize and Deserialize Binary Tree', difficulty: DIFFICULTY.HARD,
      pattern: ['trees'],
      link: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/',
      hints: ['Use preorder traversal with null markers', 'Use a queue/iterator for deserialization'],
      testCases: [],
    },

    // ════════════════════════════════════════════════
    // GRAPHS
    // ════════════════════════════════════════════════
    {
      id: 'gr-1', title: 'Number of Islands', difficulty: DIFFICULTY.MEDIUM,
      pattern: ['graphs'],
      link: 'https://leetcode.com/problems/number-of-islands/',
      hints: ['DFS/BFS from each unvisited "1"', 'Mark visited cells to avoid counting twice'],
      testCases: [],
    },
    {
      id: 'gr-2', title: 'Clone Graph', difficulty: DIFFICULTY.MEDIUM,
      pattern: ['graphs'],
      link: 'https://leetcode.com/problems/clone-graph/',
      hints: ['Use a hashmap: old node → new node', 'BFS or DFS to traverse and clone'],
      testCases: [],
    },
    {
      id: 'gr-3', title: 'Course Schedule', difficulty: DIFFICULTY.MEDIUM,
      pattern: ['graphs'],
      link: 'https://leetcode.com/problems/course-schedule/',
      hints: ['Topological sort or cycle detection', 'Use DFS with three states: unvisited, visiting, visited'],
      testCases: [],
    },
    {
      id: 'gr-4', title: 'Pacific Atlantic Water Flow', difficulty: DIFFICULTY.MEDIUM,
      pattern: ['graphs'],
      link: 'https://leetcode.com/problems/pacific-atlantic-water-flow/',
      hints: ['DFS/BFS from ocean borders inward', 'Find cells reachable from both oceans'],
      testCases: [],
    },
    {
      id: 'gr-5', title: 'Shortest Path in Binary Matrix', difficulty: DIFFICULTY.MEDIUM,
      pattern: ['graphs'],
      link: 'https://leetcode.com/problems/shortest-path-in-binary-matrix/',
      hints: ['BFS gives shortest path in unweighted graph', '8-directional movement'],
      testCases: [],
    },
    {
      id: 'gr-6', title: 'Network Delay Time', difficulty: DIFFICULTY.MEDIUM,
      pattern: ['graphs'],
      link: 'https://leetcode.com/problems/network-delay-time/',
      hints: ['Dijkstra\'s algorithm', 'Use a priority queue (min-heap)'],
      testCases: [],
    },
    {
      id: 'gr-7', title: 'Redundant Connection', difficulty: DIFFICULTY.MEDIUM,
      pattern: ['graphs'],
      link: 'https://leetcode.com/problems/redundant-connection/',
      hints: ['Union-Find (Disjoint Set Union)', 'The edge that creates a cycle is redundant'],
      testCases: [],
    },

    // ════════════════════════════════════════════════
    // DYNAMIC PROGRAMMING
    // ════════════════════════════════════════════════
    {
      id: 'dp-1', title: 'Climbing Stairs', difficulty: DIFFICULTY.EASY,
      pattern: ['dp'],
      link: 'https://leetcode.com/problems/climbing-stairs/',
      hints: ['dp[i] = dp[i-1] + dp[i-2]', 'Same recurrence as Fibonacci!'],
      testCases: [
        { input: '5', output: '8' },
        { input: '3', output: '3' },
      ],
    },
    {
      id: 'dp-2', title: 'House Robber', difficulty: DIFFICULTY.MEDIUM,
      pattern: ['dp'],
      link: 'https://leetcode.com/problems/house-robber/',
      hints: ['At each house: rob it + dp[i-2], or skip it = dp[i-1]', 'dp[i] = max(dp[i-1], dp[i-2] + nums[i])'],
      testCases: [
        { input: '4\n1 2 3 1', output: '4' },
      ],
    },
    {
      id: 'dp-3', title: 'Longest Increasing Subsequence', difficulty: DIFFICULTY.MEDIUM,
      pattern: ['dp', 'binary-search'],
      link: 'https://leetcode.com/problems/longest-increasing-subsequence/',
      hints: ['O(n²): dp[i] = max LIS ending at i', 'O(n log n): patience sorting with binary search'],
      testCases: [
        { input: '8\n10 9 2 5 3 7 101 18', output: '4' },
      ],
    },
    {
      id: 'dp-4', title: 'Coin Change', difficulty: DIFFICULTY.MEDIUM,
      pattern: ['dp'],
      link: 'https://leetcode.com/problems/coin-change/',
      hints: ['dp[amount] = min coins to make that amount', 'For each coin, dp[i] = min(dp[i], dp[i-coin] + 1)'],
      testCases: [
        { input: '3\n1 2 5\n11', output: '3' },
      ],
    },
    {
      id: 'dp-5', title: 'Longest Common Subsequence', difficulty: DIFFICULTY.MEDIUM,
      pattern: ['dp'],
      link: 'https://leetcode.com/problems/longest-common-subsequence/',
      hints: ['2D DP: dp[i][j] = LCS of text1[:i] and text2[:j]', 'If chars match: dp[i][j] = dp[i-1][j-1] + 1'],
      testCases: [],
    },
    {
      id: 'dp-6', title: '0/1 Knapsack', difficulty: DIFFICULTY.MEDIUM,
      pattern: ['dp'],
      link: 'https://practice.geeksforgeeks.org/problems/0-1-knapsack-problem0945/1',
      hints: ['dp[i][w] = max value using first i items with capacity w', 'Take or skip each item'],
      testCases: [],
    },
    {
      id: 'dp-7', title: 'Edit Distance', difficulty: DIFFICULTY.HARD,
      pattern: ['dp'],
      link: 'https://leetcode.com/problems/edit-distance/',
      hints: ['2D DP: dp[i][j] = min ops to convert word1[:i] to word2[:j]', 'Three operations: insert, delete, replace'],
      testCases: [],
    },
    {
      id: 'dp-8', title: 'Partition Equal Subset Sum', difficulty: DIFFICULTY.MEDIUM,
      pattern: ['dp'],
      link: 'https://leetcode.com/problems/partition-equal-subset-sum/',
      hints: ['Can you find a subset that sums to total/2?', 'This is a 0/1 knapsack variant'],
      testCases: [],
    },
    {
      id: 'dp-9', title: 'Unique Paths', difficulty: DIFFICULTY.MEDIUM,
      pattern: ['dp'],
      link: 'https://leetcode.com/problems/unique-paths/',
      hints: ['dp[i][j] = dp[i-1][j] + dp[i][j-1]', 'Can also be solved with combinatorics: C(m+n-2, m-1)'],
      testCases: [
        { input: '3 7', output: '28' },
      ],
    },
    {
      id: 'dp-10', title: 'Maximum Subarray (Kadane)', difficulty: DIFFICULTY.MEDIUM,
      pattern: ['dp'],
      link: 'https://leetcode.com/problems/maximum-subarray/',
      hints: ['Kadane: current = max(nums[i], current + nums[i])', 'Track global maximum'],
      testCases: [
        { input: '9\n-2 1 -3 4 -1 2 1 -5 4', output: '6' },
      ],
    },

    // ════════════════════════════════════════════════
    // GREEDY
    // ════════════════════════════════════════════════
    {
      id: 'ge-1', title: 'Jump Game', difficulty: DIFFICULTY.MEDIUM,
      pattern: ['greedy'],
      link: 'https://leetcode.com/problems/jump-game/',
      hints: ['Track the farthest position you can reach', 'If current index > farthest, return False'],
      testCases: [],
    },
    {
      id: 'ge-2', title: 'Jump Game II', difficulty: DIFFICULTY.MEDIUM,
      pattern: ['greedy'],
      link: 'https://leetcode.com/problems/jump-game-ii/',
      hints: ['BFS-like: track current reach and farthest reach', 'Increment jumps when you exhaust current reach'],
      testCases: [],
    },
    {
      id: 'ge-3', title: 'Gas Station', difficulty: DIFFICULTY.MEDIUM,
      pattern: ['greedy'],
      link: 'https://leetcode.com/problems/gas-station/',
      hints: ['If total gas >= total cost, solution exists', 'Start from the station after the one where running sum went negative'],
      testCases: [],
    },
    {
      id: 'ge-4', title: 'Activity Selection', difficulty: DIFFICULTY.EASY,
      pattern: ['greedy'],
      link: 'https://practice.geeksforgeeks.org/problems/activity-selection-1587115620/1',
      hints: ['Sort by end time', 'Greedily pick the earliest ending activity'],
      testCases: [],
    },
    {
      id: 'ge-5', title: 'Merge Intervals', difficulty: DIFFICULTY.MEDIUM,
      pattern: ['greedy'],
      link: 'https://leetcode.com/problems/merge-intervals/',
      hints: ['Sort by start time', 'Merge overlapping intervals'],
      testCases: [],
    },

    // ════════════════════════════════════════════════
    // MATH & NUMBER THEORY
    // ════════════════════════════════════════════════
    {
      id: 'ma-1', title: 'Count Primes (Sieve)', difficulty: DIFFICULTY.MEDIUM,
      pattern: ['math'],
      link: 'https://leetcode.com/problems/count-primes/',
      hints: ['Sieve of Eratosthenes', 'Mark all multiples of each prime as composite'],
      testCases: [
        { input: '10', output: '4' },
      ],
    },
    {
      id: 'ma-2', title: 'Pow(x, n)', difficulty: DIFFICULTY.MEDIUM,
      pattern: ['math'],
      link: 'https://leetcode.com/problems/powx-n/',
      hints: ['Binary exponentiation: x^n = (x^(n/2))^2', 'Handle negative exponents'],
      testCases: [],
    },
    {
      id: 'ma-3', title: 'GCD & LCM', difficulty: DIFFICULTY.EASY,
      pattern: ['math'],
      link: 'https://practice.geeksforgeeks.org/problems/lcm-and-gcd4516/1',
      hints: ['Euclidean algorithm for GCD', 'LCM(a,b) = a*b / GCD(a,b)'],
      testCases: [],
    },
    {
      id: 'ma-4', title: 'Modular Exponentiation', difficulty: DIFFICULTY.MEDIUM,
      pattern: ['math'],
      link: 'https://practice.geeksforgeeks.org/problems/modular-exponentiation-for-large-numbers5537/1',
      hints: ['Same as fast power but take mod at each step', 'Used extensively in CP for large number computations'],
      testCases: [],
    },

    // ════════════════════════════════════════════════
    // STRING ALGORITHMS
    // ════════════════════════════════════════════════
    {
      id: 'str-1', title: 'Longest Palindromic Substring', difficulty: DIFFICULTY.MEDIUM,
      pattern: ['strings'],
      link: 'https://leetcode.com/problems/longest-palindromic-substring/',
      hints: ['Expand around center for each position', 'Check both odd and even length palindromes'],
      testCases: [],
    },
    {
      id: 'str-2', title: 'Longest Common Prefix', difficulty: DIFFICULTY.EASY,
      pattern: ['strings'],
      link: 'https://leetcode.com/problems/longest-common-prefix/',
      hints: ['Compare character by character across all strings', 'Stop when characters differ or a string ends'],
      testCases: [],
    },
    {
      id: 'str-3', title: 'String to Integer (atoi)', difficulty: DIFFICULTY.MEDIUM,
      pattern: ['strings'],
      link: 'https://leetcode.com/problems/string-to-integer-atoi/',
      hints: ['Handle whitespace, sign, overflow', 'Process character by character'],
      testCases: [],
    },

    // ════════════════════════════════════════════════
    // SEGMENT TREES & BIT
    // ════════════════════════════════════════════════
    {
      id: 'seg-1', title: 'Range Sum Query (BIT)', difficulty: DIFFICULTY.MEDIUM,
      pattern: ['segment-tree'],
      link: 'https://leetcode.com/problems/range-sum-query-mutable/',
      hints: ['Binary Indexed Tree (Fenwick Tree)', 'Update and query in O(log n)'],
      testCases: [],
    },
    {
      id: 'seg-2', title: 'Range Minimum Query', difficulty: DIFFICULTY.MEDIUM,
      pattern: ['segment-tree'],
      link: 'https://practice.geeksforgeeks.org/problems/range-minimum-query/1',
      hints: ['Build segment tree or sparse table', 'Segment tree: build O(n), query O(log n)'],
      testCases: [],
    },
    {
      id: 'seg-3', title: 'Count of Smaller Numbers After Self', difficulty: DIFFICULTY.HARD,
      pattern: ['segment-tree'],
      link: 'https://leetcode.com/problems/count-of-smaller-numbers-after-self/',
      hints: ['Process from right to left', 'Use BIT or merge sort to count inversions'],
      testCases: [],
    },

    // ════════════════════════════════════════════════
    // ATCODER PROBLEMS (from Qiita research)
    // ════════════════════════════════════════════════
    {
      id: 'ac-1', title: 'ABC275 D - Yet Another Recursive Function', difficulty: DIFFICULTY.MEDIUM,
      pattern: ['dp'],
      link: 'https://atcoder.jp/contests/abc275/tasks/abc275_d',
      hints: ['Memoization — many overlapping subproblems', 'Use a dictionary instead of array (values can be very large)'],
      testCases: [
        { input: '2', output: '3' },
      ],
    },
    {
      id: 'ac-2', title: 'ABC372 E - Union-Find Ranking', difficulty: DIFFICULTY.MEDIUM,
      pattern: ['graphs'],
      link: 'https://atcoder.jp/contests/abc372/tasks/abc372_e',
      hints: ['Union-Find with ranking', 'Track top-k elements in each component'],
      testCases: [],
    },
    {
      id: 'ac-3', title: 'EDPC A - Frog 1', difficulty: DIFFICULTY.EASY,
      pattern: ['dp'],
      link: 'https://atcoder.jp/contests/dp/tasks/dp_a',
      hints: ['dp[i] = min cost to reach stone i', 'dp[i] = min(dp[i-1] + |h[i]-h[i-1]|, dp[i-2] + |h[i]-h[i-2]|)'],
      testCases: [],
    },
    {
      id: 'ac-4', title: 'EDPC B - Frog 2', difficulty: DIFFICULTY.EASY,
      pattern: ['dp'],
      link: 'https://atcoder.jp/contests/dp/tasks/dp_b',
      hints: ['Extension of Frog 1 — can jump up to K stones', 'dp[i] = min over last K stones'],
      testCases: [],
    },
    {
      id: 'ac-5', title: 'EDPC E - Knapsack 2', difficulty: DIFFICULTY.MEDIUM,
      pattern: ['dp'],
      link: 'https://atcoder.jp/contests/dp/tasks/dp_e',
      hints: ['When capacity is large but total value is small', 'DP on value instead of weight'],
      testCases: [],
    },
  ];

  // ── Query functions ───────────────────────────────────
  function getByPattern(pattern) {
    return bank.filter(p => p.pattern.includes(pattern));
  }

  function getByDifficulty(difficulty) {
    return bank.filter(p => p.difficulty === difficulty);
  }

  function getById(id) {
    return bank.find(p => p.id === id);
  }

  function getRandom(options = {}) {
    let filtered = [...bank];
    if (options.pattern) filtered = filtered.filter(p => p.pattern.includes(options.pattern));
    if (options.difficulty) filtered = filtered.filter(p => p.difficulty === options.difficulty);
    if (options.exclude) filtered = filtered.filter(p => !options.exclude.includes(p.id));
    if (filtered.length === 0) return null;
    return filtered[Math.floor(Math.random() * filtered.length)];
  }

  function getPatterns() {
    return ['arrays', 'hashing', 'two-pointers', 'sliding-window', 'binary-search',
            'stacks', 'trees', 'graphs', 'dp', 'greedy', 'math', 'strings', 'segment-tree'];
  }

  function getAll() {
    return [...bank];
  }

  function getStats() {
    const stats = {};
    getPatterns().forEach(p => {
      stats[p] = {
        total: getByPattern(p).length,
        easy: getByPattern(p).filter(x => x.difficulty === DIFFICULTY.EASY).length,
        medium: getByPattern(p).filter(x => x.difficulty === DIFFICULTY.MEDIUM).length,
        hard: getByPattern(p).filter(x => x.difficulty === DIFFICULTY.HARD).length,
      };
    });
    return stats;
  }

  return { getByPattern, getByDifficulty, getById, getRandom, getPatterns, getAll, getStats, DIFFICULTY };
})();
