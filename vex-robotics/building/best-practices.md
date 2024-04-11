---
description: 'Goal: Robust yet lightweight'
---

# 🔧 Best Practices

In Vex, there are many techniques to build well. The goal is to allow the robot to **last** multiple competitions without breaking while keeping it as **light** as possible.

### Triangle Bracing

Triangle bracing uses standoffs at odd angles to brace higher points on the robot. This greatly improves the stability of the higher mechanisms on the robot. In the picture below, the tower in the middle of the robot will not bend over time due to the triangle bracing.

<figure><img src="../../.gitbook/assets/IMG_2281.jpeg" alt="" width="563"><figcaption></figcaption></figure>

For this type of bracing, we recommend using shaft collars screwed into each other and into standoffs like so:

<figure><img src="https://lh6.googleusercontent.com/DbuIsZJoFttjyK0MUTrxhhvt_P6qOcBRc371_oggsIh6D2zyUnKd40Fx3Asiuu2MOI41Rn333fXsWhfuDJchixba1vpw0wuuEkI5Z1XhyCXKzQiKPVz6_60W0zvMeLRbyWHTComtg_3rX4bx4AnAroc" alt="" width="563"><figcaption><p>Note how the shaft collars are oriented</p></figcaption></figure>

### Lighter is Better

Lighter robots move faster and can usually outscore heavy robots.&#x20;

To save weight, always use the thin nylock nuts. They are about 50% lighter, which adds up when hundreds of them are used across the robot.

Additionally, always use aluminum metal to build the robot. Vex also offers steel, which is 50% stronger. However, it is also 136% heavier--not worth it.

Here's the same C-channel in both aluminum (left) and steel (right) varieties. Note the massive weight difference between the two pieces!

<div>

<figure><img src="../../.gitbook/assets/IMG_3063 copy.jpg" alt="" width="375"><figcaption></figcaption></figure>

 

<figure><img src="../../.gitbook/assets/IMG_3061 copy.jpg" alt="" width="375"><figcaption></figcaption></figure>

</div>

### Center of Gravity

Ideally, the center of gravity should be two things:

* Low: prevents the robot from tipping over
* Centered: makes autonomous routines more accurate

Practically, this means that the bulk of the weight on your robot should be as low as possible. Additionally, try to have some balance in the weight distribution side-to-side. For example, mount the brain/battery and the air tanks on opposite sides of the robot to balance it out.

<figure><img src="../../.gitbook/assets/A7FAC422-530D-48E9-8BC4-F05F558DCD08_1_105_c.jpeg" alt="" width="375"><figcaption><p>Note how all 6 drive motors and the air tank are as low as possible</p></figcaption></figure>

### Zip ties!

Zip ties are the duct tape of Vex Robotics. They work well in a pinch for meager structural support, but they don't hold up in high-stress situations. One good application of zip ties is on bearing flats for the drivetrain. That's because the bearing flats are not under any lateral stress. Additionally, this saves weight compared to the alternative (screws and nuts).

<figure><img src="../../.gitbook/assets/IMG_0924.jpeg" alt="" width="563"><figcaption><p>This should not be viable, but it is</p></figcaption></figure>

Using zip ties instead of screws and nuts to attach bearing flats saves about 0.01 pounds per bearing flat. If you use 20 bearing flats on the robot in total, you can save 0.2 pounds of weight on the robot. Every little bit of weight reduction matters.

<table><thead><tr><th width="306.3333333333333">Bearing flat attachment method</th><th>Weight</th></tr></thead><tbody><tr><td>Zip ties</td><td>0.001 lbs</td></tr><tr><td>Screws and nuts</td><td>0.011 lbs</td></tr></tbody></table>

However, zip ties should not be used for high-stress or pivotal connections, as they are prone to break over time.
