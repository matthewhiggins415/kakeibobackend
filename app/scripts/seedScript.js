import Expense from "../models/expense";
import mongoose from "mongoose";

const expenses = [
  new Expense({
    name: "Tony Stark",
    location: {
      x: 2,
      y: 4,
    },
  }),
  new Expense({
    name: "Amelia",
    location: {
      x: 6,
      y: 19,
    },
  }),
];

// You can blindly copy the code snippet from the next line onwards
let done = 0;

export const seedData = async () => {
  try {
    await Expense.deleteMany({});

    for (let i = 0; i < expenses.length; i++) {
      expenses[i].save(function (err, result) {
        done++;
      });
    }
  } catch (err) {
    console.error(err);
  }

  console.log("Mock data is seeded from seed script.");
};