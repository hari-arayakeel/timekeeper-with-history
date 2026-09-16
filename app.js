/*
    =========================================
    Toastmasters Time Keeper
    =========================================
*/

/* =========================================
   DOM elements
========================================= */

const timer = document.querySelector("#timer");

const status = document.querySelector("#status");

const startButton = document.querySelector("#start");

const resetButton = document.querySelector("#reset");

const saveButton = document.querySelector("#save");

const tabs = document.querySelectorAll(".timing-tab");

const greenTime = document.querySelector("#green-time");

const yellowTime = document.querySelector("#yellow-time");

const redTime = document.querySelector("#red-time");

const speakerInput = document.querySelector("#speaker-name");

const meetingDate = document.querySelector("#meeting-date");

const newMeetingButton = document.querySelector("#new-meeting");

const totalSessions = document.querySelector("#total-sessions");

const withinCount = document.querySelector("#within-count");

const amberCount = document.querySelector("#amber-count");

const overtimeCount = document.querySelector("#overtime-count");

const historyTable = document.querySelector(".history-table");

const historyMeetingDate = document.querySelector(
  ".history-meeting-info strong",
);

const historyAction = document.querySelector(".history-action");

const historyActions = document.querySelectorAll(".history-footer-button");

const exportButton = historyActions[0];

const clearMeetingButton = historyActions[1];

/* =========================================
   Bootstrap Icons
========================================= */

const ICONS = {
  volumeUp: `
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            aria-hidden="true">
            <path d="M11.536 14.01A8.47 8.47 0 0 0 14.026 8a8.47 8.47 0 0 0-2.49-6.01l-.708.707A7.48 7.48 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303z"/>
            <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.48 5.48 0 0 1 11.025 8a5.48 5.48 0 0 1-1.61 3.89z"/>
            <path d="M8 4a.5.5 0 0 0-.812-.39L4.825 5.5H2.5A.5.5 0 0 0 2 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 8 12z"/>
        </svg>
    `,

  volumeMute: `
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            aria-hidden="true">
            <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06"/>
            <path d="M11.646 5.146a.5.5 0 0 1 .708.708L10.207 8l2.147 2.146a.5.5 0 0 1-.708.708L9.5 8.707l-2.146 2.147a.5.5 0 0 1-.708-.708L8.793 8 6.646 5.854a.5.5 0 1 1 .708-.708L9.5 7.293z"/>
        </svg>
    `,

  phoneVibrate: `
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            aria-hidden="true">
            <path d="M10 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM6 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"/>
            <path d="M8 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
            <path d="M1.599 4.058a.5.5 0 0 1 .208.676A7 7 0 0 0 1 8c0 1.18.292 2.292.807 3.266a.5.5 0 0 1-.884.468A8 8 0 0 1 0 8c0-1.347.334-2.619.923-3.734a.5.5 0 0 1 .676-.208"/>
            <path d="M14.401 4.058a.5.5 0 0 0-.208.676A7 7 0 0 1 15 8c0 1.18-.292 2.292-.807 3.266a.5.5 0 0 0 .884.468A8 8 0 0 0 16 8c0-1.347-.334-2.619-.923-3.734a.5.5 0 0 0-.676-.208"/>
        </svg>
    `,

  phone: `
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            aria-hidden="true">
            <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
            <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
        </svg>
    `,

  sun: `
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            aria-hidden="true">
            <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13M16 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 16 8M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8"/>
        </svg>
    `,

  moon: `
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            aria-hidden="true">
            <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"/>
        </svg>
    `,

  play: `
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            aria-hidden="true">
            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
        </svg>
    `,

  pause: `
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            aria-hidden="true">
            <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5"/>
        </svg>
    `,

  reset: `
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            aria-hidden="true">
            <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
        </svg>
    `,

  check: `
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            aria-hidden="true">
            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093z"/>
        </svg>
    `,

  calendar: `
      <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-calendar2-week"
          viewBox="0 0 16 16"
          aria-hidden="true">
          <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z"/>
          <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5zM11 7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z"/>
      </svg>
  `,

  person: `
      <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-person-walking"
          viewBox="0 0 16 16"
          aria-hidden="true">

          <path d="M9.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0M6.44 3.752A.75.75 0 0 1 7 3.5h1.445c.742 0 1.32.643 1.243 1.38l-.43 4.083a1.8 1.8 0 0 1-.088.395l-.318.906.213.242a.8.8 0 0 1 .114.175l2 4.25a.75.75 0 1 1-1.357.638l-1.956-4.154-1.68-1.921A.75.75 0 0 1 6 8.96l.138-2.613-.435.489-.464 2.786a.75.75 0 1 1-1.48-.246l.5-3a.75.75 0 0 1 .18-.375l2-2.25Z"/>

          <path d="M6.25 11.745v-1.418l1.204 1.375.261.524a.8.8 0 0 1-.12.231l-2.5 3.25a.75.75 0 1 1-1.19-.914zm4.22-4.215-.494-.494.205-1.843.006-.067 1.124 1.124h1.44a.75.75 0 0 1 0 1.5H11a.75.75 0 0 1-.531-.22Z"/>

      </svg>
  `,

  plus: `
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            aria-hidden="true">
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
        </svg>
    `,

  chevronRight: `
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            aria-hidden="true">
            <path fill-rule="evenodd" d="M6.146 3.646a.5.5 0 0 1 .708 0l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L9.793 8 6.146 4.354a.5.5 0 0 1 0-.708"/>
        </svg>
    `,

  trash: `
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-trash3"
            viewBox="0 0 16 16"
            aria-hidden="true">
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 0 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
        </svg>
    `,

  upload: `
      <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-cloud-upload-fill"
          viewBox="0 0 16 16"
          aria-hidden="true">
          <path fill-rule="evenodd" d="M8 0a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 4.095 0 5.555 0 7.318 0 9.366 1.708 11 3.781 11H7.5V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11h4.188C14.502 11 16 9.57 16 7.773c0-1.636-1.242-2.969-2.834-3.194C12.923 1.999 10.69 0 8 0m-.5 14.5V11h1v3.5a.5.5 0 0 1-1 0"/>
      </svg>
  `,

  cardText: `
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            aria-hidden="true">
            <path d="M14 4.5v7a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1M3 2a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"/>
            <path d="M4 5.5A.5.5 0 0 1 4.5 5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0 2A.5.5 0 0 1 4.5 7h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0 2A.5.5 0 0 1 4.5 9h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5"/>
        </svg>
    `,
    speechType: `
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-mic-fill"
        viewBox="0 0 16 16"
        aria-hidden="true">

        <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0z"/>

        <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5"/>
    </svg>
`,
};



