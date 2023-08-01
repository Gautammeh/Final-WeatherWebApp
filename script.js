
const apikey ="358953dea09afa93b5018f22234b0522";
const apiUrl ="https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon =document.querySelector("#img1")
const today = new Date()
const curHr = today.getHours()
const bgChannge = document.querySelector(".background");

if (curHr < 12) {
  document.getElementById("greetings").innerHTML = 'good morning'}
 else if (curHr < 18) {
  document.getElementById("greetings").innerHTML = 'good afternoon'}
 else {
  document.getElementById("greetings").innerHTML = 'good evening'}



async function checkWeather(city){
    const response = await fetch(apiUrl+ city +`&appid=${apikey}`);


    if(response.status == 404){
alert("No Data Found");
document.getElementById('speakButton').style.display = "none";

    }

    else{
        var data = await response.json();

        console.log(data);
    
    
        document.querySelectorAll(".city1")[0].innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp )+ "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
    
        if(data.weather[0].main=="Clouds"){
            weatherIcon.src = "./img/images/clouds.png";
            bgChannge.style.backgroundImage = "url('./img/images/CloudBgChange.webp')";
            bgChannge.style.backgroundPosition = "center";
            bgChannge.style.backgroundRepeat = "no-repeat";
            bgChannge.style.backgroundSize = "fill";

      
          }  
        else if(data.weather[0].main=="Clear"){
            weatherIcon.src = "./img/images/clear.png";
            bgChannge.style.backgroundImage = "url('./img/images/ClearBgChange_1.webp')";
            bgChannge.style.backgroundPosition = "center";
            bgChannge.style.backgroundRepeat = "no-repeat";
            bgChannge.style.backgroundSize = "fill";
            // Animation = "rotate 2s linear 1s infinite";
    

            
            
        }
        else if(data.weather[0].main=="Rain"){
            weatherIcon.src = "./img/images/rain.png";
            bgChannge.style.backgroundImage = "url('./img/images/RainBgchange.webp')";
            bgChannge.style.backgroundPosition = "center";
            bgChannge.style.backgroundRepeat = "no-repeat";
            bgChannge.style.backgroundSize = "fill";
            bgChannge.style.backdropFilter = "blur(1px)"

        
        }
        else if(data.weather[0].main=="Drizzle"){
            weatherIcon.src = "./img/images/drizzle.png";
            bgChannge.style.backgroundImage = "url('./img/images/DrizzleBgChange.webp')";
            bgChannge.style.backgroundPosition = "center";
            bgChannge.style.backgroundRepeat = "no-repeat";
            bgChannge.style.backgroundSize = "fill";
           
        }
        else if(data.weather[0].main=="Mist"){
            weatherIcon.src = "./img/images/mist.png";
            bgChannge.style.backgroundImage = "url('./img/images/MistBgChange_2.webp')";
            bgChannge.style.backgroundPosition = "center";
            bgChannge.style.backgroundRepeat = "no-repeat";
            bgChannge.style.backgroundSize = "fill";
            
        }
        else if(data.weather[0].main=="Haze"){
            weatherIcon.src = "./img/images/white sun.png";
            bgChannge.style.backgroundImage = "url('./img/images/HazeBgChange.jpg')";
            bgChannge.style.backgroundPosition = "center";
            bgChannge.style.backgroundRepeat = "no-repeat";
            bgChannge.style.backgroundSize = "fill";
            
        }
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=358953dea09afa93b5018f22234b0522`)
        .then(response => response.json())
        .then(data => {
          var forecastWeather = document.getElementById('forecastWeather');
          forecastWeather.innerHTML = '';
// console.log(data)
          // Get forecast data for next 7 days
          var forecasts = data.list.filter(item => item.dt_txt.includes('12:00:00'));

          forecasts.forEach(forecast => {
            var date = new Date(forecast.dt * 1000).toDateString().split(' ');
            var day = date[0];
            var weatherIcon = forecast.weather[0].icon;

            forecastWeather.innerHTML += `
              <div class="weather-card">
                <p>${day}</p>
                <img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="Weather Icon" class="forcast-img">
                <p>${ Math.round(forecast.main.temp)}°C</p>
              </div>
            `;
          });
        })
        .catch(error => {
          console.log('Error:', error);
        });
    
    }

}
document.getElementById('speakButton').style.display = "none";


document.getElementById('speakButton').addEventListener('click', function() {
  var text = document.querySelector('#greetings').innerText;
  var line = "The Temperature of "+searchBox.value+ "is" + document.querySelector('.temp').innerText;

  speak(text);
  speak(line);
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




searchBtn.addEventListener("click" , ()=>{
    checkWeather(searchBox.value);
    document.getElementById('speakButton').style.display = "block";

    if(searchBox.value==""){
        alert("Invalid fields");
        document.getElementById('speakButton').style.display = "none";
    }



}


)


document.getElementById('location-button').addEventListener('click', getCurrentLocationWeather);
async function getWeatherByCoordinates(latitude, longitude) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=metric`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
function getCurrentLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const response=await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
     
        const data=await response.json()
        console.log(data.city)
        
        const weatherData = await getWeatherByCoordinates(latitude, longitude);
        // displayWeather(weatherData);
        checkWeather(data.city)
        // console.log(data)

      },
      error => {
        console.error('Error:', error);
      }
    );
  } else {
    alert('Geolocation is not supported by this browser.');
  }

 
  // console.log(d)
}

