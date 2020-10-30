//#region vars

const date = document.querySelector('.date')
const time = document.querySelector('.time')
const name = document.querySelector('.name')
const goal = document.querySelector('.goal')
const city = document.querySelector('.city')
const nextButton = document.querySelector('.nextButton')
const greeting = document.querySelector('.greeting')
const refreshButton = document.querySelector('.refreshButton')
const quoteBody = document.querySelector('.quoteBody')

let savedName
let savedGoal

let daysList = {
    '0': 'Sunday',
    '1': 'Monday',
    '2': 'Tuesday',
    '3': 'Wednesday',
    '4': 'Thursday',
    '5': 'Friday',
    '6': 'Saturday',
 }

 let monthsList = {
    '0': 'January',
    '1': 'February',
    '2': 'March',
    '3': 'April',
    '4': 'May',
    '5': 'June',
    '6': 'July',
    '7': 'August',
    '8': 'September',
    '9': 'October',
    '10': 'November',
    '11': 'December',
 }

//#endregion vars

//#region date, time (entry point timer function), zeroPad
function updateDate() {
    let now = new Date()
    let day = daysList[now.getDay()]
    let month = monthsList[now.getMonth()]
    let ndate = now.getDate()
    date.innerHTML = `${day}, ${ndate} ${month}`
    //window.setTimeout(updateDate, 1000)
}

function zeroPad(n) {
    return ((+n < 10 ? '0' : '') + n)
}

function updateTime() {
    let now = new Date()
    let hours = now.getHours()
    let minutes = now.getMinutes()
    let seconds = now.getSeconds()
    time.innerHTML = `${hours}:${zeroPad(minutes)}:${zeroPad(seconds)}`
    window.setTimeout(updateTime, 1000)

    if (hours == 0) updateDate()

    if (minutes == 0 && seconds == 0) setBgGreet(hours)
}

//#endregion date and time

//#region background
let i = 0

function nextTime(timeOfDay) {
    let arrayTimes = ['night', 'morning', 'afternoon', 'evening']
    return arrayTimes[arrayTimes.indexOf(timeOfDay)+1]
}

function nextImageNumber(timeOfDay, hour) {
    //console.log('click gets into nextImageNumber', Math.round(Math.random()*5))
    //should return not random of 6, but next one, or start at the beginning
    //should go into next time of day

    //if (i != 6) i++
    //return zeroPad(imagesArray[i])
    //return hour

    return zeroPad(imagesArray[Math.round(Math.random()*5)])

    if (timeOfDay == 'night') return imagesArray[hour]
    if (timeOfDay == 'morning') return imagesArray[hour-6]
    if (timeOfDay == 'afternoon') return imagesArray[hour-12]
    if (timeOfDay == 'evening') return imagesArray[hour-18]

    //return zeroPad(Math.round(Math.random()*19)+1)
}

let imagesArray
let imagesArrayAll = []

function makeImagesArray() {
    imagesArray = []
    let randomN = Math.round(Math.random()*19 + 1)
    while (imagesArray.length < 6) {
        if (!imagesArray.includes(randomN)) {
            imagesArray.push(randomN)
        }
        randomN = Math.round(Math.random()*19 + 1)
    }
    //imagesArray.push(...imagesArray)
    console.log(imagesArray)
}

let innerTimeOfDay

function nextImage(timeOfDay, hour) {
    //console.log('click gets into nextImage')
    const img = document.createElement('img')
    //let innerNextImage = nextImageNumber(timeOfDay, hour)
    //let innerTimeOfDay = timeOfDay
    //if (innerNextImage == 6) {
    //    innerTimeOfDay = nextTime(innerTimeOfDay)
    //    innerNextImage = 0
    //}

    console.log(`assets/${timeOfDay}/${zeroPad(imagesArray[hour%6])}.jpg`)
    img.src = `assets/${timeOfDay}/${zeroPad(imagesArray[hour%6])}.jpg`
    img.onload = () => {
        document.body.style.backgroundImage =
            `url('assets/${timeOfDay}/${zeroPad(imagesArray[hour%6])}.jpg')`
    }
}

let clicked = false

function recalcToD(hour) {
    hour = hour % 24
    if (hour < 6) return 'night'
    else if (hour < 12) return 'morning'
    else if (hour < 18) return 'afternoon'
    else if (hour < 24) return 'evening'
    //else if (hour >= 24) {
     //   hour = 0
      //  i = 0
       // return 'night'
    //}
    // my mistake -- can't pass hour less than it is, see images before current time
}

let hourWrapper
function setBgGreet(hour) {

    console.log(hour, 'testing')
    //console.log('click gets into setBgGreet', hour)
    if (hour.typeOf != 'number') {
        let now = new Date()
        hour = now.getHours()
        clicked = true
        i++
        hourWrapper = (hour+i > 24) ? hour+i - 24 : hour+i
    }
    if (hour < 6) {
        greeting.textContent = 'Good Night, '
        if (clicked) nextImage(recalcToD(hourWrapper),hourWrapper)
        else {
          nextImage('night', hour)
          i = 0
        }
    }

    else if (hour < 12) {
        greeting.textContent = 'Good Morning, '
        if (clicked) nextImage(recalcToD(hourWrapper),hourWrapper)
        else {
        nextImage('morning', hour);
        i = 0}
    }

    else if (hour < 18) {
        greeting.textContent = 'Good Afternoon, '
        if (clicked) nextImage(recalcToD(hourWrapper),hourWrapper)
        else {
        nextImage('afternoon', hour);
        i = 0}
    }

    else if (hour < 24) {
        greeting.textContent = 'Good Evening, '
        if (clicked) nextImage(recalcToD(hourWrapper),hourWrapper)
        else {
        nextImage('evening', hour);
        i = 0}
    }
}