/* =========================================
   Header controls
========================================= */

const soundToggle = document.querySelector("#sound-toggle");

const vibrationToggle = document.querySelector("#vibration-toggle");

const soundIcon = document.querySelector("#sound-icon");

const vibrationIcon = document.querySelector("#vibration-icon");

/* =========================================
   Theme
========================================= */

const themeToggle = document.querySelector("#theme-toggle");

const themeIcon = document.querySelector("#theme-icon");

const themeLabel = document.querySelector("#theme-label");

/* =========================================
   Speaker test
========================================= */

const soundTest = document.querySelector("#sound-test");

const speechTypeIcon = document.querySelector("#speech-type-icon");

const speakerIcon = document.querySelector("#speaker-icon");

const meetingIcon = document.querySelector(".meeting-icon");

const newMeetingIcon = document.querySelector(
  ".new-meeting-button .button-icon",
);

const historyCalendarIcon = document.querySelector(".history-calendar-icon");

const viewAllIcon = document.querySelector(".history-action .button-icon");

const exportIcon = exportButton
  ? exportButton.querySelector(".button-icon")
  : null;

const clearMeetingIcon = clearMeetingButton
  ? clearMeetingButton.querySelector(".button-icon")
  : null;

/* =========================================
   Timer button icons
========================================= */

const startIcon = startButton
  ? startButton.querySelector(".button-icon")
  : null;

const saveIcon = saveButton ? saveButton.querySelector(".button-icon") : null;

const resetIcon = resetButton
  ? resetButton.querySelector(".button-icon")
  : null;

const soundTestIcon = soundTest
  ? soundTest.querySelector(".button-icon")
  : null;

/* =========================================
   Toastmasters timing rules

   All values are seconds.
========================================= */

