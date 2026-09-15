/*
    =========================================
    Toastmasters Time Keeper
    =========================================
*/


/* =========================================
   DOM elements
========================================= */

const timer =
    document.querySelector("#timer");

const status =
    document.querySelector("#status");

const startButton =
    document.querySelector("#start");

const resetButton =
    document.querySelector("#reset");

const tabs =
    document.querySelectorAll(".timing-tab");

const greenTime =
    document.querySelector("#green-time");

const yellowTime =
    document.querySelector("#yellow-time");

const redTime =
    document.querySelector("#red-time");


/* =========================================
   Header controls
========================================= */

const soundToggle =
    document.querySelector("#sound-toggle");

const vibrationToggle =
    document.querySelector("#vibration-toggle");

const soundIcon =
    document.querySelector("#sound-icon");

const vibrationIcon =
    document.querySelector("#vibration-icon");


/* =========================================
   Theme
========================================= */

const themeToggle =
    document.querySelector("#theme-toggle");

const themeIcon =
    document.querySelector("#theme-icon");

const themeLabel =
    document.querySelector("#theme-label");


/* =========================================
   Speaker test
========================================= */

const soundTest =
    document.querySelector("#sound-test");


/* =========================================
   Toastmasters timing rules

   All values are seconds.
========================================= */

const timingRules = {

    "Table Topics": {
        green: 60,
        yellow: 90,
        red: 120
    },

    "Ice Breaker": {
        green: 240,
        yellow: 300,
        red: 360
    },

    "Other Speech": {
        green: 300,
        yellow: 360,
        red:  420
    },

    "Evaluation": {
        green: 120,
        yellow: 150,
        red: 180
    },

    "General Evaluator": {
        green: 180,
        yellow: 240,
        red: 300
    }

};


/* =========================================
   Application state
========================================= */

let currentType =
    "Other Speech";

let elapsedSeconds =
    0;

let running =
    false;

let interval =
    null;


/* =========================================
   Alert state
========================================= */

let soundEnabled =
    true;

let vibrationEnabled =
    true;

let greenAlertPlayed =
    false;

let yellowAlertPlayed =
    false;

let redAlertPlayed =
    false;

/* =========================================
   Screen Wake Lock
========================================= */

let wakeLock = null;

async function requestWakeLock() {

    if (!("wakeLock" in navigator)) {
        console.log("Screen Wake Lock is not supported.");
        return;
    }

    try {

        wakeLock =
            await navigator.wakeLock.request("screen");

        console.log("Screen Wake Lock is active.");

        wakeLock.addEventListener(
            "release",
            () => {

                console.log(
                    "Screen Wake Lock was released."
                );

                wakeLock = null;

            }
        );

    }
    catch (error) {

        console.log(
            "Could not activate Screen Wake Lock:",
            error
        );

    }

}

async function releaseWakeLock() {

    if (wakeLock !== null) {

        try {

            await wakeLock.release();

        }
        catch (error) {

            console.log(
                "Could not release Screen Wake Lock:",
                error
            );

        }

        wakeLock = null;

    }

}

/* Re-acquire the wake lock when the page
   becomes visible again */

document.addEventListener(
    "visibilitychange",
    async () => {

        if (
            document.visibilityState === "visible" &&
            running
        ) {

            await requestWakeLock();

        }

    }
);

/* =========================================
   Audio
========================================= */

let audioContext =
    null;


/*
    Create the AudioContext.
*/

function getAudioContext() {

    if (!audioContext) {

        const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;


        if (!AudioContext) {

            return null;

        }


        audioContext =
            new AudioContext();

    }


    return audioContext;

}


/* =========================================
   Play sound
========================================= */

