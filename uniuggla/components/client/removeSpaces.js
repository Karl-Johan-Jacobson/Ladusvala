document.getElementById("textInput").addEventListener("input", function() {
    // Check if the value consists only of spaces
    if (/^\s*$/.test(this.value)) {
        this.value = ""; // Clear the input value if it's only spaces
    }
});
