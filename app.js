const laptopsElement = document.getElementById("laptops");
const balanceElement = document.getElementById("balance");
const loanElement = document.getElementById("loan");
const loanButtonElement = document.getElementById("getloan");
const salaryElement = document.getElementById("salary")
const bankButtonElement = document.getElementById("tobank");
const workButtonElement = document.getElementById("work");
const featuresElement = document.getElementById("features");
const pictureElement = document.getElementById("picture");
const nameElement = document.getElementById("name");
const infoElement = document.getElementById("info");
const priceElement = document.getElementById("price");
const buyButtonElement = document.getElementById("buy");
const payloanElement = document.getElementById("payloan");

let laptops = [];
let totalSalary = 0;
let totalLoan = 0;
let total = 0;
let loan = false;
let repayButtonElement = null;
let price = 0;
let laptop = "";

fetch("https://noroff-komputer-store-api.herokuapp.com/computers")
    .then(response => response.json())
    .then(data => laptops = data)
    .then(laptops => addLaptopsToSelect(laptops));

const addLaptopsToSelect = (laptops) => {
    laptops.forEach(laptop => addLapTopToSelect(laptop))
    const listSpecs = document.createElement("ul");
    for (const spec of laptops[0].specs) {
        const listItem = document.createElement("li");
        listItem.textContent = spec;
        listSpecs.appendChild(listItem);
    }
    featuresElement.appendChild(listSpecs);
    priceElement.innerText = laptops[0].price;
    pictureElement.src = "https://noroff-komputer-store-api.herokuapp.com/"+laptops[0].image;
    nameElement.innerText = laptops[0].title;
    infoElement.innerText = laptops[0].description;
    price = laptops[0].price;
    laptop = laptops[0].title;
}

const addLapTopToSelect = (laptop) => {
    const laptopElement = document.createElement("option")
    laptopElement.value = laptop.id;
    laptopElement.appendChild(document.createTextNode(laptop.title));
    laptopsElement.appendChild(laptopElement);
}

const handleLaptopSelectionChange = e => {
    featuresElement.innerText = null;
    const listSpecs = document.createElement("ul");
    const selectedLaptop = laptops[e.target.selectedIndex];
    pictureElement.src = "https://noroff-komputer-store-api.herokuapp.com/"+selectedLaptop.image;
    for (const spec of selectedLaptop.specs) {
        const listItem = document.createElement("li");
        listItem.textContent = spec;
        listSpecs.appendChild(listItem);
    }
    featuresElement.appendChild(listSpecs);
    priceElement.innerText = selectedLaptop.price;
    nameElement.innerText = selectedLaptop.title;
    infoElement.innerText = selectedLaptop.description;
    price = selectedLaptop.price;
    laptop = selectedLaptop.title;
}

const handleWork = () => {
    totalSalary += 100;
    salaryElement.innerText = totalSalary;
}

const handleGetLoan = () => {
    const wantedLoan = prompt("Please enter the amount of money you wish to loan: ")
    if (wantedLoan <= (total*2) && loan == false && wantedLoan > 0) {
        totalLoan = wantedLoan;
        total += parseInt(wantedLoan);
        loanElement.innerHTML = totalLoan;
        loan = true;
        repayButtonElement = document.createElement("button");
        repayButtonElement.innerText = "Repay";
        repayButtonElement.id = "repay";
        payloanElement.appendChild(repayButtonElement)
        repayButtonElement.addEventListener("click", handleRepayLoan);
    } else if (loan == true) {
        alert("You already have a loan.")      
    } else {
        alert("You can only get loan up to " + (total*2) + " euros.")
    }

    balanceElement.innerText = total;
    loanElement.innerHTML = totalLoan;
}

const handleBank = () => {
    if (loan == false) {
        total += totalSalary;
    } else if ((totalSalary * 0.1) <= totalLoan) {
        totalLoan -= totalSalary * 0.1;
        total += totalSalary * 0.9;

        if (totalLoan == 0) {
            loan = false;
            payloanElement.removeChild(repayButtonElement);
        }
    } else {
        let residue = (totalSalary * 0.1) - totalLoan;
        totalLoan = 0;
        total += (totalSalary * 0.9) + residue;
        loan = false;
        payloanElement.removeChild(repayButtonElement);
    }

    totalSalary = 0;
    salaryElement.innerText = totalSalary;
    balanceElement.innerText = total;
    loanElement.innerText = totalLoan;
}

const handleRepayLoan = () => {
    if (totalSalary >= totalLoan) {
        let residue = (totalSalary-totalLoan);
        totalLoan = 0;
        loan = false;
        payloanElement.removeChild(repayButtonElement);
        total += residue;
    } else {
        totalLoan -= totalSalary;
    }
    
    totalSalary = 0;
    salaryElement.innerText = totalSalary;
    balanceElement.innerText = total;
    loanElement.innerHTML = totalLoan;
}

const handleBuyLaptop = () => {
    if (price > total) {
        alert("You cannot afford this laptop. This laptop costs " + price + " euros, but you only have " + total + " euros.")
    } else {
        alert("You are now the owner of a new laptop called " + laptop + ".")
        total -= price;
        balanceElement.innerText = total;
    }
}

const handleAll = () => {
    salaryElement.innerText = totalSalary;
    balanceElement.innerText = total;
    loanElement.innerText = totalLoan;
}

handleAll();
laptopsElement.addEventListener("change", handleLaptopSelectionChange)
workButtonElement.addEventListener("click", handleWork);
bankButtonElement.addEventListener("click", handleBank);
loanButtonElement.addEventListener("click", handleGetLoan);
buyButtonElement.addEventListener("click", handleBuyLaptop);