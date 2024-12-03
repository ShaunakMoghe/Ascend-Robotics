# ↩️ Turn PID Tutorial

In this tutorial, we'll show you how to code a simple turn PID (i.e. the robot turns in place). We'll use an inertial sensor to keep track of the robot's rotation.

{% hint style="info" %}
We'll assume you have already completed the Drive PID tutorial (you should). Thus, some steps will be simplified.
{% endhint %}

Before we get started, let's set up the inertial sensor in your devices tab. We'll name ours "Inertial",

<figure><img src="../../../../../.gitbook/assets/Screenshot 2024-01-23 at 9.58.27 AM.png" alt=""><figcaption></figcaption></figure>

Next, make sure you calibrate your inertial sensor <mark style="color:green;">**in the main function**</mark> of the robot using this line of code. This line should run when the program starts--make sure the robot is stationary for the first few seconds, so the inertial sensor calibrates correctly.

```cpp
Inertial.calibrate();
```

Now, the PID! First of all, let's create a function called `turnPID` that accepts an integer variable, called `turnDistance`. This variable will tell the robot how far to turn, in degrees.

```cpp
//Turn PID, turn the robot in place using a PID controller
int turnPID(int turnDistance) {
    //driveDistance is how far the robot should turn, in degrees (positive is counterclockwise)

    return 0; //Keep this line at the end of the function!
}
```

This function doesn't do anything yet, but it's a start. <mark style="color:green;">**From now on, place all of the turn PID code in this function**</mark>.

Next, let's add in our PID constants.

```cpp
//PID constants
float kP = 0.05;
float kI = 0;
float kD = 0;
```

Before we get into the actual PID loop, we need to define a few more variables:

```cpp
//Variables for turn PID
float error = 0;      //how far the robot is from the target, in degrees
float integral = 0;   //area under the error vs time graph
float derivative = 0; //slope of the error vs time graph
float prevError = 0;  //the error for the previous iteration of the PID loop

//Motor power variables
float motorPower = 0;     //how much power to apply to the motors, ranging from -1 (clockwise at full power) to 1 (counterclockwise at full power)
float prevMotorPower = 0; //the motor power for the previous iteration of the PID loop
```

One last thing--we need to **keep track of the inertial sensor's initial position**, so we know how far the robot has turned compared to it's rotation before the PID runs. We'll define a variable called `startDistance` to keep track of this.&#x20;

```cpp
float startDistance = Inertial.rotation(degrees);  
```

Now that the setup is done, we can start coding the main PID loop. We'll start by calculating the current distance of the robot. We do this by taking the difference between the robot's current position and its starting position.

```cpp
while(true) {
    //Calculate the current distance of the robot and store it as a number (float)
    float currentDistance = startDistance - Inertial.rotation(degrees);

    wait(20, msec);//don't hog CPU, this stays at the end of the loop
}
```

<details>

<summary>What is <code>currentDistance</code>?</summary>

This variable stores how far the robot is along the PID loop. Let's say there's a PID loop going where the robot needs to turn 90 degrees. ( i.e. `turnDistance = 90`)

* At the start, `currentDistance = 0` because the robot has not turned at all
* 30% of the way through, `currentDistance = 27` because the robot has turned 27 degrees
* At the end, `currentDistance = 90` since the robot has reached the target

</details>

From now on, until told otherwise, <mark style="color:green;">**assume all of the code goes in this while loop**</mark>, after currentDistance is calculated, but before the wait function is called.

The next order of business is to calculate the robot's **error**--how far it is from the target. This is used to calculate the <mark style="color:red;">**proportional**</mark> term of the PID.&#x20;

```cpp
error = turnDistance - currentDistance; //calculate error
```

After that, we have to calculate the <mark style="color:blue;">**integral**</mark> term. We'll only activate it when the robot is within 10 degrees of the target position, to avoid integral windup.

```cpp
if (error < 10 && error > -10) {
  integral += error; //updated the integral term if |error| < 10
}
```

Next, we have to find the <mark style="color:yellow;">**derivative**</mark> term. "Derivative" means "slope", so we can simply take the difference between the current error and the error in the last iteration of the loop (stored as `prevError`) to get the <mark style="color:yellow;">**derivative**</mark> term:

```cpp
derivative = error - prevError; //calculate the derivative term
```

At this point, we can add the quintessential line of the PID algorithm! Here it is:

```cpp
motorPower = (kP * error) + (kI * integral) + (kD * derivative); //calculate motor power
```

Then, we'll clamp the `motorPower` variable between -1 and 1.&#x20;

```cpp
//keep motor power between -1 and 1
if (motorPower > 1) motorPower = 1;
if (motorPower < -1) motorPower = -1;
```

Next, we'll add the slew rate limiter to prevent jerky robot motion.

```cpp
//slew rate limiter
float slewRate = 0.1f;
if (motorPower > prevMotorPower + slewRate) motorPower = prevMotorPower + slewRate;
if (motorPower < prevMotorPower - slewRate) motorPower = prevMotorPower - slewRate;
```

Now, we can apply the refined motorPower variable to the motors. We multiply it by 11 because the motor voltage varies from -11 to 11. Note that the motorPower is multiplied by -11 for the left drive motors, so the robot turns in place instead of driving forward.

```cpp
Left1.spin(forward, -11 * motorPower, volt);
Left2.spin(forward, -11 * motorPower, volt);
Left3.spin(forward, -11 * motorPower, volt);
Right1.spin(forward, 11 * motorPower, volt);
Right2.spin(forward, 11 * motorPower, volt);
Right3.spin(forward, 11 * motorPower, volt);
```

All of the above code, combined, will work. But as of now, the code will keep running forever, even when the robot is at the target. Thus, we need to include a line of code that exits the PID loop once the robot is within 1 degree of the target. Feel free to tune the exit condition, but within 1 degree is a pretty good baseline. We also make sure the error and prevError don't differ by more than 0.3 degrees, to prevent the code from exiting when the robot is going quickly past the target.

```cpp
//Exit the PID if the robot is within 1 degree of the target, and error is within 0.3 degrees of prevError
if (error > -1 && error < 1 && error - prevError > -0.3 && error - prevError < 0.3) {
    break;
}
```

Next, we need to update the `prevError` and `prevMotorPower` variables, so they can be used in the next iteration of the loop.

```cpp
//update "previous" variables
prevMotorPower = motorPower;
prevError = error;
```

That finishes up the code in the while loop. However, the motors may still be turning, even after the PID is done. To account for this, put this code <mark style="color:green;">**after the while loop but before the end of the**</mark><mark style="color:green;">**&#x20;**</mark><mark style="color:green;">**`turnPID`**</mark><mark style="color:green;">**&#x20;**</mark><mark style="color:green;">**function:**</mark>

```cpp
//stop the motors when the PID is done
Left1.stop();
Left2.stop();
Left3.stop();
Right1.stop();
Right2.stop();
Right3.stop();
```

And with that, your turn PID code is done! We're not finished yet, though--you'll have to tune the PID constants in order to make the PID work well for your specific robot.

{% content-ref url="tuning-pids/" %}
[tuning-pids](tuning-pids/)
{% endcontent-ref %}

<details>

<summary>Absolute turning</summary>

One small optimization is to change the angle that the PID needs to turn at to an absolute value. This means that the robot turns relative to the orientation it started in (which is the same each time) rather than where it is at the end of the previous PID (which varies). To accomplish this, simply set `startDistance = 0;` before the while loop of the PID.

</details>
