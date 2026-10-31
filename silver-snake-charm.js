/* =====================================
   THE MAD SCIENTIST'S EXPERIMENT
   Silver Snake Charm - Experiment 001
   ===================================== */

// DEFAULT SETTINGS
const DEFAULT_CHANCE = 100; // TEMPORARY TEST

// SPECIAL VISITORS
const SPECIAL_VISITORS = {
    "ExampleUsername": {
        chance: 100
    },

    "AnotherUsername": {
        chance: 50
    },

    // To guarantee the charm for someone:
    // "UsernameHere": {
    //     guaranteed: true
    // }
};

// VISITOR IDENTIFICATION
// Temporary placeholder until we establish
// how HEX exposes the visitor's username.
const VISITOR = "TEST_VISITOR";

// RANDOMIZATION
function rollForCharm(visitor) {
    const key = "silverSnakeCharmResult:" + visitor;

    // Restore an existing result
    const savedResult = localStorage.getItem(key);

    if (savedResult !== null) {
        try {
            return JSON.parse(savedResult);
        } catch (error) {
            localStorage.removeItem(key);
        }
    }

    // Determine the visitor's chance
    const special = SPECIAL_VISITORS[visitor];

    let chance = DEFAULT_CHANCE;

    if (special) {
        chance = special.guaranteed ? 100 : special.chance;
    }

    chance = Math.max(0, Math.min(100, chance));

    // Roll!
    const result = {
        received: Math.random() * 100 < chance,
        visitor: visitor,
        chance: chance
    };

    // Save the result so it stays the same on reload
    localStorage.setItem(key, JSON.stringify(result));

    return result;
}

// DISPLAY NOTIFICATION
function showCharmNotification() {
    const result = rollForCharm(VISITOR);

    const notification = document.getElementById("silverSnakeCharm");

    if (!notification) return;

    notification.style.display = result.received ? "block" : "none";
}

// RUN WHEN THE PAGE IS READY
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", showCharmNotification);
} else {
    showCharmNotification();
}
