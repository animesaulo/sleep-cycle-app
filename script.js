const CYCLE_MINUTES = 90;
const FALL_ASLEEP_MINUTES = 15;
const RECOMMENDED_CYCLES = [6, 5, 4, 3];

const wakeForm = document.querySelector("#wake-form");
const bedForm = document.querySelector("#bed-form");
const wakeInput = document.querySelector("#wake-time");
const bedInput = document.querySelector("#bed-time");
const bedtimeResults = document.querySelector("#bedtime-results");
const wakeResults = document.querySelector("#wake-results");
const sleepNowButton = document.querySelector("#sleep-now");

const padTime = (value) => String(value).padStart(2, "0");

function timeToMinutes(timeValue) {
  const [hours, minutes] = timeValue.split(":").map(Number);
  return hours * 60 + minutes;
}

function formatTime(totalMinutes) {
  const minutesInDay = 24 * 60;
  const normalized = ((totalMinutes % minutesInDay) + minutesInDay) % minutesInDay;
  const date = new Date();
  date.setHours(Math.floor(normalized / 60), normalized % 60, 0, 0);

  return new Intl.DateTimeFormat([], {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function renderBedtimes(wakeTime) {
  const wakeMinutes = timeToMinutes(wakeTime);

  bedtimeResults.innerHTML = RECOMMENDED_CYCLES.map((cycles) => {
    const sleepDuration = cycles * CYCLE_MINUTES;
    const sleepStartTime = wakeMinutes - sleepDuration;
    const bedtimeWithBuffer = sleepStartTime - FALL_ASLEEP_MINUTES;

    return `
      <div class="comparison-card">
        <div class="comparison-cell" data-label="Sleep starts at">
          <div class="comparison-time">${formatTime(sleepStartTime)}</div>
          <div class="comparison-cycle">${cycles} cycles</div>
        </div>
        <div class="comparison-cell" data-label="Get in bed by">
          <div class="comparison-time">${formatTime(bedtimeWithBuffer)}</div>
          <div class="comparison-cycle">${cycles} cycles</div>
        </div>
      </div>
    `;
  }).join("");
}

function renderWakeTimes(bedTime) {
  const bedMinutes = timeToMinutes(bedTime);

  wakeResults.innerHTML = RECOMMENDED_CYCLES.map((cycles) => {
    const sleepDuration = cycles * CYCLE_MINUTES;
    const wakeWithoutBuffer = bedMinutes + sleepDuration;
    const wakeWithBuffer = bedMinutes + FALL_ASLEEP_MINUTES + sleepDuration;

    return `
      <div class="comparison-card">
        <div class="comparison-cell" data-label="Sleep starts now">
          <div class="comparison-time">${formatTime(wakeWithoutBuffer)}</div>
          <div class="comparison-cycle">${cycles} cycles</div>
        </div>
        <div class="comparison-cell" data-label="After 15 min">
          <div class="comparison-time">${formatTime(wakeWithBuffer)}</div>
          <div class="comparison-cycle">${cycles} cycles</div>
        </div>
      </div>
    `;
  }).join("");
}

function setCurrentTimeAsBedtime() {
  const now = new Date();
  const currentTime = `${padTime(now.getHours())}:${padTime(now.getMinutes())}`;
  bedInput.value = currentTime;
  renderWakeTimes(currentTime);
}

wakeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  renderBedtimes(wakeInput.value);
});

bedForm.addEventListener("submit", (event) => {
  event.preventDefault();
  renderWakeTimes(bedInput.value);
});

sleepNowButton.addEventListener("click", setCurrentTimeAsBedtime);

const now = new Date();
const defaultWakeTime = "07:00";
const defaultBedTime = `${padTime(now.getHours())}:${padTime(now.getMinutes())}`;

wakeInput.value = defaultWakeTime;
bedInput.value = defaultBedTime;

renderBedtimes(defaultWakeTime);
renderWakeTimes(defaultBedTime);
