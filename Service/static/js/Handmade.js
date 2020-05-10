function comp(x) {
    // alert("sdfadfasdfasdfqwefsdaf");
    clearCache();
    var xmlHttp = new XMLHttpRequest();
    var url = "/comp" + "?ops=" + x;
    // document.getElementById('whatis').scrollIntoView();
    // loading();
    xmlHttp.open("GET", url, true);
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var responseText = xmlHttp.responseText;
            var obj = JSON.parse(responseText);
            var compName = obj['res'];
            var closePrice = obj['close'];
            var highPrice = obj['High'];
            var lowPrice = obj['Low'];
            var volume = obj['Volume'];
            var alldate = obj['allDate'];
            var ema12 = obj['ema12'];
            var ema26 = obj['ema26'];
            var diff = obj['diff'];
            var dea = obj['dea'];
            var highest = obj['highest'];
            var avg = obj['avg'];
            var lowest = obj['lowest'];
            var advice = obj['advice'];
            var date1 = []

            for (var i = 0; i < alldate.length; i++) {
                date1.push(alldate[i]);
            }
            var allClose = obj['allClose'];
            var data1 = []
            for (var i = 0; i < allClose.length; i++) {
                data1.push(allClose[i]);
            }

            var ema12_data = []
            for (var i = 0; i < ema12.length; i++) {
                ema12_data.push(ema12[i]);
            }

            var ema26_data = []
            for (var i = 0; i < ema26.length; i++) {
                ema26_data.push(ema26[i]);
            }

            var diff_data = []
            for (var i = 0; i < diff.length; i++) {
                diff_data.push(diff[i]);
            }

            var dea_data = []
            for (var i = 0; i < dea.length; i++) {
                dea_data.push(dea[i]);
            }

            // pred part
            var pred=obj['pred'];
            var pred0=pred[0].toFixed(3);
            var pred1=pred[1].toFixed(3);
            var pred2=pred[2].toFixed(3);

            // document.getElementById("result").innerHTML = data;
            if (true) {
                document.getElementById("compname").innerHTML = compName;
                document.getElementById("Close").innerHTML = closePrice.toFixed(3);
                document.getElementById("High").innerHTML = highPrice.toFixed(3);
                document.getElementById("Low").innerHTML = lowPrice.toFixed(3);
                document.getElementById("Volume").innerHTML = volume;
                document.getElementById("pred0").innerHTML = pred0;
                document.getElementById("pred1").innerHTML = pred1;
                document.getElementById("pred2").innerHTML = pred2;
                document.getElementById("Highest").innerHTML = highest.toFixed(3);
                document.getElementById("Avg").innerHTML = avg.toFixed(3);
                document.getElementById("Lowest").innerHTML = lowest.toFixed(3);
                document.getElementById("advice").innerHTML = advice;

                // alert("display")
            }
            //  Chart Part
            var data_a = {
                labels: date1,
                datasets: [{
                    label: ' close price',
                    data: data1,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgb(255,99,132)',
                    ],
                    borderWidth: 1,
                    fill: false
                },
                {
                    label: ' ema12',
                    data: ema12_data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgb(99,138,255)',
                    ],
                    borderWidth: 1,
                    fill: false
                },
                {
                    label: ' diff',
                    data: diff_data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgb(255,211,99)',
                    ],
                    borderWidth: 1,
                    fill: false
                },
                {
                    label: ' dea',
                    data: dea,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgb(182,99,255)',
                    ],
                    borderWidth: 1,
                    fill: false
                }

                ]
            };

            var options = {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                legend: {
                    display: false
                },
                elements: {
                    point: {
                        radius: 0
                    }
                }

            };
            // Get context with jQuery - using jQuery's .get() method.
            if ($("#barChart").length) {
                var barChartCanvas = $("#barChart").get(0).getContext("2d");
                // This will get the first returned node in the jQuery collection.
                var barChart = new Chart(barChartCanvas, {
                    type: 'bar',
                    data: data,
                    options: options
                });
            }

            if ($("#myChart").length) {
                var lineChartCanvas = $("#myChart").get(0).getContext("2d");
                var lineChart = new Chart(lineChartCanvas, {
                    type: 'line',
                    data: data_a,
                    options: options
                });
            }

            if ($("#linechart-multi").length) {
                var multiLineCanvas = $("#linechart-multi").get(0).getContext("2d");
                var lineChart = new Chart(multiLineCanvas, {
                    type: 'line',
                    data: multiLineData,
                    options: options
                });
            }

            if ($("#areachart-multi").length) {
                var multiAreaCanvas = $("#areachart-multi").get(0).getContext("2d");
                var multiAreaChart = new Chart(multiAreaCanvas, {
                    type: 'line',
                    data: multiAreaData,
                    options: multiAreaOptions
                });
            }

            if ($("#doughnutChart").length) {
                var doughnutChartCanvas = $("#doughnutChart").get(0).getContext("2d");
                var doughnutChart = new Chart(doughnutChartCanvas, {
                    type: 'doughnut',
                    data: doughnutPieData,
                    options: doughnutPieOptions
                });
            }

            if ($("#pieChart").length) {
                var pieChartCanvas = $("#pieChart").get(0).getContext("2d");
                var pieChart = new Chart(pieChartCanvas, {
                    type: 'pie',
                    data: doughnutPieData,
                    options: doughnutPieOptions
                });
            }

            if ($("#areaChart").length) {
                var areaChartCanvas = $("#areaChart").get(0).getContext("2d");
                var areaChart = new Chart(areaChartCanvas, {
                    type: 'line',
                    data: areaData,
                    options: areaOptions
                });
            }

            if ($("#scatterChart").length) {
                var scatterChartCanvas = $("#scatterChart").get(0).getContext("2d");
                var scatterChart = new Chart(scatterChartCanvas, {
                    type: 'scatter',
                    data: scatterChartData,
                    options: scatterChartOptions
                });
            }

            if ($("#browserTrafficChart").length) {
                var doughnutChartCanvas = $("#browserTrafficChart").get(0).getContext("2d");
                var doughnutChart = new Chart(doughnutChartCanvas, {
                    type: 'doughnut',
                    data: browserTrafficData,
                    options: doughnutPieOptions
                });
            }
        } else if (xmlHttp.readyState == 4) {
            var error = "Wrong Input";
            // document.getElementById("result").innerHTML = error;
            // document.getElementById("InputMessage").innerHTML = error;
        }
        console.log(xmlHttp.responseText);
    };
    xmlHttp.send(null);
}


