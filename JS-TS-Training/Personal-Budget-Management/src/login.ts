import { getUsersFromLocalStorage, validateEmailInput, validatePassInput, setCurrentLoggedUser, LoggedUser } from "./utils.js";

function authenticateUser(email: string, password: string): boolean {
    const users = getUsersFromLocalStorage();
    for (const user of users) {
        if (user.email === email && user.password === password) {
            return true;
        }
    }
    return false;
}

const emailInput = document.getElementById("email-inp") as HTMLInputElement;
const passwordInput = document.getElementById("pass-inp") as HTMLInputElement;
const signInButton = document.getElementById("sign-in-btn") as HTMLInputElement;
const errorDisplay = document.getElementById("error-dsp") as HTMLParagraphElement;

emailInput.addEventListener("blur", () => {
    validateEmailInput(emailInput, errorDisplay);
});

passwordInput.addEventListener("blur", () => {
    validatePassInput(passwordInput, errorDisplay);
});

signInButton?.addEventListener("click", (event) => {
    event.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;

    if (!validateEmailInput(emailInput, errorDisplay) || !validatePassInput(passwordInput, errorDisplay)) {
        return;
    }

    const isAuthenticated = authenticateUser(email, password);
    if (isAuthenticated) {
        const session: LoggedUser = { email };
        setCurrentLoggedUser(session);

        alert("Sign in successful!");
        window.location.href = "../dashboard/dashboard.html";
        errorDisplay.style.opacity = "0";
    } else {
        errorDisplay.innerText = "Invalid username or password!";
        errorDisplay.style.opacity = "1";
    }
});