async function playTone(
    frequency = 660,
    duration = 0.15
) {

    if (!soundEnabled) {
        return false;
    }


    try {

        const context =
            getAudioContext();


        if (!context) {

            console.log(
                "Audio is not supported."
            );

            return false;

        }


        /*
            Make sure Safari has resumed
            the audio context.
        */

        if (
            context.state === "suspended"
        ) {

            await context.resume();

        }


        /*
            If Safari still hasn't allowed
            audio, stop here.
        */

        if (
            context.state !== "running"
        ) {

            console.log(
                "Audio context is not running."
            );

            return false;

        }


        /*
            Create oscillator
        */

        const oscillator =
            context.createOscillator();


        /*
            Create volume control
        */

        const gain =
            context.createGain();


        /*
            Smooth sine-wave tone
        */

        oscillator.type =
            "sine";


        oscillator.frequency.setValueAtTime(
            frequency,
            context.currentTime
        );


        /*
            Start quietly
        */

        gain.gain.setValueAtTime(
            0.0001,
            context.currentTime
        );


        /*
            Fade in
        */

        gain.gain.exponentialRampToValueAtTime(
            0.12,
            context.currentTime + 0.02
        );


        /*
            Fade out
        */

        gain.gain.exponentialRampToValueAtTime(
            0.0001,
            context.currentTime + duration
        );


        /*
            Connect audio
        */

        oscillator.connect(
            gain
        );

        gain.connect(
            context.destination
        );


        /*
            Play
        */

        oscillator.start(
            context.currentTime
        );


        oscillator.stop(
            context.currentTime + duration
        );


        return true;

    }

    catch (error) {

        console.error(
            "Audio error:",
            error
        );

        return false;

    }

}


/* =========================================
   Vibration
========================================= */

function vibrate(pattern) {

    if (!vibrationEnabled) {

        return;

    }


    if (
        "vibrate" in navigator
    ) {

        navigator.vibrate(
            pattern
        );

    }

}


/* =========================================
   Green alert
========================================= */

function triggerGreenAlert() {

    playTone(
        660,
        0.15
    );


    vibrate(80);

}


/* =========================================
   Yellow alert
========================================= */

function triggerYellowAlert() {

    playTone(
        740,
        0.15
    );


    setTimeout(
        () => {

            playTone(
                740,
                0.15
            );

        },
        220
    );


    vibrate([
        70,
        120,
        70
    ]);

}


/* =========================================
   Red alert
========================================= */

function triggerRedAlert() {

    playTone(
        520,
        0.18
    );


    setTimeout(
        () => {

            playTone(
                520,
                0.18
            );

        },
        240
    );


    setTimeout(
        () => {

            playTone(
                520,
                0.18
            );

        },
        480
    );


    vibrate([
        120,
        100,
        120,
        100,
        220
    ]);

}


/* =========================================
   Format time
========================================= */

function formatTime(seconds) {

    const minutes =
        Math.floor(seconds / 60);


    const remainingSeconds =
        seconds % 60;


    return (
        String(minutes).padStart(2, "0")
        +
        ":"
        +
        String(remainingSeconds).padStart(2, "0")
    );

}


/* =========================================
   Update timing reference
========================================= */

function updateTimingReference() {

    const rules =
        timingRules[currentType];


    greenTime.textContent =
        formatTime(
            rules.green
        );


    yellowTime.textContent =
        formatTime(
            rules.yellow
        );


    redTime.textContent =
        formatTime(
            rules.red
        );

}


/* =========================================
   Update timer
========================================= */

function updateTimer() {

    timer.textContent =
        formatTime(
            elapsedSeconds
        );


    const rules =
        timingRules[currentType];


    /*
        Green
    */

    if (
        elapsedSeconds >= rules.green
        &&
        !greenAlertPlayed
    ) {

        greenAlertPlayed =
            true;

        triggerGreenAlert();

    }


    /*
        Yellow
    */

    if (
        elapsedSeconds >= rules.yellow
        &&
        !yellowAlertPlayed
    ) {

        yellowAlertPlayed =
            true;

        triggerYellowAlert();

    }


    /*
        Red
    */

    if (
        elapsedSeconds >= rules.red
        &&
        !redAlertPlayed
    ) {

        redAlertPlayed =
            true;

        triggerRedAlert();

    }


    /*
        Timer colour and status
    */

    if (
        elapsedSeconds >= rules.red
    ) {

        status.textContent =
            "Red — Time limit reached";


        timer.style.color =
            "#ff3b30";

    }

    else if (
        elapsedSeconds >= rules.yellow
    ) {

        status.textContent =
            "Yellow — Final stage";


        timer.style.color =
            "#c99400";

    }

    else if (
        elapsedSeconds >= rules.green
    ) {

        status.textContent =
            "Green — On track";


        timer.style.color =
            "#248a3d";

    }

    else {

        status.textContent =
            "Ready to start";


        timer.style.color =
            "";

    }

}


