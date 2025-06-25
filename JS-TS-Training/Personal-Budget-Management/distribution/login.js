import { getUsersFromLocalStorage, validateEmailInput, validatePassInput, setCurrentLoggedUser } from "./utils.js";
function authenticateUser(email, password) {
    const users = getUsersFromLocalStorage();
    for (const user of users) {
        if (user.email === email && user.password === password) {
            return true;
        }
    }
    return false;
}
const emailInput = document.getElementById("email-inp");
const passwordInput = document.getElementById("pass-inp");
const signInButton = document.getElementById("sign-in-btn");
const errorDisplay = document.getElementById("error-dsp");
emailInput.addEventListener("blur", () => {
    validateEmailInput(emailInput, errorDisplay);
});
passwordInput.addEventListener("blur", () => {
    validatePassInput(passwordInput, errorDisplay);
});
signInButton === null || signInButton === void 0 ? void 0 : signInButton.addEventListener("click", (event) => {
    event.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;
    if (!validateEmailInput(emailInput, errorDisplay) || !validatePassInput(passwordInput, errorDisplay)) {
        return;
    }
    const isAuthenticated = authenticateUser(email, password);
    if (isAuthenticated) {
        const session = { email };
        setCurrentLoggedUser(session);
        alert("Sign in successful!");
        window.location.href = "../dashboard/dashboard.html";
        errorDisplay.style.opacity = "0";
    }
    else {
        errorDisplay.innerText = "Invalid username or password!";
        errorDisplay.style.opacity = "1";
    }
});
