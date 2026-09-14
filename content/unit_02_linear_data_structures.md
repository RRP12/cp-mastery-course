# Unit 2: Linear Data Structures & Monotonic Stacks
> **Skill Path**: Pass the Competitive Programming & Technical Interview with Python & C++  
> **Unit Status**: Core Abstract Data Types & Linear Optimization

---

## 🎯 Unit Overview
In this unit, you will dive into the foundational linear abstract data types (ADTs) that form the building blocks of real-world software and competitive programming algorithms. You will explore memory allocation mechanics, implement dynamic arrays, deques, and linked lists from scratch, and master the **Monotonic Stack** — an essential algorithmic technique that solves range lookups in amortized $O(N)$ time.

---

## Lesson 2.1: Dynamic Arrays & Container Internals

### 1. Memory Representation & Cache Locality
A standard array is a contiguous block of physical memory. In languages like C++, memory addresses for an array `int arr[N]` are allocated sequentially:
$$\text{Address}(\text{arr}[i]) = \text{BaseAddress} + i \times \text{sizeof}(\text{element})$$
This guarantees **$O(1)$ constant-time random access** and optimal **CPU L1/L2 cache locality**.

In Python, a `list` is actually an array of pointers to Python objects (`PyObject*`). While access `arr[i]` is still $O(1)$, dereferencing pointers introduces a small overhead compared to raw C++ arrays.

