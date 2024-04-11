---
description: Every choice is a decision matrix
---

# 💠 Decision Matrices

Decision Matrices are the best way to make decisions. Which house to buy? Which classes to take? Which college to attend? All of these choices can be analyzed using decision matrices. In Robotics, decision matrices are primarily used to select the best design from multiple candidates.

A decision matrix has two lists:

* A list of **possible designs** along the **top row**
* A list of **criteria** to evaluate the designs along the **left column**

Each design is given a score from 1-5 for each criteria. Then, the weighted total is calculated; it's the sum of each criteria score multiplied by its weight.

<table><thead><tr><th width="173">Criteria:</th><th width="187">360 RPM Tank Drive</th><th width="186">X-Drive</th><th>Tank Tread Drive</th></tr></thead><tbody><tr><td><p>Maneuverability</p><p>Weight: 3</p></td><td><mark style="color:red;"><strong>4</strong></mark></td><td>5</td><td>2</td></tr><tr><td><p>Robustness</p><p>Weight: 2</p></td><td><mark style="color:yellow;"><strong>4</strong></mark></td><td>3</td><td>2</td></tr><tr><td><p>Simplicity</p><p>Weight: 1</p></td><td><mark style="color:blue;"><strong>5</strong></mark></td><td>1</td><td>3</td></tr><tr><td>Weighted totals:</td><td><strong>25</strong></td><td>22</td><td>13</td></tr></tbody></table>

For example, here's how we calculated the weighted total for the 360 RPM Tank Drive in the above matrix:

* Maneuverability: 3 \* <mark style="color:red;">**4**</mark> = <mark style="color:red;">**12**</mark>
* Robustness: 2 \* <mark style="color:yellow;">**4**</mark> = <mark style="color:yellow;">**8**</mark>
* Simplicity: 1 \* <mark style="color:blue;">**5**</mark> = <mark style="color:blue;">**5**</mark>

Weighted total: <mark style="color:red;">**12**</mark> + <mark style="color:yellow;">**8**</mark> + <mark style="color:blue;">**5**</mark> = 25

The other weighted totals are calculated using the same method; the design with the highest weighted total is the best one.