//#endregion background

//#region name
function setName(e) {
    if (e.type === 'keypress') {
        if (e.which == 13 || e.keyCode == 13) {
            if (e.target.innerText === '') {
                localStorage.setItem('name', savedName)
                name.blur()
            }
            else {
                localStorage.setItem('name', e.target.innerText)
                name.blur()
            }
        }
    } else {
        if (e.target.innerText === '') {
                localStorage.setItem('name', savedName)
                name.textContent = localStorage.getItem('name')
            }
        else localStorage.setItem('name', e.target.innerText)
    }
}

function clearName() {
    savedName = name.textContent
    name.textContent = ''
}

function getName() {
    if(!localStorage.getItem('name')) name.textContent = '[Username]'
    else name.textContent = localStorage.getItem('name')
}

//#endregion name

//#region goal
function getGoal() {
    if(!localStorage.getItem('goal')) goal.textContent = "[Crosscheck student's Momentums]"
    else goal.textContent = localStorage.getItem('goal')
}

function setGoal(e) {
    if (e.type === 'keypress') {
        if (e.which == 13 || e.keyCode == 13) {
            if (e.target.innerText === '') {
                localStorage.setItem('goal', savedGoal)
                goal.blur()
            }
            else {
                localStorage.setItem('goal', e.target.innerText)
                goal.blur()
            }
        }
    } else {
        if (e.target.innerText === '') {
                localStorage.setItem('goal', savedGoal)
                goal.textContent = localStorage.getItem('goal')
            }
        else localStorage.setItem('goal', e.target.innerText)
    }
}

function clearGoal() {
    savedGoal = goal.textContent
    goal.textContent = ''
}
//#endregion goal

//#region quote
async function getQuote() {
    const url =
        `https://quote-garden.herokuapp.com/api/v2/quotes/random`
    const res = await fetch(url)
    const data = await res.json()
    quoteBody.textContent = data.quote.quoteText
    //figcaption.textContent = data.quoteAuthor
  }
  document.addEventListener('DOMContentLoaded', getQuote)
  refreshButton.addEventListener('click', getQuote)

//#endregion quote

//#region weather

function setCity(e) {
    if (e.type === 'keypress') {
        if (e.which == 13 || e.keyCode == 13) {
            if (e.target.innerText === '') {
                localStorage.setItem('city', savedCity)
                getWeather()
        //getWeather().catch(alert("Can't find such city"))
                city.blur()
            }
            else {
                localStorage.setItem('city', e.target.innerText)
                getWeather()
        //getWeather().catch(alert("Can't find such city"))
                city.blur()
            }
        }
    } else {
        if (e.target.innerText === '') {
                localStorage.setItem('city', savedCity)
                city.textContent = localStorage.getItem('city')
                getWeather()
        //getWeather().catch(alert("Can't find such city"))
            }
        else {
            getWeather()
        //getWeather().catch(alert("Can't find such city"))
            localStorage.setItem('city', e.target.innerText)
        }
    }
}

function clearCity() {
    savedCity = city.textContent
    city.textContent = ''
}

function getCity() {
    if(!localStorage.getItem('city')) city.textContent = '[City name]'
    else {
        city.textContent = localStorage.getItem('city')
        getWeather()
        //getWeather().catch(alert("Can't find such city"))
    }
}

const icon = document.querySelector('.icon');
const temp = document.querySelector('.temp');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=9d314bcec01fde2cf167a6bba6e9e512&units=metric`
  const res = await fetch(url)
  const data = await res.json()
  //console.log(data.weatheweatherIcon.classList.add(`owf-${data.weather[0].id}`);
    console.log(data.main)
  if (!data.main) {
      city.textContent = "Can't find such city"
      temp.textContent = ''
      wind.textContent = ''
      humidity.textContent = ''
    }

  temp.textContent = data.main.temp + ' °C'
  localStorage.setItem('temp', temp.innerText)
  humidity.textContent = 'humidity ' + data.main.humidity
  localStorage.setItem('humidity', humidity.innerText)
  wind.textContent = 'wind ' + data.wind.speed
  localStorage.setItem('wind', wind.innerText)
  icon.className = 'weather-icon owf';
  icon.classList.add(`owf-${data.weather[0].id}`)
  //humidity.textContent = data.weather[0].description
}


//#endregion weather

//#region event listeners and function calls
function coolDownWrapperBg() {
    document.querySelector(".nextButton").disabled = true;
    setTimeout(function() {document.querySelector(".nextButton").disabled = false;}, 2200);
    setBgGreet("d")
}

makeImagesArray()
let newDate = new Date()
let hoursGlobal =newDate.getHours()

name.addEventListener('click', clearName)
name.addEventListener('keypress', setName)
name.addEventListener('blur', setName)

city.addEventListener('click', clearCity)
city.addEventListener('keypress', setCity)
city.addEventListener('blur', setCity)

goal.addEventListener('click', clearGoal)
goal.addEventListener('keypress', setGoal)
goal.addEventListener('blur', setGoal)

nextButton.addEventListener('click', coolDownWrapperBg)

//nextButton.addEventListener('click', console.log('works??'))
updateTime()
updateDate()
getName()
getGoal()
getCity()
//getQuote()
setBgGreet(hoursGlobal)
//getQuote()
//#endregion event listeners and function calls
