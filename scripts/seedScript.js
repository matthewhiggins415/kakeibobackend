import Expense from "../app/models/expense";
import mongoose from "mongoose";

// Generate the random integer for cost 
const randomInt = () => {
  num = Math.floor(Math.random()*200)
  return num
}

// THINGS TO DO: 
// generate random cost 
// generate random title 
// generate random description 
// generate random type 
// put all these generators into a function that will create objects within expenses arr

const expenses = [
  new Expense({
    title: "Skateboard",
    description: "new hobby",
    type: "cultural",
    cost: "130",
    owner: ""
  }),
  new Expense({
    title: "Groceries",
    description: "food for the month",
    type: "need",
    cost: "100",
    owner: ""
  }),
];

// You can blindly copy the code snippet from the next line onwards
let done = 0;

export const seedData = async () => {
  try {
    await Expense.deleteMany({});

    for (let i = 0; i < expenses.length; i++) {
      //pass the id as parameter and add to expense object as owner attribute.
      expenses[i].save(function (err, result) {
        done++;
      });
    }
  } catch (err) {
    console.error(err);
  }

  console.log("Mock data is seeded from seed script.");
};