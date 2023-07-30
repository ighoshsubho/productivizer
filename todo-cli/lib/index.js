#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const todoFile = path.join(process.cwd(), "todos.txt");

function addTodo(todo) {
  fs.appendFileSync(todoFile, `${todo}\n`);
  console.log("Todo added:", todo);
}

function listTodos() {
  if (fs.existsSync(todoFile)) {
    const todos = fs.readFileSync(todoFile, "utf-8").trim().split("\n");
    if (todos.length === 0) {
      console.log("Todo list is empty.");
    } else {
      console.log("Todo list:");
      todos.forEach((todo, index) => {
        console.log(`${index + 1}. ${todo}`);
      });
    }
  } else {
    console.log("Todo list is empty.");
  }
}

function deleteTodo(todoNumber) {
  const todos = fs.readFileSync(todoFile, "utf-8").split("\n");
  if (todoNumber >= 1 && todoNumber <= todos.length) {
    const deletedTodo = todos.splice(todoNumber - 1, 1)[0];
    fs.writeFileSync(todoFile, todos.join("\n"));
    console.log("Todo deleted:", deletedTodo);
  } else {
    console.log("Invalid todo number. Please provide a valid number.");
  }
}

function updateTodo(todoNumber, updatedTodo) {
  const todos = fs.readFileSync(todoFile, "utf-8").split("\n");
  if (todoNumber >= 1 && todoNumber <= todos.length) {
    const previousTodo = todos.splice(todoNumber - 1, 1, updatedTodo)[0];
    fs.writeFileSync(todoFile, todos.join("\n"));
    console.log("Todo updated:", previousTodo, "=>", updatedTodo);
  } else {
    console.log("Invalid todo number. Please provide a valid number.");
  }
}

module.exports = {
  addTodo,
  listTodos,
  deleteTodo,
  updateTodo,
};