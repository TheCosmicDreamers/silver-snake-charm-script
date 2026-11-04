
/* =====================================
   THE MAD SCIENTIST'S EXPERIMENT
   Silver Snake Charm - Experiment 001
   ===================================== */

// DEFAULT SETTINGS
const DEFAULT_CHANCE = 100; // Testing only!

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

// IDENTIFY THE VISITOR
function getVisitorUsername() {
    const link = document.querySelector(
        '#userView a[href*="/userinfo/"]'
    );

    if (!link) return null;

    const match = link.getAttribute("href").match(
        /\/userinfo\/([^/?#]+)/
    );

    if (!match) return null;

    try {
        return decodeURIComponent(match[1]);
    } catch {
        return match[1];
    }
}

// RANDOMIZATION
function rollForCharm(visitor) {
    const key = "silverSnakeCharmResult:" + visitor;

    // Keep an existing result on reload
    const savedResult = localStorage.getItem(key);

    if (savedResult !== null) {
        try {
            return JSON.parse(savedResult);
        } catch {
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

    const result = {
        received: Math.random() * 100 < chance,
        visitor: visitor,
        chance: chance
    };

    localStorage.setItem(key, JSON.stringify(result));

    return result;
}

// DISPLAY NOTIFICATION
function showCharmNotification() {
    const notification = document.getElementById(
        "silverSnakeCharm"
    );

    if (!notification) return;

    const visitor = getVisitorUsername();

    // If we cannot identify the visitor, keep it hidden
    if (!visitor) {
        notification.style.display = "none";
        return;
    }

    const result = rollForCharm(visitor);

    notification.style.display =
        result.received ? "block" : "none";
}

// RUN WHEN THE PAGE IS READY
if (document.readyState === "loading") {
    document.addEventListener(
        "DOMContentLoaded",
        showCharmNotification
    );
} else {
    showCharmNotification();
}
