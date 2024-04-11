---
description: '*Technically optional, but highly recommended'
---

# 🚗 Drive Code

You _probably_ want the robot to move around. However, the robot doesn't just do this on its own; you have to program it. In this tutorial, we'll show you how to do that with the double arcade control scheme--the left joystick moves the robot forward and backward, and the right joystick turns the robot.

We'll start off by adding the drive motors to the list of devices. In this example, we'll use a 6-motor drivetrain with the left and right motors plugged in to the following ports. Your port numbers can be different; all that matters is that the motors are named well and match up with the ports on the physical robot.

<figure><img src="../../.gitbook/assets/Screenshot 2023-09-20 at 7.53.39 AM.png" alt="" width="375"><figcaption><p>For a four-motor drive, just leave out Right3 and Left3</p></figcaption></figure>

Now, we can start coding. For the sake of clarity, we'll put all of our drive code in a C++ function. Here's the format for a function in C++:

```cpp
void driveCode() {
 //drives the robot around based on controller input, double arcade controls
}
```

The first order of business is to get controller inputs. Make sure you have a controller listed in your devices menu:

<figure><img src="../../.gitbook/assets/Screenshot 2023-09-20 at 8.07.04 AM.png" alt="" width="375"><figcaption></figcaption></figure>

Now, we can get the **inputs** from the joysticks and **store** them in integer variables. The left joystick will control forwards and backwards motion in a straight line, so we'll store that value in a variable called `straight`. Next, we'll store the value for the right joystick in a variable called `turn`, since the right joystick turns the robot. Put the following code in the `driveCode()` function:

<pre class="language-cpp" data-full-width="false"><code class="lang-cpp">//Get controller inputs
<strong>int straight = Controller1.Axis3.value(); //gives a number -100 to 100
</strong>int turn = Controller1.Axis1.value();
</code></pre>

Now, we need to **calculate the motor power**, in percentage points, that we should apply to each side of the drivetrain. We'll use two variables, `left` and `right`, to keep track of the percentage motor power we will apply to the left and right sides of the drivetrain. The following code calculates motor power, and it should be in the `driveCode()` function, right after the previous code.

```cpp
//calculate proper motor powers
int left = straight + turn * 0.7; //the 0.7 makes the turns less intense
int right = straight - turn * 0.7;
```

<details>

<summary>Why the 0.7?</summary>

When adding (or subtracting) `turn` to `straight`, most teams multiply `turn` by a number less than 1 to give the drive better control of the robot while it is turning. For example, 0.5 would make the robot turn slower, 0.8 would make the robot turn very quickly, and 1 is much too fast for most drivers. Experiment with this number to find what your driver likes best; we use 0.7.

</details>

Now that we have calculated the motor powers for the left and right sides of the drivetrain, we just have to **apply that power** to them. Since we have 6 motors in this example, we'll apply the motor powers to all six motors.&#x20;

```cpp
//Spin the drive motors at the calculated velocity
Left1.spin(forward, left, percent);
Left2.spin(forward, left, percent);
Left3.spin(forward, left, percent);
Right1.spin(forward, right, percent);
Right2.spin(forward, right, percent);
Right3.spin(forward, right, percent);
```

Let's put all of it together so far! Make sure to <mark style="color:green;">**put this function before the main loop.**</mark>

```cpp
void driveCode() {
  //drives the robot around based on controller input, double arcade controls
  
  //First, get controller inputs
  int straight = Controller1.Axis3.value(); //gives a number -100 to 100
  int turn = Controller1.Axis1.value();
  
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

Looks great! but if you add this code to your program, nothing will happen. We've made the function `driveCode()`, but we haven't called it yet. Now, we need to add in another function called userControl that runs when the driver controlled period in a match is active.

```cpp
//driver control code, is activated when the driver control period occurs
void userControl() {
  while (true) { //run this code indefinitely
    driveCode(); //update the drive motors to be at the right power
    wait(20, msec); //don't hog the CPU
  }
}
```

When the controller is told to run driver control during a match, your code needs to recognize that and call the right function. Thus, we'll initialize a Competition variable <mark style="color:green;">**at the beginning of the main file**</mark>, after the `using namespace vex;` line.

```
competition Competition;
```

Now, update your main function to call the userControl function when the driver control period starts:

```cpp
int main() {
  //Initializing Robot Configuration. DO NOT REMOVE!
  vexcodeInit();
  
  Competition.drivercontrol(userControl);
  //You might have more code below, leave it
  
}
```

With that, you should have a fully functioning drivetrain! If the driving seems off, reverse directions of the the motors (try many combinations) until it works properly.
