const apikey = "358953dea09afa93b5018f22234b0522";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector("#img1");
const today = new Date();
const curHr = today.getHours();
const bgChannge = document.querySelector(".background");
const suggestion = document.getElementById("suggestion");
const winfo = document.getElementById("w-info");

if (curHr < 12) {
  document.getElementById("greetings").innerHTML = "good morning";
} else if (curHr < 18) {
  document.getElementById("greetings").innerHTML = "good afternoon";
} else {
  document.getElementById("greetings").innerHTML = "good evening";
}

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apikey}`);

  if (response.status == 404) {
    alert("No Data Found");
    document.getElementById("speakButton").style.display = "none";
  } else {
    var data = await response.json();

    console.log(data);
    setTimeout(() => {
      const suggestions =
        weatherSuggestions[data.weather[0].main.toLowerCase()];
      if (suggestions && suggestions.length > 0) {
        const randomIndex = Math.floor(Math.random() * suggestions.length);
        suggestion.innerHTML = suggestions[randomIndex];

        winfo.innerHTML = data.weather[0].main;
      } else {
        suggestion.innerText = "No suggestion available";
      }
    }, 1000);
    document.querySelectorAll(".city1")[0].innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "./img/images/clouds.png";
      bgChannge.style.backgroundImage =
        "url('./img/images/CloudBgChange.webp')";
      bgChannge.style.backgroundPosition = "center";
      bgChannge.style.backgroundRepeat = "no-repeat";
      bgChannge.style.backgroundSize = "fill";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "./img/images/clear.png";
      bgChannge.style.backgroundImage =
        "url('./img/images/ClearBgChange_1.webp')";
      bgChannge.style.backgroundPosition = "center";
      bgChannge.style.backgroundRepeat = "no-repeat";
      bgChannge.style.backgroundSize = "fill";
      // Animation = "rotate 2s linear 1s infinite";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "./img/images/rain.png";
      bgChannge.style.backgroundImage = "url('./img/images/RainBgchange.webp')";
      bgChannge.style.backgroundPosition = "center";
      bgChannge.style.backgroundRepeat = "no-repeat";
      bgChannge.style.backgroundSize = "fill";
      bgChannge.style.backdropFilter = "blur(1px)";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "./img/images/drizzle.png";
      bgChannge.style.backgroundImage =
        "url('./img/images/DrizzleBgChange.webp')";
      bgChannge.style.backgroundPosition = "center";
      bgChannge.style.backgroundRepeat = "no-repeat";
      bgChannge.style.backgroundSize = "fill";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "./img/images/mist.png";
      bgChannge.style.backgroundImage =
        "url('./img/images/MistBgChange_2.webp')";
      bgChannge.style.backgroundPosition = "center";
      bgChannge.style.backgroundRepeat = "no-repeat";
      bgChannge.style.backgroundSize = "fill";
    } else if (data.weather[0].main == "Haze") {
      weatherIcon.src = "./img/images/white sun.png";
      bgChannge.style.backgroundImage = "url('./img/images/HazeBgChange.jpg')";
      bgChannge.style.backgroundPosition = "center";
      bgChannge.style.backgroundRepeat = "no-repeat";
      bgChannge.style.backgroundSize = "fill";
    }
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=358953dea09afa93b5018f22234b0522`
    )
      .then((response) => response.json())
      .then((data) => {
        var forecastWeather = document.getElementById("forecastWeather");
        forecastWeather.innerHTML = "";
        // console.log(data)
        // Get forecast data for next 7 days
        var forecasts = data.list.filter((item) =>
          item.dt_txt.includes("12:00:00")
        );

        forecasts.forEach((forecast) => {
          var date = new Date(forecast.dt * 1000).toDateString().split(" ");
          var day = date[0];
          var weatherIcon = forecast.weather[0].icon;

          forecastWeather.innerHTML += `
              <div class="weather-card">
                <p>${day}</p>
                <img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="Weather Icon" class="forcast-img">
                <p>${Math.round(forecast.main.temp)}°C</p>
              </div>
            `;
        });
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }
}
document.getElementById("speakButton").style.display = "none";

document.getElementById("speakButton").addEventListener("click", function () {
  var text = document.querySelector("#greetings").innerText;
  var line = "The Temperature of " + searchBox.value + "is";
  var detail = document.querySelector(".temp").innerHTML;

  speak(text);
  speak(line);
  speak(detail);
});

function speak(line) {
  var speechSynthesis = window.speechSynthesis;
  // var utterance = new SpeechSynthesisUtterance(text);
  var utteranc1 = new SpeechSynthesisUtterance(line);
  speechSynthesis.speak(utteranc1);
}
function speak(text) {
  var speechSynthesis = window.speechSynthesis;
  var utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
}
function speak(detail) {
  var speechSynthesis = window.speechSynthesis;
  var utterance2 = new SpeechSynthesisUtterance(detail);
  speechSynthesis.speak(utterance2);
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
  document.getElementById("speakButton").style.display = "block";

  if (searchBox.value == "") {
    alert("Invalid fields");
    document.getElementById("speakButton").style.display = "none";
  }
});

document
  .getElementById("location-button")
  .addEventListener("click", getCurrentLocationWeather);
