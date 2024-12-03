---
description: 12.5% of the match
---

# 📡 Coding Autonomous

The Autonomous period is only 15 seconds, but it can make a huge difference in matches. In this section, we'll show you how to set up code to run during autonomous.

Before we can make the autonomous program, we have to set up the code to interface with the field controllers. That is, when the controller is told to run autonomous during a match, your code needs to recognize that and call the right function. Thus, we'll initialize a Competition variable <mark style="color:green;">**at the beginning of the main file**</mark>, after the `using namespace vex;` line.&#x20;

```cpp
competition Competition;
```

Next, we'll make a function called `autonomousProgram()`. This function will contain all of the code that your autonomous will run.

```cpp
void autonomousProgram(void) {    
    //insert autonomous code here
}
```

Now, we need to tell the controller that we want this function to run when autonomous starts. To do that, we need to add the line `Competition.autonomous(autonomousProgram);` **immediately** after the `vexcodeInit()` line.

```cpp
int main() {
  // Initializing Robot Configuration. DO NOT REMOVE!
  vexcodeInit();

  // Set up callback for the autonomous period
  Competition.autonomous(autonomousProgram);

  //you may have more code below, leave it there
}
```

Now, you can simply put whatever code you would like to run during autonomous in the `autonomousProgram()` function, and it will run. If you want to have multiple options for autonomous, you can create multiple programs.&#x20;
