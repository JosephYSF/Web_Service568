function comp(x) {
    //alert("sdfadfasdfasdfqwefsdaf");
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
            var date1 = []
            for (var i = 0; i < alldate.length; i++) {
                date1.push(alldate[i]);
            }
            var allClose = obj['allClose'];
            var data1 = []
            for (var i = 0; i < allClose.length; i++) {
                data1.push(allClose[i]);
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

                // alert("display")
            }
            //  Chart Part
            var data = {
                labels: date1,
                datasets: [{
                    label: '# of Votes',
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
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1,
                    fill: false
                }]
            };
            var multiLineData = {
                labels: date1,
                datasets: [{
                    label: 'Dataset 1',
                    data: data1,
                    borderColor: [
                        '#587ce4'
                    ],
                    borderWidth: 2,
                    fill: false
                },
                    {
                        label: 'Dataset 2',
                        data: data1,
                        borderColor: [
                            '#ede190'
                        ],
                        borderWidth: 2,
                        fill: false
                    },
                    {
                        label: 'Dataset 3',
                        data: data1,
                        borderColor: [
                            '#f44252'
                        ],
                        borderWidth: 2,
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
            var doughnutPieData = {
                datasets: [{
                    data: data1,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(153, 102, 255, 0.5)',
                        'rgba(255, 159, 64, 0.5)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                }],

                // These labels appear in the legend and in the tooltips when hovering different arcs
                labels: [
                    'Pink',
                    'Blue',
                    'Yellow',
                ]
            };
            var doughnutPieOptions = {
                responsive: true,
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            };
            var areaData = {
                labels: date1,
                datasets: [{
                    label: '# of Votes',
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
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1,
                    fill: true, // 3: no fill
                }]
            };

            var areaOptions = {
                plugins: {
                    filler: {
                        propagate: true
                    }
                }
            }

            var multiAreaData = {
                labels: date1,
                datasets: [{
                    label: 'Facebook',
                    data: data1,
                    borderColor: ['rgba(255, 99, 132, 0.5)'],
                    backgroundColor: ['rgba(255, 99, 132, 0.5)'],
                    borderWidth: 1,
                    fill: true
                },
                    {
                        label: 'Twitter',
                        data: data1,
                        borderColor: ['rgba(54, 162, 235, 0.5)'],
                        backgroundColor: ['rgba(54, 162, 235, 0.5)'],
                        borderWidth: 1,
                        fill: true
                    },
                    {
                        label: 'Linkedin',
                        data: data1,
                        borderColor: ['rgba(255, 206, 86, 0.5)'],
                        backgroundColor: ['rgba(255, 206, 86, 0.5)'],
                        borderWidth: 1,
                        fill: true
                    }
                ]
            };

            var multiAreaOptions = {
                plugins: {
                    filler: {
                        propagate: true
                    }
                },
                elements: {
                    point: {
                        radius: 0
                    }
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: false
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            display: false
                        }
                    }]
                }
            }

            var scatterChartData = {
                datasets: [{
                    label: 'First Dataset',
                    data: [{
                        x: -10,
                        y: 0
                    },
                        {
                            x: 0,
                            y: 3
                        },
                        {
                            x: -25,
                            y: 5
                        },
                        {
                            x: 40,
                            y: 5
                        }
                    ],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)'
                    ],
                    borderWidth: 1
                },
                    {
                        label: 'Second Dataset',
                        data: [{
                            x: 10,
                            y: 5
                        },
                            {
                                x: 20,
                                y: -30
                            },
                            {
                                x: -25,
                                y: 15
                            },
                            {
                                x: -10,
                                y: 5
                            }
                        ],
                        backgroundColor: [
                            'rgba(54, 162, 235, 0.2)',
                        ],
                        borderColor: [
                            'rgba(54, 162, 235, 1)',
                        ],
                        borderWidth: 1
                    }
                ]
            }

            var scatterChartOptions = {
                scales: {
                    xAxes: [{
                        type: 'linear',
                        position: 'bottom'
                    }]
                }
            }
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
                    data: data,
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