const timingRules = {
  "Table Topics": {
    green: 60,
    yellow: 90,
    red: 120,
  },

  "Ice Breaker": {
    green: 240,
    yellow: 300,
    red: 360,
  },

  "Other Speech": {
    green: 300,
    yellow: 360,
    red: 420,
  },

  Evaluation: {
    green: 120,
    yellow: 150,
    red: 180,
  },

  "General Evaluator": {
    green: 180,
    yellow: 240,
    red: 300,
  },
};

/* =========================================
   Application state
========================================= */

const SAVED_TYPE_KEY = "toastmasters-last-speech-type";

let currentType = localStorage.getItem(SAVED_TYPE_KEY) || "Other Speech";

if (!timingRules[currentType]) {
  currentType = "Other Speech";
}

let elapsedSeconds = 0;

let running = false;

let interval = null;

let currentSpeaker = "";
let timerRunId = 0;

/* =========================================
   Meeting state
========================================= */

let currentMeeting = {
  id: Date.now(),
  date: new Date().toISOString(),
  sessions: [],
};

/* =========================================
   Alert state
========================================= */

let soundEnabled = true;

let vibrationEnabled = true;

let greenAlertPlayed = false;

let yellowAlertPlayed = false;

let redAlertPlayed = false;

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
    wakeLock = await navigator.wakeLock.request("screen");

    console.log("Screen Wake Lock is active.");

    wakeLock.addEventListener("release", () => {
      console.log("Screen Wake Lock was released.");

      wakeLock = null;
    });
  } catch (error) {
    console.log("Could not activate Screen Wake Lock:", error);
  }
}

async function releaseWakeLock() {
  if (wakeLock !== null) {
    try {
      await wakeLock.release();
    } catch (error) {
      console.log("Could not release Screen Wake Lock:", error);
    }

    wakeLock = null;
  }
}

/* Re-acquire the wake lock when the page
   becomes visible again */

document.addEventListener("visibilitychange", async () => {
  if (document.visibilityState === "visible" && running) {
    await requestWakeLock();
  }
});

/* =========================================
   Audio
========================================= */

let audioContext = null;

function getAudioContext() {
  if (!audioContext) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;

    if (!AudioContext) {
      return null;
    }

    audioContext = new AudioContext();
  }

  return audioContext;
}

/* =========================================
   Play sound
========================================= */

async function playTone(frequency = 660, duration = 0.15) {
  if (!soundEnabled) {
    return false;
  }

  try {
    const context = getAudioContext();

    if (!context) {
      console.log("Audio is not supported.");

      return false;
    }

    if (context.state === "suspended") {
      await context.resume();
    }

    if (context.state !== "running") {
      console.log("Audio context is not running.");

      return false;
    }

    const oscillator = context.createOscillator();

    const gain = context.createGain();

    oscillator.type = "sine";

    oscillator.frequency.setValueAtTime(frequency, context.currentTime);

    gain.gain.setValueAtTime(0.0001, context.currentTime);

    gain.gain.exponentialRampToValueAtTime(0.12, context.currentTime + 0.02);

    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      context.currentTime + duration,
    );

    oscillator.connect(gain);

    gain.connect(context.destination);

    oscillator.start(context.currentTime);

    oscillator.stop(context.currentTime + duration);

    return true;
  } catch (error) {
    console.error("Audio error:", error);

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

  if ("vibrate" in navigator) {
    navigator.vibrate(pattern);
  }
}

/* =========================================
   Green alert
========================================= */

function triggerGreenAlert() {
  playTone(660, 0.15);

  vibrate(80);
}

/* =========================================
   Yellow alert
========================================= */

function triggerYellowAlert() {
  playTone(740, 0.15);

  setTimeout(() => {
    playTone(740, 0.15);
  }, 220);

  vibrate([70, 120, 70]);
}

/* =========================================
   Red alert
========================================= */

function triggerRedAlert() {
  playTone(520, 0.18);

  setTimeout(() => {
    playTone(520, 0.18);
  }, 240);

  setTimeout(() => {
    playTone(520, 0.18);
  }, 480);

  vibrate([120, 100, 120, 100, 220]);
}

/* =========================================
   Format time
========================================= */

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);

  const remainingSeconds = seconds % 60;

  return (
    String(minutes).padStart(2, "0") +
    ":" +
    String(remainingSeconds).padStart(2, "0")
  );
}

/* =========================================
   Format clock time
========================================= */

