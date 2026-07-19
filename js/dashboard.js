// ----------------------------
// Game State Widget
// ----------------------------

function renderGameStateWidget(
    phaseIcon,
    aliveCount,
    majority,
    villagers,
    packHTML
) {

    return `

        <div class="widget game-state">

            <h2>Game State</h2>

            <div class="game-stat hero-phase">

                <strong>${phaseIcon} ${game.phase} ${game.day}</strong>

            </div>

            <div class="game-stat">

                <span>Players Alive</span>

                <strong>${aliveCount}</strong>

            </div>

            <div class="game-stat">

                <span>Majority</span>

                <strong>${majority}</strong>

            </div>

            <div class="game-stat">

                <span>Villagers</span>

                <strong>${villagers}</strong>

            </div>

            <div class="game-stat">

                <span>Pack</span>

                <div class="pack-row">

                    ${packHTML}

                </div>

            </div>

        </div>

    `;

}
// ----------------------------
// player Widget
// ----------------------------
function renderPlayersWidget(playersHTML) {

    return `

        <div class="widget players">

            <h2>Players</h2>

            <div class="players-grid">

                ${playersHTML}

            </div>

        </div>

    `;

}
// ----------------------------
// Timer Widget
// ----------------------------
function renderTimerWidget(
    minutes,
    seconds,
    timerButton
) {

    return `

        <div class="widget timer">

            <h2>Timer</h2>

            ${game.phase === "Day" ? `

                <div class="timer-display">

                    <span class="timer-minutes">${minutes}</span>

                    <span class="timer-colon">:</span>

                    <span class="timer-seconds">${seconds}</span>

                </div>

                ${timerButton}

                <button onclick="endDay()">

                    🌙 End Day

                </button>

            ` : `

                <div class="timer-display">

                    🌙

                </div>

                <p class="night-message">

                    The village sleeps...

                </p>

            `}

        </div>

    `;

}
// ----------------------------
// Night Order Widget
// ----------------------------
function renderNightOrderWidget() {

    if (game.phase !== "Night") {

    return `

        <div class="widget night-order">

            <h2>Night Order</h2>

            <div class="night-role">

                DUSK

            </div>

            <div class="night-script">

                <p>Press <strong>🌙 End Day</strong></p>

                <p>when discussion is complete.</p>

            </div>

        </div>

    `;

}

    const roles = [];

    if (players.some(player =>
        player.role === "Werewolf" ||
        player.role === "Alpha Werewolf"
    )) {

        roles.push({
            title: "WEREWOLVES",
            class: "werewolf",
            script: [
                "Werewolves, open your eyes.",
                "Choose your victim.",
                "Werewolves, close your eyes."
            ]
        });

    }

    if (players.some(player => player.role === "Seer")) {

        roles.push({
            title: "SEER",
            class: "seer",
            script: [
                "Seer, open your eyes.",
                "Choose one player.",
                "Reveal their role.",
                "Seer, close your eyes."
            ]
        });

    }

    if (players.some(player => player.role === "Doctor")) {

        roles.push({
            title: "DOCTOR",
            class: "doctor",
            script: [
                "Doctor, open your eyes.",
                "Choose one player to protect.",
                "Doctor, close your eyes."
            ]
        });

    }

    if (players.some(player => player.role === "Witch")) {

        roles.push({
            title: "WITCH",
            class: "witch",
            script: [
                "Witch, open your eyes.",
                "Use a potion if you wish.",
                "Witch, close your eyes."
            ]
        });

    }

    if (game.nightIndex >= roles.length) {

        return `

            <div class="widget night-order">

                <h2>Night Order</h2>

                <div class="night-role">

    DAWN

</div>

<div class="night-script">

    <p>All night actions are complete.</p>

    <p>The village awakens...</p>

</div>

<button onclick="startDay()">

    ☀ Start Day

</button>

            </div>

        `;

    }

    const role = roles[game.nightIndex];

    return `

        <div class="widget night-order">

            <h2>Night Order</h2>

            <div class="night-role ${role.class}">

                ${role.title}

            </div>

            <div class="night-script">

                ${role.script.map(line => `<p>${line}</p>`).join("")}

            </div>

            <button onclick="nextNightRole()">

                ⏭ Next Role

            </button>

        </div>

    `;

}