Unbeatable Pong Game

This is a classic Pong game built using HTML, CSS, and JavaScript, featuring a player-controlled paddle and an unbeatable AI opponent.
Table of Contents

    Objective
    Features
    How to Play
    Installation and Setup
    Technologies Used
    User Stories Fulfilled

Objective

The goal of this project was to build a functional Pong game that fulfills specific user stories, including creating an unbeatable computer opponent, as part of freeCodeCamp's coding interview preparation challenges.
Features

    Player Control: Use arrow keys to move your paddle up and down.
    Unbeatable AI: The computer's paddle will flawlessly track and hit the ball every time.
    Score Tracking: The game keeps a running tally of scores for both the player and the computer.
    Responsive Ball Physics: Basic ball-paddle and ball-wall collision detection with angle adjustments.

How to Play

    Move your paddle using the Up Arrow and Down Arrow keys.
    Try to hit the ball past the computer's paddle.
    The computer's paddle is unbeatable, so your goal is to prevent it from scoring by effectively managing the ball's trajectory and speed.
    The first player to score wins (though the game continues indefinitely by design in this version).

Installation and Setup

    Clone the Repository (or download files):
    Bash

    git clone [your-repo-link]
    cd unbeatable-pong

    (If you're not using Git, simply download the index.html, style.css, and script.js files into a single folder.)

    Open with Live Server (Recommended for VS Code users):
        If you have the "Live Server" extension installed in VS Code, right-click on index.html in the file explorer and select "Open with Live Server". This will open the game in your default browser and automatically refresh on code changes.

    Open Directly in Browser:
        Alternatively, you can simply double-click the index.html file in your file system, and it will open in your default web browser.

Technologies Used

    HTML5: For the game structure and display elements.
    CSS3: For styling the game canvas and score display.
    JavaScript (ES6+): For all game logic, rendering, input handling, and AI.

User Stories Fulfilled

This project successfully addresses the following user stories:

    I can control a paddle.
    The computer can control the other paddle.
    The computer's paddle is unbeatable. It should never miss the ball.
    The game keeps track of the player and computer's score.