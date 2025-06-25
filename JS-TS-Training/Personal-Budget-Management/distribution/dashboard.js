import { universalNaNValidator, getCurrentLoggedUser, getUserDash, universalValidator, setUserDash, getUserDark, setUserDark, universalLenValidator } from "./utils.js";
const loggedUser = getCurrentLoggedUser();
const loggedUserDash = getUserDash();
const isDark = getUserDark();
let chartDataY = [];
let chartDataX = ["Entertainment", "Health", "Shopping", "Travel", "Education", "Other"];
let incomeSelector = ["Earnings", "Winnings", "Loan", "Freelances", "Returns", "Other"];
const userDashIndx = loggedUserDash.findIndex((itr) => itr.email === loggedUser.email);
const totalIncomeDsp = document.getElementById("total-income-dsp");
const totalExpenseDsp = document.getElementById("total-expense-dsp");
const totalBalanceDsp = document.getElementById("total-balance-dsp");
const profileNameDsp = document.querySelector(".profile-div p");
const newGoalBtn = document.getElementById("new-goal-btn");
const closeGoalPopup = document.getElementById("close-goal-popup");
const newBillBtn = document.getElementById("new-bill-btn");
const closeBillPopup = document.getElementById("close-bill-popup");
const newTransactionBtn = document.getElementById("new-transaction-btn");
const closeTransactionPopup = document.getElementById("close-transaction-popup");
const newTransactionType = document.getElementById("new-transaction-type-select");
const newTransactionAmount = document.getElementById("new-transaction-amt-inp");
const newTransactionDate = document.getElementById("new-transaction-date-inp");
const newTransactionPurpose = document.getElementById("new-transaction-purpose-select");
const saveTransactionBtn = document.getElementById("save-transaction-btn");
const zeroTransactionDiv = document.getElementById("zero-transaction-history");
const tableTBody = document.getElementById("table-tbody");
const newGoalName = document.getElementById("new-goal-name-inp");
const newGoalTarget = document.getElementById("new-goal-trgt-inp");
const newGoalInit = document.getElementById("new-goal-init-inp");
const saveGoalBtn = document.getElementById("save-goal-btn");
const savingGoalsDiv = document.querySelector("aside .saving-goals-div");
const zeroGoalsDiv = document.getElementById("zero-goals-div");
const overlay = document.getElementById("overlay");
const newGoalPopup = document.getElementById("new-goal-popup");
const newBillPopup = document.getElementById("new-bill-popup");
const newTransactionPopup = document.getElementById("new-transaction-popup");
const filterChartEntertain = document.getElementById("chart-filter-entertain");
const filterChartHealth = document.getElementById("chart-filter-health");
const filterChartShopping = document.getElementById("chart-filter-shopping");
const filterChartTravel = document.getElementById("chart-filter-travel");
const filterChartEdu = document.getElementById("chart-filter-education");
const filterChartOther = document.getElementById("chart-filter-other");
const filterChartReset = document.getElementById("chart-filter-reset");
const goalForm = document.getElementById("new-goal-form");
const transactForm = document.getElementById("new-transaction-form");
const edtTransactForm = document.getElementById("edt-transaction-form");
// filterChartReset.addEventListener('click', () => {
//     window.location.reload();
// });
let goalExpense = 0;
function updateDashUserData() {
    const arrayOfGoals = loggedUserDash[userDashIndx].goals;
    goalExpense = 0;
    arrayOfGoals.forEach((exp) => {
        goalExpense += exp.contribution;
    });
    totalExpenseDsp.innerText = String((loggedUserDash[userDashIndx].totalExpense + goalExpense).toFixed(2));
    totalIncomeDsp.innerText = String(loggedUserDash[userDashIndx].totalIncome.toFixed(2));
    profileNameDsp.innerText = String(loggedUserDash[userDashIndx].name);
    totalBalanceDsp.innerText = String((loggedUserDash[userDashIndx].totalBalance - goalExpense).toFixed(2));
    updateSavingGoalData();
    updateExpenseChartData();
    updateTransactionHistoryData();
}
function updateTransactionHistoryData() {
    const arrayOfTransactions = loggedUserDash[userDashIndx].transactions;
    if (arrayOfTransactions.length == 0) {
        zeroTransactionDiv.style.display = "flex";
        return;
    }
    zeroTransactionDiv.style.display = "none";
    for (let itr = 0; itr < arrayOfTransactions.length; itr++) {
        if (arrayOfTransactions[itr].purpose === "savings")
            continue;
        const newTRow = `<tr>
                            <td>${arrayOfTransactions[itr].type}</td>
                            <td>${arrayOfTransactions[itr].amount}₹</td>
                            <td>${arrayOfTransactions[itr].date}</td>
                            <td>${arrayOfTransactions[itr].purpose}</td>
                            <td><button id="${itr}" class="edt-trans-btn"><i class="fa-solid fa-pen-to-square fa-lg"></i></button></td>
                            <td><button id="${itr}" class="del-trans-btn"><i class="fa-solid fa-trash-can fa-lg"></i></button></td>
                        </tr>`;
        tableTBody === null || tableTBody === void 0 ? void 0 : tableTBody.insertAdjacentHTML("beforeend", newTRow);
    }
}
function updateSavingGoalData() {
    const arrayOfGoals = loggedUserDash[userDashIndx].goals;
    if (arrayOfGoals.length == 0) {
        zeroGoalsDiv.style.display = "flex";
        return;
    }
    else {
        zeroGoalsDiv.style.display = "none";
    }
    for (let itr = 0; itr < arrayOfGoals.length; itr++) {
        const goalPercentage = ((arrayOfGoals[itr].contribution / arrayOfGoals[itr].target) * 100).toFixed(1);
        if (Number(goalPercentage) == 100) {
            const newGoalDiv = `<div style="display: flex;justify-content: space-evenly; align-items: center;" class="goals-div">
                                    <p>${arrayOfGoals[itr].name}</p><progress style="height:30px;width: 20%;" class="goal-prog-bar" value="${arrayOfGoals[itr].contribution}" max="${arrayOfGoals[itr].target}"></progress>
                                    <p id="progressPercentage">${arrayOfGoals[itr].target}₹</p>
                                    <span class="goal-comp-ind"><i style="color: #25D366; margin-left: 4px;" class="fa-solid fa-circle-check fa-xl"></i></span>
                                    <button id="${itr}" class="goal-del-btn"><i class="fa-solid fa-trash-can fa-lg"></i></button>
                                </div>`;
            savingGoalsDiv === null || savingGoalsDiv === void 0 ? void 0 : savingGoalsDiv.insertAdjacentHTML("beforeend", newGoalDiv);
            continue;
        }
        const newGoalDiv = `<div style="display: flex;justify-content: space-evenly; align-items: center;" class="goals-div">
                                <p>${arrayOfGoals[itr].name}</p><progress style="height:30px;width: 20%;" class="goal-prog-bar" value="${arrayOfGoals[itr].contribution}" max="${arrayOfGoals[itr].target}"></progress>
                                <p id="progressPercentage">${goalPercentage}%</p>
                                <button id="${itr}" class="goal-fund-btn"><i class="fa-solid fa-circle-dollar-to-slot fa-lg"></i></button>
                                <button id="${itr}" class="goal-del-btn"><i class="fa-solid fa-trash-can fa-lg"></i></button>
                            </div>`;
        savingGoalsDiv === null || savingGoalsDiv === void 0 ? void 0 : savingGoalsDiv.insertAdjacentHTML("beforeend", newGoalDiv);
    }
}
function updateExpenseChartData() {
    const arrayOfTransactions = loggedUserDash[userDashIndx].transactions;
    const expTransArr = arrayOfTransactions.filter((itr) => itr.type == "expense");
    let temp = new Map();
    temp.set("Entertainment", 0);
    temp.set("Health", 0);
    temp.set("Shopping", 0);
    temp.set("Travel", 0);
    temp.set("Education", 0);
    temp.set("Other", 0);
    for (let x = 0; x < expTransArr.length; x++) {
        const purpose = expTransArr[x].purpose;
        const amount = expTransArr[x].amount;
        switch (purpose) {
            case "entertainment":
                temp.set("Entertainment", temp.get("Entertainment") + amount);
                break;
            case "health":
                temp.set("Health", temp.get("Health") + amount);
                break;
            case "shopping":
                temp.set("Shopping", temp.get("Shopping") + amount);
                break;
            case "travel":
                temp.set("Travel", temp.get("Travel") + amount);
                break;
            case "education":
                temp.set("Education", temp.get("Education") + amount);
                break;
            case "other":
                temp.set("Other", temp.get("Other") + amount);
                break;
            default:
                break;
        }
    }
    chartDataY = Array.from(temp.values());
}
const newGoalError = document.getElementById("new-goal-error");
newGoalName.addEventListener("blur", () => {
    if (!universalValidator(newGoalName, newGoalError))
        return;
    if (!universalLenValidator(newGoalName, 12))
        return;
    const userGoals = loggedUserDash[userDashIndx].goals;
    for (let i = 0; i < userGoals.length; i++) {
        if (userGoals[i].name === newGoalName.value) {
            newGoalName.style.borderColor = "#ba2b2b";
            newGoalError.innerText = "No duplicate goals allowed!";
            newGoalError.style.opacity = "1";
            return;
        }
        newGoalName.style.borderColor = "#d8d8d8";
        newGoalError.style.opacity = "0";
    }
});
newGoalTarget.addEventListener("blur", () => {
    if (!universalValidator(newGoalTarget, newGoalError))
        return;
    if (!universalNaNValidator(newGoalTarget, newGoalError))
        return;
});
saveGoalBtn.addEventListener("click", (event) => {
    event.preventDefault();
    if (!universalValidator(newGoalName, newGoalError))
        return;
    if (!universalValidator(newGoalTarget, newGoalError))
        return;
    if (!universalLenValidator(newGoalName, 17))
        return;
    if (!universalNaNValidator(newGoalTarget, newGoalError))
        return;
    const userGoals = loggedUserDash[userDashIndx].goals;
    for (let i = 0; i < userGoals.length; i++) {
        if (userGoals[i].name === newGoalName.value) {
            newGoalName.style.borderColor = "#ba2b2b";
            newGoalError.innerText = "No duplicate goals allowed!";
            newGoalError.style.opacity = "1";
            return;
        }
        newGoalName.style.borderColor = "#d8d8d8";
        newGoalError.style.opacity = "0";
    }
    if (Number(newGoalInit.value) > loggedUserDash[userDashIndx].totalBalance - goalExpense) {
        newGoalInit.style.borderColor = "#ba2b2b";
        newGoalError.innerText = "Not enough balance!";
        newGoalInit.value = "";
        return;
    }
    else if (Number(newGoalInit.value) > Number(newGoalTarget.value)) {
        newGoalInit.style.borderColor = "#ba2b2b";
        newGoalError.innerText = "Contribution > Target!";
        newGoalInit.value = "";
        return;
    }
    else {
        newGoalInit.style.borderColor = "#d8d8d8";
    }
    const newGoal = {
        name: newGoalName.value,
        target: Number(newGoalTarget.value),
        contribution: Number(newGoalInit.value),
    };
    if (newGoal.contribution > 0) {
        const date = new Date();
        const formatted = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
        const goalTransaction = {
            type: "expense",
            amount: newGoal.contribution,
            date: formatted,
            purpose: "savings",
        };
        loggedUserDash[userDashIndx].transactions.push(goalTransaction);
    }
    loggedUserDash[userDashIndx].totalIncome = 0;
    loggedUserDash[userDashIndx].totalExpense = 0;
    const arrayOfTransactions = loggedUserDash[userDashIndx].transactions;
    for (let i = 0; i < arrayOfTransactions.length; i++) {
        if (arrayOfTransactions[i].type === "income") {
            loggedUserDash[userDashIndx].totalIncome += arrayOfTransactions[i].amount;
        }
        else {
            if (arrayOfTransactions[i].purpose === "savings") {
                continue;
            }
            else {
                loggedUserDash[userDashIndx].totalExpense += arrayOfTransactions[i].amount;
            }
        }
    }
    loggedUserDash[userDashIndx].totalBalance = loggedUserDash[userDashIndx].totalIncome - loggedUserDash[userDashIndx].totalExpense;
    loggedUserDash[userDashIndx].goals.push(newGoal);
    setUserDash(loggedUserDash);
    closeGoalFunctionReload();
});
newTransactionType.addEventListener("change", () => {
    const options = newTransactionPurpose.options;
    if (newTransactionType.value === "expense") {
        Array.from(options).forEach((option) => {
            option.value = chartDataX[option.index].toLowerCase();
            option.textContent = chartDataX[option.index];
        });
    }
    else {
        Array.from(options).forEach((option) => {
            option.value = incomeSelector[option.index].toLowerCase();
            option.textContent = incomeSelector[option.index];
        });
    }
});
const transactError = document.getElementById("new-transact-error");
newTransactionAmount.addEventListener("blur", () => {
    if (!universalValidator(newTransactionAmount, transactError))
        return;
    if (!universalNaNValidator(newTransactionAmount, transactError))
        return;
    if (newTransactionType.value === "expense") {
        if (Number(newTransactionAmount.value) > loggedUserDash[userDashIndx].totalBalance - goalExpense) {
            newTransactionAmount.style.borderColor = "#ba2b2b";
            transactError.innerText = "Expense > Balance!";
            transactError.style.opacity = "1";
            return;
        }
        transactError.style.opacity = "0";
        newTransactionAmount.style.borderColor = "#d8d8d8";
    }
});
newTransactionDate.addEventListener("blur", () => {
    if (!universalValidator(newTransactionDate, transactError))
        return;
});
saveTransactionBtn.addEventListener("click", function (event) {
    event.preventDefault();
    if (!universalValidator(newTransactionDate, transactError))
        return;
    if (!universalValidator(newTransactionAmount, transactError))
        return;
    if (!universalNaNValidator(newTransactionAmount, transactError))
        return;
    if (newTransactionType.value === "expense") {
        if (Number(newTransactionAmount.value) > loggedUserDash[userDashIndx].totalBalance - goalExpense) {
            newTransactionAmount.style.borderColor = "#ba2b2b";
            transactError.innerText = "Expense > Balance!";
            transactError.style.opacity = "1";
            return;
        }
        transactError.style.opacity = "0";
        newTransactionAmount.style.borderColor = "#d8d8d8";
    }
    const newTransaction = {
        type: newTransactionType.value,
        amount: Number(newTransactionAmount.value),
        date: newTransactionDate.value,
        purpose: newTransactionPurpose.value,
    };
    loggedUserDash[userDashIndx].transactions.push(newTransaction);
    const arrayOfTransactions = loggedUserDash[userDashIndx].transactions;
    loggedUserDash[userDashIndx].totalIncome = 0;
    loggedUserDash[userDashIndx].totalExpense = 0;
    for (let i = 0; i < arrayOfTransactions.length; i++) {
        if (arrayOfTransactions[i].type === "income") {
            loggedUserDash[userDashIndx].totalIncome += arrayOfTransactions[i].amount;
        }
        else {
            if (arrayOfTransactions[i].purpose === "savings") {
                continue;
            }
            else {
                loggedUserDash[userDashIndx].totalExpense += arrayOfTransactions[i].amount;
            }
        }
    }
    loggedUserDash[userDashIndx].totalBalance = loggedUserDash[userDashIndx].totalIncome - loggedUserDash[userDashIndx].totalExpense;
    setUserDash(loggedUserDash);
    closeTransactionFunctionReload();
});
newGoalBtn.addEventListener("click", function () {
    overlay.style.display = "block";
    newGoalPopup.style.display = "block";
});
function closeGoalFunction() {
    overlay.style.display = "none";
    newGoalPopup.style.display = "none";
    goalForm.reset();
}
function closeGoalFunctionReload() {
    overlay.style.display = "none";
    newGoalPopup.style.display = "none";
    window.location.reload();
}
closeGoalPopup.addEventListener("click", closeGoalFunction);
newBillBtn.addEventListener("click", function () {
    overlay.style.display = "block";
    newBillPopup.style.display = "block";
});
function closeBillFunction() {
    overlay.style.display = "none";
    newBillPopup.style.display = "none";
}
closeBillPopup.addEventListener("click", closeBillFunction);
newTransactionBtn.addEventListener("click", function () {
    overlay.style.display = "block";
    newTransactionPopup.style.display = "block";
});
function closeTransactionFunction() {
    overlay.style.display = "none";
    newTransactionPopup.style.display = "none";
    transactForm.reset();
}
function closeTransactionFunctionReload() {
    overlay.style.display = "none";
    newTransactionPopup.style.display = "none";
    window.location.reload();
}
closeTransactionPopup.addEventListener("click", closeTransactionFunction);
updateDashUserData();
// @ts-expect-error
let expenseChart = new Chart("expense-chart", {
    type: "bar",
    data: {
        labels: chartDataX,
        datasets: [
            {
                backgroundColor: "rgba(255,0,0,0.5)",
                data: chartDataY,
            },
        ],
    },
    options: {
        legend: { display: false },
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
        responsive: true,
        maintainAspectRatio: true,
    },
});
const fundGoalInp = document.getElementById("fund-goal-inp");
const fundGoalSaveBtn = document.getElementById("fund-goal-save-btn");
const fundGoalPopupClose = document.getElementById("close-fund-goal-popup");
const fundGoalName = document.getElementById("fund-goal-name");
const fundsGoalStatus = document.getElementById("funds-on-goal");
const fundGoalPopup = document.getElementById("fund-goal-popup");
const goalCompletePopup = document.getElementById("goal-complete-popup");
const goalCompletePopupClose = document.getElementById("goal-complete-close-popup");
const goalCompleteName = document.getElementById("goal-complete-name");
const fundGoalBtns = document.querySelectorAll(".goal-fund-btn");
const delGoalBtns = document.querySelectorAll(".goal-del-btn");
const userLogout = document.getElementById("profile-logout-btn");
userLogout.addEventListener("click", () => {
    window.location.href = "../login/login.html";
});
function openFundGoalPopup() {
    fundGoalPopup.style.display = "block";
    overlay.style.display = "block";
}
function openGoalCompletePopup(goalName) {
    goalCompleteName.innerText = String(goalName);
    goalCompletePopup.style.display = "block";
    overlay.style.display = "block";
}
goalCompletePopupClose.addEventListener("click", () => {
    goalCompletePopup.style.display = "none";
    overlay.style.display = "none";
    fundGoalPopupCloseFunction(true);
});
const fundError = document.getElementById("fund-goal-error");
fundGoalInp.addEventListener("blur", () => {
    universalNaNValidator(fundGoalInp, fundError);
    universalValidator(fundGoalInp, fundError);
});
fundGoalBtns.forEach((fund) => {
    fund.addEventListener("click", () => {
        const idx = Number(fund.id);
        const userGoals = loggedUserDash[userDashIndx].goals;
        openFundGoalPopup();
        fundGoalName.innerText = userGoals[idx].name;
        fundsGoalStatus.innerText = `Goal Status: ${userGoals[idx].contribution} / ${userGoals[idx].target}`;
        let metReq = false;
        const goalName = userGoals[idx].name;
        fundGoalSaveBtn.addEventListener("click", (event) => {
            event.preventDefault();
            if (!universalValidator(fundGoalInp, fundError))
                return;
            if (!universalNaNValidator(fundGoalInp, fundError))
                return;
            if (Number(fundGoalInp.value) > loggedUserDash[userDashIndx].totalBalance) {
                fundGoalInp.style.borderColor = "#ba2b2b";
                fundError.innerText = "Not enough balance!";
                fundError.style.opacity = "1";
                fundGoalInp.value = "";
                return;
            }
            else if (Number(fundGoalInp.value) > userGoals[idx].target - userGoals[idx].contribution) {
                fundGoalInp.style.borderColor = "#ba2b2b";
                fundError.innerText = "Contribution > Target!";
                fundError.style.opacity = "1";
                fundGoalInp.value = "";
                return;
            }
            else {
                fundGoalInp.style.borderColor = "#d8d8d8";
                fundError.style.opacity = "0";
            }
            if (Number(fundGoalInp.value) > 0) {
                const date = new Date();
                const formatted = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
                const goalTransaction = {
                    type: "expense",
                    amount: Number(fundGoalInp.value),
                    date: formatted,
                    purpose: "savings",
                };
                loggedUserDash[userDashIndx].transactions.push(goalTransaction);
                if (+goalTransaction.amount + +userGoals[idx].contribution === +userGoals[idx].target) {
                    metReq = true;
                }
                userGoals[idx].contribution += goalTransaction.amount;
            }
            const arrayOfTransactions = loggedUserDash[userDashIndx].transactions;
            loggedUserDash[userDashIndx].totalIncome = 0;
            loggedUserDash[userDashIndx].totalExpense = 0;
            for (let i = 0; i < arrayOfTransactions.length; i++) {
                if (arrayOfTransactions[i].type === "income") {
                    loggedUserDash[userDashIndx].totalIncome += arrayOfTransactions[i].amount;
                }
                else {
                    if (arrayOfTransactions[i].purpose === "savings") {
                        continue;
                    }
                    else {
                        loggedUserDash[userDashIndx].totalExpense += arrayOfTransactions[i].amount;
                    }
                }
            }
            loggedUserDash[userDashIndx].totalBalance = loggedUserDash[userDashIndx].totalIncome - loggedUserDash[userDashIndx].totalExpense;
            setUserDash(loggedUserDash);
            if (metReq) {
                fundGoalPopupCloseFunction(false);
                openGoalCompletePopup(goalName);
                return;
            }
            fundGoalPopupCloseFunction(true);
        });
    });
});
delGoalBtns.forEach((del) => {
    del.addEventListener("click", () => {
        const idx = Number(del.id);
        const userGoals = loggedUserDash[userDashIndx].goals;
        const saved = userGoals[idx].contribution;
        const arrayOfTransactions = loggedUserDash[userDashIndx].transactions;
        userGoals.splice(idx, 1);
        // arrayOfTransactions[idx].type = 'income';
        loggedUserDash[userDashIndx].totalIncome = 0;
        loggedUserDash[userDashIndx].totalExpense = 0;
        for (let i = 0; i < arrayOfTransactions.length; i++) {
            if (arrayOfTransactions[i].type === "income") {
                loggedUserDash[userDashIndx].totalIncome += arrayOfTransactions[i].amount;
            }
            else {
                if (arrayOfTransactions[i].purpose === "savings") {
                    continue;
                }
                else {
                    loggedUserDash[userDashIndx].totalExpense += arrayOfTransactions[i].amount;
                }
            }
        }
        loggedUserDash[userDashIndx].totalBalance = loggedUserDash[userDashIndx].totalIncome - loggedUserDash[userDashIndx].totalExpense;
        setUserDash(loggedUserDash);
        window.location.reload();
    });
});
function fundGoalPopupCloseFunction(refresh) {
    fundGoalPopup.style.display = "none";
    overlay.style.display = "none";
    if (refresh) {
        window.location.reload();
    }
}
fundGoalPopupClose.addEventListener("click", () => {
    fundGoalPopupCloseFunction(false);
});
const openEditTransactionPopup = document.getElementById("edit-transaction-popup");
const closeEditTransactionPopup = document.getElementById("close-edit-transaction-popup");
const editTransactionTypeInp = document.getElementById("edit-transaction-type-select");
const editTransactionAmountInp = document.getElementById("edit-transaction-amt-inp");
const editTransactionDateInp = document.getElementById("edit-transaction-date-inp");
const editTransactionPurposeInp = document.getElementById("edit-transaction-purpose-select");
const editTranactionSaveBtn = document.getElementById("save-edit-transaction-btn");
const editTransactionBtns = document.querySelectorAll(".edt-trans-btn");
const delTransactionBtns = document.querySelectorAll(".del-trans-btn");
function closeEditTransactionPopupfunction(reload) {
    openEditTransactionPopup.style.display = "none";
    overlay.style.display = "none";
    if (reload)
        window.location.reload();
}
function openEditTransactionPopupfunction() {
    openEditTransactionPopup.style.display = "block";
    overlay.style.display = "block";
}
closeEditTransactionPopup.addEventListener("click", () => {
    closeEditTransactionPopupfunction(false);
    editTransactionAmountInp.style.borderColor = "#d8d8d8";
    edtTransactError.style.opacity = "0";
    edtTransactForm.reset();
});
function loadAptOptions() {
    const options = editTransactionPurposeInp.options;
    if (editTransactionTypeInp.value === "expense") {
        Array.from(options).forEach((option) => {
            option.value = chartDataX[option.index].toLowerCase();
            option.textContent = chartDataX[option.index];
        });
    }
    else {
        Array.from(options).forEach((option) => {
            option.value = incomeSelector[option.index].toLowerCase();
            option.textContent = incomeSelector[option.index];
        });
    }
}
const edtTransactError = document.getElementById("edit-transact-error");
editTransactionTypeInp.addEventListener("change", () => {
    loadAptOptions();
});
editTransactionAmountInp.addEventListener("blur", () => {
    if (!universalValidator(editTransactionAmountInp, edtTransactError))
        return;
    if (!universalNaNValidator(editTransactionAmountInp, edtTransactError))
        return;
    if (editTransactionTypeInp.value === "expense") {
        if (Number(editTransactionAmountInp.value) > loggedUserDash[userDashIndx].totalBalance) {
            editTransactionAmountInp.style.borderColor = "#ba2b2b";
            edtTransactError.innerText = "Expense > Balance!";
            edtTransactError.style.opacity = "1";
            return;
        }
    }
    editTransactionAmountInp.style.borderColor = "#d8d8d8";
    edtTransactError.style.opacity = "0";
});
editTransactionDateInp.addEventListener("blur", () => {
    if (!universalValidator(editTransactionDateInp, edtTransactError))
        return;
});
editTransactionBtns.forEach((editTransacts) => {
    editTransacts.addEventListener("click", () => {
        const indx = Number(editTransacts.id);
        const arrayOfTransactions = loggedUserDash[userDashIndx].transactions;
        editTransactionTypeInp.value = arrayOfTransactions[indx].type;
        editTransactionAmountInp.value = String(arrayOfTransactions[indx].amount);
        editTransactionDateInp.value = arrayOfTransactions[indx].date;
        loadAptOptions();
        editTransactionPurposeInp.value = arrayOfTransactions[indx].purpose;
        openEditTransactionPopupfunction();
        editTranactionSaveBtn.addEventListener("click", (event) => {
            event.preventDefault();
            if (!universalValidator(editTransactionAmountInp, edtTransactError))
                return;
            if (!universalNaNValidator(editTransactionAmountInp, edtTransactError))
                return;
            if (!universalValidator(editTransactionDateInp, edtTransactError))
                return;
            if (editTransactionTypeInp.value === "expense") {
                if (Number(editTransactionAmountInp.value) > loggedUserDash[userDashIndx].totalBalance) {
                    editTransactionAmountInp.style.borderColor = "#ba2b2b";
                    edtTransactError.innerText = "Expense > Balance!";
                    edtTransactError.style.opacity = "1";
                    return;
                }
            }
            editTransactionAmountInp.style.borderColor = "#d8d8d8";
            edtTransactError.style.opacity = "0";
            arrayOfTransactions[indx].type = editTransactionTypeInp.value;
            arrayOfTransactions[indx].amount = Number(editTransactionAmountInp.value);
            arrayOfTransactions[indx].date = editTransactionDateInp.value;
            arrayOfTransactions[indx].purpose = editTransactionPurposeInp.value;
            loggedUserDash[userDashIndx].totalExpense = 0;
            loggedUserDash[userDashIndx].totalIncome = 0;
            for (let i = 0; i < arrayOfTransactions.length; i++) {
                if (arrayOfTransactions[i].type === "income") {
                    loggedUserDash[userDashIndx].totalIncome += arrayOfTransactions[i].amount;
                }
                else {
                    if (arrayOfTransactions[i].purpose === "savings") {
                        continue;
                    }
                    else {
                        loggedUserDash[userDashIndx].totalExpense += arrayOfTransactions[i].amount;
                    }
                }
            }
            loggedUserDash[userDashIndx].totalBalance = loggedUserDash[userDashIndx].totalIncome - loggedUserDash[userDashIndx].totalExpense;
            setUserDash(loggedUserDash);
            closeEditTransactionPopupfunction(true);
        });
    });
});
delTransactionBtns.forEach((delTransact) => {
    delTransact.addEventListener("click", () => {
        const idx = Number(delTransact.id);
        const arrayOfTransactions = loggedUserDash[userDashIndx].transactions;
        arrayOfTransactions.splice(idx, 1);
        loggedUserDash[userDashIndx].totalIncome = 0;
        loggedUserDash[userDashIndx].totalExpense = 0;
        for (let i = 0; i < arrayOfTransactions.length; i++) {
            if (arrayOfTransactions[i].type === "income") {
                loggedUserDash[userDashIndx].totalIncome += arrayOfTransactions[i].amount;
            }
            else {
                if (arrayOfTransactions[i].purpose === "savings") {
                    continue;
                }
                else {
                    loggedUserDash[userDashIndx].totalExpense += arrayOfTransactions[i].amount;
                }
            }
        }
        loggedUserDash[userDashIndx].totalBalance = loggedUserDash[userDashIndx].totalIncome - loggedUserDash[userDashIndx].totalExpense;
        setUserDash(loggedUserDash);
        window.location.reload();
    });
});
let darkSwitch = 1;
const darkModeSwitch = document.getElementById("dark-mode-chkbx");
const goingDark = document.querySelector("html");
const header = document.querySelector("header");
const incomeDiv = document.getElementById("income-div-id");
const expenseDiv = document.getElementById("expense-div-id");
const balanceDiv = document.getElementById("balance-div-id");
const body = document.querySelector("body");
const goalCompleteIndicator = document.querySelectorAll(".goal-comp-ind");
// newGoalBtn newBillBtn newTransactionBtn filterChartEntertain
// filterChartHealth filterChartShopping filterChartTravel filterChartEdu
// filterChartOther filterChartReset
// balance-div-id expense-div-id income-div-id
const topDivs = [incomeDiv, expenseDiv, balanceDiv, header];
// db: #08192c
// dg: #082c2c
// db: #2c080d
// hd: #100c0c
const purpleButtons = [
    newGoalBtn,
    newBillBtn,
    newTransactionBtn,
    filterChartEntertain,
    filterChartHealth,
    filterChartShopping,
    filterChartTravel,
    filterChartEdu,
    filterChartOther,
    filterChartReset,
];
if (isDark) {
    goingDark.style.filter = "invert(1)";
    purpleButtons.forEach((btns) => {
        btns.style.filter = "invert(1)";
        btns.style.backgroundColor = "rgba(66, 62, 71, 0.507)";
        btns.style.color = "whitesmoke";
        btns.style.fontWeight = "200";
    });
    topDivs.forEach((divs) => {
        divs.style.filter = "invert(1)";
        divs.style.color = "whitesmoke";
        divs.style.fontWeight = "200";
    });
    incomeDiv.style.backgroundColor = "#082c2c";
    expenseDiv.style.backgroundColor = "#2c080d";
    balanceDiv.style.backgroundColor = "#08192c";
    header.style.backgroundColor = "#100c0c";
    purpleButtons.forEach((btns) => {
        btns.addEventListener("mouseover", () => {
            btns.style.backgroundColor = "rgba(66, 62, 71, 0.807)";
        });
        btns.addEventListener("mouseout", () => {
            btns.style.backgroundColor = "rgba(66, 62, 71, 0.507)";
        });
    });
    fundGoalBtns.forEach((element) => {
        element.classList.toggle("goal-fund-btn-dark");
    });
    delGoalBtns.forEach((element) => {
        element.classList.toggle("goal-fund-btn-dark");
    });
    editTransactionBtns.forEach((element) => {
        element.classList.toggle("goal-fund-btn-dark");
    });
    delTransactionBtns.forEach((element) => {
        element.classList.toggle("goal-fund-btn-dark");
    });
    goalCompleteIndicator.forEach((element) => {
        element.classList.toggle("goal-fund-btn-dark");
    });
    body.style.backgroundColor = "gray";
    darkSwitch = (darkSwitch + 1) % 2;
    darkModeSwitch.checked = true;
}
else {
    darkModeSwitch.checked = false;
    purpleButtons.forEach((btns) => {
        btns.style.filter = "invert(0)";
        btns.style.backgroundColor = "#e6d8fa";
        btns.style.color = "black";
    });
    topDivs.forEach((divs) => {
        divs.style.filter = "invert(0)";
        divs.style.color = "black";
        divs.style.fontWeight = "400";
    });
    incomeDiv.style.backgroundColor = "#b6ffd6";
    expenseDiv.style.backgroundColor = "#ffd4d4";
    balanceDiv.style.backgroundColor = "#cfe4ff";
    header.style.backgroundColor = "#CCF2F4";
    purpleButtons.forEach((btns) => {
        btns.addEventListener("mouseover", () => {
            btns.style.backgroundColor = "#D0BFFF";
        });
        btns.addEventListener("mouseout", () => {
            btns.style.backgroundColor = "#e6d8fa";
        });
    });
    body.style.backgroundColor = "white";
}
function switchDark() {
    if (darkSwitch == 1) {
        goingDark.style.filter = "invert(1)";
        purpleButtons.forEach((btns) => {
            btns.style.filter = "invert(1)";
            btns.style.backgroundColor = "rgba(66, 62, 71, 0.507)";
            btns.style.color = "whitesmoke";
            btns.style.fontWeight = "200";
        });
        topDivs.forEach((divs) => {
            divs.style.filter = "invert(1)";
            divs.style.color = "whitesmoke";
            divs.style.fontWeight = "200";
        });
        incomeDiv.style.backgroundColor = "#082c2c";
        expenseDiv.style.backgroundColor = "#2c080d";
        balanceDiv.style.backgroundColor = "#08192c";
        header.style.backgroundColor = "#100c0c";
        purpleButtons.forEach((btns) => {
            btns.addEventListener("mouseover", () => {
                btns.style.backgroundColor = "rgba(66, 62, 71, 0.807)";
            });
            btns.addEventListener("mouseout", () => {
                btns.style.backgroundColor = "rgba(66, 62, 71, 0.507)";
            });
        });
        fundGoalBtns.forEach((element) => {
            element.classList.toggle("goal-fund-btn-dark");
        });
        delGoalBtns.forEach((element) => {
            element.classList.toggle("goal-fund-btn-dark");
        });
        editTransactionBtns.forEach((element) => {
            element.classList.toggle("goal-fund-btn-dark");
        });
        delTransactionBtns.forEach((element) => {
            element.classList.toggle("goal-fund-btn-dark");
        });
        goalCompleteIndicator.forEach((element) => {
            element.classList.toggle("goal-fund-btn-dark");
        });
        body.style.backgroundColor = "gray";
        darkSwitch = (darkSwitch + 1) % 2;
        setUserDark(true);
    }
    else {
        goingDark.style.filter = "invert(0)";
        purpleButtons.forEach((btns) => {
            btns.style.filter = "invert(0)";
            btns.style.backgroundColor = "#e6d8fa";
            btns.style.color = "black";
            btns.style.fontWeight = "400";
        });
        topDivs.forEach((divs) => {
            divs.style.filter = "invert(0)";
            divs.style.color = "black";
            divs.style.fontWeight = "400";
        });
        incomeDiv.style.backgroundColor = "#b6ffd6";
        expenseDiv.style.backgroundColor = "#ffd4d4";
        balanceDiv.style.backgroundColor = "#cfe4ff";
        header.style.backgroundColor = "#CCF2F4";
        purpleButtons.forEach((btns) => {
            btns.addEventListener("mouseover", () => {
                btns.style.backgroundColor = "#D0BFFF";
            });
            btns.addEventListener("mouseout", () => {
                btns.style.backgroundColor = "#e6d8fa";
            });
        });
        fundGoalBtns.forEach((element) => {
            element.classList.toggle("goal-fund-btn-dark");
        });
        delGoalBtns.forEach((element) => {
            element.classList.toggle("goal-fund-btn-dark");
        });
        editTransactionBtns.forEach((element) => {
            element.classList.toggle("goal-fund-btn-dark");
        });
        delTransactionBtns.forEach((element) => {
            element.classList.toggle("goal-fund-btn-dark");
        });
        goalCompleteIndicator.forEach((element) => {
            element.classList.toggle("goal-fund-btn-dark");
        });
        body.style.backgroundColor = "white";
        darkSwitch = (darkSwitch + 1) % 2;
        setUserDark(false);
    }
}
darkModeSwitch.addEventListener("change", () => {
    switchDark();
});
const chartDataXSmall = ["Ent..", "Hea..", "Shp..", "Tra..", "Edu..", "Oth.."];
function updateChartData() {
    if (window.innerWidth > 1080 && window.innerWidth < 1285) {
        expenseChart.data.labels = chartDataXSmall;
    }
    else if (window.innerWidth < 605) {
        expenseChart.data.labels = chartDataXSmall;
    }
    else {
        expenseChart.data.labels = chartDataX;
    }
    // expenseChart.data.labels = chartDataX;
    // @ts-ignore
    expenseChart.config.data.datasets[0].data = chartDataY;
    expenseChart.update();
}
window.addEventListener("resize", updateChartData);
updateChartData();
filterChartReset.addEventListener("click", updateChartData);
filterChartEntertain.addEventListener("click", () => {
    const exp = [chartDataY[0]];
    const expname = ["Entertainment"];
    expenseChart.data.labels = expname;
    // @ts-ignore
    expenseChart.config.data.datasets[0].data = exp;
    expenseChart.update();
});
filterChartHealth.addEventListener("click", () => {
    const exp = [chartDataY[1]];
    const expname = ["Health"];
    expenseChart.data.labels = expname;
    // @ts-ignore
    expenseChart.config.data.datasets[0].data = exp;
    expenseChart.update();
});
filterChartShopping.addEventListener("click", () => {
    const exp = [chartDataY[2]];
    const expname = ["Shopping"];
    expenseChart.data.labels = expname;
    // @ts-ignore
    expenseChart.config.data.datasets[0].data = exp;
    expenseChart.update();
});
filterChartTravel.addEventListener("click", () => {
    const exp = [chartDataY[3]];
    const expname = ["Travel"];
    expenseChart.data.labels = expname;
    // @ts-ignore
    expenseChart.config.data.datasets[0].data = exp;
    expenseChart.update();
});
filterChartEdu.addEventListener("click", () => {
    const exp = [chartDataY[4]];
    const expname = ["Education"];
    expenseChart.data.labels = expname;
    // @ts-ignore
    expenseChart.config.data.datasets[0].data = exp;
    expenseChart.update();
});
filterChartOther.addEventListener("click", () => {
    const exp = [chartDataY[5]];
    const expname = ["Other"];
    expenseChart.data.labels = expname;
    // @ts-ignore
    expenseChart.config.data.datasets[0].data = exp;
    expenseChart.update();
});
