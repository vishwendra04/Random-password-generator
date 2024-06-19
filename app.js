const inputSlider = document.querySelector("[data-length-slider]");
const lengthDisplay = document.querySelector("[data-length-number]");
const copyMsg = document.querySelector("[data-copy-message]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy-button]");
const upperCheck = document.querySelector("#uppercase");
const lowerCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#numbers");
const symbolCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generate-button");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const noteInput = document.querySelector("[data-note-input]");
const saveBtn = document.querySelector("[data-save-button]");
const savedPasswordsContainer = document.querySelector("[data-saved-passwords]");

const symbols = '`~!@#$%^&*()_+-=[]{}|;:",.<>/?';
let password = "";
let passwordLength = 10;
let checkCount = 0;

handleSlider();

function handleSlider() {
  inputSlider.value = passwordLength;
  lengthDisplay.innerText = passwordLength;
}

function setIndicator(strengthClass) {
  // Reset indicator style
  indicator.style.backgroundColor = 'transparent';
  indicator.style.boxShadow = 'none';
  
  // Set background color and box shadow based on strength class
  switch (strengthClass) {
    case "--strength-low":
      indicator.style.backgroundColor = 'red'; // Example color for low strength
      indicator.style.boxShadow = '0px 0px 12px 1px red'; // Adjust box shadow as needed
      break;
    case "--strength-medium":
      indicator.style.backgroundColor = 'orange'; // Example color for medium strength
      indicator.style.boxShadow = '0px 0px 12px 1px orange'; // Adjust box shadow as needed
      break;
    case "--strength-high":
      indicator.style.backgroundColor = 'green'; // Example color for high strength
      indicator.style.boxShadow = '0px 0px 12px 1px green'; // Adjust box shadow as needed
      break;
    default:
      // Default case
      indicator.style.backgroundColor = 'transparent';
      indicator.style.boxShadow = 'none';
  }
}


function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomPassword() {
  const charset = [];
  
  if (upperCheck.checked) {
    charset.push(...'ABCDEFGHIJKLMNOPQRSTUVWXYZ');
  }
  if (lowerCheck.checked) {
    charset.push(...'abcdefghijklmnopqrstuvwxyz');
  }
  if (numberCheck.checked) {
    charset.push(...'0123456789');
  }
  if (symbolCheck.checked) {
    charset.push(...symbols);
  }
  
  if (charset.length === 0) {
    alert("Please select at least one option (uppercase, lowercase, numbers, or symbols).");
    return;
  }
  
  let generatedPassword = '';
  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    generatedPassword += charset[randomIndex];
  }
  
  password = generatedPassword;
  passwordDisplay.value = password;
  passwordDisplay.style.color = "var(--vb-yellow)"; // Set text color to yellow
  setIndicator(checkPasswordStrength(password));
}
function checkPasswordStrength(password) {
  let strength = 0;
  
  // Check for length
  if (password.length >= 8) {
    strength++;
  }
  
  // Check for lowercase letters
  if (password.match(/[a-z]+/)) {
    strength++;
  }
  
  // Check for uppercase letters
  if (password.match(/[A-Z]+/)) {
    strength++;
  }
  
  // Check for numbers
  if (password.match(/[0-9]+/)) {
    strength++;
  }
  
  // Check for symbols
  if (password.match(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) {
    strength++;
  }
  
  // Determine strength level based on criteria
  switch (strength) {
    case 1:
    case 2:
      return "--strength-low";
    case 3:
    case 4:
      return "--strength-medium";
    case 5:
      return "--strength-high";
    default:
      return "--strength-low";
  }
}


function updatePasswordLength() {
  passwordLength = inputSlider.value;
  lengthDisplay.innerText = passwordLength;
}

async function copyContent() {
  try {
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText = "Copied!";
  } catch (err) {
    console.error("Failed to copy: ", err);
    copyMsg.innerText = "Failed to copy!";
  }
  copyMsg.classList.add("active");
  setTimeout(() => {
    copyMsg.classList.remove("active");
  }, 2000);
}

function savePassword() {
  const note = noteInput.value.trim();
  if (!password || !note) {
    alert("Please generate a password and add a note before saving.");
    return;
  }
  
  const savedPasswordElement = document.createElement('div');
  savedPasswordElement.classList.add('saved_password');
  savedPasswordElement.innerHTML = `
    <p>${password}</p>
    <span class="note">${note}</span>
  `;
  
  savedPasswordsContainer.appendChild(savedPasswordElement);
  noteInput.value = '';
  passwordDisplay.value = '';
  password = '';
  setIndicator("--strength-low");
}

generateBtn.addEventListener('click', generateRandomPassword);
inputSlider.addEventListener('input', updatePasswordLength);
copyBtn.addEventListener('click', copyContent);
saveBtn.addEventListener('click', savePassword);