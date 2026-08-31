const incomeButton = document.querySelector("#income-btn");
const expenseButton = document.querySelector("#expense-btn");

const modal = document.querySelector("#modal");
const closeButton = document.querySelector("#close-btn");

const modalTitle = document.querySelector("#modal-title");

const form = document.querySelector("#transaction-form");

const amountInput = document.querySelector("#amount");
const categoryInput = document.querySelector("#category");
const dateInput = document.querySelector("#date");
const noteInput = document.querySelector("#note");


const incomeCategories = [
    "Salary",
    "Freelance",
    "Business",
    "Investments",
    "Other"
];

const expenseCategories = [
    "Food",
    "Transportation",
    "Utilities",
    "Entertainment",
    "Shopping",
    "Other"
];


// Keep track of whether we're adding income or expense

let transactionType = "";


// Open modal for income

incomeButton.addEventListener("click", () => {

    transactionType = "income";

    modalTitle.textContent = "Add Income";

    showCategories(incomeCategories);

    openModal();

});


// Open modal for expense

expenseButton.addEventListener("click", () => {

    transactionType = "expense";

    modalTitle.textContent = "Add Expense";

    showCategories(expenseCategories);

    openModal();

});


// Open modal

function openModal() {

    modal.style.display = "flex";

    // Set today's date automatically

    const today = new Date()
        .toISOString()
        .split("T")[0];

    dateInput.value = today;

    amountInput.focus();
}


// Close modal

function closeModal() {

    modal.style.display = "none";

    form.reset();

}


// Close button

closeButton.addEventListener("click", closeModal);


// Close if user clicks outside the modal

modal.addEventListener("click", (event) => {

    if (event.target === modal) {
        closeModal();
    }

});


// Add categories to select

function showCategories(categories) {

    categoryInput.innerHTML = "";

    categories.forEach((category) => {

        const option = document.createElement("option");

        option.value = category;
        option.textContent = category;

        categoryInput.appendChild(option);

    });

}


// Save transaction

form.addEventListener("submit", (event) => {

    event.preventDefault();


    const amount = Number(amountInput.value);

    const category = categoryInput.value;

    const date = dateInput.value;

    const note = noteInput.value;


    const transaction = {

        type: transactionType,

        amount: amount,

        category: category,

        date: date,

        note: note

    };


    console.log(transaction);


    closeModal();

});
