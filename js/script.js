// JavaScript for toggle menu

    var navLinks = document.getElementById("navLinks");

    function showMenu() {
        navLinks.style.right = "0";
    }

    function hideMenu() {
        navLinks.style.right = "-200px";
    }

// Form Validation

const form = document.querySelector("#contactForm");
const yourName = document.querySelector("#yourName");
const yourNameError = document.querySelector("#yourNameError");
const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#subjectError");
const message = document.querySelector("#message");
const messageError = document.querySelector("#messageError");


function validateForm(event) {
    event.preventDefault();

    if(checkLength(yourName.value, 5) === true) {
        yourNameError.style.display = "none";
    } else {
        yourNameError.style.display = "block";
    }
    
    if(validateEmail(email.value) === true) {
        emailError.style.display = "none";
    } else {
        emailError.style.display = "block";
    }

    if(checkLength(subject.value, 15) === true) {
        subjectError.style.display = "none";
    } else {
        subjectError.style.display = "block";
    }

    if(checkLength(message.value, 25) === true) {
        messageError.style.display = "none";
    } else {
        messageError.style.display = "block"
    }
}
    
console.log("Hello");

form.addEventListener("submit", validateForm);

function checkLength(value, len) {
    if (value.trim().length > len) {
        return true;
    } else {
        return false;
    }
}

function validateEmail(email) { 
    const regEx = /\S+@\S+\.\S+/;
    const patternMatches = regEx.test(email);
    return patternMatches;
}