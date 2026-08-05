// ============================================
// CIVIL BBS CALCULATOR - bbs.js
// ============================================


// ============================================
// BAR SHAPE PREVIEW
// ============================================

function changeBarShape(selectBox){

    let preview = selectBox.parentElement.querySelector(".shape-preview");

    if(preview){

        preview.className = "shape-preview";

        preview.classList.add(selectBox.value + "-shape");

    }

}




// ============================================
// MAIN BBS FORMULA
// ALL LENGTHS IN mm
// ============================================

function calculateBBS(
    diameter,
    straightLength,
    bendHeight,
    numberOfBends,
    lapLength,
    numberOfLaps,
    barsPerSet,
    numberOfSets
){


    let bendingCorrection =
        numberOfBends * 2.5 * diameter;


    let totalLapLength =
        lapLength * numberOfLaps;


    let overallLength =
        straightLength +
        bendHeight +
        totalLapLength -
        bendingCorrection;


    let totalBars =
        barsPerSet * numberOfSets;


    let totalLength =
        (overallLength * totalBars) / 1000;


    let unitWeight =
        (diameter * diameter) / 162;


    let totalWeight =
        totalLength * unitWeight;



    return {

        bendingCorrection,
        overallLength,
        totalBars,
        totalLength,
        unitWeight,
        totalWeight

    };

}





// ============================================
// CALCULATE ROW
// ============================================

function calculateRow(row){


    let input =
    row.querySelectorAll("input[type='number']");


    if(input.length < 15){

        return;

    }



    let diameter =
    Number(input[0].value) || 0;


    let straightLength =
    Number(input[2].value) || 0;


    let bendHeight =
    Number(input[3].value) || 0;


    let numberOfBends =
    Number(input[4].value) || 0;


    let lapLength =
    Number(input[6].value) || 0;


    let numberOfLaps =
    Number(input[7].value) || 0;


    let barsPerSet =
    Number(input[9].value) || 0;


    let numberOfSets =
    Number(input[10].value) || 0;




    let result =
    calculateBBS(
        diameter,
        straightLength,
        bendHeight,
        numberOfBends,
        lapLength,
        numberOfLaps,
        barsPerSet,
        numberOfSets
    );



    // OUTPUT

    input[5].value =
    result.bendingCorrection.toFixed(2);


    input[8].value =
    result.overallLength.toFixed(2);


    input[11].value =
    result.totalBars;


    input[12].value =
    result.totalLength.toFixed(3);


    input[13].value =
    result.unitWeight.toFixed(3);


    input[14].value =
    result.totalWeight.toFixed(2);


}






// ============================================
// CALCULATE BUTTONS
// ============================================


function calculateFooting(){

    document
    .querySelectorAll("#footingBody tr")
    .forEach(function(row){

        calculateRow(row);

    });

}



function calculateColumn(){

    document
    .querySelectorAll("#columnBody tr")
    .forEach(function(row){

        calculateRow(row);

    });

}



function calculateBeam(){

    document
    .querySelectorAll("#beamBody tr")
    .forEach(function(row){

        calculateRow(row);

    });

}








// ============================================
// ADD MORE ROW
// ============================================


let footingCount = 1;


function addFootingRow(){

    footingCount++;


    let body =
    document.getElementById("footingBody");


    let row =
    body.rows[0].cloneNode(true);



    row.querySelectorAll("input")
    .forEach(function(input){

        input.value="";

    });



    row.querySelector("input").value =
    "F" + footingCount;



    body.appendChild(row);

}






let columnCount = 1;


function addColumnRow(){

    columnCount++;


    let body =
    document.getElementById("columnBody");


    let row =
    body.rows[0].cloneNode(true);



    row.querySelectorAll("input")
    .forEach(function(input){

        input.value="";

    });



    row.querySelector("input").value =
    "C" + columnCount;



    body.appendChild(row);

}






let beamCount = 1;


function addBeamRow(){

    beamCount++;


    let body =
    document.getElementById("beamBody");


    let row =
    body.rows[0].cloneNode(true);



    row.querySelectorAll("input")
    .forEach(function(input){

        input.value="";

    });



    row.querySelector("input").value =
    "B" + beamCount;



    body.appendChild(row);

}








// ============================================
// EXPORT TO NOTEPAD
// ============================================


function exportBBS(){


let report = "";


report += "BAR BENDING SCHEDULE (BBS)\n";
report += "====================================\n";



function exportSection(title,id){


report += "\n\n" + title + "\n";
report += "====================================\n";



document
.querySelectorAll("#"+id+" tr")
.forEach(function(row){



let td =
row.querySelectorAll("td");


let input =
row.querySelectorAll(
"input[type='number']"
);



let text =
row.querySelectorAll(
"input[type='text']"
);



report += "\nBar Mark : "
+ (text[0]?.value || "");


report += "\nBar Description : "
+ (text[1]?.value || "");



report += "\n\nINPUT VALUES\n";


report += "Diameter = "
+ input[0].value
+ " mm\n";


report += "Spacing = "
+ input[1].value
+ " mm\n";


report += "Straight Length = "
+ input[2].value
+ " mm\n";


report += "Bend Height = "
+ input[3].value
+ " mm\n";


report += "Number of Bends = "
+ input[4].value
+ "\n";


report += "Bending Correction = "
+ input[5].value
+ " mm\n";


report += "Lap Length = "
+ input[6].value
+ " mm\n";


report += "Number of Laps = "
+ input[7].value
+ "\n";



report += "\nCALCULATION\n";


report += "Overall Length = "
+ input[8].value
+ " mm\n";


report += "Total Bars = "
+ input[11].value
+ " Nos\n";


report += "Total Length = "
+ input[12].value
+ " m\n";


report += "Unit Weight = "
+ input[13].value
+ " kg/m\n";


report += "Total Steel Weight = "
+ input[14].value
+ " kg\n";


report += "\n------------------------------------\n";


});


}



exportSection(
"FOOTING BBS",
"footingBody"
);


exportSection(
"COLUMN BBS",
"columnBody"
);


exportSection(
"BEAM BBS",
"beamBody"
);



report += "\nEND OF REPORT";



let blob =
new Blob(
[report],
{
type:"text/plain"
}
);



let link =
document.createElement("a");


link.href =
URL.createObjectURL(blob);


link.download =
"BBS_Calculation_Report.txt";


link.click();


}