/*=====================================================
 Civil Engineering Calculator Suite
 script.js
======================================================*/

/*=====================================================
 BBS CALCULATOR
 Formula:
 Unit Weight = D² / 162
======================================================*/

function calculateBBS() {

    let dia = parseFloat(document.getElementById("diameter").value);
    let bars = parseFloat(document.getElementById("bars").value);
    let length = parseFloat(document.getElementById("length").value);
    let rate = parseFloat(document.getElementById("steelRate").value);

    if (isNaN(dia) || isNaN(bars) || isNaN(length)) {
        alert("Please enter all required values.");
        return;
    }

    if (isNaN(rate))
        rate = 0;

    let totalLength = bars * length;

    let unitWeight = (dia * dia) / 162;

    let totalWeight = unitWeight * totalLength;

    let totalCost = totalWeight * rate;

    document.getElementById("unitWeight").innerHTML =
        unitWeight.toFixed(3) + " kg/m";

    document.getElementById("totalLength").innerHTML =
        totalLength.toFixed(2) + " m";

    document.getElementById("totalWeight").innerHTML =
        totalWeight.toFixed(2) + " kg";

    document.getElementById("steelCost").innerHTML =
        "₹ " + totalCost.toFixed(2);
}


/*=====================================================
 COST ESTIMATION
======================================================*/

function calculateCost(){

    let cementQty = Number(document.getElementById("cementQty").value);
    let cementRate = Number(document.getElementById("cementRate").value);

    let sandQty = Number(document.getElementById("sandQty").value);
    let sandRate = Number(document.getElementById("sandRate").value);

    let aggQty = Number(document.getElementById("aggQty").value);
    let aggRate = Number(document.getElementById("aggRate").value);

    let steelQty = Number(document.getElementById("steelQty").value);
    let steelRate = Number(document.getElementById("steelRateCost").value);

    let labour = Number(document.getElementById("labour").value);

    let cementCost = cementQty * cementRate;
    let sandCost = sandQty * sandRate;
    let aggregateCost = aggQty * aggRate;
    let steelCost = steelQty * steelRate;

    let total =
        cementCost +
        sandCost +
        aggregateCost +
        steelCost +
        labour;

    document.getElementById("cementCost").innerHTML =
        "₹ " + cementCost.toFixed(2);

    document.getElementById("sandCost").innerHTML =
        "₹ " + sandCost.toFixed(2);

    document.getElementById("aggregateCost").innerHTML =
        "₹ " + aggregateCost.toFixed(2);

    document.getElementById("steelMaterialCost").innerHTML =
        "₹ " + steelCost.toFixed(2);

    document.getElementById("grandTotal").innerHTML =
        "₹ " + total.toFixed(2);
}


/*=====================================================
 RESET BBS
======================================================*/

function resetBBS(){

    document.getElementById("diameter").value="";
    document.getElementById("bars").value="";
    document.getElementById("length").value="";
    document.getElementById("steelRate").value="";

    document.getElementById("unitWeight").innerHTML="-";
    document.getElementById("totalLength").innerHTML="-";
    document.getElementById("totalWeight").innerHTML="-";
    document.getElementById("steelCost").innerHTML="-";
}


/*=====================================================
 RESET COST ESTIMATION
======================================================*/

function resetCost(){

    let ids=[
        "cementQty",
        "cementRate",
        "sandQty",
        "sandRate",
        "aggQty",
        "aggRate",
        "steelQty",
        "steelRateCost",
        "labour"
    ];

    ids.forEach(function(id){
        document.getElementById(id).value="";
    });

    document.getElementById("cementCost").innerHTML="-";
    document.getElementById("sandCost").innerHTML="-";
    document.getElementById("aggregateCost").innerHTML="-";
    document.getElementById("steelMaterialCost").innerHTML="-";
    document.getElementById("grandTotal").innerHTML="-";
}


/*=====================================================
 PRINT PAGE
======================================================*/

function printReport(){
    window.print();
}


/*=====================================================
 DOWNLOAD RESULT AS TEXT FILE
======================================================*/

function downloadReport(filename, content){

    const blob = new Blob([content], {
        type: "text/plain"
    });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = filename;

    link.click();

    URL.revokeObjectURL(link.href);
}


/*=====================================================
 DOWNLOAD BBS REPORT
======================================================*/

function downloadBBS(){

    let report =
`========== BBS REPORT ==========

Bar Diameter : ${document.getElementById("diameter").value} mm

No. of Bars : ${document.getElementById("bars").value}

Length/Bar : ${document.getElementById("length").value} m

Unit Weight : ${document.getElementById("unitWeight").innerHTML}

Total Length : ${document.getElementById("totalLength").innerHTML}

Total Weight : ${document.getElementById("totalWeight").innerHTML}

Steel Cost : ${document.getElementById("steelCost").innerHTML}
`;

    downloadReport("BBS_Report.txt", report);
}


/*=====================================================
 DOWNLOAD COST REPORT
======================================================*/

function downloadCost(){

    let report =
`========== COST ESTIMATION ==========

Cement Cost : ${document.getElementById("cementCost").innerHTML}

Sand Cost : ${document.getElementById("sandCost").innerHTML}

Aggregate Cost : ${document.getElementById("aggregateCost").innerHTML}

Steel Cost : ${document.getElementById("steelMaterialCost").innerHTML}

Grand Total : ${document.getElementById("grandTotal").innerHTML}
`;

    downloadReport("Cost_Estimation.txt", report);
}