function formatClockTime(date) {
  return date.toLocaleTimeString("en-GB", {
    hour: "numeric",
    minute: "2-digit",
  });
}

/* =========================================
   Format meeting date
========================================= */

function formatMeetingDate(date) {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/* =========================================
   Update timing reference
========================================= */

function updateTimingReference() {
  const rules = timingRules[currentType];

  greenTime.textContent = formatTime(rules.green);

  yellowTime.textContent = formatTime(rules.yellow);

  redTime.textContent = formatTime(rules.red);
}

/* =========================================
   Update timer
========================================= */

function updateTimer() {
  timer.textContent = formatTime(elapsedSeconds);

  const rules = timingRules[currentType];

  /*
        Green
    */

  if (elapsedSeconds >= rules.green && !greenAlertPlayed) {
    greenAlertPlayed = true;

    triggerGreenAlert();
  }

  /*
        Yellow
    */

  if (elapsedSeconds >= rules.yellow && !yellowAlertPlayed) {
    yellowAlertPlayed = true;

    triggerYellowAlert();
  }

  /*
        Red
    */

  if (elapsedSeconds >= rules.red && !redAlertPlayed) {
    redAlertPlayed = true;

    triggerRedAlert();
  }

  /*
        Timer colour and status
    */

  if (elapsedSeconds >= rules.red) {
    status.textContent = "Red — Time limit reached";

    timer.style.color = "#ff3b30";
  } else if (elapsedSeconds >= rules.yellow) {
    status.textContent = "Yellow — Final stage";

    timer.style.color = "#c99400";
  } else if (elapsedSeconds >= rules.green) {
    status.textContent = "Green — On track";

    timer.style.color = "#248a3d";
  } else {
    status.textContent = "Ready to start";

    timer.style.color = "";
  }
}

/* =========================================
   Show / hide Save button
========================================= */

function updateSaveButton() {
  if (!saveButton) {
    return;
  }

  saveButton.hidden = elapsedSeconds === 0;
}

/* =========================================
   Start / Pause
========================================= */

startButton.addEventListener("click", async () => {
  /*
            If timer is already running,
            pause it.
        */

  if (running) {
    /*
                Invalidate this timer run.
            */

    timerRunId++;

    clearInterval(interval);

    interval = null;

    running = false;

    await releaseWakeLock();

    startButton.innerHTML = `
            <span
                class="button-icon"
                aria-hidden="true">
                ${ICONS.play}
            </span>
                <span>Start</span>
                `;

    status.textContent = "Paused";

    return;
  }

  /*
            Create a unique ID for this
            timer run.

            This prevents an older async
            Start operation from creating
            an interval after Finish or Reset.
        */

  const thisRunId = ++timerRunId;

  /*
            Make sure no old interval exists.
        */

  clearInterval(interval);

  interval = null;

  /*
            Prepare audio for Safari.
        */

  if (soundEnabled) {
    const context = getAudioContext();

    if (context) {
      try {
        if (context.state === "suspended") {
          await context.resume();
        }
      } catch (error) {
        console.log("Could not start audio:", error);
      }
    }
  }

  /*
            Start timer state.
        */

  running = true;

  await requestWakeLock();

  /*
            IMPORTANT:

            Finish, Reset, or Pause may have
            happened while we were waiting.

            If this Start operation is no
            longer valid, do not create the
            interval.
        */

  if (!running || thisRunId !== timerRunId) {
    return;
  }

  startButton.innerHTML = `
            <span
                class="button-icon"
                aria-hidden="true">
                ${ICONS.pause}
            </span>
            <span>Pause</span>
            `;

  updateSaveButton();

  interval = setInterval(() => {
    /*
                        Extra safety check.
                    */

    if (!running) {
      clearInterval(interval);

      interval = null;

      return;
    }

    elapsedSeconds++;

    updateTimer();

    updateSaveButton();
  }, 1000);
});

/* =========================================
   Reset
========================================= */

resetButton.addEventListener("click", async () => {
  /*
            If there is a timer running,
            stop it first.
        */

  timerRunId++;

  clearInterval(interval);

  interval = null;

  running = false;

  await releaseWakeLock();

  elapsedSeconds = 0;

  greenAlertPlayed = false;

  yellowAlertPlayed = false;

  redAlertPlayed = false;

  startButton.innerHTML = `
            <span
                class="button-icon"
                aria-hidden="true">
                ${ICONS.play}
            </span>
            <span>Start</span>
            `;

  updateTimer();

  updateSaveButton();
});

/* =========================================
   Finish & Save
========================================= */

if (saveButton) {
  saveButton.addEventListener("click", async () => {
    /*
                Speaker is required.
            */

    const speaker = speakerInput.value.trim();

    if (!speaker) {
      alert("Please enter the speaker name before saving.");

      speakerInput.focus();

      return;
    }

    /*
                A zero-second session should
                not be saved.
            */

    if (elapsedSeconds === 0) {
      alert("Please start the timer before saving.");

      return;
    }

    /*
                Stop timer.

                Invalidate any pending timer start.
            */

    timerRunId++;

    clearInterval(interval);
    interval = null;

    running = false;

    await releaseWakeLock();

    /*
                Determine final status.
            */

    const rules = timingRules[currentType];

    let sessionStatus;

    if (elapsedSeconds >= rules.red) {
      sessionStatus = "Overtime";
    } else if (elapsedSeconds >= rules.yellow) {
      sessionStatus = "Amber";
    } else {
      sessionStatus = "Within";
    }

    /*
                Create session.
            */

    const now = new Date();

    const session = {
      id: Date.now(),

      speaker: speaker,

      type: currentType,

      duration: elapsedSeconds,

      status: sessionStatus,

      time: formatClockTime(now),

      finishedAt: now.toISOString(),
    };

    /*
                Add session to meeting.
            */

    currentMeeting.sessions.push(session);

    /*
                Save to browser storage.
            */

    saveMeeting();

    /*
                Update history.
            */

    renderHistory();

    /*
                Reset timer for next speaker.
            */

    elapsedSeconds = 0;

    greenAlertPlayed = false;

    yellowAlertPlayed = false;

    redAlertPlayed = false;

    startButton.innerHTML = `
            <span
                class="button-icon"
                aria-hidden="true">
                ${ICONS.play}
            </span>
                <span>Start</span>
                `;

    updateTimer();

    updateSaveButton();

    running = false;
    interval = null;

    /*
                Clear speaker input so the
                next speaker can be entered.
            */

    speakerInput.value = "";

    currentSpeaker = "";
  });
}

/* =========================================
   Timing tabs
========================================= */

tabs.forEach((tab) => {
  tab.addEventListener("click", async () => {
    /*
                    Stop timer when changing
                    speech type.
                */

    timerRunId++;

    clearInterval(interval);

    interval = null;

    running = false;

    await releaseWakeLock();

    elapsedSeconds = 0;

    greenAlertPlayed = false;

    yellowAlertPlayed = false;

    redAlertPlayed = false;

    currentType = tab.dataset.type;

    localStorage.setItem(SAVED_TYPE_KEY, currentType);

    tabs.forEach((item) => {
      item.classList.remove("active");
    });

    tab.classList.add("active");

    startButton.innerHTML = `
                    <span
                        class="button-icon"
                        aria-hidden="true">
                        ${ICONS.play}
                    </span>
                    <span>Start</span>
                    `;

    updateTimingReference();

    updateTimer();

    updateSaveButton();
  });
});

/* =========================================
   Sound toggle
========================================= */

soundToggle.addEventListener("click", () => {
  soundEnabled = !soundEnabled;

  soundToggle.classList.toggle("active", soundEnabled);

  soundToggle.setAttribute("aria-pressed", String(soundEnabled));

  soundIcon.innerHTML = soundEnabled ? ICONS.volumeUp : ICONS.volumeMute;
});

/* =========================================
   Vibration toggle
========================================= */

vibrationToggle.addEventListener("click", () => {
  vibrationEnabled = !vibrationEnabled;

  vibrationToggle.classList.toggle("active", vibrationEnabled);

  vibrationToggle.setAttribute("aria-pressed", String(vibrationEnabled));

  vibrationIcon.innerHTML = vibrationEnabled ? ICONS.phoneVibrate : ICONS.phone;
});

/* =========================================
   Speaker TEST button
========================================= */

soundTest.addEventListener("click", async () => {
  const previousState = soundEnabled;

  soundEnabled = true;

  await playTone(660, 0.25);

  soundEnabled = previousState;
});

/* =========================================
   Theme toggle
========================================= */

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  const darkMode = document.body.classList.contains("dark-mode");

  if (darkMode) {
    themeIcon.innerHTML = ICONS.moon;

    themeLabel.textContent = "Dark";

    themeToggle.setAttribute("aria-label", "Switch to light mode");
  } else {
    themeIcon.innerHTML = ICONS.sun;

    themeLabel.textContent = "Light";

    themeToggle.setAttribute("aria-label", "Switch to dark mode");
  }
});

