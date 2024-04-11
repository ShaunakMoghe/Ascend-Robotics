# 🌬️ Coding Pneumatics

Pneumatics can be intimidating at first, but the code for them is simple. In this tutorial, we'll show you how to make a toggle button for a pneumatic piston on the robot.

Start by setting up the pneumatic in VEXCode Pro. It's a 3-wire DigitalOut device:

![](<../../.gitbook/assets/Screenshot 2023-09-20 at 4.53.52 PM.png>)--->![](<../../.gitbook/assets/Screenshot 2023-09-20 at 4.53.18 PM (1).png>)

Now, we need to make a variable storing whether or not the pneumatic piston is current active or not. We'll use a boolean variable and set it to false by default. This variable should be defined outside of all functions, below the `#include "vex.h";` and `using namespace vex;` lines of code.

```cpp
//global variables
bool pneumaticActive = false; //true or false, whether or not the pnuematic is active
```

Next, we'll make a function that toggles the pneumatic piston on or off. This function flips the `pneumaticActive` variable first, and then either activates or deactivates the pneumatic based on the value of the `pneumaticActive` variable.

<pre class="language-cpp"><code class="lang-cpp"><strong>//toggle the pneumatic piston on or off
</strong><strong>void togglePneumatic() {
</strong>  pneumaticActive = !pneumaticActive; //flip the on/off variable
  
  if (pneumaticActive) {
    Pneumatic.set(true); //Activate the pneumatic
  } else {
    Pneumatic.set(false); //Deactivate the pneumatic
  }
}
</code></pre>

Lastly, we have to set up a callback for the togglePneumatic function, so it is run when a button is pressed. Put the following code <mark style="color:green;">**in the main function**</mark>, like so:

```cpp
int main() {
  //Initializing Robot Configuration. DO NOT REMOVE!
  vexcodeInit();
  
  //Set up the pneumatic toggle callback
  Controller1.ButtonX.pressed(togglePneumatic); 

  //there may be more code below, leave it be
}
```

That's it! Now you have code that activates and deactivates the pneumatics at the press of a button!
