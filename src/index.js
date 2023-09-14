let tempShow = 17;
const tempValue = document.getElementById("tempValue");

tempValue.innerHTML = tempShow.toString();

function celToFar(temp) {
  return ((temp * 9) / 5 + 32).toFixed(0);
}

const cel = document.getElementById("cel");
const far = document.getElementById("far");
let defoultTempType = true;

cel.addEventListener("click", function () {
  if (!defoultTempType) {
    tempValue.innerHTML = tempShow.toString();
    defoultTempType = !defoultTempType;
  }
});

far.addEventListener("click", function () {
  if (defoultTempType) {
    tempValue.innerHTML = celToFar(tempShow).toString();
    defoultTempType = !defoultTempType;
  }
});

const now = new Date();
const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const day = document.getElementById("day");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
day.innerHTML = dayNames[now.getDay()];
hours.innerHTML = now.getHours().toString();
minutes.innerHTML = now.getMinutes().toString();

const cityInputForm = document.getElementById("city-input-form");
const cityName = document.getElementById("city-name");
cityName.innerHTML = "Sydney";

cityInputForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const cityInput = document.getElementById("city-input");
  const apiKey = "3f6be1c407b0d9d1933561808db358ba";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&&units=metric`;

  axios
    .get(url)
    .then(function (response) {
      // handle success
      const tempInCity = response.data.main.temp;
      cityName.innerHTML = cityInput.value;
      tempShow = tempInCity.toFixed(0).toString();
      tempValue.innerHTML = tempShow;
      defoultTempType = true;
      cityInputForm.reset();
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      cityName.innerHTML = "City is not correct";
      cityInputForm.reset();
    });
});

function handlePosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const apiKey = "3f6be1c407b0d9d1933561808db358ba";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&&units=metric`;

  axios
    .get(url)
    .then(function (response) {
      // handle success
      const curentTemp = response.data.main.temp;
      const curentCity = response.data.name;

      cityName.innerHTML = curentCity;
      tempShow = curentTemp.toFixed(0).toString();
      tempValue.innerHTML = tempShow;
      defoultTempType = true;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}

const currentLocalBtn = document.getElementById("current-local");
currentLocalBtn.addEventListener("click", function (event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
});
