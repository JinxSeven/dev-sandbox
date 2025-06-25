import { getUsersFromLocalStorage, saveUsersToLocalStorage, isEmailDuplicate, User, UserDash, getUserDash, setUserDash, Transaction, Goal, Bill } from "./utils.js";

const userNameInput = document.getElementById("user-name-inp") as HTMLInputElement;
const emailInput = document.getElementById("email-inp") as HTMLInputElement;
const passwordInput = document.getElementById("pass-inp") as HTMLInputElement;
const confirmPasswordInput = document.getElementById("cfm-pass-inp") as HTMLInputElement;
const errorDisplay = document.getElementById("error-dsp") as HTMLParagraphElement;

function validateForm(userName: string, email: string, password: string, confirmPassword: string): boolean {
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
signUpForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("buttonClick");

    const userName = userNameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    const status = validateForm(userName, email, password, confirmPassword);
    if (!status) return;

    const newUser: User = { userName, email, password };
    const users = getUsersFromLocalStorage();
    users.push(newUser);
    saveUsersToLocalStorage(users);

    const newUserDash: UserDash = {
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
