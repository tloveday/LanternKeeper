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

const players = [];
let statusMessage = "Ready to gather villagers.";

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
// Setup Screens
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
                Include Alpha Werewolf
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

            <div style="display:flex;justify-content:space-between;">

                <button id="cancelBtn">
                    Cancel
                </button>

                <button id="nextBtn">
                    Next →
                </button>

            </div>

        </section>
    `);

    // ----------------------------
    // Players
    // ----------------------------

    document.getElementById("minusPlayers").addEventListener("click", () => {

        if (gameSetup.players > 5) {
            gameSetup.players--;
        }

        showGameSetupScreen();

    });

    document.getElementById("plusPlayers").addEventListener("click", () => {

        if (gameSetup.players < 30) {
            gameSetup.players++;
        }

        showGameSetupScreen();

    });

    // ----------------------------
    // Werewolves
    // ----------------------------

    document.getElementById("minusWolves").addEventListener("click", () => {

        if (gameSetup.werewolves > 1) {
            gameSetup.werewolves--;
        }

        showGameSetupScreen();

    });

    document.getElementById("plusWolves").addEventListener("click", () => {

        if (gameSetup.werewolves < 6) {
            gameSetup.werewolves++;
        }

        showGameSetupScreen();

    });

    // ----------------------------
    // Alpha
    // ----------------------------

    document.getElementById("alphaWerewolf").addEventListener("change", (event) => {

        gameSetup.alphaWerewolf = event.target.checked;

    });

    // ----------------------------
    // Roles
    // ----------------------------

    document.getElementById("seerRole").addEventListener("change", (event) => {

        gameSetup.roles.seer = event.target.checked;

    });

    document.getElementById("doctorRole").addEventListener("change", (event) => {

        gameSetup.roles.doctor = event.target.checked;

    });

    document.getElementById("witchRole").addEventListener("change", (event) => {

        gameSetup.roles.witch = event.target.checked;

    });

    document.getElementById("drunkRole").addEventListener("change", (event) => {

        gameSetup.roles.drunk = event.target.checked;

    });

    // ----------------------------
    // Discussion Timer
    // ----------------------------

    document.getElementById("minusTimer").addEventListener("click", () => {

        if (gameSetup.discussionTime > 3) {
            gameSetup.discussionTime--;
        }

        showGameSetupScreen();

    });

    document.getElementById("plusTimer").addEventListener("click", () => {

        if (gameSetup.discussionTime < 15) {
            gameSetup.discussionTime++;
        }

        showGameSetupScreen();

    });

    // ----------------------------
    // Cancel
    // ----------------------------

    document.getElementById("cancelBtn").addEventListener("click", () => {

        showHomeScreen();

    });

    // ----------------------------
    // Next
    // ----------------------------

    document.getElementById("nextBtn").addEventListener("click", () => {

        showPlayerSetupScreen();

    });

}

function showPlayerSetupScreen() {

    players.sort((a, b) => a.name.localeCompare(b.name));

    let playerListHTML = "";

    if (players.length === 0) {

        playerListHTML = "<p><em>No villagers have gathered yet.</em></p>";

    } else {

        players.forEach((player, index) => {

            playerListHTML += `
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">

                    <span>${player.name}</span>

                    <button class="deletePlayerBtn" data-index="${index}">
                        Delete
                    </button>

                </div>
            `;

        });

    }

    render(`
        <section>

            <p><strong>Step 2 of 3</strong></p>

            <h1>Gather the Villagers</h1>

            <hr><br>

            <h3>Players Added</h3>

            <p>
                ${players.length} / ${gameSetup.players}
            </p>

            <p><em>${statusMessage}</em></p>

            <hr><br>

            <input
                id="playerName"
                type="text"
                placeholder="Enter player name..."
                style="width:100%;padding:10px;"
            >

            <br><br>

            <hr><br>

            ${playerListHTML}

            <hr><br>

            <div style="display:flex;justify-content:space-between;">

                <button id="previousBtn">
                    ← Previous
                </button>

                <button
                    id="nextPhaseBtn"
                    ${players.length === gameSetup.players ? "" : "disabled"}
                >
                    Next →
                </button>

            </div>

        </section>
    `);

    // ----------------------------
    // Player Name Input
    // ----------------------------

    const playerName = document.getElementById("playerName");

    playerName.focus();

    playerName.addEventListener("keydown", (event) => {

        if (event.key === "Enter") {

            if (players.length >= gameSetup.players) {

                statusMessage = "The village is already full.";

                showPlayerSetupScreen();

                return;

            }

            const name = playerName.value.trim();

            if (name === "") {

                statusMessage = "Please enter a player's name.";

                showPlayerSetupScreen();

                return;

            }

            const duplicatePlayer = players.find((player) =>
                player.name.toLowerCase() === name.toLowerCase()
            );

            if (duplicatePlayer) {

                statusMessage = `${duplicatePlayer.name} is already home.`;

                playerName.value = "";

                showPlayerSetupScreen();

                return;

            }

            players.push({

                name: name,
                role: null,
                alive: true

            });

            statusMessage = `${name} came home.`;

            showPlayerSetupScreen();

        }

    });

    // ----------------------------
    // Delete Player
    // ----------------------------

    document.querySelectorAll(".deletePlayerBtn").forEach((button) => {

        button.addEventListener("click", () => {

            const index = Number(button.dataset.index);

            const removedPlayer = players[index].name;

            players.splice(index, 1);

            statusMessage = `${removedPlayer} left the village.`;

            showPlayerSetupScreen();

        });

    });

    // ----------------------------
    // Previous
    // ----------------------------

    document.getElementById("previousBtn").addEventListener("click", () => {

        showGameSetupScreen();

    });

    // ----------------------------
// Next
// ----------------------------

if (players.length === gameSetup.players) {

    document.getElementById("nextPhaseBtn").addEventListener("click", () => {

        showRoleAssignmentScreen();

    });

}

}

function buildRoleList() {

    const roles = [];

    // ----------------------------
    // Werewolves
    // ----------------------------

    if (gameSetup.alphaWerewolf) {

        // Alpha replaces one normal Werewolf
        roles.push("Alpha Werewolf");

        for (let i = 1; i < gameSetup.werewolves; i++) {

            roles.push("Werewolf");

        }

    } else {

        for (let i = 0; i < gameSetup.werewolves; i++) {

            roles.push("Werewolf");

        }

    }

    // ----------------------------
    // Special Roles
    // ----------------------------

    if (gameSetup.roles.seer) {

        roles.push("Seer");

    }

    if (gameSetup.roles.doctor) {

        roles.push("Doctor");

    }

    if (gameSetup.roles.witch) {

        roles.push("Witch");

    }

    if (gameSetup.roles.drunk) {

        roles.push("Drunk");

    }

    return roles;

}

function showRoleAssignmentScreen() {

    const roles = buildRoleList();

    const assignedRoles = players.filter(player => player.role !== null).length;

    const allRolesAssigned = assignedRoles === roles.length;

    let roleListHTML = "";

    roles.forEach((role) => {

        let playerOptions = `
            <option value="">Select Player...</option>
        `;

        players.forEach((player) => {

            if (player.role === null || player.role === role) {

                const selected = player.role === role ? "selected" : "";

                playerOptions += `
                    <option value="${player.name}" ${selected}>
                        ${player.name}
                    </option>
                `;

            }

        });

        roleListHTML += `
            <div style="margin-bottom:20px;">

                <strong>${role}</strong>

                <br><br>

                <select
                    class="roleSelect"
                    data-role="${role}"
                    style="width:100%;padding:10px;"
                >

                    ${playerOptions}

                </select>

            </div>
        `;

    });

    render(`
        <section>

            <p><strong>Step 3 of 3</strong></p>

            <h1>Deal the Cards</h1>

            <hr><br>

            <p>
                Everyone should now have received a physical role card.
            </p>

            ${roleListHTML}

            <hr><br>

            <div style="display:flex;justify-content:space-between;">

                <button id="previousBtn">
                    ← Previous
                </button>

                <button
                    id="beginGameBtn"
                    ${allRolesAssigned ? "" : "disabled"}
                >
                    Light the Way
                </button>

            </div>

        </section>
    `);

    // ----------------------------
    // Role Assignment
    // ----------------------------

    document.querySelectorAll(".roleSelect").forEach((select) => {

        select.addEventListener("change", () => {

            const role = select.dataset.role;
            const playerName = select.value;

            // Remove this role from its current owner

            players.forEach((player) => {

                if (player.role === role) {

                    player.role = null;

                }

            });

            // Remove any existing role from this player

            players.forEach((player) => {

                if (player.name === playerName) {

                    player.role = null;

                }

            });

            // Assign the new role

            const selectedPlayer = players.find(player => player.name === playerName);

            if (selectedPlayer) {

                selectedPlayer.role = role;

            }

            showRoleAssignmentScreen();

        });

    });

    // ----------------------------
    // Previous
    // ----------------------------

    document.getElementById("previousBtn").addEventListener("click", () => {

        showPlayerSetupScreen();

    });

    // ----------------------------
    // Light the Way
    // ----------------------------

    if (allRolesAssigned) {

        document.getElementById("beginGameBtn").addEventListener("click", () => {

            // Everyone left becomes a Villager

            players.forEach((player) => {

                if (player.role === null) {

                    player.role = "Villager";

                }

            });

            showDashboard();

        });

    }

}

function showDashboard() {

    render(`

        <section>

            <h1>Lantern Keeper</h1>

            <hr><br>

            <h2>The Lantern is Lit</h2>

            <p>

                The Storyteller Dashboard will be built here.

            </p>

        </section>

    `);

    console.log(players);

}
// ----------------------------
// Start Application
// ----------------------------

showHomeScreen();