async function getWeatherByCoordinates(latitude, longitude) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
function getCurrentLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const response = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
        );

        const data = await response.json();
        console.log(data.city);

        const weatherData = await getWeatherByCoordinates(latitude, longitude);
        // displayWeather(weatherData);
        checkWeather(data.city);
        // console.log(data)
      },
      (error) => {
        console.error("Error:", error);
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }

  // console.log(d)
}

const weatherSuggestions = {
  thunderstorm: [
    "Stay indoors and avoid open areas.",
    "Unplug electronic devices to prevent damage from lightning.",
    "Follow local weather updates for any warnings or advisories.",
    "Avoid using wired phones during a thunderstorm.",
    "If outdoors, seek shelter in a sturdy building or a vehicle.",
  ],

  drizzle: [
    "Use an umbrella or raincoat for light protection.",
    "Drive carefully, as roads may be slippery.",
    "Dress in layers to stay comfortable in the cool and damp weather.",
    "Keep windows closed to prevent indoor dampness.",
    "Enjoy a cozy indoor activity like reading or watching movies.",
  ],

  rain: [
    "Be prepared with a waterproof jacket and umbrella.",
    "Check for local flood alerts and avoid flood-prone areas.",
    "Drive cautiously, keeping a safe distance from other vehicles.",
    "Enjoy indoor activities like cooking or playing board games.",
    "Listen to the sound of rain for a calming atmosphere.",
  ],

  snow: [
    "Dress warmly in layers to stay insulated from the cold.",
    "Use snow boots for traction on slippery surfaces.",
    "Drive slowly and cautiously on snowy roads.",
    "Build a snowman or engage in winter sports.",
    "Enjoy a hot beverage by the fireplace.",
  ],

  clear: [
    "Take advantage of the clear skies for stargazing.",
    "Plan outdoor activities like hiking or picnics.",
    "Enjoy a sunny day at the beach or park.",
    "Wear sunglasses and sunscreen to protect against UV rays.",
    "Capture beautiful photos of the clear, blue sky.",
  ],

  clouds: [
    "Embrace the cozy atmosphere for indoor activities.",
    "Capture photos of dramatic cloud formations.",
    "Enjoy a hot beverage while watching the clouds pass by.",
    "Use diffused light for photography during overcast days.",
    "Listen to calming music or read a book on a cloudy day.",
  ],

  mist: [
    "Take a refreshing walk in the misty surroundings.",
    "Capture atmospheric photos of mist-covered landscapes.",
    "Use caution while driving due to reduced visibility.",
    "Enjoy the mysterious and serene ambiance created by mist.",
    "Try mindfulness exercises in the tranquil misty environment.",
  ],

  haze: [
    "Limit outdoor activities, especially for sensitive individuals.",
    "Use air purifiers indoors to improve air quality.",
    "Stay hydrated to combat the effects of hazy conditions.",
    "Check local air quality reports for updates.",
    "Consider wearing a mask when outdoor air quality is poor.",
  ],

  smoke: [
    "Stay indoors to avoid exposure to smoke.",
    "Keep windows and doors closed to prevent smoke entry.",
    "Use air purifiers to filter indoor air.",
    "Follow local health advisories related to air quality.",
    "If necessary, wear masks designed to filter out smoke particles.",
  ],

  dust: [
    "Use protective eyewear to shield your eyes from dust.",
    "Close windows and doors to minimize indoor dust exposure.",
    "Stay hydrated to counter the effects of dusty conditions.",
    "Consider wearing a mask to reduce inhalation of dust particles.",
    "Limit outdoor activities during dusty weather.",
  ],

  fog: [
    "Drive cautiously with headlights on during foggy conditions.",
    "Use reflective clothing if walking in foggy areas.",
    "Keep a safe distance from other vehicles on the road.",
    "Enjoy the mysterious atmosphere created by fog.",
    "Listen for sounds that may be amplified in foggy conditions.",
  ],

  sand: [
    "Protect your eyes with goggles or sunglasses in sandy conditions.",
    "Cover your face with a scarf or mask to prevent inhaling sand.",
    "Seek shelter during sandstorms to avoid exposure.",
    "Secure outdoor furniture and items to prevent damage.",
    "Stay informed about weather conditions and follow safety guidelines.",
  ],

  ash: [
    "Stay indoors during ashfall to avoid respiratory issues.",
    "Use masks designed to filter out ash particles if necessary.",
    "Cover electronic devices to prevent ash damage.",
    "Stay informed about volcanic activity and evacuation plans.",
    "Follow local authorities' instructions for safety during ashfall.",
  ],

  squall: [
    "Secure outdoor items to prevent damage during squalls.",
    "Stay indoors and away from windows during severe squalls.",
    "Be cautious of sudden changes in wind speed and direction.",
    "Avoid engaging in water activities during squally weather.",
    "Listen to weather updates for information on squall intensity.",
  ],

  tornado: [
    "Seek shelter in a sturdy building, preferably in a basement.",
    "Stay away from windows and protect your head with a helmet or cushion.",
    "Monitor weather updates and tornado warnings.",
    "If caught outdoors, find a low-lying area and lie flat, covering your head.",
    "Have an emergency kit with essentials in your designated tornado shelter.",
  ],
};
