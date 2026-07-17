console.log("🏮 The Lantern is lit.");

const app = document.getElementById("app");

// ----------------------------
// Game Setup Data
// ----------------------------

const gameSetup = {
    players: 14,
    werewolves: 2,
    discussionTime: 10,
    alphaWerewolf: true,

    roles: {
        seer: true,
        doctor: true,
        witch: true,
        drunk: true
    }
};

// ----------------------------
// Render Helper
// ----------------------------

function render(html) {
    app.innerHTML = html;
}

// ----------------------------
// Home Screen
// ----------------------------

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
        .addEventListener("click", showGameSetupScreen);

}

// ----------------------------
// Setup Screen
// ----------------------------

function showGameSetupScreen() {

    render(`
        <section>

            <p><strong>Step 1 of 3</strong></p>

            <h1>Build Tonight's Game</h1>

            <hr><br>

            <h3>Players</h3>

            <button id="minusPlayers">−</button>

            <strong style="margin: 0 20px;">
                ${gameSetup.players}
            </strong>

            <button id="plusPlayers">+</button>

            <br><br>

            <hr><br>

            <h3>Werewolves</h3>

            <button id="minusWolves">−</button>

            <strong style="margin: 0 20px;">
                ${gameSetup.werewolves}
            </strong>

            <button id="plusWolves">+</button>

            <br><br>

                        <hr><br>

            <h3>Alpha Werewolf</h3>

            <label>
                <input
                    type="checkbox"
                    id="alphaWerewolf"
                    ${gameSetup.alphaWerewolf ? "checked" : ""}
                >
                Alpha Werewolf
            </label>

            <br><br>

            <hr><br>

            <h3>Special Roles</h3>

            <label>
                <input
                    type="checkbox"
                    id="seerRole"
                    ${gameSetup.roles.seer ? "checked" : ""}
                >
                Seer
            </label>

            <br>

            <label>
                <input
                    type="checkbox"
                    id="doctorRole"
                    ${gameSetup.roles.doctor ? "checked" : ""}
                >
                Doctor
            </label>

            <br>

            <label>
                <input
                    type="checkbox"
                    id="witchRole"
                    ${gameSetup.roles.witch ? "checked" : ""}
                >
                Witch
            </label>

            <br>

            <label>
                <input
                    type="checkbox"
                    id="drunkRole"
                    ${gameSetup.roles.drunk ? "checked" : ""}
                >
                Drunk
            </label>

            <br><br>

            <hr><br>
<h3>Discussion Time</h3>

<button id="minusTimer">−</button>

<strong style="margin: 0 20px;">
    ${gameSetup.discussionTime} Minutes
</strong>

<button id="plusTimer">+</button>

<br><br>

            <hr><br>

            <button id="nextBtn">Next</button>

        </section>
    `);

    // ----------------------------
    // Players
    // ----------------------------

    document
        .getElementById("minusPlayers")
        .addEventListener("click", () => {

            if (gameSetup.players > 5) {
                gameSetup.players--;
            }

            showGameSetupScreen();

        });

    document
        .getElementById("plusPlayers")
        .addEventListener("click", () => {

            if (gameSetup.players < 30) {
                gameSetup.players++;
            }

            showGameSetupScreen();

        });

    // ----------------------------
    // Werewolves
    // ----------------------------

    document
        .getElementById("minusWolves")
        .addEventListener("click", () => {

            if (gameSetup.werewolves > 1) {
                gameSetup.werewolves--;
            }

            showGameSetupScreen();

        });

    document
        .getElementById("plusWolves")
        .addEventListener("click", () => {

            if (gameSetup.werewolves < 6) {
                gameSetup.werewolves++;
            }

            showGameSetupScreen();

        });


        // ----------------------------
    // Alpha Werewolf
    // ----------------------------

    document
        .getElementById("alphaWerewolf")
        .addEventListener("change", (event) => {

            gameSetup.alphaWerewolf = event.target.checked;

        });

    // ----------------------------
    // Special Roles
    // ----------------------------

    document
        .getElementById("seerRole")
        .addEventListener("change", (event) => {

            gameSetup.roles.seer = event.target.checked;

        });

    document
        .getElementById("doctorRole")
        .addEventListener("change", (event) => {

            gameSetup.roles.doctor = event.target.checked;

        });

    document
        .getElementById("witchRole")
        .addEventListener("change", (event) => {

            gameSetup.roles.witch = event.target.checked;

        });

    document
        .getElementById("drunkRole")
        .addEventListener("change", (event) => {

            gameSetup.roles.drunk = event.target.checked;

        });
        
     // ----------------------------
// Discussion Timer
// ----------------------------

document
    .getElementById("minusTimer")
    .addEventListener("click", () => {

        if (gameSetup.discussionTime > 5) {
            gameSetup.discussionTime -= 5;
        }

        showGameSetupScreen();

    });

document
    .getElementById("plusTimer")
    .addEventListener("click", () => {

        if (gameSetup.discussionTime < 30) {
            gameSetup.discussionTime += 5;
        }

        showGameSetupScreen();

    });

    // ----------------------------
    // Next
    // ----------------------------

    document
        .getElementById("nextBtn")
        .addEventListener("click", () => {

            alert("Player Setup Screen");

        });

}

// ----------------------------
// Start Application
// ----------------------------

showHomeScreen();