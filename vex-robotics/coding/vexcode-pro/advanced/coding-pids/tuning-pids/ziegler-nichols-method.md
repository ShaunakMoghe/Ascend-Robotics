---
description: Advanced coding shenanigins...
---

# 🔢 Ziegler-Nichols Method

The Ziegler-Nichols method is a simple way to estimate decent values for kP, kI, and kD. These estimates are a good starting point for manual tuning.

We need two numbers before we can run this method:

* Ku, the **critical** (or ultimate) **gain**
* Tu, the **period** of the oscillations at the critical gain

That is, **Ku is the minimum value of kP for which the robot will oscillate steadily around the target**. To find it, slowly increase kP until the robot wobbles consistently across the target. Then, find Tu by taking a video of the robot oscillating, and find the period, in seconds, of the oscillation. The period is how long it takes the robot to go from one side of the target, to the other side, and then back again.

Once you've found Ku and kP, you can then calculate the estimated values of kP, kI, and kD using a few equations, as shown in this PID calculator:

{% embed url="https://codepen.io/Ascend-Robotics/pen/yLGQqJb" %}

Alternate Link: [https://html-7159868.codehs.me/pid.html](https://html-7159868.codehs.me/pid.html)



<details>

<summary>A small technicality</summary>

We added this section for completeness, but if it doesn't make sense, drop it. If you use the PID calculator we've provided, you've already accounted for this.

We told you to find Tu in units of seconds, but since the PID loop runs every 20 milliseconds, Tu should really be in units of 20 milliseconds. Thus, we implicitly changed some of the outputs by a factor of 50.

</details>
