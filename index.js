document.addEventListener("DOMContentLoaded", function() {
    const container = document.querySelector(".container");
    const clearButton = document.getElementById("clear-button");
    const resizeButton = document.getElementById("resize-button");
    const popupBackground = document.getElementById("popup-background");

    let red = 0;
    let green = 0;
    let blue = 0;
    let opacity = 1;
    let isMouseDown = false;

    function createGrid(gridSize) {
        container.innerHTML = "";
        const squareSize = 512 / gridSize - 1;
        container.style.gridTemplateColumns = `repeat(${gridSize}, ${squareSize}px)`;
        container.style.gridTemplateRows = `repeat(${gridSize}, ${squareSize}px)`;

        for (let i = 0; i < gridSize * gridSize; i++) {
            const gridSquare = document.createElement("div");
            gridSquare.style.width = squareSize + "px";
            gridSquare.style.height = squareSize + "px";
            gridSquare.addEventListener("mousedown", function() {
                isMouseDown = true;
            });
            gridSquare.addEventListener("mouseup", function() {
                isMouseDown = false;
            });
            gridSquare.addEventListener("mouseover", function() {
                if (isMouseDown) {
                    red = Math.floor(Math.random() * 256);
                    green = Math.floor(Math.random() * 256);
                    blue = Math.floor(Math.random() * 256);
                    // opacity = Math.max(opacity - 0.1, 0);
                    this.style.backgroundColor = `rgba(${red}, ${green}, ${blue}, ${opacity})`;
                }
            });
            container.appendChild(gridSquare);
        }
    }

    function clearGrid() {
        const gridSquares = container.querySelectorAll("div");
        gridSquares.forEach(square => {
            square.style.backgroundColor = "rgba(0, 0, 0, 0)";
            opacity = 1;
        });
    }

    function showGridSizeInputPopup() {
        const gridSize = prompt("Enter the number of squares per side for the new grid (maximum 100):");
        if (gridSize !== null && gridSize !== "" && !isNaN(gridSize) && gridSize <= 100) {
            createGrid(gridSize);
        } else {
            alert("Please enter a valid number (1-100) for grid size.");
        }
    }

    createGrid(16);

    clearButton.addEventListener("click", clearGrid);
    resizeButton.addEventListener("click", showGridSizeInputPopup);
});