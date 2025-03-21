/************************** BACKGROUND **************************/

const arrImage = [
    "assets/img/img-1.webp",
    "assets/img/img-2.webp",
    "assets/img/img-3.webp",
    "assets/img/img-4.webp",
    "assets/img/img-5.webp",
    "assets/img/img-6.webp",
    "assets/img/img-7.webp",
    "assets/img/img-8.webp",
    "assets/img/img-9.webp",
    "assets/img/img-10.webp",
    "assets/img/img-11.webp",
    "assets/img/img-12.webp",
    
]

function imageBackground() {
    const body = document.body;
    const randomImage = Math.floor(Math.random() * arrImage.length);
    newImage = arrImage[randomImage]
    body.style.backgroundImage = `url(${newImage})`;
}

setInterval(imageBackground, 15000);

imageBackground();



/**************************CLOCK *************************************/

const time = () => {
    const today = new Date();
    const date = today.toLocaleDateString("en-GB");
    let hour = today.getHours().toString().padStart(2, '0');
    let minutes = today.getMinutes().toString().padStart(2, '0');
    let seconds = today.getSeconds().toString().padStart(2, '0');

    printDate(hour, minutes, seconds, date);
}

const printDate = (hour, minutes, seconds, date) => {
    const clock = document.getElementById('clock');
    const clockSecondary = document.getElementById('clockSecondary');
    if (clock) {
        clock.innerHTML = `
            <div class="time">${hour}:${minutes}:${seconds}</div>
            <div class="date">${date}</div>
        `
    } else {
        clockSecondary.innerHTML = `
            <div class="time">${hour}:${minutes}:${seconds}</div>
            <div class="date">${date}</div>
            <div class="phrase">${phrases(hour, minutes)}</div>
        `
    }
}

const phrases = (hour, minutes) => {
    let phrase;
    let intHour = parseInt(hour);

    if ((intHour > 0 && intHour < 7) || (intHour == 7 && minutes == '00') || (intHour == 0 && minutes !== '00')) {
        phrase = 'Es hora de descansar. Apaga y sigue mañana';
    } else if ((intHour > 7 && intHour < 12) || (intHour == 12 && minutes == '00') || (intHour == 7 && minutes !== '00')) {
        phrase = 'Buenos días, desayuna fuerte y a darle al código';
    } else if ((intHour > 12 && intHour < 14) || (intHour == 14 && minutes == '00') || (intHour == 12 && minutes !== '00')) {
        phrase = 'Echa un rato más pero no olvides comer';
    } else if ((intHour > 14 && intHour < 16) || (intHour == 16 && minutes == '00') || (intHour == 14 && minutes !== '00')) {
        phrase = 'Espero que hayas comido';
    } else if ((intHour > 16 && intHour < 18) || (intHour == 18 && minutes == '00') || (intHour == 16 && minutes !== '00')) {
        phrase = 'Buenas tardes, el último empujón';
    } else if ((intHour > 18 && intHour < 22) || (intHour == 22 && minutes == '00') || (intHour == 18 && minutes !== '00')) {
        phrase = 'Esto ya son horas extras, ... piensa en parar pronto';
    } else {
        phrase = 'Buenas noches, es hora de pensar en parar y descansar';
    }
    return phrase;
}

function getClock(){
    setInterval(time, 1000);
    time();
}


/*************************************** WEATHER *****************************************/


const apiKey = 'c761a312dc4f4a21aea192914231112';
const city = 'Madrid';

