var canvas = find('canvas');

var backBuffer = [];

function find(s) {
  return document.getElementById(s);
}

var ctx = canvas.getContext('2d');
var currentInterval;
ctx.imageSmoothingEnabled = true;
resizeWindow();

window.addEventListener("resize", () => {
  resizeWindow();
});

function resizeWindow() {
  //canvas.width = window.innerWidth //50 is for the right side bar
  //canvas.height = window.innerHeight;
}



// hsl to rgb conversion
//not mine - https://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
function hslToRgb(h, s, l) {
  var r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    var hue2rgb = function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    }

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

//now add hexadecimal support
function HexToRGB(s) {
  //takes a hexadecimal color and converts it to rgb
  return {
    r: HexToDecimal(s[1] + s[2]),
    g: HexToDecimal(s[3] + s[4]),
    b: HexToDecimal(s[5] + s[6])
  };
}

function HexToDecimal(s) {
  //used only within the context of the function above
  //converts a two-letter string like "3a" to decimal, "58"
  var hex = "0123456789abcdef";
  return hex.indexOf(s[0]) * 16 + hex.indexOf(s[1]);
}

//these two functions below are the functions above but inverted
function RGBToHex(r) {
  //takes a rgb color and converts it to hex
  return "#" + DecimalToHex(r.r) + DecimalToHex(r.g) + DecimalToHex(r.b);
}

var red = "#d1303e";
var blue = "#3048d1";
var yellow = "#e3e32d";
//843 by 843 pixels
//field is 140.5 inches wide
//so 6 pixels for each inch
var size = 843;
//the position of the discs is fairly simple, measured in tile units:
//0, 0 is the top left corner of the top left tile
//1, 1, is the bottom right corner of the top left tile
//5, 1 is touching the blue high goal

renderField();

function renderField() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#717778";
  ctx.fillRect(0, 0, size, size);

  //now mark the tiles
  ctx.fillStyle = "#505154";
  for (var i = 1; i < 6; i++) {
  	ctx.fillRect(0, i * size / 6 - 1, size, 2);
  	ctx.fillRect(i * size / 6 - 1, 0, 2, size);
  }
  
  
  //draw barrier
  ctx.fillStyle = "#111111";//black
  ctx.fillRect(size / 2 - 7, size / 6, 14, size * 2 /3);
  ctx.fillRect(size / 3 - 7, size / 6 - 7, size * 1 / 3 + 14, 14);
  ctx.fillRect(size / 3 - 7, size * 5 / 6 - 7, size * 1 / 3 + 14, 14);
  
    
  //draw match load bars
  ctx.strokeStyle = blue;
  ctx.lineWidth = 13;
  ctx.beginPath(); 
  ctx.moveTo(size * 5 / 6 + 7, 7);
  ctx.lineTo(size - 7, size * 1 / 6 - 7);
  ctx.stroke();
  ctx.moveTo(size * 5 / 6 + 7, size - 7);
  ctx.lineTo(size - 7, size * 5 / 6 + 7);
  ctx.stroke();
  
  ctx.strokeStyle = red;
  ctx.lineWidth = 13;
  ctx.beginPath(); 
  ctx.moveTo(size * 1 / 6 - 7, 7);
  ctx.lineTo(7, size * 1 / 6 - 7);
  ctx.stroke();
  ctx.moveTo(size * 1 / 6 - 7, size - 7);
  ctx.lineTo(7, size * 5 / 6 + 7);
  ctx.stroke();
  
  //draw nets
  
  //start with cones
  ctx.fillStyle = blue;
  ctx.beginPath();
  ctx.arc(size / 6, size / 3, 18, 0, 2 * Math.PI);    
  ctx.fill();
  ctx.beginPath();
  ctx.arc(size / 6, size * 2 / 3, 18, 0, 2 * Math.PI);    
  ctx.fill();
  
  ctx.fillStyle = red;
  ctx.beginPath();
  ctx.arc(size * 5 / 6, size / 3, 18, 0, 2 * Math.PI);    
  ctx.fill();
  ctx.beginPath();
  ctx.arc(size * 5 / 6, size * 2 / 3, 18, 0, 2 * Math.PI);    
  ctx.fill();
  
  //now draw black bars, width of 6
  ctx.fillStyle = "#111111";
  ctx.fillRect(size / 6 - 3, size * 1 / 3 - 3, 6, size * 1 / 3 + 6);
  ctx.fillRect(0, size * 1 / 3 - 3, size / 6, 6);
  ctx.fillRect(0, size * 2 / 3 - 3, size / 6, 6);
  
  ctx.fillRect(size * 5 / 6 - 3, size * 1 / 3 - 3, 6, size * 1 / 3 + 6);
  ctx.fillRect(size * 5 / 6, size * 1 / 3 - 3, size / 6, 6);
  ctx.fillRect(size * 5 / 6, size * 2 / 3 - 3, size / 6, 6);
    
  //now draw nets
  ctx.fillStyle = red;
  let netSpace = 10;
  //horizontal lines
  for (let i = size / 3 + 10; i < size * 2 / 3 - 3; i+= netSpace){
    ctx.fillStyle = blue;
    ctx.fillRect(-3, i, size / 6, 1);//left net
    ctx.fillStyle = red;
    ctx.fillRect(size * 5 / 6 + 3, i, size / 6 - 3, 1);//right net
  }
  
  //vertical lines
  for (let i = 5; i < size * 1 / 6 - 3; i+= netSpace){
    ctx.fillStyle = blue;
    ctx.fillRect(i, size * 1 / 3 + 3, 1, size * 1 / 3 - 6);//left net 
    ctx.fillStyle = red;
    ctx.fillRect(size - i, size * 1 / 3 + 3, 1, size * 1 / 3 - 6);//right net
  }
}

