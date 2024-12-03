---
description: A more intuitive driving experience
---

# 🚝 Advanced Drive Code

While the basic split arcade drive does work, we'll show you a small addition to the code that can make the driving experience more intuitive. This code simply adjusts the turns to be more intense when the robot is going faster.

```cpp
void driveCode() {
  //drives the robot around based on controller input, double arcade controls
  
  //First, get controller inputs
  int straight = Controller1.Axis3.value(); //gives a number -100 to 100
  int turn = Controller1.Axis1.value();
  
  //adjust the turn variable based on the straight one
  if (forward1 > 50) {
    turn *= (((forward1 - 50) / 50) + 1);
  } else if (forward1 < -50) {
    turn *= (((-50 - forward1) / 50) + 1);
  } 
  
  //Calculate proper motor powers
  int left = straight + turn * 0.7; //the 0.7 makes the turns less intense
  int right = straight - turn * 0.7;

  //Spin the drive motors at the calculated velocity
  Left1.spin(forward, left, percent);
  Left2.spin(forward, left, percent);
  Left3.spin(forward, left, percent);
  Right1.spin(forward, right, percent);
  Right2.spin(forward, right, percent);
  Right3.spin(forward, right, percent);
}
```

This was adapted from [https://wiki.purduesigbots.com/software/competition-specific/curvature-cheesy-drive](https://wiki.purduesigbots.com/software/competition-specific/curvature-cheesy-drive)