function display3() {
    var xmlHttp = new XMLHttpRequest();
    var url = "/comp";
    alert("display")
    xmlHttp.open("GET", url, true);
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var responseText = xmlHttp.responseText;
            var obj = JSON.parse(responseText);
            // createDataTable(obj);
            // var data = "Res: " + "\n";
            // for (var o in obj['result']) {
            //     data += obj['result'][o] + "\n";
            // }
            var CN = obj['res'];
            // document.getElementById("result").innerHTML = data;
            if (true) {
                document.getElementById("compname").innerHTML = CN;
                console.log("aaaaa")
            }

        } else if (xmlHttp.readyState == 4) {
            var error = "Wrong Input";
            // document.getElementById("result").innerHTML = error;
            document.getElementById("compname").innerHTML = error;

        }
        console.log(xmlHttp.responseText);
    };
    xmlHttp.send(null);
}

// function test(){
//     display3();
//     setInterval("display3()", 1);
// }

function synchronous() {
    display3();
}

function Polling() {
    synchronous();
    setInterval("synchronous()", 500);
}

function clearCache() {
    var table = document.getElementById("rounded-corner");
    var child1 = document.getElementById("tbhead");
    if (child1 != null) {
        var child2 = document.getElementById("tbmain");
        table.removeChild(child1);
        table.removeChild(child2);
        document.getElementById("compname").innerHTML = "";
    }
}