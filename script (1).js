document.addEventListener("DOMContentLoaded", function() {
    const startBtn = document.getElementById("startBtn");
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const colors = document.querySelectorAll(".color");
    const eraser = document.getElementById("eraser");

    let isDrawing = false;
    let currentColor = null;

    startBtn.addEventListener("click", function() {
        canvas.width = 600;
        canvas.height = 400;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    canvas.addEventListener("mousedown", function(event) {
        if (!currentColor) return;
        isDrawing = true;
        ctx.beginPath();
        ctx.moveTo(event.clientX - canvas.getBoundingClientRect().left, event.clientY - canvas.getBoundingClientRect().top);
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = currentColor === "white" ? 10 : 5;
    });

    canvas.addEventListener("mousemove", function(event) {
        if (isDrawing) {
            ctx.lineTo(event.clientX - canvas.getBoundingClientRect().left, event.clientY - canvas.getBoundingClientRect().top);
            ctx.stroke();
        }
    });

    canvas.addEventListener("mouseup", function() {
        isDrawing = false;
    });

    canvas.addEventListener("mouseout", function() {
        isDrawing = false;
    });

    colors.forEach(function(color) {
        color.addEventListener("click", function() {
            colors.forEach(function(c) {
                c.classList.remove("selected");
            });
            color.classList.add("selected");
            currentColor = color.style.backgroundColor;
        });
    });

    eraser.addEventListener("click", function() {
        colors.forEach(function(c) {
            c.classList.remove("selected");
        });
        currentColor = "white";
        eraser.classList.add("selected");

        // Reset canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
});
