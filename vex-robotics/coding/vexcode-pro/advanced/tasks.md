---
description: Multithreading made simple
---

# 📋 Tasks

Tasks allow the code to execute multiple functions simultaneously. For example, one task could handle the driving inputs, and another task could spin a catapult or flywheel at the same time.

Tasks themselves are functions that return an integer (it's C++, go along with it). You can put whatever code you want inside of it, but usually there's a while loop so actions within the task execute more than once. Here's a basic task (called `myTask`) that spins a flywheel forward:

```cpp
int myTask() {
  while (true) {
    //do something here
    Flywheel.spin(forward); //just an example
    wait(25, msec);
  }
  
  return 0; //C++ technicality
}
```

Tasks can be created with this line of code, and will not run until they have been created. The variable `spinFlywheel` stores the task internally for future reference.

```cpp
task spinFlywheel = task(myTask);
```

If you want the task to stop running, call the `stop()` function on it:

```cpp
spinFlywheel.stop();
```

We recommend using tasks for controlling lifts, catapults, or flywheels when the control algorithm required is non-trivial.

<details>

<summary>Example</summary>

Here's an example of using a task to spin a motor when a distance sensor detects an object. Let's start by making the task itself:

```cpp
int spinMotorTask() {
  while (true) {
    if (DistanceSensor.objectDistance(mm) < 50) {
      Motor.spin(forward, 11, volt); //spin the motor when the distance sensor picks up an object
    } else {
      Motor.stop(); //stop the motor when the sensor doesn't
    }
    
    wait(20, msec); //don't hog the CPU
  }
  
  return 0; //C++ technicality
}
```

Now, <mark style="color:green;">**in the main function**</mark>, we'll call the task like so:

```cpp
task myTask = task(spinMotorTask);
```

This code checks every 20 milliseconds to see if the distance sensor detects an object, and spins the motor forward if it does.

</details>
