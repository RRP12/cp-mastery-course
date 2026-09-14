# Unit 6: Search & Sorting: Binary Search on Answer & Custom Comparators
> **Skill Path**: Pass the Competitive Programming & Technical Interview with Python & C++  
> **Unit Status**: Logarithmic Search Spaces, Monotonic Predicates & Custom Sort Ordering

---

## 🎯 Unit Overview
In this unit, you will unlock one of the most versatile and elegant problem-solving techniques in competitive programming and technical interviews: **Binary Search on the Answer Space (二分探索)**. You will learn how to turn complex optimization questions into straightforward decision problems, master strict weak ordering for custom sorting comparators in C++ and Python, and utilize the 10 essential C++ templates curated by competitive programming champions.

---

## Lesson 6.1: Binary Search Mechanics & Preventing Infinite Loops

### 1. The Monotonicity Condition
Binary search is not restricted to looking up items in sorted arrays. It applies to **any function $f(X)$ whose output is monotonic**:
$$\text{If } f(X) \text{ is } \text{True}, \text{ then } f(X') \text{ is } \text{True for all } X' \le X \text{ (or } X' \ge X\text{)}.$$

```
Search Space:  [1, 2, 3, 4, 5, 6, 7, 8, 9]
Predicate f(X): T  T  T  T  T  F  F  F  F
                              ▲
                 Boundary X* = 5 (Largest valid answer)
```

### 2. The Midpoint Calculation & Infinite Loop Prevention
A frequent bug in binary search is an infinite loop when `left` and `right` differ by 1 (`right - left == 1`).

#### Invariant Rules:
1. **Lower Midpoint** (`mid = (left + right) // 2`):
   - Use when updating `left = mid + 1` and `right = mid`.
2. **Upper Midpoint** (`mid = (left + right + 1) // 2`):
   - Use when updating `left = mid` and `right = mid - 1` to prevent `mid` from being stuck at `left`.
3. **C++ Midpoint Overflow Prevention**:
   ```cpp
   // ❌ Potential overflow if left + right > 2 * 10^9:
   long long mid = (left + right) / 2;

   // ✅ Safe from overflow:
   long long mid = left + (right - left) / 2;
   ```

---

## Lesson 6.2: Binary Search on the Answer Space

*(Synthesized from [`ABC385D SortedSet二分探索` by `@comet725`](https://qiita.com/comet725/items/4da98180ee1e218aafe1))*

### The Transformational Heuristic
Whenever a problem asks:
- *"What is the **minimum possible maximum**...?"*
- *"What is the **maximum possible minimum**...?"*
- *"Find the largest capacity $C$ such that all jobs finish within $T$ hours..."*

**Flip the problem!** Instead of directly calculating the optimal value, define a boolean validator function:
$$\text{can\_achieve}(X) \longrightarrow \text{True / False}$$
Then binary search across $X \in [\text{low}, \text{high}]$ in $O(\log(\text{Range}))$ iterations!

---

## Lesson 6.3: Custom Comparators & Advanced Sorting

*(Synthesized from [`qsortの比較関数の書き方あれこれ` by `@mikecat_mixc`](https://qiita.com/mikecat_mixc/items/c905dfa57225b253e9bb) and [`カスタムソート ABC308` by `@kikudesuyo`](https://qiita.com/kikudesuyo/items/6527727a80384c9d8a5c))*

### 1. The Strict Weak Ordering Rule in C++
When writing custom comparators for `std::sort` or `std::priority_queue`, the comparator must satisfy **Strict Weak Ordering**:
- Irreflexive: `cmp(a, a)` must return `false`.
- Asymmetric: If `cmp(a, b)` is `true`, `cmp(b, a)` must be `false`.
- Transitive: If `cmp(a, b)` and `cmp(b, c)` are `true`, `cmp(a, c)` must be `true`.

```cpp
// ❌ WRONG (Violates irreflexivity: cmp(a, a) returns true! Causes segmentation fault in std::sort!):
bool badCmp(int a, int b) { return a >= b; }

// ✅ CORRECT:
bool goodCmp(int a, int b) { return a > b; }
```

### 2. Multi-Key Struct Sorting in C++20:
```cpp
struct Candidate {
    int id;
    int solved;
    int penalty;
};

// Sort by:
// 1. Solved problems descending (higher is better)
// 2. Penalty ascending (lower is better)
// 3. ID ascending (tie-breaker)
bool compareCandidates(const Candidate& a, const Candidate& b) {
    if (a.solved != b.solved) return a.solved > b.solved;
    if (a.penalty != b.penalty) return a.penalty < b.penalty;
    return a.id < b.id;
}
```

---

## Lesson 6.4: 10 Essential C++ Competitive Templates

*(Synthesized from [`【競プロC++】個人的に愛用しているテンプレ10選` by `@e6nlaq`](https://qiita.com/e6nlaq/items/649b3ae1e30a9be6be8d))*

```cpp
#include <bits/stdc++.h>
using namespace std;

// 1. 64-bit integer aliases
using ll = long long;
using vll = vector<ll>;
using pll = pair<ll, ll>;

// 2. Loop macros
#define rep(i, n) for (int i = 0; i < (int)(n); i++)
#define rep3(i, m, n) for (int i = (m); i < (int)(n); i++)
#define all(v) (v).begin(), (v).end()

// 3. In-place min/max updates
template <typename T> inline bool chmax(T& a, const T& b) { if (a < b) { a = b; return true; } return false; }
template <typename T> inline bool chmin(T& a, const T& b) { if (a > b) { a = b; return true; } return false; }

// 4. Standard infinity constants
const ll INF = 1e18;
const ll MOD = 998244353;

int main() {
    // 5. Fast I/O
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    return 0;
}
```

---

## 🛠️ Portfolio Project 6: Bandwidth & Resource Allocation Optimizer

### Problem Context
A cloud data center has $M$ identical server instances. There are $N$ compute tasks, where task $i$ requires $W_i$ gigabytes of memory. All tasks assigned to a server must run concurrently without exceeding that server's memory capacity. 

Find the **minimum possible memory capacity $C$** of the servers such that all $N$ tasks can be scheduled onto at most $M$ servers.

### Project Implementation:
```python
"""
Portfolio Project 6: Cloud Server Capacity Optimizer via Binary Search on Answer
ALGOVERSE Course Suite
"""

def optimize_server_capacity(N: int, M: int, task_weights: list[int]) -> int:
    """
    Finds minimum capacity C using Binary Search on Answer.
    Check predicate: can_schedule_with_capacity(C)
    """
    
    def can_schedule(C: int) -> bool:
        servers_used = 1
        current_server_load = 0
        
        for w in task_weights:
            if w > C:
                return False # Single task exceeds capacity C
            
            if current_server_load + w <= C:
                current_server_load += w
            else:
                servers_used += 1
                current_server_load = w
                if servers_used > M:
                    return False

        return True

    # Search space:
    # Lower bound: max weight of a single task
    # Upper bound: sum of all task weights (single server handles everything)
    left = max(task_weights)
    right = sum(task_weights)
    optimal_capacity = right

    while left <= right:
        mid = (left + right) // 2
        if can_schedule(mid):
            optimal_capacity = mid
            right = mid - 1 # Try to find an even smaller valid capacity
        else:
            left = mid + 1  # Capacity too small, increase

    return optimal_capacity


# Interactive Verification:
if __name__ == "__main__":
    tasks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    M_servers = 5
    
    ans = optimize_server_capacity(len(tasks), M_servers, tasks)
    print(f"Tasks: {tasks}")
    print(f"Target Servers: {M_servers}")
    print(f"Minimum Optimal Server Capacity: {ans} GB") # Expected: 15 GB
```

---

## 🎯 Benchmark Problem Walkthrough: LeetCode 875 / Koko Eating Bananas

### Problem Statement
Koko loves to eat bananas. There are `piles` of bananas, the $i$-th pile has `piles[i]` bananas. The guards will return in $h$ hours. Return the minimum integer speed $k$ such that Koko can eat all the bananas within $h$ hours.

### Step-by-Step Binary Search Solution:
```python
import math

def minEatingSpeed(piles: list[int], h: int) -> int:
    def can_finish(k: int) -> bool:
        total_hours = sum(math.ceil(p / k) for p in piles)
        return total_hours <= h

    left = 1
    right = max(piles)
    ans = right

    while left <= right:
        mid = left + (right - left) // 2
        if can_finish(mid):
            ans = mid
            right = mid - 1 # Seek smaller speed
        else:
            left = mid + 1  # Must eat faster

    return ans
```
- **Time Complexity**: $O(N \log(\max(\text{piles})))$.
- **Space Complexity**: $O(1)$.

---

## 📝 Unit 6 Concept Quiz

1. **Question 1**: When does Binary Search on the Answer apply to an optimization problem?
   - (A) Only when the input array is already sorted in memory
   - (B) Whenever the validity condition $f(X)$ is monotonic across the parameter range $X$ *(Correct)*
   - (C) Only when $N \le 100$
   - (D) When searching for floating-point numbers only

2. **Question 2**: In C++, why does using `bool cmp(int a, int b) { return a >= b; }` in `std::sort` cause runtime errors or crashes?
   - (A) It exceeds recursion depth limits
   - (B) It violates the strict weak ordering requirement because `cmp(a, a)` returns `true` instead of `false` *(Correct)*
   - (C) C++ requires lambda functions for sorting
   - (D) The `>=` operator does not work with integer types

3. **Question 3**: In AtCoder Typical 90 Q001 (Yokan Party), what monotonic predicate is evaluated during binary search?
   - (A) Whether the pieces can be sorted alphabetically
   - (B) Whether we can cut the log into at least $K + 1$ pieces such that every piece has length $\ge M$ *(Correct)*
   - (C) Whether $M$ divides the total length $L$ evenly
   - (D) Whether $N$ is prime

---

## 🏆 Unit 6 Completion Checklist
- [ ] Understand upper vs lower midpoint calculation to prevent infinite loops.
- [ ] Master strict weak ordering in custom comparators.
- [ ] Implement and test `optimize_server_capacity` from Portfolio Project 6.
- [ ] Solve **AtCoder Typical 90 Q001** and **LeetCode 875** with 100% test pass.
