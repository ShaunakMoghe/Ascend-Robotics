---
description: Perseverance makes perfect
---

# 🎸 Tuning PIDs

At this point, you should have coded the PIDs fully. Now, you have to tune those three constants to make the PID work well on your specific robot. Here's a quick recap of each constant:

* <mark style="color:red;">**Proportional (kP)**</mark>: if the robot is far from the target, set the motor power high so the robot gets there faster. If the robot is close, set the motor power low so the robot doesn't overshoot.
* <mark style="color:blue;">**Integral (kI)**</mark>: if the robot is close to the target, but not quite there, increase the motor power over time so the robot doesn't stall.
* <mark style="color:yellow;">**Derivative (kD)**</mark>: if the robot is rapidly approaching the target, apply the brakes so the robot doesn't go too far.

Remember, everything on the robot--drivetrain friction, gear ratio, weight distribution, center of gravity--influence the optimal PID values for the robot. That is, you might have to re-adjust the PID values if something major changes on the robot.

Let's say we're tuning the drive PID (the process is the same for the turn PID). We started with these values. Try out the drive PID. How well does it work?

```cpp
//PID constants
float kP = 0.5;
float kI = 0;
float kD = 0;
```

<details>

<summary>Why are <code>kI</code> and <code>kD</code> both 0?</summary>

Right now, we want to start off with a P controller. This means that we only look at the inputs from the proportional part of the PID, and neglect the other two. In fact, sometimes a P controller is enough to make the robot's motion consistent.

Note that not all components of the PID are necessary. For example, a PD controller (`kI = 0`) works fairly well for Vex Robotics, but the integral term does allow the robot to be more precise.

</details>

If the robot barely moves, try increasing kP--this increases the motor power applied. If the robot jerks forward and goes too far, try decreasing kP.&#x20;

Your goal should be the green line in the graph below, where the robot reached the setpoint (target) quickly and stays there. The graphs represent's the robot's current distance, compared to the target; this applies to both turn PIDs and drive PIDs.

<figure><img src="../../../../../../.gitbook/assets/image (1) (1).png" alt="" width="506"><figcaption><p>Source: OscarLiang.com</p></figcaption></figure>

If your robot acts like the orange line on the graph above, where the robot goes past the target and  reverses direction, consider adding in the kD term. As a starting point, set this term to 5 times the value of the kP term. Adding in the integral term (start at about 1/10th the value of kP) may also help.

If your robot acts like the blue line on the graph above, where the robot takes a while to reach the target, increase kP or decrease kD.

These rest of PID tuning comes down to trial and error; it's your job to find the set of values that works best for your specific robot.&#x20;

If you want a more mathematical approach to estimating kP, kI, and kD from the start, take a look at this page:

{% content-ref url="ziegler-nichols-method.md" %}
[ziegler-nichols-method.md](ziegler-nichols-method.md)
{% endcontent-ref %}