### 2. Amortized Resizing Analysis
When a dynamic array (like Python's `list` or C++ `std::vector`) runs out of allocated capacity, it:
1. Allocates a new contiguous block with a **growth factor** (typically $1.5\times$ or $2\times$ previous capacity).
2. Copies all $N$ existing elements into the new block ($O(N)$ work).
3. Deallocates the old memory block.

```mermaid
flowchart LR
    Array["Size: 4 / Cap: 4<br>[1, 2, 3, 4]"] -->|Push 5 (Overflow)| Resize["Allocates Cap: 8<br>Copies 4 items O(N)"]
    Resize --> Result["Size: 5 / Cap: 8<br>[1, 2, 3, 4, 5, _, _, _]"]
```

#### Why `append()` is Amortized $O(1)$:
If capacity doubles at sizes $1, 2, 4, 8, \dots, 2^k$, the total copy cost to insert $N = 2^k$ elements is:
$$1 + 2 + 4 + 8 + \dots + \frac{N}{2} = N - 1$$
Dividing the total copy operations by $N$ insertions gives:
$$\frac{N - 1}{N} < 1 \text{ copy operation per append}$$
Thus, appending to a dynamic array is **$O(1)$ amortized**.

### 3. The `list.pop(0)` Anti-Pattern
*(Synthesized from [`List, Set, Dict, Tupleの違い` by `@tatsukikitamura`](https://qiita.com/tatsukikitamura/items/fa96bdaf0b8c7595fb19))*

```python
# ❌ ANTI-PATTERN: pop(0) shifts all remaining N-1 elements left!
q = [1, 2, 3, 4, 5]
val = q.pop(0) # O(N) operation! Doing this in a loop causes O(N^2) TLE!

# ✅ CORRECT: Use collections.deque for O(1) double-ended operations
from collections import deque
q = deque([1, 2, 3, 4, 5])
val = q.popleft() # Strictly O(1)!
```

---

## Lesson 2.2: Stacks & Queues from Scratch

### 1. Stack Implementation (LIFO - Last In, First Out)
```python
class Stack:
    def __init__(self):
        self._items = []

    def push(self, item):
        self._items.append(item)

    def pop(self):
        if self.is_empty():
            raise IndexError("pop from empty stack")
        return self._items.pop()

    def peek(self):
        if self.is_empty():
            raise IndexError("peek from empty stack")
        return self._items[-1]

    def is_empty(self):
        return len(self._items) == 0

    def size(self):
        return len(self._items)
```

### 2. Circular Buffer Queue (FIFO - First In, First Out)
Implementing a Queue using a fixed-size circular array avoids dynamic memory reallocations during high-frequency operations:

```python
class CircularQueue:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.queue = [None] * capacity
        self.head = 0
        self.tail = 0
        self.count = 0

    def enqueue(self, item) -> bool:
        if self.count == self.capacity:
            return False # Queue full
        self.queue[self.tail] = item
        self.tail = (self.tail + 1) % self.capacity
        self.count += 1
        return True

    def dequeue(self):
        if self.count == 0:
            return None # Queue empty
        item = self.queue[self.head]
        self.queue[self.head] = None
        self.head = (self.head + 1) % self.capacity
        self.count -= 1
        return item
```

---

## Lesson 2.3: The Monotonic Stack Deep Dive

*(Synthesized from [`Monotonic Stackの解説と応用例` by `@imoty`](https://qiita.com/imoty/items/0993380df793de6dc077))*

### 1. Conceptual Invariant
A **Monotonic Stack** is a stack that enforces an invariant: **elements are kept strictly ordered (either monotonically increasing or monotonically decreasing) from bottom to top**.

```
Decreasing Monotonic Stack:
Top -> [ 2 ]
       [ 5 ]
Bottom [ 9 ]
When pushing 7:
1. Pop 2 (since 2 < 7)
2. 5 < 7, so pop 5
3. 9 > 7, so push 7!
New Stack: [9, 7]
```

### 2. Why Monotonic Stacks Are Amortized $O(N)$
Although there is an inner `while` loop popping elements, **each array element is pushed onto the stack exactly once and popped at most once**.
$$\text{Total Operations} \le N \text{ pushes} + N \text{ pops} = 2N \implies O(N)$$

### 3. Core Universal Pattern: Next Greater Element (NGE)
```python
def next_greater_element(nums: list[int]) -> list[int]:
    n = len(nums)
    res = [-1] * n
    stack = [] # Stores indices of elements waiting for a greater element

    for i in range(n):
        # Current element nums[i] is greater than stack top -> resolved!
        while stack and nums[stack[-1]] < nums[i]:
            resolved_idx = stack.pop()
            res[resolved_idx] = nums[i]
        stack.append(i)

    return res

# Example trace:
# nums = [2, 1, 2, 4, 3]
# returns: [4, 2, 4, -1, -1]
```

---

## 🛠️ Portfolio Project 2: Stock Span & Temperature Anomaly Analyzer

### Project Goal
Implement a real-time financial market analytics class `MarketAnomalyDetector` that tracks incoming price ticks and provides two instant $O(1)$ metrics:
1. **Consecutive Days Span**: How many consecutive past days had a stock price $\le$ today's price.
2. **Next Greater Alert**: Identifying the closest future day that broke the current price level.

### Implementation:
```python
"""
Portfolio Project 2: Real-Time Market Anomaly & Stock Span Detector
ALGOVERSE Course Suite
"""

class MarketAnomalyDetector:
    def __init__(self):
        # Stores tuples: (price, index, span)
        self.price_history = []
        self.monotonic_stack = [] # (price, span)
        self.current_day = 0

    def next_price_tick(self, price: float) -> int:
        """
        Receives daily price tick and returns today's Stock Span in O(1) amortized.
        Stock Span: Number of consecutive days before today with price <= today's price.
        """
        span = 1
        
        # Pop all prices <= current price and accumulate their spans
        while self.monotonic_stack and self.monotonic_stack[-1][0] <= price:
            _, prev_span = self.monotonic_stack.pop()
            span += prev_span

        self.monotonic_stack.append((price, span))
        self.price_history.append((self.current_day, price))
        self.current_day += 1
        
        return span

    def compute_all_future_breakouts(self) -> list[int]:
        """
        Computes for each historical day how many days until a strictly higher price occurred.
        Returns -1 if no higher price occurred in recorded history.
        """
        n = len(self.price_history)
        days_until_breakout = [-1] * n
        stack = [] # stores day indices

        for day in range(n):
            current_price = self.price_history[day][1]
            while stack and self.price_history[stack[-1]][1] < current_price:
                past_day = stack.pop()
                days_until_breakout[past_day] = day - past_day
            stack.append(day)

        return days_until_breakout


# Interactive Verification:
if __name__ == "__main__":
    detector = MarketAnomalyDetector()
    sample_prices = [100, 80, 60, 70, 60, 75, 85]
    
    print("--- Stock Spans Daily Ingest ---")
    for p in sample_prices:
        span = detector.next_price_tick(p)
        print(f"Price: {p:<4} | Calculated Span: {span}")

    breakouts = detector.compute_all_future_breakouts()
    print("\n--- Days Until Higher Price Breakout ---")
    for i, (day, p) in enumerate(detector.price_history):
        b = breakouts[i]
        b_str = f"{b} days later" if b != -1 else "Never in recorded period"
        print(f"Day {day} (Price {p}): {b_str}")
```

---

## 🎯 Benchmark Problem Walkthrough: LeetCode 84 / Histogram Maximum Area

### Problem Statement
Given an array of integers `heights` representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.

### Step-by-Step Monotonic Stack Solution:
```python
def largestRectangleArea(heights: list[int]) -> int:
    heights.append(0) # Sentinel to flush stack at the end
    stack = [-1]      # Sentinel index
    max_area = 0

    for i in range(len(heights)):
        while stack[-1] != -1 and heights[stack[-1]] >= heights[i]:
            h = heights[stack.pop()]
            w = i - stack[-1] - 1 # Distance between left and right boundary
            max_area = max(max_area, h * w)
        stack.append(i)

    heights.pop() # Restore original array
    return max_area
```
- **Time Complexity**: $O(N)$ single pass.
- **Space Complexity**: $O(N)$ for stack.

---

## 📝 Unit 2 Concept Quiz

1. **Question 1**: Why does calling `q.pop(0)` on a Python standard `list` inside an $N$-iteration loop result in $O(N^2)$ overall time complexity?
   - (A) Python lists rehash all values on pop
   - (B) Removing the first element requires shifting all remaining $N-1$ elements in contiguous memory by one slot to the left *(Correct)*
   - (C) Python lists use linked pointers that must be re-traversed
   - (D) The garbage collector freezes execution on every pop

2. **Question 2**: What is the amortized time complexity of processing an array of size $N$ with a monotonic stack?
   - (A) $O(N^2)$ in the worst case
   - (B) $O(N \log N)$
   - (C) Strictly $O(N)$ because every element is pushed once and popped at most once *(Correct)*
   - (D) $O(1)$

3. **Question 3**: In a strictly decreasing monotonic stack used for finding the Next Greater Element, when should an incoming element trigger pops from the stack?
   - (A) When the incoming element is strictly less than the stack top
   - (B) When the incoming element is strictly greater than the stack top *(Correct)*
   - (C) Only when the stack is full
   - (D) When the stack reaches $N/2$ elements

---

## 🏆 Unit 2 Completion Checklist
- [ ] Understand memory layout differences between contiguous arrays and pointer collections.
- [ ] Implement `CircularQueue` and `MarketAnomalyDetector` from scratch.
- [ ] Solve **LeetCode 739 (Daily Temperatures)** with 100% test case pass.
- [ ] Pass Quiz 2 with $\ge 80\%$.
