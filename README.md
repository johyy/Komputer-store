# Komputer Store

The goal of this project was to build a webpage using "vanilla" JavaScript.

## Table of Contents

- [Background](#background)
- [Install](#install)
- [Usage](#usage)

## Background

This web application can be divided into three parts:

- The Bank
- Work
- Laptops

### The Bank

The bank shows a “Bank balance" in your currency. This is the amount available for you to buy a laptop.
It also shows the outstanding "Loan" value. This should be reduced as loan paid back.
The "Get a loan" button will attempt to get a loan from the bank. There are some constraints on getting a loan.

### Work

Work section shows your current salary amount in your currency. Should show how much money you have earned by 
“working”.
The "Bank" button transfers the money from your Pay/Salary balance to your Bank balance.
There are some constraints on "Bank" button with paying the loan.
The work button must increase your Pay balance at a rate of 100 on each click.
Once you have a loan, a new button labeled “Repay Loan” should appear. Upon clicking this button, the full 
value of your current Pay amount should go towards the outstanding loan and NOT your bank account.

### Laptops

There is a select box showing the availanle computers.
Changing a laptop updates the user interface with the information for that selected 
laptop.
The "Buy now" button will attempt to “buy” a laptop and 
validate whether the bank balance is sufficient to purchase the selected laptop. 
If you do not have enough money in the “Bank”, a message is shown that you cannot afford the 
laptop. 
When you have sufficient “Money” in the account, the amount is deducted from the bank and you receive a message that you are now the owner of the new laptop.

## Install

- Clone the repository

## Usage

- Open the `index.html` file on the browser