/* =========================================
   Local Storage
========================================= */

const STORAGE_KEY = "toastmasters-timekeeper-meeting";

function saveMeeting() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(currentMeeting));
}

function loadMeeting() {
  const savedMeeting = localStorage.getItem(STORAGE_KEY);

  if (!savedMeeting) {
    return;
  }

  try {
    const parsed = JSON.parse(savedMeeting);

    if (parsed && Array.isArray(parsed.sessions)) {
      currentMeeting = parsed;
    }
  } catch (error) {
    console.log("Could not load saved meeting:", error);
  }
}

/* =========================================
   Render history
========================================= */

function renderHistory() {
  if (!historyTable) {
    return;
  }

  /*
        Keep the table header.
    */

  /*
        Remove existing rows.
    */

  historyTable.querySelectorAll(".history-row").forEach((row) => row.remove());

  const rows = document.createDocumentFragment();

  /*
        Add saved sessions.
    */

  currentMeeting.sessions.forEach((session, index) => {
    const row = document.createElement("div");

    row.className = "history-row";

    const number = document.createElement("span");

    number.textContent = index + 1;

    const speaker = document.createElement("strong");

    speaker.textContent = session.speaker;

    const type = document.createElement("span");

    type.textContent = session.type;

    const duration = document.createElement("span");

    duration.textContent = formatTime(session.duration);

    const statusPill = document.createElement("span");

    statusPill.className = "status-pill";

    if (session.status === "Within") {
      statusPill.classList.add("within");
    } else if (session.status === "Amber") {
      statusPill.classList.add("amber");
    } else {
      statusPill.classList.add("overtime");
    }

    statusPill.textContent = session.status;

    const time = document.createElement("span");

    time.textContent = session.time;

    /*
    Delete button.
*/

    const deleteButton = document.createElement("button");

    deleteButton.type = "button";

    deleteButton.className = "history-delete-button";

    deleteButton.innerHTML = ICONS.trash;

    deleteButton.addEventListener("click", () => {
      const confirmed = confirm(`Delete ${session.speaker}'s session?`);

      if (!confirmed) {
        return;
      }

      /*
            Remove only this session.
        */

      currentMeeting.sessions = currentMeeting.sessions.filter(
        (item) => item.id !== session.id,
      );

      /*
            Save updated meeting.
        */

      saveMeeting();

      /*
            Re-render history and statistics.
        */

      renderHistory();
    });

    row.appendChild(number);

    row.appendChild(speaker);

    row.appendChild(type);

    row.appendChild(duration);

    row.appendChild(statusPill);

    row.appendChild(time);

    row.appendChild(deleteButton);

    rows.appendChild(row);
  });

  historyTable.appendChild(rows);

  /*
        Update statistics.
    */

  updateStatistics();
}

