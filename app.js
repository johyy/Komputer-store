const laptopsElement = document.getElementById("laptops");
const balanceElement = document.getElementById("balance")
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

let laptops = [];
let totalSalary = 0;
let totalLoan = 0;
let total = 0;

fetch("https://noroff-komputer-store-api.herokuapp.com/computers")
    .then(response => response.json())
    .then(data => laptops = data)
    .then(laptops => addLaptopsToSelect(laptops));

const addLaptopsToSelect = (laptops) => {
    laptops.forEach(laptop => addLapTopToSelect(laptop))
    featuresElement.innerText = laptops[0].specs;
    priceElement.innerText = laptops[0].price;
    pictureElement.src = "https://noroff-komputer-store-api.herokuapp.com/"+laptops[0].image;
    nameElement.innerText = laptops[0].title;
    infoElement.innerText = laptops[0].description;
}

const addLapTopToSelect = (laptop) => {
    const laptopElement = document.createElement("option")
    laptopElement.value = laptop.id;
    laptopElement.appendChild(document.createTextNode(laptop.title));
    laptopsElement.appendChild(laptopElement);
}

const handleLaptopSelectionChange = e => {
    const selectedLaptop = laptops[e.target.selectedIndex];
    pictureElement.src = "https://noroff-komputer-store-api.herokuapp.com/"+selectedLaptop.image;
    featuresElement.innerText = selectedLaptop.specs;
    priceElement.innerText = selectedLaptop.price;
    nameElement.innerText = selectedLaptop.title;
    infoElement.innerText = selectedLaptop.description;
}

const handleWork = () => {
    totalSalary += 100;
    salaryElement.innerText = totalSalary;
}

const handleBank = () => {
    total += totalSalary;
    totalSalary = 0;
    salaryElement.innerText = totalSalary;
    balanceElement.innerText = total;

}

const handleAll = () => {
    salaryElement.innerText = totalSalary;
    balanceElement.innerText = total;
}

handleAll();
laptopsElement.addEventListener("change", handleLaptopSelectionChange)
workButtonElement.addEventListener("click", handleWork);
bankButtonElement.addEventListener("click", handleBank);