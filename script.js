
const apikey ="358953dea09afa93b5018f22234b0522";
const apiUrl ="https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon =document.querySelector("#img1")
const today = new Date()
const curHr = today.getHours()

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
            document.body.style.backgroundImage = "url('./img/images/CloudBgChange.jpg')";
            document.body.style.backgroundPosition = "top";
            document.body.style.backgroundRepeat = "no-repeat";
            document.body.style.backgroundSize = "fill";

      
          }  
        else if(data.weather[0].main=="Clear"){
            weatherIcon.src = "./img/images/clear.png";
            document.body.style.backgroundImage = "url('./img/images/ClearBgChange.jpg')";
            document.body.style.backgroundPosition = "top";
            document.body.style.backgroundRepeat = "no-repeat";
            document.body.style.backgroundSize = "fill";
            // Animation = "rotate 2s linear 1s infinite";
    

            
            
        }
        else if(data.weather[0].main=="Rain"){
            weatherIcon.src = "./img/images/rain.png";
            document.body.style.backgroundImage = "url('./img/images/rain bg change.jpeg')";
            document.body.style.backgroundPosition = "top";
            document.body.style.backgroundRepeat = "no-repeat";
            document.body.style.backgroundSize = "fill";
            document.body.style.backdropFilter = "blur(1px)"

        
        }
        else if(data.weather[0].main=="Drizzle"){
            weatherIcon.src = "./img/images/drizzle.png";
            document.body.style.backgroundImage = "url('./img/images/DrizzleBgChange.png')";
            document.body.style.backgroundPosition = "top";
            document.body.style.backgroundRepeat = "no-repeat";
            document.body.style.backgroundSize = "fill";
           
        }
        else if(data.weather[0].main=="Mist"){
            weatherIcon.src = "./img/images/mist.png";
            document.body.style.backgroundImage = "url('./img/images/MistBgChange.jpg')";
            document.body.style.backgroundPosition = "top";
            document.body.style.backgroundRepeat = "no-repeat";
            document.body.style.backgroundSize = "fill";
            
        }
        else if(data.weather[0].main=="Haze"){
            weatherIcon.src = "./img/images/white sun.png";
            document.body.style.backgroundImage = "url('./img/images/HazeBgChange.jpg')";
            document.body.style.backgroundPosition = "top";
            document.body.style.backgroundRepeat = "no-repeat";
            document.body.style.backgroundSize = "fill";
            
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

// document.getElementById('speakButton').addEventListener('click', function() {
//   var text = document.getElementById('temp').innerText;
//   // var text = document.getElementById('temp').innerText;
//   console.log("Hi")
//   speak(text);
// });

// function speak(text) {
//   var speechSynthesis = window.speechSynthesis;
//   var utterance = new SpeechSynthesisUtterance(text);
//   speechSynthesis.speak(utterance);
// }
document.getElementById('speakButton').addEventListener('click', function() {
  var line = "The Temperature of "+searchBox.value+"is";
  var text = document.querySelector('.temp').innerText;
  // var text = document.getElementById('temp').innerText;
  console.log("Hi")
  speak(line);
  speak(text);
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

// document.getElementById('speakButton').addEventListener('click', function() {
//   // var tempSpeak = "The Temperature of" +document.querySelectorAll(".city1")[0].innerHTML+ "is";
//   var text = document.getElementById('temp').value;
//   // console.log("Hi")
//   // speak(tempSpeak,text);
//   speak(text);
// });

// function speak(tempSpeak) {
//   var speechSynthesis = window.speechSynthesis;
//   var tempsp = new SpeechSynthesisUtterance(tempSpeak);
//   // var utterance = new SpeechSynthesisUtterance(text);
//   speechSynthesis.speak(tempsp);
//   // speechSynthesis.speak(utterance);
// }



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

