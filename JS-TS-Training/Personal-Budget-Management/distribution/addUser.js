import { getUsersFromLocalStorage, saveUsersToLocalStorage, isEmailDuplicate, getUserDash, setUserDash } from "./utils.js";
const userNameInput = document.getElementById("user-name-inp");
const emailInput = document.getElementById("email-inp");
const passwordInput = document.getElementById("pass-inp");
const confirmPasswordInput = document.getElementById("cfm-pass-inp");
const errorDisplay = document.getElementById("error-dsp");
function validateForm(userName, email, password, confirmPassword) {
    console.log("validation");
    if (!userName) {
        errorDisplay.innerText = "Username field required!";
        userNameInput.style.borderColor = "rgb(218, 43, 43)";
        errorDisplay.style.opacity = "1";
        return false;
    }
    if (!email) {
        errorDisplay.innerText = "Email field required!";
        userNameInput.style.borderColor = "#d8d8d8";
        emailInput.style.borderColor = "rgb(218, 43, 43)";
        errorDisplay.style.opacity = "1";
        return false;
    }
    if (!password) {
        errorDisplay.innerText = "Password field required!";
        emailInput.style.borderColor = "#d8d8d8";
        passwordInput.style.borderColor = "rgb(218, 43, 43)";
        errorDisplay.style.opacity = "1";
        return false;
    }
    if (!confirmPassword) {
        errorDisplay.innerText = "Confirm password field required!";
        passwordInput.style.borderColor = "#d8d8d8";
        confirmPasswordInput.style.borderColor = "rgb(218, 43, 43)";
        errorDisplay.style.opacity = "1";
        return false;
    }
    if (password !== confirmPassword) {
        passwordInput.style.borderColor = "rgb(218, 43, 43)";
        confirmPasswordInput.style.borderColor = "rgb(218, 43, 43)";
        errorDisplay.innerText = "Passwords do not match.";
        errorDisplay.style.opacity = "1";
        return false;
    }
    if (isEmailDuplicate(email)) {
        emailInput.style.borderColor = "rgb(218, 43, 43)";
        passwordInput.style.borderColor = "#d8d8d8";
        confirmPasswordInput.style.borderColor = "#d8d8d8";
        errorDisplay.innerText = "Email already in use!.";
        errorDisplay.style.opacity = "1";
        return false;
    }
    errorDisplay.style.opacity = "0";
    return true;
}
userNameInput.addEventListener("blur", () => {
    const userName = userNameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    validateForm(userName, email, password, confirmPassword);
});
emailInput.addEventListener("blur", () => {
    const userName = userNameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    validateForm(userName, email, password, confirmPassword);
});
passwordInput.addEventListener("blur", () => {
    const userName = userNameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    validateForm(userName, email, password, confirmPassword);
});
confirmPasswordInput.addEventListener("blur", () => {
    const userName = userNameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    validateForm(userName, email, password, confirmPassword);
});
const signUpForm = document.querySelector("form");
signUpForm === null || signUpForm === void 0 ? void 0 : signUpForm.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("buttonClick");
    const userName = userNameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const status = validateForm(userName, email, password, confirmPassword);
    if (!status)
        return;
    const newUser = { userName, email, password };
    const users = getUsersFromLocalStorage();
    users.push(newUser);
    saveUsersToLocalStorage(users);
    const newUserDash = {
        name: userName,
        email: email,
        totalIncome: 0,
        totalExpense: 0,
        totalBalance: 0,
        goals: [],
        bills: [],
        transactions: [],
    };
    const userDash = getUserDash();
    userDash.push(newUserDash);
    setUserDash(userDash);
    console.log(newUserDash);
    alert("User registered successfully!");
    window.location.href = "../login/login.html";
});
