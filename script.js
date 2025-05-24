const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = 800;
canvas.height = 600;

// Game variables
let player = {
    x: 20,
    y: canvas.height / 2 - 50,
    width: 10,
    height: 100,
    score: 0,
    dy: 0 // paddle movement speed
};

let computer = {
    x: canvas.width - 30, // 10 (width) + 20 (offset)
    y: canvas.height / 2 - 50,
    width: 10,
    height: 100,
    score: 0,
    dy: 0
};

let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 7,
    dx: 5, // ball movement speed (x)
    dy: 5  // ball movement speed (y)
};

// Update score display
const playerScoreDisplay = document.getElementById('player-score');
const computerScoreDisplay = document.getElementById('computer-score');

function updateScores() {
    playerScoreDisplay.textContent = `Player: ${player.score}`;
    computerScoreDisplay.textContent = `Computer: ${computer.score}`;
}

// Draw elements on canvas
function drawRect(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
}

function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw paddles and ball
    drawRect(player.x, player.y, player.width, player.height, 'white');
    drawRect(computer.x, computer.y, computer.width, computer.height, 'white');
    drawCircle(ball.x, ball.y, ball.radius, 'white');

    // Draw dashed line in the middle
    for (let i = 0; i < canvas.height; i += 20) {
        drawRect(canvas.width / 2 - 1, i, 2, 10, 'white');
    }
}

// Game update logic (called repeatedly)
function update() {
    // Move ball
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Ball collision with top/bottom walls
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy *= -1; // Reverse y direction
    }

    // Player paddle movement
    player.y += player.dy;
    // Keep player paddle within bounds
    if (player.y < 0) {
        player.y = 0;
    } else if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
    }

    // Computer paddle AI (unbeatable)
    // The computer paddle should follow the ball's y position
    // We want it to be unbeatable, so it will always adjust its center to the ball's center
    const computerCenter = computer.y + computer.height / 2;
    const ballCenter = ball.y;

    if (ballCenter < computerCenter - computer.height * 0.1) { // Add a small buffer to avoid jittering
        computer.y -= 5; // Move up
    } else if (ballCenter > computerCenter + computer.height * 0.1) {
        computer.y += 5; // Move down
    }
    // Keep computer paddle within bounds
    if (computer.y < 0) {
        computer.y = 0;
    } else if (computer.y + computer.height > canvas.height) {
        computer.y = canvas.height - computer.height;
    }


    // Ball collision with paddles
    // Player paddle
    if (ball.dx < 0 && // ball is moving left
        ball.x - ball.radius < player.x + player.width &&
        ball.y + ball.radius > player.y &&
        ball.y - ball.radius < player.y + player.height) {
        
        ball.dx *= -1; // Reverse x direction

        // Adjust ball angle based on where it hit the paddle
        // Normalize the impact point relative to the paddle's center (-1 to 1)
        let collidePoint = (ball.y - (player.y + player.height / 2)) / (player.height / 2);
        ball.dy = collidePoint * 5; // Increase/decrease dy based on impact
    }

    // Computer paddle
    if (ball.dx > 0 && // ball is moving right
        ball.x + ball.radius > computer.x &&
        ball.y + ball.radius > computer.y &&
        ball.y - ball.radius < computer.y + computer.height) {

        ball.dx *= -1; // Reverse x direction

        // Adjust ball angle based on where it hit the paddle
        let collidePoint = (ball.y - (computer.y + computer.height / 2)) / (computer.height / 2);
        ball.dy = collidePoint * 5;
    }

    // Ball out of bounds (scoring)
    if (ball.x - ball.radius < 0) { // Computer scores
        computer.score++;
        updateScores();
        resetBall();
    } else if (ball.x + ball.radius > canvas.width) { // Player scores
        player.score++;
        updateScores();
        resetBall();
    }
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = 5 * (Math.random() > 0.5 ? 1 : -1); // Random initial direction
    ball.dy = 5 * (Math.random() > 0.5 ? 1 : -1);
}

// Game loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop); // Call gameLoop again
}

// Event Listeners for player paddle control
document.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp':
            player.dy = -7; // Move up
            break;
        case 'ArrowDown':
            player.dy = 7; // Move down
            break;
    }
});

document.addEventListener('keyup', e => {
    switch (e.key) {
        case 'ArrowUp':
        case 'ArrowDown':
            player.dy = 0; // Stop paddle movement
            break;
    }
});

// Initial score display
updateScores();
// Start the game loop
gameLoop();