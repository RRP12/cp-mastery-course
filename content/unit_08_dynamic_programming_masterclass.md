# Unit 8: Dynamic Programming Masterclass & Lazy Segment Trees
> **Skill Path**: Pass the Competitive Programming & Technical Interview with Python & C++  
> **Unit Status**: Advanced State Modeling, Modular Inverses & Range Trees

---

## 🎯 Unit Overview
Dynamic Programming (DP) and Lazy Segment Trees are the hallmark topics separating intermediate contestants (Green, 800–1200) from advanced masters (Cyan, 1200–1600+). In this unit, you will eliminate the fear of DP by mastering top-down memoization on massive constraints ($N \le 10^{18}$), exact probability modeling modulo $998244353$, prefix-sum accelerated Permutation DP, and tree rerooting in $O(N)$. You will also implement a **Lazy Segment Tree** supporting range updates and queries in $O(\log N)$.

---

## Lesson 8.1: Memoized Recursion for Massive Bounds ($N \le 10^{18}$)

*(Synthesized from [`ABC275D, ABC300E メモ化再帰` by `@comet725`](https://qiita.com/comet725/items/151a2fd4e83808d59983))*

### 1. Why Bottom-Up Table DP Fails on Large $N$
Consider AtCoder ABC275 D:
$$f(0) = 1$$
$$f(n) = f(\lfloor n/2 \rfloor) + f(\lfloor n/3 \rfloor) \quad \text{for } n \ge 1$$
Given $N \le 10^{18}$, allocating an array `dp = [0] * (10**18 + 1)` is physically impossible (requires $8 \times 10^9 \text{ GB}$ of RAM!).

### 2. The Reachable State Space Insight
Although $N \le 10^{18}$, the only subproblems evaluated are values of the form:
$$\left\lfloor \frac{N}{2^a 3^b} \right\rfloor$$
The number of distinct pairs $(a, b)$ where $2^a 3^b \le 10^{18}$ is fewer than **60,000 distinct states**! 

Using top-down recursion with hash table memoization (`@functools.cache` in Python), the algorithm visits only reachable states, computing the answer in **$0.02$ seconds**:

```python
from functools import cache

@cache
def f(n: int) -> int:
    if n == 0:
        return 1
    return f(n // 2) + f(n // 3)

N = int(input())
print(f(N)) # Evaluates N = 10^18 instantly!
```

---

## Lesson 8.2: Modulo Probability DP (`mod 998244353`)

*(Synthesized from [`ABC275E DP mod998244353` by `@comet725`](https://qiita.com/comet725/items/0d33ec8fed897f37b9f7))*

### 1. Modular Multiplicative Inverses via Fermat’s Little Theorem
In AtCoder and Codeforces, probabilities are requested as:
$$P \times Q^{-1} \pmod M \quad \text{where } M = 998244353 \text{ (a prime)}$$

By Fermat's Little Theorem, if $\gcd(Q, M) = 1$:
$$Q^{M-1} \equiv 1 \pmod M \implies Q^{-1} \equiv Q^{M-2} \pmod M$$
Division by $Q$ modulo $M$ is computed via binary exponentiation `pow(Q, M - 2, M)` in $O(\log M)$ time!

### 2. Game Transition with Bounce-Back Logic (ABC275 E)
In a board game of length $N$, rolling a die from $1 \dots M$: if moving from position `pos` with roll `die` exceeds $N$, the player bounces back:
```python
nxt = pos + die
if nxt > N:
    nxt = N - (nxt - N) # Bounce backward
```

#### Complete AtCoder ABC275 E Solution:
```python
def solve_sugoroku_4():
    MOD = 998244353
    N, M, K = map(int, input().split())

    # dp[step][pos]
    dp = [0] * (N + 1)
    dp[0] = 1

    invM = pow(M, MOD - 2, MOD) # 1 / M mod 998244353
    ans = 0

    for step in range(K):
        next_dp = [0] * (N + 1)
        for pos in range(N): # Goal state pos == N doesn't roll again
            if dp[pos] == 0: continue
            for die in range(1, M + 1):
                nxt = pos + die
                if nxt > N:
                    nxt = N - (nxt - N)
                next_dp[nxt] = (next_dp[nxt] + dp[pos] * invM) % MOD
                
        dp = next_dp
        ans = (ans + dp[N]) % MOD
        dp[N] = 0 # Reached goal, no further moves from N

    print(ans)
```

---

## Lesson 8.3: Permutation DP & Prefix Sum Transitions (EDPC T)

*(Synthesized from [`EDPC T Permutationを解いたよ` by `@mikecat_mixc`](https://qiita.com/mikecat_mixc/items/041d490e32a4808e11be))*

### 1. Problem Statement
Count permutations $(P_1, \dots, P_N)$ of $(1, \dots, N)$ satisfying given comparison constraints $s_i \in \{ '<', '>' \}$ between $P_i$ and $P_{i+1}$.

### 2. The Insertion Formulation
- Define `dp[i][j]`: Number of valid permutations of length $i$ such that the $i$-th element has relative rank $j$ among the first $i$ elements ($1 \le j \le i$).
- Naive transition:
  - If $s_{i-1} == '<'$: $dp[i][j] = \sum_{k=1}^{j-1} dp[i-1][k]$
  - If $s_{i-1} == '>'$: $dp[i][j] = \sum_{k=j}^{i-1} dp[i-1][k]$
- Since the transition sums over a contiguous range of indices $k$, **using Prefix Sums reduces the transition from $O(N)$ to $O(1)$**, collapsing the entire complexity from $O(N^3)$ to $O(N^2)$!

```python
def solve_edpc_t(N: int, S: str) -> int:
    MOD = 10**9 + 7
    dp = [1] # Base case: length 1 permutation (only 1 relative rank)

    for i in range(1, N):
        # Build prefix sums of previous dp row
        pref = [0] * (len(dp) + 1)
        for k in range(len(dp)):
            pref[k + 1] = (pref[k] + dp[k]) % MOD

        next_dp = [0] * (i + 1)
        is_less = (S[i - 1] == '<')

        for j in range(i + 1):
            if is_less:
                # Sum of dp[i-1][0 .. j-1]
                next_dp[j] = pref[j]
            else:
                # Sum of dp[i-1][j .. i-1]
                next_dp[j] = (pref[i] - pref[j] + MOD) % MOD

        dp = next_dp

    return sum(dp) % MOD
```

---

## Lesson 8.4: Tree Rerooting (全方位木DP) in $O(N)$ (EDPC V)

*(Synthesized from [`EDPC V Subtreeを解いたよ` by `@mikecat_mixc`](https://qiita.com/mikecat_mixc/items/5d962a8b68d458c830d5))*

### The Goal
For a tree of $N$ vertices, compute a tree DP answer $ans[u]$ for **every single vertex $u \in [1, N]$ as if $u$ were the root of the tree**, without rerunning $O(N)$ tree DP $N$ times (which would cause $O(N^2)$ TLE!).

### The Rerooting Invariant:
1. **Pass 1 (Bottom-Up Tree DP)**: Root the tree arbitrarily at vertex 1. Compute subtree contributions $dp[u]$ for all children.
2. **Pass 2 (Top-Down Rerooting)**: For each node $u$, construct **prefix products** and **suffix products** of its child subtree values. This allows computing the contribution of "everything outside child $v$'s subtree" in $O(1)$ time, computing all $N$ roots in strictly $O(N)$ total time!

---

## Lesson 8.5: Lazy Segment Trees (遅延セグメントツリー)

*(Synthesized from [`遅延セグ木チートシートPython` by `@manuo`](https://qiita.com/manuo/items/791468676326dd99aa2c))*

A **Lazy Segment Tree** maintains an array of $N$ items and supports:
1. **Range Updates** on $[L, R)$ in $O(\log N)$ time.
2. **Range Queries** on $[L, R)$ in $O(\log N)$ time.

### The Monoid Algebraic Specification:
- `op(x, y)`: Combines two data elements (e.g., `min(x, y)` or `x + y`).
- `e`: Identity data element (`float('inf')` for min, `0` for sum).
- `mapping(f, x)`: Applies lazy update $f$ onto data element $x$.
- `composition(f, g)`: Combines two lazy updates $f \circ g$.
- `id_`: Identity lazy update (`0` for add, `None` for assign).

```python
from atcoder.lazysegtree import LazySegTree

# Specification: Range Add + Range Min Query
op = min
e = float('inf')
mapping = lambda f, x: f + x
composition = lambda f, g: f + g
id_ = 0

arr = [3, 1, 4, 1, 5, 9]
seg = LazySegTree(op, e, mapping, composition, id_, arr)

# Add 10 to range [1, 4)
seg.apply(1, 4, 10) # Array becomes [3, 11, 14, 11, 5, 9]

# Query minimum in range [0, 5)
print(seg.prod(0, 5)) # Outputs: 3 in O(log N)!
```

---

## 🛠️ Portfolio Project 8: Modular Game Probability Engine & SegTree Library

### Project Implementation:
```python
"""
Portfolio Project 8: Modular DP & Stochastic Game Probability Engine
ALGOVERSE Course Suite
"""

class ModularStochasticGame:
    def __init__(self, target_score: int, max_die_roll: int, mod: int = 998244353):
        self.N = target_score
        self.M = max_die_roll
        self.MOD = mod
        self.invM = pow(max_die_roll, mod - 2, mod)

    def compute_exact_win_probability(self, max_turns: int) -> int:
        """
        Computes the exact winning probability of reaching target N
        within max_turns modulo 998244353 with bounce-back logic.
        """
        dp = [0] * (self.N + 1)
        dp[0] = 1 # Start at score 0
        total_win_prob = 0

        for _ in range(max_turns):
            nxt_dp = [0] * (self.N + 1)
            for pos in range(self.N):
                if dp[pos] == 0: continue
                for roll in range(1, self.M + 1):
                    dest = pos + roll
                    if dest > self.N:
                        dest = self.N - (dest - self.N)
                    nxt_dp[dest] = (nxt_dp[dest] + dp[pos] * self.invM) % self.MOD

            dp = nxt_dp
            total_win_prob = (total_win_prob + dp[self.N]) % self.MOD
            dp[self.N] = 0 # Terminal state

        return total_win_prob


if __name__ == "__main__":
    game = ModularStochasticGame(target_score=5, max_die_roll=3)
    p_mod = game.compute_exact_win_probability(max_turns=4)
    print(f"Winning Probability (mod 998244353): {p_mod}")
```

---

## 📝 Unit 8 Concept Quiz

1. **Question 1**: Why is top-down memoized recursion (`@functools.cache`) able to solve problems with $N = 10^{18}$ (such as AtCoder ABC275 D) where bottom-up DP tables fail?
   - (A) Top-down recursion skips all odd numbers
   - (B) Top-down memoization explores only the reachable states $\lfloor N / (2^a 3^b) \rfloor$, which is $< 10^5$ distinct subproblems, without allocating an array of size $10^{18}$ *(Correct)*
   - (C) Python `@cache` automatically compresses arrays using gzip
   - (D) Top-down recursion operates in $O(1)$ time

2. **Question 2**: In modular arithmetic modulo prime $P = 998244353$, how is division by $X$ ($X \not\equiv 0$) calculated?
   - (A) `X // P`
   - (B) `X ** (P - 2)` using standard float division
   - (C) `pow(X, P - 2, P)` based on Fermat's Little Theorem *(Correct)*
   - (D) Inverting the bits of $X$

3. **Question 3**: What is the asymptotic time complexity of range updates and range queries in a Lazy Segment Tree of size $N$?
   - (A) $O(N)$
   - (B) $O(\log N)$ for both update and query *(Correct)*
   - (C) $O(1)$ update, $O(N)$ query
   - (D) $O(\sqrt{N})$

---

## 🏆 Unit 8 Completion Checklist
- [ ] Understand top-down memoization state reduction for $N \le 10^{18}$.
- [ ] Master modular multiplicative inverse calculations with `pow(X, MOD - 2, MOD)`.
- [ ] Implement and verify `ModularStochasticGame` from Portfolio Project 8.
- [ ] Solve **AtCoder ABC275 D**, **ABC275 E**, and **EDPC Task T**.
