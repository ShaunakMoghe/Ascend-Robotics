# 🖥️ Getting Started

We'll show you how to get started coding the robot using VEXCode Pro and C++

First, download [VEXCode Pro](https://www.vexrobotics.com/vexcode/pro-v5) and install it. Then, open the program and create a new project.

### Start Coding

Let's write a simple C++ program to set up the robot:

<pre class="language-cpp"><code class="lang-cpp"><strong>#include "vex.h" 
</strong>
using namespace vex;

int main() {
    vexcodeInit(); //leave this line here! Everything else has to come after it.
    
    //prevent the main loop from exiting
    while(true) {
        wait(20, msec);
    }
}
</code></pre>

In this code:

* We include the necessary VEX header file, `"vex.h"`, to access VEX V5 API functions and classes.
* We add `using namespace vex;` to reference vex motors and classes natively.
* We create the `main` function, which is run when the program is started.
* We call the `vexcodeInit` function--always do this.
* We use the `wait` function in a while loop to prevent the code from exiting before the robot can do anything

### Building and Downloading Your Code

1. Connect your V5 Brain to your robot and turn it on.
2. Connect your computer to the V5 Brain using a USB cable.
3. Click on the "Download" button (at the top right) to transfer your code to the V5 Brain.

Note that the code above doesn't make the robot do anything quite yet; it is just a foundation to build on. Your first order of business should be coding the drivetrain. See this article:

{% content-ref url="drive-code.md" %}
[drive-code.md](drive-code.md)
{% endcontent-ref %}

### Expanding Your Knowledge

Now that you've successfully programmed your VEX V5 robot to perform a simple task, you can expand your knowledge by exploring the VEX V5 C++ API and trying out different sensors and motor configurations. The VEX V5 C++ API documentation provides detailed information about classes and functions you can use to control your robot.

{% embed url="https://www.robotmesh.com/studio/content/docs/vexv5-cpp/html/namespacevex.html" %}

**Note:** C++ is not an easy language to learn and it is often used by the most highly skilled programmers. Expect to fail many times, it is normal.&#x20;
