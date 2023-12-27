"use strict";

// Function to fetch exchange rates
async function fetchExchangeRates() {
  try {
    const response = await fetch(
      "https://v6.exchangerate-api.com/v6/df6d1e032ec67393a2083994/latest/USD"
    );
    const data = await response.json();
    return data.conversion_rates.PKR;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    throw error; // Propagate the error for handling at a higher level if needed
  }
}

// Function to calculate and update the table
function calculateAndDisplayTable() {
  const dollars = Number(dollarInput.value);
  const percentage = Number(percentageInput.value);

  if (isNaN(dollars) || isNaN(percentage)) {
    alert("Please enter valid numeric values for Dollars and Percentage.");
    return;
  }

  const totalPKR = dollars * rupees;
  const row = table.insertRow(-1);
  const pkrCell = row.insertCell(0);
  const adeelCell = row.insertCell(1);
  const empCell = row.insertCell(2);

  pkrCell.textContent = Math.trunc(totalPKR);
  adeelCell.textContent = `${Math.trunc(
    (percentage / 100) * totalPKR
  )} (${percentage}%)`;
  empCell.textContent = `${Math.trunc(
    totalPKR - (percentage / 100) * totalPKR
  )} (${100 - percentage}%)`;
}

// DOM Manipulation
const dollarInput = document.getElementById("total-dollar");
const percentageInput = document.getElementById("percentage");
const table = document.getElementById("table");
const submit = document.getElementById("submitBtn");

let rupees;

// Fetch exchange rates and then enable the submit button
fetchExchangeRates()
  .then((exchangeRate) => {
    rupees = exchangeRate;
    submit.disabled = false; // Enable the submit button once exchange rates are fetched
  })
  .catch((error) => {
    console.error("Error initializing exchange rates:", error);
    // Handle the error as needed, e.g., display an error message to the user
  });

// Event listener for the submit button
submit.addEventListener("click", calculateAndDisplayTable);