//now make it a game
var pos = {x: .5, y: 1.5, angle: Math.PI / 2};
//keep track of which keys are held down for movement purposes
var keyDown = {w: false, a: false, s: false, d: false};
var velocity = {x: 0, y: 0};
var turnVelocity = 0;

//movement value (determine experimentally from a physical robot)

var speed;
var turnSpeed;
var maxSpeed;
var maxTurnSpeed;

//basic variables for the 450 RPM on 2.75" drive, the default
var baseSpeed = .005898;
var baseTurnSpeed = .01306;
var baseMaxSpeed = 0.0813;
var baseMaxTurnSpeed = 0.2915;

setTimeout(() => {
    setInterval(() => {
      //main loop
      renderField();
      renderRobot(pos.x, pos.y, pos.angle);
      
    
      //forward
      if (keyDown.w) {
        velocity.x += speed * Math.cos(pos.angle - Math.PI / 2);
        velocity.y += speed * Math.sin(pos.angle - Math.PI / 2);
      }
      //backward
      if (keyDown.s) {
        velocity.x -= speed * Math.cos(pos.angle - Math.PI / 2);
        velocity.y -= speed * Math.sin(pos.angle - Math.PI / 2);
      }
      //turning
      if (keyDown.a) {
        turnVelocity -= turnSpeed;
      }
      if (keyDown.d) {
        turnVelocity += turnSpeed;
      }
     
      //clamp velocities
      if ((velocity.x * velocity.x) + (velocity.y * velocity.y) > maxSpeed * maxSpeed) {
          var ratio = Math.sqrt(((velocity.x * velocity.x) + (velocity.y * velocity.y))) / (maxSpeed);
          velocity.x = velocity.x / ratio;
          velocity.y = velocity.y / ratio;
      }
      
      if (turnVelocity > maxTurnSpeed) {
          turnVelocity = maxTurnSpeed;
      }
      if (turnVelocity < maxTurnSpeed * -1) {
          turnVelocity = maxTurnSpeed * -1;
      }
      
      //apply movements
      pos.x += velocity.x;
      pos.y += velocity.y;
      pos.angle += turnVelocity;
      
      //detract from velocity over time
      velocity.x = 0.9 * velocity.x;
      velocity.y = 0.9 * velocity.y;
      turnVelocity *= 0.87;
      
      if (velocity.x > 1 || velocity.x < -1) {
          velocity.x *= 0.6;
      }
      if (velocity.y > 1 || velocity.y < -1) {
          velocity.y *= 0.6;
      }
      
      console.log(velocity);
      
      //clamp robot's position
      if (pos.x > 6) pos.x = 6;
      if (pos.y > 6) pos.y = 6;
      if (pos.x < 0) pos.x = 0;
      if (pos.y < 0) pos.y = 0;
    
    }, 30);
}, 500);
    

document.addEventListener("keydown", keyDown1);
document.addEventListener("keyup", keyUp1);

function keyDown1 (e) {
  e = e || window.event;
  if (e.keyCode == 87) {
    keyDown.w = true;
  } else if (e.keyCode == 65) {
    keyDown.a = true;
  } else if (e.keyCode == 83) {
    keyDown.s = true;
  } else if (e.keyCode == 68) {
    keyDown.d = true;
  } else if (e.keyCode == 32) {
    //space bar, shoot a disc
    shootDisc();
  }
};

function keyUp1 (e) {
    e = e || window.event;
    if (e.keyCode == 87) {
      keyDown.w = false;
    } else if (e.keyCode == 65) {
      keyDown.a = false;
    } else if (e.keyCode == 83) {
      keyDown.s = false;
    } else if (e.keyCode == 68) {
      keyDown.d = false;
    }
};



function renderRobot(x, y, angle) {
  //x, y should be in unit tiles (1, 1 is bottom right corner of top left tile)
  //angle in radians, bearing angle
  var img = document.getElementById("robot");

  //first handle rotation
  ctx.save();
  ctx.translate(x * size / 6, y * size / 6);
  ctx.rotate(angle);
  //assume robot is about 17" wide or 102 pixels
  ctx.drawImage(img, -51, -51, 102, 102);
  //revert transformation matrix back
  ctx.restore();
  
  //draw elevation bars
  ctx.fillStyle = blue;
  ctx.fillRect(size / 2 - 7, 0, 14, size * 1 / 6 + 7);
  
  
  ctx.fillStyle = red;
  ctx.fillRect(size / 2 - 7, size * 5 / 6 - 7, 14, size * 1 / 6 + 7);

}

//set the internal drive variables to match a certain drive, roughly
function setDrive(rpm, motors, size) {
    //rpm is the rpm, motors is the number of motors, and size is wheel size
    let relativeLinearSpeed = rpm * size / (450 * 2.75);

    speed = baseSpeed * (1 + (relativeLinearSpeed - 1) / 3);
    maxSpeed = baseMaxSpeed * relativeLinearSpeed;
    turnSpeed = baseTurnSpeed * (1 + (relativeLinearSpeed - 1) / 3)
    maxTurnSpeed = baseMaxTurnSpeed * relativeLinearSpeed;
    
    //apply motor difference
    let relativePower = motors / 6;
    maxSpeed *= (relativePower + 2) / 3;
    maxTurnSpeed *= (relativePower + 2) / 3;
    
    speed *= relativePower;
    turnSpeed *= relativePower;
}

function updateValues() {
    //update the drive simulator physics values to match the user's input
    let rpm = find("rpmInput").value;
    let motors = find("motorInput").value;
    let size = find("wheelInput").value;
    
    setDrive(rpm, motors, size);
}

setDrive(450, 6, 2.75);