/* =========================================
   Update statistics
========================================= */

function updateStatistics() {
  const sessions = currentMeeting.sessions;

  let within = 0;
  let amber = 0;
  let overtime = 0;

  sessions.forEach(({ status }) => {
    if (status === "Within") {
      within++;
    } else if (status === "Amber") {
      amber++;
    } else if (status === "Overtime") {
      overtime++;
    }
  });

  totalSessions.textContent = sessions.length;

  withinCount.textContent = within;

  amberCount.textContent = amber;

  overtimeCount.textContent = overtime;
}

/* =========================================
   Update meeting information
========================================= */

function updateMeetingInformation() {
  const date = new Date(currentMeeting.date);

  if (meetingDate) {
    meetingDate.textContent = `${formatMeetingDate(date)} • ${formatClockTime(date)}`;
  }

  if (historyMeetingDate) {
    historyMeetingDate.textContent = formatMeetingDate(date);
  }
}

/* =========================================
   New Meeting
========================================= */

if (newMeetingButton) {
  newMeetingButton.addEventListener("click", async () => {
    if (currentMeeting.sessions.length > 0) {
      const confirmed = confirm(
        "Start a new meeting? The current meeting will remain saved in this browser.",
      );

      if (!confirmed) {
        return;
      }
    }

    clearInterval(interval);

    running = false;

    await releaseWakeLock();

    currentMeeting = {
      id: Date.now(),

      date: new Date().toISOString(),

      sessions: [],
    };

    saveMeeting();

    renderHistory();

    updateMeetingInformation();

    elapsedSeconds = 0;

    greenAlertPlayed = false;

    yellowAlertPlayed = false;

    redAlertPlayed = false;

    speakerInput.value = "";

    startButton.innerHTML = `
                <span
                    class="button-icon"
                    aria-hidden="true">
                    ${ICONS.play}
                </span>
                <span id="start-label">Start</span>
                `;

    updateTimer();

    updateSaveButton();
  });
}

