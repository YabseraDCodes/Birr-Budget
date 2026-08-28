const state = {
    balance: 0,
    transactions: [],
    // expense_catagories: ["Food", "Transportation", "Utilities", "Entertainment", "Shopping", "Other"],
    // income_catagories: ["Salary", "Freelance", "Business", "Investments", "Other"],

    expense_catagories: [
    {
        type: "Food",
        icon: "fa-solid fa-burger"
    },
    {
        type: "Transportation",
        icon: "fa-solid fa-taxi"
    },
    {
        type: "Utility",
        icon: "fa-solid fa-hammer"
    },
    {
        type: "Shopping",
        icon: "fa-solid fa-basket-shopping"
    },
    {
        type: "Other",
        icon: "fa-solid fa-shapes"
    }
],

income_catagories: [
    {
        type: "Salary",
        icon: "fa-solid fa-hand-holding-dollar"
    },
    {
        type: "Freelance",
        icon: "fa-solid fa-laptop-code"
    },
    {
        type: "Investment",
        icon: "fa-solid fa-chart-line"
    },
    {
        type: "Gift",
        icon: "fa-solid fa-gift"
    },
    {
        type: "Refund",
        icon: "fa-solid fa-rotate-left"
    },
    {
        type: "Other",
        icon: "fa-solid fa-shapes"
    }
],

    current_action: "",
};

// current_balance = state.balance;
// transactions = state.transactions;

const display_balance = document.querySelector("#balance");
const display_transactions = document.querySelector("#transaction-handler");
const form = document.querySelector("#transaction-form");
const catagory_handler = document.querySelector("#catagory");
const amount_handler = document.querySelector("#amount");
const incomebtn = document.querySelector("#incomebtn");
const expensebtn = document.querySelector("#expensebtn");
const form_title = document.querySelector("#transaction-title");
const modal = document.querySelector("#modal");
const closebtn = document.querySelector("#closebtn");
const calendar = document.querySelector("#date");

function render() {
    display_balance.textContent = `${state.balance} ETB`;
    display_transactions.innerHTML = state.transactions.map((item) => rendertransactions(item)).join("");
    if (state.current_action === "add_income") {
        catagory_handler.innerHTML = state.income_catagories.map((item) => {
            return renderCatagory(item);
        });
        form_title.textContent = "Add Income"
    } else if (state.current_action === "make_expense") {
        catagory_handler.innerHTML = state.expense_catagories.map((item) => {
            return renderCatagory(item);
        });
        form_title.textContent = "Make Expense"
    }
    setToday();
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const amount = Number(amount_handler.value);
    const catagory = catagory_handler.value;
    if (state.current_action === "add_income") {
        makeIncome(amount, catagory);
    } else if (state.current_action === "make_expense") {
        makeExpense(amount, catagory);
    }
    console.log(calendar.value);
    form.reset();
    setToday();
})

closebtn.addEventListener("click", () => {
    form.reset();
    modal.style.display = "none";
})

incomebtn.addEventListener("click", () => {
    modal.style.display = "flex";
    state.current_action = "add_income";
    console.log(state.current_action);
    render();
})

expensebtn.addEventListener("click", () => {
    modal.style.display = "flex";
    state.current_action = "make_expense";
    render();
})

function renderCatagory(catagory) {
    return `<option value="${catagory.type}">${catagory.type}</option>`
}

function rendertransactions(item) {
    let incomeORexpense = "";
    let color = "";
    if (item.type === "income") {
        incomeORexpense = "+";
        color = "rgb(0, 190, 0)";
    } else {
        incomeORexpense = "-";
        color = "red";
    }

    return `<article class="transaction">
                <span id="icon"></span>
                <div class="transaction-type">
                    <h3 class="transaction-name">${item.catagory}</h3>
                    <p class="transaction-date">${item.date}</p>
                </div>
                <h3 class="transaction-money" style="color:${color};">${incomeORexpense}${item.amount}.00 ETB</h3>
            </article>`
}

function setToday() {
    calendar.value = new Date().toISOString().split("T")[0];
}

function makeExpense(amount, catagory) {
    // current_balance -= amount;
    state.balance -= amount;
    const date = new Date(calendar.value);

    const formattedDate = date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short"
    });
    console.log(typeof date, "----------------", formattedDate);


    const check = state.expense_catagories.some((item) => item.type === catagory);
    if (!check) {
        console.error("Non existing catagory");
    } else {
        state.transactions.push({
            type: "expense",
            catagory: catagory,
            date: formattedDate,
            amount: amount
        });
    }

    saveState();
    render();
}

function makeIncome(amount, catagory) {
    // current_balance += amount;
    state.balance += amount;
    const date = new Date(calendar.value);

    const formattedDate = date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short"
    });

    const check = state.income_catagories.some((item) => item.type === catagory);
    if (!check) {
        console.error("Non existing catagory");
    } else {
        state.transactions.push({
            type: "income",
            catagory: catagory,
            date: formattedDate,
            amount: amount
        });
    }

    saveState();
    render();
}

function saveState() {
    localStorage.setItem("balance", JSON.stringify(state.balance));
    localStorage.setItem("transactions", JSON.stringify(state.transactions));
}

function loadState() {
    state.balance = JSON.parse(localStorage.getItem("balance")) || 0;
    state.transactions = JSON.parse(localStorage.getItem("transactions")) || [];
}

function clearState() {
    state.balance = 0;
    state.transactions = [];

    saveState()
}

function init() {
    render()
    loadState();
    current_balance = 100;
    makeExpense(20, "Food");
    makeIncome(100, "Salary")
    // clearState();
    // render()
}

init();