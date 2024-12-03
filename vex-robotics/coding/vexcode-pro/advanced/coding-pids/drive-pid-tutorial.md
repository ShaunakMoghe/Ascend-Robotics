# ⬆️ Drive PID Tutorial

In this tutorial, we'll show you how to code a simple drive PID--that is, moving the robot straight forward or backward. We'll use the built-in motor encoders to keep track of how far the robot has gone during the PID loop.

First of all, let's create a function called `drivePID` that accepts an integer variable, called `driveDistance`. This parameter will dictate how far the robot will go, **in degrees** (of the drive motors). We'll also have to make this function return the value 0 (this doesn't change anything), due to a small nuance of C++.

```cpp
//Drive PID, drive the robot forward using a PID controller
int drivePID(int driveDistance) {
    //driveDistance is how far the robot should go, in degrees (of the drive motors)

    return 0; //Keep this line at the end of the function!
}
```

This function doesn't do anything yet, but it's a start. <mark style="color:green;">**From now on, place all of the drive PID code in this function**</mark>.

Remember those constants--kP, kI, and kD--that we mentioned earlier? Those become very important later on, as they make the PID **effective** on your specific robot. We'll put these constants at the top of the function, for the sake of organization.

```cpp
//PID constants
float kP = 0.5;
float kI = 0;
float kD = 0;
```

{% hint style="info" %}
You'll determine the specific values of these constants later. Keep in mind that no two robots have the same set of constants, since the weight,  speed, and drive friction vary from robot to robot; they affect these constants.
{% endhint %}

Before we get into the actual PID loop, we need to define a few more variables. These variables will be used, along with the PID algorithm, to calculate the motor power that needs to be applied to the drive motors.

```cpp
//Variables for drive PID
float error = 0;      //how far the robot is from the target
float integral = 0;   //area under the error vs time graph
float derivative = 0; //slope of the error vs time graph
float prevError = 0;  //the error for the previous iteration of the PID loop

//Motor power variables
float motorPower = 0;     //how much power to apply to the motors, ranging from -1 (backwards at full power) to 1 (forwards at full power)
float prevMotorPower = 0; //the motor power for the previous iteration of the PID loop
```

At this point, we'll use a 6-motor drive in our example. We'll calculate how far the robot moves forward by taking the average of all six motor encoders. However, since the robot may have moved before the code reaches this point (from an earlier PID or such), we have to reset the position of the motor encoders back to 0:

<pre class="language-cpp"><code class="lang-cpp"><strong>//Reset motor encoders
</strong><strong>Right1.setPosition(0, degrees);
</strong>Right2.setPosition(0, degrees);
Right3.setPosition(0, degrees);
Left1.setPosition(0, degrees);
Left2.setPosition(0, degrees);
Left3.setPosition(0, degrees);
</code></pre>

Now that the setup is done, we can start coding the main PID loop. This loop does the following:

1. Gets the robot's **position**
2. **Calculates the motor power** using the PID algorithm
3. **Applies** the motor power to the drive motors
4. **Exits** if the robot is close enough to the target position

We'll create the outline of the loop, and start by calculating the current distance of the robot. We do this by taking the average position of all six drive motors. If your drive motors are set up differently, adjust your code to take the average of all drive motors or motor groups.

```cpp
while(true) {
    //Calculate the current distance of the robot and store it as a number (float)
    float currentDistance = (Right1.position(degrees) + Left1.position(degrees) + Right2.position(degrees) + Left2.position(degrees) + Right3.position(degrees) + Left3.position(degrees)) / 6;

    wait(20, msec);//don't hog CPU, this stays at the end of the loop
}
```

<details>

<summary>What is <code>currentDistance</code>?</summary>

This variable stores how far the robot is along the PID loop. Let's say there's a PID loop going where the robot needs to move forward 1000 degrees (of the drive motors) i.e. `driveDistance = 1000`.

* At the start, `currentDistance = 0` because the robot has not travelled at all
* 30% of the way through, `currentDistance = 300` because the robot has travelled 300 degrees (in terms of the drive motor's rotation)
* At the end, `currentDistance = 1000` since the robot has reached the target

</details>

From now on, until told otherwise, <mark style="color:green;">**assume all of the code goes in this while loop**</mark>, after currentDistance is calculated, but before the wait function is called.

The next order of business is to calculate the robot's **error**--how far it is from the target. This is used to calculate the <mark style="color:red;">**proportional**</mark> term of the PID. It's simple:

```cpp
error = driveDistance - currentDistance; //calculate error
```

After that, we have to calculate the <mark style="color:blue;">**integral**</mark> term. Recall that the integral term nudges the robot the when it's close to the target, so it doesn't stall. However, due to [integral windup](https://control.com/technical-articles/intergral-windup-method-in-pid-control/), we don't want the integral part of the PID to come into play until the robot is close to the target. In this example, we'll only update the integral term when the robot is within 200 degrees of the final position.

Since the <mark style="color:blue;">**integral**</mark> term is simply the area underneath the error vs. time graph, we can simply add the current error to the integral term. Over multiple cycles of the PID loop, it will accumulate and nudge the robot closer to the target.

```cpp
if (error < 200 && error > -200) {
  integral += error; //updated the integral term if |error| < 200
}
```

Next, we have to find the <mark style="color:yellow;">**derivative**</mark> term. "Derivative" simply means "slope", so we can simply take the difference between the current error and the error in the last iteration of the loop (stored as `prevError`) to get the <mark style="color:yellow;">**derivative**</mark> term:

```cpp
derivative = error - prevError; //calculate the derivative term
```

At this point, we can code the **quintessential line of the PID algorithm!** Note that "proportional" is replaced by "error" because the error is directly proportional to how far the robot is from the target.

```cpp
motorPower = (kP * error) + (kI * integral) + (kD * derivative); //calculate motor power
```

Then, we'll clamp the `motorPower` variable between -1 and 1. We don't want the motors trying to spin at 150% speed.

```cpp
//keep motor power between -1 and 1
if (motorPower > 1) motorPower = 1;
if (motorPower < -1) motorPower = -1;
```

One last thing before we can apply the motor power. At present, the PID algorithm will rev up the motors instantaneously at the start of the algorithm. This works, but it can cause the robot to jerk and turn slightly due to the harsh acceleration. We recommend adding a slew rate limiter, which speeds the motors up slowly rather than applying maximum power right at the start. For example, if the slew rate is 0.1, and the loop repeats every 20 milliseconds, then the robot will take 200 milliseconds (10 cycles of the loop) to increase the motor power from 0 to 1.

```cpp
//slew rate limiter
float slewRate = 0.1f;
if (motorPower > prevMotorPower + slewRate) motorPower = prevMotorPower + slewRate;
if (motorPower < prevMotorPower - slewRate) motorPower = prevMotorPower - slewRate;
```

Now, we can apply the refined motorPower variable to the motors. We'll multiply it by 11 because the motor voltage varies from -11 to 11.

```cpp
Left1.spin(forward, 11 * motorPower, volt);
Left2.spin(forward, 11 * motorPower, volt);
Left3.spin(forward, 11 * motorPower, volt);
Right1.spin(forward, 11 * motorPower, volt);
Right2.spin(forward, 11 * motorPower, volt);
Right3.spin(forward, 11 * motorPower, volt);
```

All of the above code, combined, will work. But as of now, the code will keep running forever, even when the robot is at the target. Thus, we need to include a line of code that exits the PID loop once the robot is within 10 degrees of the target. You can change the number 10 to any number you would like; smaller numbers make the PID more precise, but also make it take longer. This code is called the **exit condition**.

Also, note that the difference between the current error and the previous error has to be less than 10; this prevents the PID from exiting when the robot quickly shoots past the target, giving it time to correct.

```cpp
//Exit the PID if the robot is within 10 degrees of the target, and not going too fast
if (error > -10 && error < 10 && error - prevError > -10 && error - prevError < 10) {
    break;
}
```

Next, we need to update the `prevError` and `prevMotorPower` variables, so they can be used in the next iteration of the loop.

```cpp
//update "previous" variables
prevMotorPower = motorPower;
prevError = error;
```

That finishes up the code in the while loop. However, the motors may still be turning, even after the PID is done. To account for this, put this code <mark style="color:green;">**after the while loop but before the end of the**</mark><mark style="color:green;">**&#x20;**</mark><mark style="color:green;">**`drivePID`**</mark><mark style="color:green;">**&#x20;**</mark><mark style="color:green;">**function:**</mark>

```cpp
//stop the motors when the PID is done
Left1.stop();
Left2.stop();
Left3.stop();
Right1.stop();
Right2.stop();
Right3.stop();
```

And with that, your drive PID code should be done!&#x20;

But, how do you run your PID function? Call the function, passing in the number of degrees (of the drive motors) that you want the robot to go forwards for. Here's an example:

```cpp
drivePID(800); //drive the robot forward 800 degrees
drivePID(-500); //drive the robot backwards 500 degrees
```

You can put the above code in your autonomous function.

We're not done yet, though--you'll have to tune the PID constants in order to make the PID work well for your specific robot.

{% content-ref url="tuning-pids/" %}
[tuning-pids](tuning-pids/)
{% endcontent-ref %}
