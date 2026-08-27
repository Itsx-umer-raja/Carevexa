// This is a comment inside a JavaScript file

// A function that changes a webpage element's text
function changeText() {
    const heading = document.getElementById("message");
    heading.textContent = "Hello from the external JS file!";
}

// A function that triggers a browser alert box
function showAlert() {
    alert("You clicked the second button!");