const fetchWeather = async (apiKey, city) => {
    try {
        const res = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&aqi=no`
            );
            if (!res.ok) {
                throw new Error('Ha surgido un error', res.status);
            }
            const dataWeather = await res.json();
            printWeatherCurrent(dataWeather);
            printWeatherForecast(dataWeather.forecast);
            
        } catch (error) {
            console.error('No se ha podido procesar la solicitud', error)
    }
}

const printWeatherCurrent = (dataWeather) => {
    const currentWeather = document.getElementById('currentWeather');
    const {location, current, condition} = dataWeather;
    const {region, country} = location;
    const {temp_c, humidity, wind_kph, precip_mm, condition: {text, icon}} = current;
    const thermometer = 'assets/termometro.png';

    currentWeather.innerHTML += `
    <div>
        <p>${region} / ${country}</p>
        <p class="textWeather">${text}</p>
    </div>
    <div class="actualWeather">
        <img src="${icon}" alt="iconWeather" class="iconWeather">
        <p class="temperature">${temp_c}</p>
        <img src="${thermometer}" class="thermometer">
        <ul class="ulWeather">
            <li>Precipitaciones: ${precip_mm}%</li>
            <li>Humedad: ${humidity}%</li>
            <li>Viento: ${wind_kph} Km/h</li>
        </ul>
    </div>
    `   
}

const printWeatherForecast = (forecast) => {
    const forecastWeather = document.getElementById('forecastWeather');
    const forecastday = forecast.forecastday;
    const hours = forecastday[0].hour;

    hours.forEach(weatherHour => {
        const {time, condition: {icon}, temp_c} = weatherHour;
        const timeFormat = time.split(' ')[1];
        forecastWeather.innerHTML += `
        <div>
            <p>${timeFormat}</p>
            <img src="${icon}" alt="iconWeather">
            <p>${temp_c}ºC</p>
        </div>
        `
    });
}

function getWeather() {
    fetchWeather(apiKey, city);
}


/************************************** PASSWORD ****************************************/

let password_input;
let finalPassword ="";


function getPassword(){
    const securePassword = document.getElementById('securePassword');
    let lenghtPassword = document.getElementById('password_input').value;
    let checkNumber = lenghtPassword.charCodeAt();
    if (lenghtPassword < 12 || lenghtPassword > 50) {
        alert("La longitud de la contraseña debe estar entre 12 y 50 carácteres");
        return;
    } else if (checkNumber < 48 || checkNumber > 57) {
        alert("La longitud tiene que ser un número");
        return;
    }
    for (let i = 0; i < lenghtPassword; i++) {
        generatePassword(lenghtPassword);
    }
    finalPassword = mixPasswd(finalPassword);
    securePassword.innerHTML = `
    <h3>Contraseña generada:</h3>
    <div>
        <span class="passwordGenerated">
            ${finalPassword.substring(0, lenghtPassword)}
        </span>
    </div>
    `;
}


function generatePassword(lenghtPassword) {
    const mayus = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const minus = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()-_=+";
    let password = '';

    if (password.length < lenghtPassword) {
        password =  mayus.charAt(Math.random() * mayus.length) 
        + minus.charAt(Math.random() * minus.length) 
        + numbers.charAt(Math.random() * numbers.length) 
        + symbols.charAt(Math.random() * symbols.length);
        finalPassword += password;
    }

}

function mixPasswd(passwd) {
let array = passwd.split("");
for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join("");
}



/****************************LINKS *************************************/

let lastId = 0;

function addLinks(){
    const linkName = document.getElementById('linkName');
    const linkUrl = document.getElementById('linkUrl');
    let inputName = linkName.value;
    let inputURL = linkUrl.value;
    let id = ++lastId;
    let datalink = {id, inputName, inputURL};
    let arr = [...getLocalStorage(), datalink];
    if (inputName && inputURL) {
        if (inputURL.match(/^(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?$/)) {
            saveLocalStorage(arr);
            printLinks(inputName,inputURL,id);
            linkUrl.value = "";
            linkName.value = "";
        } else {
            alert('La URL no es válida');
        }
    } else {
        alert('No se pueden añadir links vacíos')
    }
}

function saveLocalStorage(arr) {
    localStorage.setItem('favouriteLinks', JSON.stringify(arr));
}

function getLocalStorage() {
    const savedLinks = localStorage.getItem('favouriteLinks');
    return savedLinks ? JSON.parse(savedLinks) : [];
}

function printLinks(inputName, inputURL, id) {
    const ulFavourites = document.getElementById('ulFavourites');
    ulFavourites.innerHTML += `
    <li id="favourite-${id}">
        <a href="${inputURL}" target="_blank">
            ${inputName} 
        </a>
        <button class="removeLink" onclick="removeItem(${id})">❌</button>
    </li>
    `
}

function removeItem(id) {
    let arr = JSON.parse(localStorage.getItem('favouriteLinks'));
    arr.forEach((element, index) => {
        if (element.id === id) {
            arr.splice(index, 1);
            let element = document.getElementById(`favourite-${id}`);
            element.parentNode.removeChild(element);
        }
    });
    saveLocalStorage(arr);
}

function getLinks(){
    let storage = getLocalStorage();
    for (let i = 0; i < storage.length; i++) {
        printLinks(storage[i].inputName,storage[i].inputURL, storage[i].id);
        if (storage[i].id > lastId) {
            lastId = storage[i].id;
        }
    }
}

/**********************************FOOTER ******************************/


function getFooter(callback, url) {
    fetch(url)
        .then (response => {
            if (!response.ok) {
                throw new Error('La solicitud no se pudo procesar');
            }
            return response.text();
        })
        .then (html => {
            callback(html);
        })
        .catch (error => {
            console.error("no se ha podido cargar el footer", error)
            callback('');
        });
}
