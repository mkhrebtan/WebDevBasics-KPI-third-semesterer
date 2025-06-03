document.addEventListener("DOMContentLoaded", function() {
    const button = document.getElementById("openPopup");
    const popup = document.getElementById("popup");
    const overlay = document.getElementById("blurOverlay");
    const buttonClose = document.getElementById("closePopup");

    function openPopup() {
        popup.classList.add("active"); 
        overlay.classList.add("active");
    }

    function closePopup() {
        popup.classList.remove("active");
        overlay.classList.remove("active");
    }

    button.addEventListener("dblclick", openPopup);

    buttonClose.addEventListener("click", closePopup);
});

function getRandomHorizontalPosition(containerWidth, squareSize) {
    // Випадкова горизонтальна координата
    return Math.random() * (containerWidth - squareSize);
}

let interval;
let squares = []; // Масив для зберігання квадратів

function createSquare(color, container, isTop) {
    const square = document.createElement("div");
    square.classList.add("square", color);

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const squareSize = 15;

    // Початкові координати
    const x = Math.random() * (containerWidth - squareSize);
    const y = isTop ? 0 : containerHeight - squareSize;

    // Встановлення стилів
    square.style.left = `${x}px`;
    square.style.top = `${y}px`;

    // Випадковий напрямок (кут) у радіанах
    const angle = Math.random() * 2 * Math.PI;
    square.direction = {
        dx: Math.cos(angle),
        dy: Math.sin(angle),
    };

    square.speed = 2; // Швидкість руху квадрату
    square.size = squareSize;

    container.appendChild(square);
    return square;
}

function initSquares() {
    const animContainer = document.getElementById("anim");
    animContainer.innerHTML = ""; // Очищення контейнера

    // Створення квадратів
    squares = [
        createSquare("green", animContainer, true), // Верхній квадрат
        createSquare("orange", animContainer, false), // Нижній квадрат
    ];
}

function moveSquares() {
    const animContainer = document.getElementById("anim");
    const containerWidth = animContainer.clientWidth;
    const containerHeight = animContainer.clientHeight;

    let squaresInTopHalf = 0;
    let squaresInBottomHalf = 0;

    squares.forEach((square) => {
        // Оновлення позиції
        let x = parseFloat(square.style.left) + square.direction.dx * square.speed;
        let y = parseFloat(square.style.top) + square.direction.dy * square.speed;

        // Перевірка зіткнень зі стінками
        if (x <= 0 || x + square.size >= containerWidth) {
            square.direction.dx *= -1; // Інверсія по горизонталі
        }
        if (y <= 0 || y + square.size >= containerHeight) {
            square.direction.dy *= -1; // Інверсія по вертикалі
        }

        // Оновлення координат
        square.style.left = `${Math.min(Math.max(0, x), containerWidth - square.size)}px`;
        square.style.top = `${Math.min(Math.max(0, y), containerHeight - square.size)}px`;

        // Перевірка знаходження в половинах
        if (y + square.size <= containerHeight / 2) {
            squaresInTopHalf++;
        } else if (y >= containerHeight / 2) {
            squaresInBottomHalf++;
        }
    });

    // Перевірка зіткнення квадратів
    const dx = parseFloat(squares[0].style.left) - parseFloat(squares[1].style.left);
    const dy = parseFloat(squares[0].style.top) - parseFloat(squares[1].style.top);
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < squares[0].size) {
        squares.forEach((square) => {
            square.direction.dx *= -1;
            square.direction.dy *= -1;
        });
    }

    // Зупинка, якщо обидва квадрати в одній половині
    if (squaresInTopHalf === 2 || squaresInBottomHalf === 2) {
        clearInterval(interval);
        document.getElementById("start").style.display = "none";
        document.getElementById("reload").style.display = "inline-block";
    }
}

function startBtnFunc() {
    initSquares();

    // Запуск руху квадратів
    interval = setInterval(moveSquares, 5);

    // Блокуємо кнопку "Start"
    document.getElementById("start").disabled = true;
    document.getElementById("reload").style.display = "none";
}

function reloadBtnFunc() {
    clearInterval(interval);
    initSquares();

    // Відновлення кнопок
    document.getElementById("start").disabled = false;
    document.getElementById("start").style.display = "inline-block";
    document.getElementById("reload").style.display = "none";
}