/* =========================================
   Clear Meeting
========================================= */

if (clearMeetingButton) {
  clearMeetingButton.addEventListener("click", async () => {
    if (currentMeeting.sessions.length === 0) {
      return;
    }

    const confirmed = confirm("Clear all sessions from this meeting?");

    if (!confirmed) {
      return;
    }

    currentMeeting.sessions = [];

    saveMeeting();

    renderHistory();
  });
}

/* =========================================
   Export CSV
========================================= */

if (exportButton) {
  exportButton.addEventListener("click", () => {
    const sessions = currentMeeting.sessions;

    if (sessions.length === 0) {
      alert("There are no saved sessions to export.");

      return;
    }

    /*
                Meeting information
            */

    const meetingDateObject = new Date(currentMeeting.date);

    const meetingDate = formatMeetingDate(meetingDateObject);

    const meetingStartTime = formatClockTime(meetingDateObject);

    /*
                Report header
            */

    const reportHeader = [
      ["Time Keeping"],
      [`Date: ${meetingDate}`],
      [`Time: ${meetingStartTime}`],
      [],
    ];

    /*
                Table header
            */

    const tableHeader = [
      "Meeting Date",
      "Meeting Start Time",
      "Speaker",
      "Speech Type",
      "Green / Yellow / Red Timings",
      "Actual Duration",
      "Status",
      "Finished Time",
    ];

    /*
                Table rows
            */

    const rows = sessions.map((session) => {
      const rules = timingRules[session.type];

      const timings =
        `${formatTime(rules.green)} / ` +
        `${formatTime(rules.yellow)} / ` +
        `${formatTime(rules.red)}`;

      return [
        meetingDate,
        meetingStartTime,
        session.speaker,
        session.type,
        timings,
        formatTime(session.duration),
        session.status,
        session.time,
      ];
    });

    /*
                Combine report header
                and table.
            */

    const csvRows = [...reportHeader, tableHeader, ...rows];

    /*
                Convert to CSV.
            */

    const csv = csvRows
      .map((row) => {
        return row
          .map((value) => `"${String(value).replaceAll('"', '""')}"`)
          .join(",");
      })
      .join("\n");

    /*
                Create CSV file.
            */

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = `toastmasters-time-keeping-${meetingDate.replaceAll(" ", "-")}.csv`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  });
}

/* =========================================
   View All
========================================= */

/* =========================================
   View All
========================================= */

if (historyAction) {
  historyAction.addEventListener("click", () => {
    showAllSessions();
  });
}

/* =========================================
   Show All Sessions
========================================= */

