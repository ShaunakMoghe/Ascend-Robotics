var reuslt = 0.000;
document.addEventListener("keydown", () => {
    setTimeout(() => {
        console.log("b");
        var outputBox = document.getElementById("outPutBox");
        var f = parseFloat(document.getElementById("inputBox1").value);
        var d = parseFloat(document.getElementById("inputBox2").value);
        var theta = parseFloat(document.getElementById("inputBox3").value);
        
        if (!isNaN(f) && !isNaN(d) && !isNaN(theta)) {
            var forceUnit = document.getElementById("force-units").value;
            var dUnit = document.getElementById("d-units").value;
            var torqueUnit = "";
            
            if(forceUnit === "lbf" && dUnit === "m"){
                torqueUnit = "Pounds-Force • Meters";
            }
            if(forceUnit === "lbf" && dUnit === "cm"){
                torqueUnit = "Pounds-Force • Centimeters";
            }
            if(forceUnit === "lbf" && dUnit === "ft"){
                torqueUnit = "Pounds-Force • Feet";
            }
            if(forceUnit === "lbf" && dUnit === "in"){
                torqueUnit = "Pounds-Force • Inches";
            }
            if(forceUnit === "N" && dUnit === "m"){
                torqueUnit = "Newtons • Meters";
            }
            if(forceUnit === "N" && dUnit === "cm"){
                torqueUnit = "Newtons • Centimeters";
            }
            if(forceUnit === "N" && dUnit === "ft"){
                torqueUnit = "Newtons • Feet";
            }
            if(forceUnit === "N" && dUnit === "in"){
                torqueUnit = "Newtons • Inches";
            }
            
            result = f * d * Math.sin(theta * (Math.PI / 180));
            result = result.toFixed(3);
            result = result.toString();
            var final = result + " " + torqueUnit;
            console.log(torqueUnit);
            outputBox.value = final;
        }
    }, 20);
});

document.addEventListener("click", () => {
    //setTimeout(() => {
        console.log("b");
        var outputBox = document.getElementById("outPutBox");
        var f = parseFloat(document.getElementById("inputBox1").value);
        var d = parseFloat(document.getElementById("inputBox2").value);
        var theta = parseFloat(document.getElementById("inputBox3").value);
        var pounds_newtons = 4.44822;
        var feet_meters = 0.3048;
        var inches_meters = 0.0254;
        var centimeters_meters = 0.01;
        var angle = document.getElementById("angle-units");
        
        if (!isNaN(f) && !isNaN(d) && !isNaN(theta)) {
            var forceUnit = document.getElementById("force-units").value;
            var dUnit = document.getElementById("d-units").value;
            var torqueU = document.getElementById("torque-units").value;
            var torqueUnit = "";
            
            if((forceUnit === "lbf" && dUnit === "m") || (torqueU === "pm")){
                torqueUnit = "Pounds-Force • Meters";
            }
            if((forceUnit === "lbf" && dUnit === "cm") || (torqueU === "pc")){
                torqueUnit = "Pounds-Force • Centimeters";
            }
            if((forceUnit === "lbf" && dUnit === "ft") || (torqueU === "pf")){
                torqueUnit = "Pounds-Force • Feet";
            }
            if((forceUnit === "lbf" && dUnit === "in") || (torqueU === "pi")){
                torqueUnit = "Pounds-Force • Inches";
            }
            if((forceUnit === "N" && dUnit === "m") || (torqueU === "nm")){
                torqueUnit = "Newtons • Meters";
            }
            if((forceUnit === "N" && dUnit === "cm") || (torqueU === "nc")){
                torqueUnit = "Newtons • Centimeters";
            }
            if((forceUnit === "N" && dUnit === "ft") || (torqueU === "nf")){
                torqueUnit = "Newtons • Feet";
            }
            if((forceUnit === "N" && dUnit === "in") || (torqueU === "ni")){
                torqueUnit = "Newtons • Inches";
            }
            
            
            result = f * d * Math.sin(theta * (Math.PI / 180));
            
            //convert units
            //convert force units
            
            if((forceUnit === "lbf") && torqueU.substring(0,1) === "n"){
                result = result * pounds_newtons;
            }
            if((forceUnit === "N") && torqueU.substring(0,1) === "p"){
                result = result / pounds_newtons;
            }
            //convert distance units
            //convert centimeters-meters
            if((dUnit.substring(0,1) === "m") && torqueU.substring(1,2) === "c"){
                result = result / centimeters_meters;
            }
            if((dUnit.substring(0,1) === "c") && torqueU.substring(1,2) != "m" && torqueU.substring(1,2) != "c"){
                result = result * centimeters_meters;
                if((torqueU.substring(1,2) === "f")){
                    result = result / feet_meters;
                }
            
                if((torqueU.substring(1,2) === "i")){
                    result = result / inches_meters;
                }
            
            }
            //convert feet-meters
            if((dUnit.substring(0,1) === "m") && torqueU.substring(1,2) === "f"){
                result = result / feet_meters;
            }
            if((dUnit.substring(0,1) === "f") && torqueU.substring(1,2) != "m" && torqueU.substring(1,2) != "f"){
                result = result * feet_meters;
                if((torqueU.substring(1,2) === "c")){
                    result = result / centimeters_meters;
                }
                if((torqueU.substring(1,2) === "i")){
                    result = result / inches_meters;
                }
            
            }
            
            //convert inches-meters
            if((dUnit.substring(0,1) === "m") && torqueU.substring(1,2) === "i"){
                result = result / inches_meters;
            }
            if((dUnit.substring(0,1) === "i") && torqueU.substring(1,2) != "m" && torqueU.substring(1,2) != "i"){
                result = result * inches_meters;
                if((torqueU.substring(1,2) === "c")){
                    result = result / centimeters_meters;
                }
            
                if((torqueU.substring(1,2) === "f")){
                    result = result / feet_meters;
                }
            }
            
            }

            setTimeout(() => {
            console.log(result);
            if(result){
                result = result.toFixed(3);
                result = result.toString();
                var final = result + " " + torqueUnit;
                console.log(torqueUnit);
                outputBox.value = final;
            }
            }, 20);
        
        
        
    //}, 20);
});

