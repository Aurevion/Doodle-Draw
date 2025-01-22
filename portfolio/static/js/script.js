(function () {
    var canvas = document.querySelector("#canvas");
    var context = canvas.getContext("2d");
    canvas.width = 280;
    canvas.height = 280;

    // Initialize default values
    var Mouse = { x: 0, y: 0 };
    var lastMouse = { x: 0, y: 0 };
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.color = "black";
    context.lineWidth = 5;
    context.lineJoin = context.lineCap = "round";

    // Update mouse position
    canvas.addEventListener("mousemove", function (e) {
        lastMouse.x = Mouse.x;
        lastMouse.y = Mouse.y;

        Mouse.x = e.pageX - canvas.offsetLeft;
        Mouse.y = e.pageY - canvas.offsetTop;
    }, false);

    // Start drawing
    canvas.addEventListener("mousedown", function () {
        canvas.addEventListener("mousemove", onPaint, false);
    }, false);

    // Stop drawing
    canvas.addEventListener("mouseup", function () {
        canvas.removeEventListener("mousemove", onPaint, false);
    }, false);

    // Drawing function
    var onPaint = function () {
        context.lineWidth = context.lineWidth;
        context.lineJoin = "round";
        context.lineCap = "round";
        context.strokeStyle = context.color;

        context.beginPath();
        context.moveTo(lastMouse.x, lastMouse.y);
        context.lineTo(Mouse.x, Mouse.y);
        context.closePath();
        context.stroke();
    };

    // Clear button functionality
    document.getElementById("clearButton").addEventListener("click", function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);
    });
    // random_word.js
})();
function displayRandomWord() {
    fetch('/static/Data/categories.txt')
      .then(response => response.text())
      .then(text => {
        const words = text.split(/\s+/).filter(word => word.length > 0);
        if (words.length === 0) {
          document.getElementById("wordDisplay").textContent = "No words found in file.";
          return;
        }
        const randomIndex = Math.floor(Math.random() * words.length);
        const randomWord = words[randomIndex];
        document.getElementById("wordDisplay").textContent = randomWord;
      })
      .catch(error => {
        console.error("Error fetching or processing file:", error);
        document.getElementById("wordDisplay").textContent = "Error loading words.";
      });
  }
  
  // Call the function when the page loads
  window.addEventListener('load', displayRandomWord);
