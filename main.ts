#! /usr/bin/env node

import inquirer from "inquirer";

// Bank account interface
interface IBankAccount {
  accountNumber: number;
  balance: number;
  withdraw(amount: number): void;
  deposit(amount: number): void;
  checkBalance(): void;
}

//Bank account class
class BankAccount implements IBankAccount {
  accountNumber: number;
  balance: number;
  constructor(accountNumber: number, balance: number) {
    this.accountNumber = accountNumber;
    this.balance = balance;
  }

  //Debit money
  withdraw(amount: number): void {
    if (this.balance >= amount) {
      this.balance -= amount;
      console.log(
        `You have withdrawn $${amount} from your account, Remaining balance: $${this.balance}`
      );
    } else {
      console.log("Insufficient Balance.");
    }
  }

  // credit money
  deposit(amount: number): void {
    if (amount > 100) {
      amount -= 1; //$1 fee charged if amount is greater than $100
    }
    this.balance += amount;
    console.log(
      `Deposit of $${amount} successful. Remaining balance is $${this.balance}`
    );
  }

  //check balance
  checkBalance(): void {
    console.log(`Current balance is $${this.balance}`);
  }
}

//customer class
class Customer {
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  mobileNumber: number;
  account: BankAccount;

  constructor(
    firstName: string,
    lastName: string,
    gender: string,
    age: number,
    mobileNumber: number,
    account: BankAccount
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.age = age;
    this.mobileNumber = mobileNumber;
    this.account = account;
  }
}

//creates bank accounts
const accounts: BankAccount[] = [
  new BankAccount(1001, 500),
  new BankAccount(1002, 1000),
  new BankAccount(1003, 2000),
];

//create customers
const customers: Customer[] = [
  new Customer("Ammad", "Amin", "Male", 20, 3441390906, accounts[0]),
  new Customer("Hamza", "Khan", "Male", 22, 3221340906, accounts[1]),
  new Customer("Eman", "Abbasi", "Male", 19, 3445690906, accounts[2]),
];

async function service() {
  do {
    const accountNumberInput = await inquirer.prompt({
      name: "accountNumber",
      type: "number",
      message: "Enter Your Account Number",
    });
    const customer = customers.find(
      (customer) =>
        customer.account.accountNumber === accountNumberInput.accountNumber
    );
    if (customer) {
      console.log(`Welcome ${customer.firstName} ${customer.lastName}!\n`);
      const ans = await inquirer.prompt([
        {
          name: "select",
          type: "list",
          message: "Select an option",
          choices: ["Deposit", "Withdraw", "Check Balance", "Exit"],
        },
      ]);

      switch (ans.select) {
        case "Deposit":
          const depositAmount = await inquirer.prompt({
            name: "amount",
            type: "number",
            message: "Enter the amount to deposit:",
          });
          customer.account.deposit(depositAmount.amount);
          break;

        case "Withdraw":
          const withdrawAmount = await inquirer.prompt({
            name: "amount",
            type: "number",
            message: "Enter the amount to withdraw:",
          });
          customer.account.withdraw(withdrawAmount.amount);
          break;

        case "Check Balance":
          customer.account.checkBalance();
          break;

        case "Exit":
          console.log("Exiting bank Program...");
          console.log("Thank you for using our services. Have a great day!");
          return;
      }
    } else {
      console.log("Invalid account number. Please try again!");
    }
  } while (true);
}

service();
