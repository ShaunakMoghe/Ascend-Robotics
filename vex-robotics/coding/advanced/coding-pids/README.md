---
description: Worth it.
---

# 📈 Coding PIDs

A PID (proportional integral derivative) controller is an advanced coding technique to make the robot's motion consistent, reliable, and efficient.

## Theory

PIDs are used everywhere in industrial robotics--car factories, robot vacuums, and more. If a robot moves, it likely uses PIDs to move.

<figure><img src="../../../../.gitbook/assets/image (39).png" alt="" width="375"><figcaption><p>See these robots? They use PIDs</p></figcaption></figure>

But why? PIDs do one thing, and they do it really well. They move a robot from point A to point B:

<figure><img src="../../../../.gitbook/assets/image (40).png" alt=""><figcaption><p>That's a PID. Yep, it's not that bad.</p></figcaption></figure>

But how? This is where the PID algorithm comes in. There are three parts to a PID controller, given by the acronym. Each part applies a specific power to the drive motors based on certain factors:

* P (<mark style="color:red;">**Proportional**</mark>): Update motor power based on the <mark style="color:red;">**present**</mark>
* I (<mark style="color:blue;">**Integral**</mark>): Update motor power based on the <mark style="color:blue;">**past**</mark>
* D (<mark style="color:yellow;">**Derivative**</mark>): Update motor power based on the <mark style="color:yellow;">**future**</mark>

<details>

<summary>What each part really does</summary>

* <mark style="color:red;">**P**</mark>: if the robot is far from point B, set the motor power high so the robot gets there faster. If the robot is close, set the motor power low so the robot doesn't overshoot.

<!---->

* <mark style="color:blue;">**I**</mark>: if the robot is close to point B, but not quite there, increase the motor power so the robot doesn't stall.

<!---->

* <mark style="color:yellow;">**D**</mark>: if the robot is rapidly approaching point B, apply the brakes so the robot doesn't go too far (overshoot).

</details>

The motor power is calculated by the following line of code, which is the **heart of the PID algorithm:**

```cpp
float motorPower = (kP * proportional) + (kI * integral) + (kD * derivative);
```

That is, each part of the PID is added together to calculate motor power. `kP`, `kI`, and `kD` are constants that determine the relative weights of each portion of the PID.

#### Error

Error refers to how far the robot is from the target point. If the robot wants to go forward 20 inches, the PID algorithm would calculate the following errors.&#x20;

<figure><img src="../../../../.gitbook/assets/Screenshot 2023-09-28 at 8.14.44 AM.png" alt=""><figcaption><p>Figure 3</p></figcaption></figure>

Error plays a major factor in the PID algorithm; we'll see how later. If you want some more explanation, here's a good eight-minute video explaining the theory behind PIDs:

{% embed url="https://www.youtube.com/watch?v=UR0hOmjaHp0" %}

Now, let's start by coding your drive PID!

{% content-ref url="drive-pid-tutorial.md" %}
[drive-pid-tutorial.md](drive-pid-tutorial.md)
{% endcontent-ref %}