function showAllSessions() {
  /*
        Create the overlay.
    */

  const overlay = document.createElement("div");

  overlay.className = "history-modal";

  /*
        Create modal.
    */

  const modal = document.createElement("div");

  modal.className = "history-modal-content";

  /*
        Header.
    */

  const header = document.createElement("div");

  header.className = "history-modal-header";

  const title = document.createElement("h2");

  title.textContent = "Meeting History";

  const closeButton = document.createElement("button");

  closeButton.type = "button";

  closeButton.className = "history-modal-close";

  closeButton.textContent = "×";

  closeButton.setAttribute("aria-label", "Close meeting history");

  header.appendChild(title);
  header.appendChild(closeButton);

  /*
        Meeting information.
    */

  const meetingInfo = document.createElement("div");

  meetingInfo.className = "history-modal-info";

  meetingInfo.textContent = formatMeetingDate(new Date(currentMeeting.date));

  /*
        Session list.
    */

  const sessionList = document.createElement("div");

  sessionList.className = "history-modal-list";

  if (currentMeeting.sessions.length === 0) {
    const empty = document.createElement("p");

    empty.textContent = "No saved speeches yet.";

    empty.className = "history-modal-empty";

    sessionList.appendChild(empty);
  } else {
    currentMeeting.sessions.forEach((session, index) => {
      const row = document.createElement("div");

      row.className = "history-modal-row";

      const details = document.createElement("div");

      details.className = "history-modal-details";

      const speaker = document.createElement("strong");

      speaker.textContent = `${index + 1}. ${session.speaker}`;

      const information = document.createElement("span");

      information.textContent = `${session.type} • ${formatTime(session.duration)} • ${session.time}`;

      const statusPill = document.createElement("span");

      statusPill.className = "status-pill";

      if (session.status === "Within") {
        statusPill.classList.add("within");
      } else if (session.status === "Amber") {
        statusPill.classList.add("amber");
      } else {
        statusPill.classList.add("overtime");
      }

      statusPill.textContent = session.status;

      details.appendChild(speaker);

      details.appendChild(information);

      details.appendChild(statusPill);

      /*
                    Delete button.
                */

      const deleteButton = document.createElement("button");

      deleteButton.type = "button";

      deleteButton.className = "history-delete-button";

      deleteButton.textContent = "Delete";

      deleteButton.addEventListener("click", () => {
        const confirmed = confirm(`Delete ${session.speaker}'s session?`);

        if (!confirmed) {
          return;
        }

        /*
                            Remove the selected
                            session.
                        */

        currentMeeting.sessions = currentMeeting.sessions.filter(
          (item) => item.id !== session.id,
        );

        /*
                            Save updated meeting.
                        */

        saveMeeting();

        /*
                            Refresh today's history.
                        */

        renderHistory();

        /*
                            Refresh View All.
                        */

        overlay.remove();

        showAllSessions();
      });

      row.appendChild(details);

      row.appendChild(deleteButton);

      sessionList.appendChild(row);
    });
  }

  /*
        Close button.
    */

  closeButton.addEventListener("click", () => {
    overlay.remove();
  });

  /*
        Close if clicking outside
        the modal.
    */

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      overlay.remove();
    }
  });

  modal.appendChild(header);

  modal.appendChild(meetingInfo);

  modal.appendChild(sessionList);

  overlay.appendChild(modal);

  document.body.appendChild(overlay);
}
/* =========================================
   Initialise Bootstrap Icons
========================================= */

if (soundIcon) {
  soundIcon.innerHTML = ICONS.volumeUp;
}

if (vibrationIcon) {
  vibrationIcon.innerHTML = ICONS.phoneVibrate;
}

if (themeIcon) {
  themeIcon.innerHTML = ICONS.sun;
}

if (speechTypeIcon) {
    speechTypeIcon.innerHTML =
        ICONS.speechType;
}

if (speakerIcon) {
  speakerIcon.innerHTML = ICONS.person;
}

if (meetingIcon) {
  meetingIcon.innerHTML = ICONS.calendar;
}

if (newMeetingIcon) {
  newMeetingIcon.innerHTML = ICONS.plus;
}

if (historyCalendarIcon) {
  historyCalendarIcon.innerHTML = ICONS.calendar;
}

if (viewAllIcon) {
  viewAllIcon.innerHTML = ICONS.chevronRight;
}

if (exportIcon) {
  exportIcon.innerHTML = ICONS.upload;
}

if (clearMeetingIcon) {
  clearMeetingIcon.innerHTML = ICONS.trash;
}

if (startIcon) {
  startIcon.innerHTML = ICONS.play;
}

if (saveIcon) {
  saveIcon.innerHTML = ICONS.check;
}

if (resetIcon) {
  resetIcon.innerHTML = ICONS.reset;
}

if (soundTestIcon) {
  soundTestIcon.innerHTML = ICONS.volumeUp;
}
/* =========================================
   Initial state
========================================= */

loadMeeting();

updateMeetingInformation();

tabs.forEach((tab) => {
  tab.classList.toggle("active", tab.dataset.type === currentType);
});

updateTimingReference();

updateTimer();

updateSaveButton();

renderHistory();
