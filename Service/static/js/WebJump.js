function search() {
    var doc = document.getElementById("Gsearch").value;
    alert("You will now jump to Google page");
    window.open("http://www.google.com/search?q="+doc, "_blank");
}