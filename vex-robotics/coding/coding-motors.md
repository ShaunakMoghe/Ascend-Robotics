# 🚴 Coding Motors

In this tutorial, we'll show you how to code additional mechanisms on the robot, like an intake or catapult. Specifically, you'll learn how to spin a motor forwards and backwards at the press of a button.&#x20;

First, add the motor to the devices list. In this example, our motor is named `Motor`

<figure><img src="../../.gitbook/assets/Screenshot 2023-10-18 at 2.34.33 PM.png" alt="" width="563"><figcaption></figcaption></figure>

Next create a function that spins the motor forwards at full voltage:

```cpp
//Spin the motor forward at full voltage
void spinMotorForward() {
  Motor.spin(forward, 11, volt);
}
```

Now, let's create another function to spin the motor backwards at full voltage:

```cpp
//Spin the motor backward at full voltage
void spinMotorBackward() {
  Motor.spin(reverse, 11, volt);
}
```

Thirdly, we need a function to stop the motor from spinning when the button on the controller is released:

```cpp
//Stop the motor
void stopMotor() {
  Motor.stop();
}
```

All of this code is great, but none of it will run unless we set up the proper callbacks. We'll use the buttons L1 and L2 in this example, but feel free to change it to any buttons you would like. Put the callback code <mark style="color:green;">**in the main function**</mark>, so that the controller buttons activate the functions that spin or stop the motor.

```cpp
int main() {
  //Initializing Robot Configuration. DO NOT REMOVE!
  vexcodeInit();
  
  //Set up the motor callbacks
  Controller1.ButtonL1.pressed(spinMotorForward); //when button L1 is pressed, spin the motor forward
  Controller1.ButtonL2.pressed(spinMotorBackward); //when button L2 is pressed, spin the motor backward

  Controller1.ButtonL1.released(stopMotor); //when button L1 is released, stop the motor
  Controller1.ButtonL2.released(stopMotor); //when button L2 is released, stop the motor

  //there may be more code below, leave it be
}
```

Now, download the code and test to see if it works!
