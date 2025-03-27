let outputDisplay = document.getElementById("outputDisplay");

function appendToOutputDisplay(value){
    outputDisplay.value += value;
}

function clearDisplay(){
    outputDisplay.value = "";
}

function calculate(){
    try {
        let result = eval(outputDisplay.value);
        outputDisplay.value = result;
    } catch (error) {
        outputDisplay.value = "Error";
    }
}
