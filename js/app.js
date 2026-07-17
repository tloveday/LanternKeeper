console.log("🏮 The Lantern is lit.");

const app = document.getElementById("app");

/**
 * Render HTML into the application container.
 */
function render(html) {
    app.innerHTML = html;
}

/**
 * Home Screen
 */
function showHomeScreen() {
    render(`
        <section>
            <h1>The Lantern Keeper</h1>

            <p>A Storyteller Dashboard for Social Deduction Games</p>

            <button id="newGameBtn">New Game</button>
        </section>
    `);

    document
        .getElementById("newGameBtn")
        .addEventListener("click", showSetupPhase1);
}

/**
 * Setup Phase 1
 */
function showSetupPhase1() {
    render(`
        <section>
            <h1>Setup Phase 1</h1>

            <p>Build Tonight's Game</p>
        </section>
    `);
}

// Start the application
showHomeScreen();