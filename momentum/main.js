//#region vars

const date = document.querySelector('.date')
const time = document.querySelector('.time')
const name = document.querySelector('.name')
const goal = document.querySelector('.goal')
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

function nextImageNumber() {
    //console.log('click gets into nextImageNumber', Math.round(Math.random()*5))
    //should return not random of 6, but next one, or start at the beginning
    //should go into next time of day

    //if (i != 6) i++
    //return zeroPad(imagesArray[i])

    return zeroPad(imagesArray[Math.round(Math.random()*5)])
    //return zeroPad(Math.round(Math.random()*19)+1)
}

let imagesArray

function makeImagesArray() {
    imagesArray = []
    let randomN = Math.round(Math.random()*19 + 1)
    while (imagesArray.length < 6) {
        if (!imagesArray.includes(randomN)) {
            imagesArray.push(randomN)
        }
        randomN = Math.round(Math.random()*19 + 1)
    }
    console.log(imagesArray)
}

function nextImage(timeOfDay) {
    console.log('click gets into nextImage')
    const img = document.createElement('img')
    let innerNextImage = nextImageNumber(timeOfDay)
    let innerTimeOfDay = timeOfDay
    if (innerNextImage == 6) {
        innerTimeOfDay = nextTime(innerTimeOfDay)
        innerNextImage = 0
    }
    img.src = `assets/${innerTimeOfDay}/${nextImageNumber(innerTimeOfDay)}.jpg`
    img.onload = () => {
        document.body.style.backgroundImage =
            `url('assets/${timeOfDay}/${nextImageNumber()}.jpg')`
    }
}

function setBgGreet(hour) {

    console.log('click gets into setBgGreet', hour)
    if (hour.typeOf != 'number') {
        let now = new Date()
        hour = now.getHours()
    }
    if (hour < 6) {
        nextImage('night');
        greeting.textContent = 'Good Night, '
    }

    if (hour < 12) {
        nextImage('morning');
        greeting.textContent = 'Good Morning, '
    }

    if (hour < 18) {
        console.log('click gets into setBgGreet')
        nextImage('afternoon');
        greeting.textContent = 'Good Afternoon, '
    }

    if (hour < 24) {
        nextImage('evening');
        greeting.textContent = 'Good Evening, '
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
        `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`
    const res = await fetch(url)
    const data = await res.json()
    quoteBody.textContent = data.quoteText
    //figcaption.textContent = data.quoteAuthor
  }
  document.addEventListener('DOMContentLoaded', getQuote)
  refreshButton.addEventListener('click', getQuote)

//#endregion quote

//#region weather
let cityName = ''

const icon = document.querySelector('.icon');
const temp = document.querySelector('.temp');

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=en&appid=08f2a575dda978b9c539199e54df03b0&units=metric`
  const res = await fetch(url)
  const data = await res.json()
  //console.log(data.weatheweatherIcon.classList.add(`owf-${data.weather[0].id}`);

  icon.classList.add(`owf-${data.weather[0].id}`);
  temp.textContent = `${data.main.temp}°C`;
  //weatherDescription.textContent = data.weather[0].description;
}
getWeather()
//#endregion weather

//#region event listeners and function calls

makeImagesArray()
let newDate = new Date()
let hoursGlobal =newDate.getHours()

name.addEventListener('click', clearName)
name.addEventListener('keypress', setName)
name.addEventListener('blur', setName)

goal.addEventListener('keypress', setGoal)
goal.addEventListener('click', clearGoal)
goal.addEventListener('blur', setGoal)
nextButton.addEventListener('click', setBgGreet)
//nextButton.addEventListener('click', console.log('works??'))
updateTime()
updateDate()
getName()
getGoal()
getQuote()
setBgGreet(hoursGlobal)
//#endregion event listeners and function calls
