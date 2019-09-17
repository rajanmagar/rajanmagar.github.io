// Dom Element
const time = document.querySelector('#time'),
    greeting = document.querySelector('#greeting'),
    name = document.querySelector('#name'),
    focus = document.querySelector('#focus');

// Show Time
function showTime() {
    let today = new Date(),
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds();
    // Set AM || PM
    const amPm = hour >= 12 ? 'PM' : 'AM';
    // 12hr Format
    hour = hour % 12 || 12;
    // Output Time
    time.innerHTML = `${zeroFormat(hour)}<span>:<span>${zeroFormat(min)}<span>:<span>${zeroFormat(sec)}`;
    setTimeout(showTime, 1000);
}

function zeroFormat(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

function setBgScreen() {
    let today = new Date(),
        hour = today.getHours();
    if (hour < 12) {
        document.body.style.backgroundImage = "url(https://i.ibb.co/7vDLJFb/morning.jpg)";
        greeting.textContent = "Good Morning";
    } else if (hour < 18) {
        document.body.style.backgroundImage = "url(https://i.ibb.co/3mThcXc/afternoon.jpg)";
        greeting.textContent = "Good Afternoon";
    } else {
        document.body.style.backgroundImage = "url(https://i.ibb.co/924T2Wv/afternoon.jpg)";
        greeting.textContent = "Good Evening";
        document.body.style.color = "white";
    }
}

// Set Name
function setName(e) {
    if (e.type === "keypress") {
        if (e.which === 13 || e.keyCode === 13) {
            localStorage.setItem("name", e.target.innerText);
            name.blur();
        }
    } else {
        localStorage.setItem("name", e.target.innerText)
    }
}

function setFocus(e) {
    if (e.type === "keypress") {
        if (e.which === 13 || e.keyCode === 13) {
            localStorage.setItem("focus", e.target.innerText);
            focus.blur();
        }
    } else {
        localStorage.setItem("focus", e.target.innerText)
    }
}

// Get Name
function getName() {
    if (localStorage.getItem('name') === null) {
        name.textContent = "[Enter Name]"
    } else {
        name.textContent = localStorage.getItem("name")
    }
}

// Get Focus
function getFocus() {
    if (localStorage.getItem('focus') === null) {
        focus.textContent = "[Enter Focus]"
    } else {
        focus.textContent = localStorage.getItem("focus")
    }
}

name.addEventListener("keypress", setName);
name.addEventListener("blur", setName);
focus.addEventListener("keypress", setFocus);
focus.addEventListener("blur", setFocus);

showTime();
setBgScreen();
getName();
getFocus();