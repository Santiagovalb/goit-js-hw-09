// Described in documentation
import flatpickr from "flatpickr";
// Additional styles import
import "flatpickr/dist/flatpickr.min.css";

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();
    if (selectedDate < currentDate) {
      window.alert("Por favor selecciona una fecha en el futuro.");
      return;
    }
    const startBtn = document.getElementById("start-btn");
    startBtn.disabled = false;
    startBtn.addEventListener("click", () => startTimer(selectedDate));
  },
};

flatpickr("#datetime-picker", options);

function startTimer(endDate) { 
  const timer = document.querySelector(".timer");
  const daysElem = timer.querySelector("[data-days]");
  const hoursElem = timer.querySelector("[data-hours]");
  const minutesElem = timer.querySelector("[data-minutes]");
  const secondsElem = timer.querySelector("[data-seconds]");
  
  const updateTimer = () => {
    const ms = endDate - new Date();
    if (ms <= 0) {
      clearInterval(intervalId);
      daysElem.textContent = "00";
      hoursElem.textContent = "00";
      minutesElem.textContent = "00";
      secondsElem.textContent = "00";
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(ms);
    daysElem.textContent = addLeadingZero(days);
    hoursElem.textContent = addLeadingZero(hours);
    minutesElem.textContent = addLeadingZero(minutes);
    secondsElem.textContent = addLeadingZero(seconds);
  };
  
  const intervalId = setInterval(updateTimer, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, "0");
}