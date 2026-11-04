
/* =====================================
   THE MAD SCIENTIST'S EXPERIMENT
   Silver Snake Charm - Experiment 001
   ===================================== */

// EVERYONE ELSE: RANDOM CHANCE BETWEEN 1% AND 20%
const MIN_DEFAULT_CHANCE = 1;
const MAX_DEFAULT_CHANCE = 20;

// YOUR SPECIAL CHANCE
const OWNER_USERNAME = "Stardustsnow23e32";
const OWNER_CHANCE = 98;

// SPECIAL VISITORS
const SPECIAL_VISITORS = {
    // Example:
    // "LuckyVisitor": {
    //     chance: 35
    // },

    // Guaranteed visitor:
    // "GuaranteedVisitor": {
    //     guaranteed: true
    // }
};

// IDENTIFY THE VISITOR
function getVisitorUsername() {
    const link = document.querySelector(
        '#userView a[href*="/userinfo/"]'
    );

    if (!link) {
        console.warn(
            "[Silver Snake Charm] Could not find the visitor username."
        );
        return null;
    }

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
    const special = SPECIAL_VISITORS[visitor];

    let chance;

    if (special?.guaranteed === true) {
        chance = 100;
    } else if (visitor === OWNER_USERNAME) {
        chance = OWNER_CHANCE;
    } else if (special && Number.isFinite(special.chance)) {
        chance = special.chance;
    } else {
        // Roll a new percentage between 1 and 20
        chance = Math.floor(
            Math.random() *
            (MAX_DEFAULT_CHANCE - MIN_DEFAULT_CHANCE + 1)
        ) + MIN_DEFAULT_CHANCE;
    }

    chance = Math.max(0, Math.min(100, chance));

    const received = Math.random() * 100 < chance;

    console.log(
        `[Silver Snake Charm] Visitor: ${visitor} | ` +
        `Chance: ${chance}% | ` +
        `Result: ${received ? "CHARM!" : "No charm"}`
    );

    return { received, visitor, chance };
}

// DISPLAY NOTIFICATION
function showCharmNotification() {
    const notification = document.getElementById(
        "silverSnakeCharm"
    );

    if (!notification) {
        console.warn(
            "[Silver Snake Charm] Notification element not found."
        );
        return;
    }

    const visitor = getVisitorUsername();

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
