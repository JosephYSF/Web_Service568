function comp(x) {
    // alert("sdfadfasdfasdfqwefsdaf");
    clearCache();
    var xmlHttp = new XMLHttpRequest();
    var url = "/comp" + "?ops="+x;
    // document.getElementById('whatis').scrollIntoView();
    // loading();
    xmlHttp.open("GET", url, true);
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var responseText = xmlHttp.responseText;
            var obj = JSON.parse(responseText);
            var CN = obj['res'];
            // document.getElementById("result").innerHTML = data;
            if (true)
                {document.getElementById("compname").innerHTML = CN;
                alert("display")}
        } else if (xmlHttp.readyState == 4) {
            var error = "Wrong Input";
            // document.getElementById("result").innerHTML = error;
            // document.getElementById("InputMessage").innerHTML = error;
        }
        console.log(xmlHttp.responseText);
    };
    xmlHttp.send(null);
}
function comp_2() {
    // alert("sdfadfasdfasdfqwefsdaf");
    clearCache();
    var xmlHttp = new XMLHttpRequest();
    var url = "/comp" + "?ops=1";
    // document.getElementById('whatis').scrollIntoView();
    // loading();
    xmlHttp.open("GET", url, true);
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var responseText = xmlHttp.responseText;
            var obj = JSON.parse(responseText);
            var CN = obj['res'];
            // document.getElementById("result").innerHTML = data;
            if (true)
                {document.getElementById("compname").innerHTML = CN;
                alert("display")}
        } else if (xmlHttp.readyState == 4) {
            var error = "Wrong Input";
            // document.getElementById("result").innerHTML = error;
            // document.getElementById("InputMessage").innerHTML = error;
        }
        console.log(xmlHttp.responseText);
    };
    xmlHttp.send(null);
}
function comp_3() {
    // alert("sdfadfasdfasdfqwefsdaf");
    clearCache();
    var xmlHttp = new XMLHttpRequest();
    var url = "/comp" + "?ops=1";
    // document.getElementById('whatis').scrollIntoView();
    // loading();
    xmlHttp.open("GET", url, true);
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var responseText = xmlHttp.responseText;
            var obj = JSON.parse(responseText);
            var CN = obj['res'];
            // document.getElementById("result").innerHTML = data;
            if (true)
                {document.getElementById("compname").innerHTML = CN;
                alert("display")}
        } else if (xmlHttp.readyState == 4) {
            var error = "Wrong Input";
            // document.getElementById("result").innerHTML = error;
            // document.getElementById("InputMessage").innerHTML = error;
        }
        console.log(xmlHttp.responseText);
    };
    xmlHttp.send(null);
}

function tempDown() {
    clearCache();
    var xmlHttp = new XMLHttpRequest();
    var url = "/temp" + "?ops=1";

    // document.getElementById('whatis').scrollIntoView();
    // loading();
    xmlHttp.open("GET", url, true);
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var responseText = xmlHttp.responseText;

        } else if (xmlHttp.readyState == 4) {
            var error = "Wrong Input";
            // document.getElementById("result").innerHTML = error;
            document.getElementById("InputMessage").innerHTML = error;

        }
        console.log(xmlHttp.responseText);
    };
    xmlHttp.send(null);
}

function HumDown() {
    var xmlHttp = new XMLHttpRequest();
    var url = "/temp" + "?ops=-2";

    // document.getElementById('whatis').scrollIntoView();
    // loading();
    xmlHttp.open("GET", url, true);
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var responseText = xmlHttp.responseText;

        } else if (xmlHttp.readyState == 4) {
            var error = "Wrong Input";
            // document.getElementById("result").innerHTML = error;
            document.getElementById("InputMessage").innerHTML = error;

        }
        console.log(xmlHttp.responseText);
    };
    xmlHttp.send(null);
}

function HumUp() {
    var xmlHttp = new XMLHttpRequest();
    var url = "/temp" + "?ops=2";

    // document.getElementById('whatis').scrollIntoView();
    // loading();
    xmlHttp.open("GET", url, true);
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var responseText = xmlHttp.responseText;

        } else if (xmlHttp.readyState == 4) {
            var error = "Wrong Input";
            // document.getElementById("result").innerHTML = error;
            document.getElementById("InputMessage").innerHTML = error;

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
            if (true)
                {document.getElementById("compname").innerHTML = CN;
                console.log("aaaaa")}

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
function Polling(){
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