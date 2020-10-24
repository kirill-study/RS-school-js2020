//#region vars

const date = document.querySelector('.date')
const time = document.querySelector('.time')
const name = document.querySelector('.name')
const goal = document.querySelector('.goal')
const greeting = document.querySelector('.greeting')

let savedName
let savedGoal

daysList = {
    '0': 'Sunday',
    '1': 'Monday',
    '2': 'Tuesday',
    '3': 'Wednesday',
    '4': 'Thursday',
    '5': 'Friday',
    '6': 'Saturday',
 }

 monthsList = {
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

//#region date and time
function updateDate() {
    let now = new Date()
    let day = daysList[now.getDay()]
    let month = monthsList[now.getMonth()]
    let ndate = now.getDate()
    date.innerHTML = `${day}, ${ndate} ${month}`
    window.setTimeout(updateDate, 1000) //TODO: not every second
}

function updateTime() {
    let now = new Date()
    let hours = now.getHours()
    let minutes = now.getMinutes()
    let seconds = now.getSeconds()
    time.innerHTML = `${hours}:${zeroPad(minutes)}:${zeroPad(seconds)}`
    window.setTimeout(updateTime, 1000)

    function zeroPad(n) {
        return ((+n < 10 ? '0' : '') + n)
    }
}

//#endregion date and time

//#region background

function nextImage() {
    let now = new Date();
    let hour = today.getHours();

    //(hour == 0) ? document.body.style.backgroundImage = "url('../img/0.jpg')" :
    //(hour == 1) ? document.body.style.backgroundImage = "url('../img/1.jpg')" :
}

function setBgGreet() {
    let now = new Date();
    let hour = today.getHours();

    if (hour < 6) {
        nextImage();
        document.body.style.backgroundImage = "url('../img/morning.jpg')"
        greeting.textContent = 'Good Night, '
    }

    if (hour < 12) {
        document.body.style.backgroundImage = "url('../img/morning.jpg')"
        greeting.textContent = 'Good Morning, '
    }

    if (hour < 18) {
        document.body.style.backgroundImage = "url('../img/morning.jpg')"
        greeting.textContent = 'Good Afternoon, '
    }

    if (hour < 24) {
        document.body.style.backgroundImage = "url('../img/morning.jpg')"
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

//#region event listeners and function calls

name.addEventListener('click', clearName)
name.addEventListener('keypress', setName)
name.addEventListener('blur', setName)

goal.addEventListener('keypress', setGoal)
goal.addEventListener('click', clearGoal)
goal.addEventListener('blur', setGoal)

updateTime()
updateDate()
getName()
getGoal()
//#endregion event listeners and function calls