/* =========================================
   Start / Pause
========================================= */

startButton.addEventListener(
    "click",
    async () => {

        /*
            If the timer is already running,
            pause it.
        */

        if (running) {

            clearInterval(
                interval
            );

            running =
                false;

            await releaseWakeLock();

            startButton.textContent =
                "Start";

            status.textContent =
                "Paused";

            return;
        }


        /*
            IMPORTANT FOR iPHONE / SAFARI

            Prepare the audio while this
            function is running because the
            user has just tapped Start.
        */

        if (soundEnabled) {

            const context =
                getAudioContext();


            if (context) {

                try {

                    if (
                        context.state ===
                        "suspended"
                    ) {

                        await context.resume();

                    }

                }

                catch (error) {

                    console.log(
                        "Could not start audio:",
                        error
                    );

                }

            }

        }


        /*
            Start timer
        */

        running =
            true;

        await requestWakeLock();

        startButton.textContent =
            "Pause";


        interval =
            setInterval(
                () => {

                    elapsedSeconds++;

                    updateTimer();

                },
                1000
            );

    }
);


/* =========================================
   Reset
========================================= */

resetButton.addEventListener(
    "click",
    async () => {

        clearInterval(
            interval
        );


        running =
            false;

        await releaseWakeLock();

        elapsedSeconds = 0;


        greenAlertPlayed =
            false;

        yellowAlertPlayed =
            false;

        redAlertPlayed =
            false;


        startButton.textContent =
            "Start";


        updateTimer();

    }
);


/* =========================================
   Timing tabs
========================================= */

tabs.forEach(
    (tab) => {

        tab.addEventListener(
            "click",
            async () => {

                clearInterval(
                    interval
                );


                running =
                    false;

                await releaseWakeLock();


                elapsedSeconds =
                    0;


                greenAlertPlayed =
                    false;

                yellowAlertPlayed =
                    false;

                redAlertPlayed =
                    false;


                currentType =
                    tab.dataset.type;


                tabs.forEach(
                    (item) => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                tab.classList.add(
                    "active"
                );


                startButton.textContent =
                    "Start";


                updateTimingReference();

                updateTimer();

            }
        );

    }
);


/* =========================================
   Sound toggle
========================================= */

soundToggle.addEventListener(
    "click",
    () => {

        soundEnabled =
            !soundEnabled;


        soundToggle.classList.toggle(
            "active",
            soundEnabled
        );


        soundToggle.setAttribute(
            "aria-pressed",
            String(soundEnabled)
        );


        soundIcon.textContent =
            soundEnabled
                ? "🔊"
                : "🔇";

    }
);


/* =========================================
   Vibration toggle
========================================= */

vibrationToggle.addEventListener(
    "click",
    () => {

        vibrationEnabled =
            !vibrationEnabled;


        vibrationToggle.classList.toggle(
            "active",
            vibrationEnabled
        );


        vibrationToggle.setAttribute(
            "aria-pressed",
            String(vibrationEnabled)
        );


        vibrationIcon.textContent =
            vibrationEnabled
                ? "📳"
                : "📴";

    }
);


/* =========================================
   Speaker TEST button
========================================= */

soundTest.addEventListener(
    "click",
    async () => {

        /*
            Save the current setting.
        */

        const previousState =
            soundEnabled;


        /*
            Force sound ON.
        */

        soundEnabled =
            true;


        /*
            IMPORTANT:
            Wait for the sound to finish
            initializing before restoring
            the previous setting.
        */

        await playTone(
            660,
            0.25
        );


        /*
            Restore setting.
        */

        soundEnabled =
            previousState;

    }
);


/* =========================================
   Theme toggle
========================================= */

themeToggle.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "dark-mode"
        );


        const darkMode =
            document.body.classList.contains(
                "dark-mode"
            );


        if (darkMode) {

            themeIcon.textContent =
                "☾";


            themeLabel.textContent =
                "Dark";


            themeToggle.setAttribute(
                "aria-label",
                "Switch to light mode"
            );

        }

        else {

            themeIcon.textContent =
                "☀︎";


            themeLabel.textContent =
                "Light";


            themeToggle.setAttribute(
                "aria-label",
                "Switch to dark mode"
            );

        }

    }
);


/* =========================================
   Initial state
========================================= */

updateTimingReference();

updateTimer();