document.getElementById("angle-units").addEventListener("change", () => {
        setTimeout(() => {
            console.log("r");
            var outputBox = document.getElementById("outPutBox");
            var f = parseFloat(document.getElementById("inputBox1").value);
            var d = parseFloat(document.getElementById("inputBox2").value);
            var theta = parseFloat(document.getElementById("inputBox3").value);
            var pounds_newtons = 4.44822;
            var feet_meters = 0.3048;
            var inches_meters = 0.0254;
            var centimeters_meters = 0.01;
            var angle = document.getElementById("angle-units");
            
            if (!isNaN(f) && !isNaN(d) && !isNaN(theta)) {
                var forceUnit = document.getElementById("force-units").value;
                var dUnit = document.getElementById("d-units").value;
                var torqueU = document.getElementById("torque-units").value;
                var torqueUnit = "";
                
                if((forceUnit === "lbf" && dUnit === "m") || (torqueU === "pm")){
                    torqueUnit = "Pounds-Force • Meters";
                }
                if((forceUnit === "lbf" && dUnit === "cm") || (torqueU === "pc")){
                    torqueUnit = "Pounds-Force • Centimeters";
                }
                if((forceUnit === "lbf" && dUnit === "ft") || (torqueU === "pf")){
                    torqueUnit = "Pounds-Force • Feet";
                }
                if((forceUnit === "lbf" && dUnit === "in") || (torqueU === "pi")){
                    torqueUnit = "Pounds-Force • Inches";
                }
                if((forceUnit === "N" && dUnit === "m") || (torqueU === "nm")){
                    torqueUnit = "Newtons • Meters";
                }
                if((forceUnit === "N" && dUnit === "cm") || (torqueU === "nc")){
                    torqueUnit = "Newtons • Centimeters";
                }
                if((forceUnit === "N" && dUnit === "ft") || (torqueU === "nf")){
                    torqueUnit = "Newtons • Feet";
                }
                if((forceUnit === "N" && dUnit === "in") || (torqueU === "ni")){
                    torqueUnit = "Newtons • Inches";
                }
                
                if(document.getElementById("angle-units").value === "d"){
                    result = f * d * Math.sin(theta * (Math.PI/180));
                }
                if(document.getElementById("angle-units").value === "r"){
                    result = f * d * Math.sin(theta);
                }
                
                
                //convert units
                //convert force units
                
                if((forceUnit === "lbf") && torqueU.substring(0,1) === "n"){
                    result = result * pounds_newtons;
                }
                if((forceUnit === "N") && torqueU.substring(0,1) === "p"){
                    result = result / pounds_newtons;
                }
                //convert distance units
                //convert centimeters-meters
                if((dUnit.substring(0,1) === "m") && torqueU.substring(1,2) === "c"){
                    result = result / centimeters_meters;
                }
                if((dUnit.substring(0,1) === "c") && torqueU.substring(1,2) != "m" && torqueU.substring(1,2) != "c"){
                    result = result * centimeters_meters;
                    if((torqueU.substring(1,2) === "f")){
                        result = result / feet_meters;
                    }
                
                    if((torqueU.substring(1,2) === "i")){
                        result = result / inches_meters;
                    }
                
                }
                //convert feet-meters
                if((dUnit.substring(0,1) === "m") && torqueU.substring(1,2) === "f"){
                    result = result / feet_meters;
                }
                if((dUnit.substring(0,1) === "f") && torqueU.substring(1,2) != "m" && torqueU.substring(1,2) != "f"){
                    result = result * feet_meters;
                    if((torqueU.substring(1,2) === "c")){
                        result = result / centimeters_meters;
                    }
                    if((torqueU.substring(1,2) === "i")){
                        result = result / inches_meters;
                    }
                
                }
                
                //convert inches-meters
                if((dUnit.substring(0,1) === "m") && torqueU.substring(1,2) === "i"){
                    result = result / inches_meters;
                }
                if((dUnit.substring(0,1) === "i") && torqueU.substring(1,2) != "m" && torqueU.substring(1,2) != "i"){
                    result = result * inches_meters;
                    if((torqueU.substring(1,2) === "c")){
                        result = result / centimeters_meters;
                    }
                
                    if((torqueU.substring(1,2) === "f")){
                        result = result / feet_meters;
                    }
                }
                
                }
    
            
            console.log(result);
            if(result){
                result = result.toFixed(3);
                result = result.toString();
                var final = result + " " + torqueUnit;
                console.log(torqueUnit);
                outputBox.value = final;
            }
        }, 40);
        
});