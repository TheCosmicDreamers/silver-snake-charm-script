
/* =====================================
   THE MAD SCIENTIST'S EXPERIMENT
   Silver Snake Charm - Experiment 001
   ===================================== */

// DEFAULT CHANCE FOR EVERYONE
const DEFAULT_CHANCE = 10;

// SPECIAL VISITORS
const SPECIAL_VISITORS = {
    "Stardustsnow23e32": {
        chance: 99
    }

    // Add more special visitors here:
    // "AnotherUsername": {
    //     chance: 15
    // },
    //
    // To guarantee the charm:
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
    // Determine the visitor's chance
    const special = SPECIAL_VISITORS[visitor];

    let chance = DEFAULT_CHANCE;

    if (special) {
        chance = special.guaranteed ? 100 : special.chance;
    }

    // Keep the chance between 0% and 100%
    chance = Math.max(0, Math.min(100, chance));

    // Roll fresh every time the script runs
    const result = {
        received: Math.random() * 100 < chance,
        visitor: visitor,
        chance: chance
    };

    console.log(
        `[Silver Snake Charm] ${visitor}: ` +
        `${result.received ? "SUCCESS" : "No charm"} ` +
        `(Chance: ${chance}%)`
    );

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

} else {
    showCharmNotification();
}
