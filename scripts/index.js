// console.log("Hello, World!");

// const names = ["Alice", "Bob"];

// console.log(`Names array: ${names}`);

// console.log("================================");

// names.push("David");

// console.log(`Updated names array: ${names}`);

// console.log("================================");

// console.log(`Out of bounds access: ${names[10] ? names[10] : "Not found"}`);

// for (let i = 0; i < names.length; i++) {
//   console.log(`Name at index ${i}: ${names[i]}`);
// }

// console.log("================================");

// for (const name of names) {
//   console.log(`Name: ${name}`);
// }

// const scores = [85, 92, 78];

// for (const score of scores) {
//   if (score >= 90) {
//     console.log(`Score: ${score} - Excellent`);
//   } else if (score >= 80) {
//     console.log(`Score: ${score} - Good`);
//   } else {
//     console.log(`Score: ${score} - Needs Improvement`);
//   }
// }
// let totalScore = 0;

// for (const score of scores) {
//   totalScore += score;
//   console.log(`Current score: ${score}, Total score so far: ${totalScore}`);
//}

// ForEach

// console.log("================================");
// let newTotalScore = 0;

// scores.forEach((score) => (newTotalScore += score));

// console.log(`Total score calculated using forEach: ${newTotalScore}`);

// Maps

// const numbers = [1, 2, 3, 4, 5];

// const squaredNumbers = numbers.map((num) => num * num);

// console.log(`Squared numbers: ${squaredNumbers}, Original numbers: ${numbers}`);

// const doubledNumbers = numbers.map((num) => num * 2);

// console.log(`Doubled numbers: ${doubledNumbers}`);

// const minusOneNumbers = numbers.map((num) => num - 1);

// console.log(`Numbers minus one: ${minusOneNumbers}`);

// Filter

// const evenNumbers = numbers.filter((num) => num % 2 === 0);

// console.log(`Even numbers: ${evenNumbers}`);

// const oddNumbers = numbers.filter((num) => num % 2 !== 0);

// console.log(`Odd numbers: ${oddNumbers}, original numbers: ${numbers}`);

// numbers.forEach((num) => console.log(num ** 2));

// console.log(`Numbers after forEach (should be unchanged): ${numbers}`);

// const newnumbers = numbers.map((num) => num * 3).filter((num) => num > 10);

// console.log(
//   `New numbers (tripled and filtered): ${newnumbers}, original numbers: ${numbers}`,
// );

// const student = {
//   name: "Alice",
//   gpa: 3.8,
//   courses: ["Math", "Science", "Literature"],
//   key: "This is a key named 'key'",
// };
// . notation

// console.log(`Student name: ${student.name}, GPA: ${student.gpa}`);

// [] notation

// console.log(`Student courses: ${student["courses"]}`);

// can you give me an example of [] notation with a variable key?

// const key = "name";
// This will not work because it looks for a property named "key" instead of using the value of the variable key.
// console.log(`Student name using variable key: ${student.key}`);

// This will work because it uses the value of the variable key, which is "name", to access the property student["name"].
// console.log(`Student name using variable key: ${student[key]}`);

// const todoListContainer = document.getElementById("todo-list");
// const listTodos = async () => {
//   if (!todoListContainer) return;

//   try {
//     const response = await fetch("https://jsonplaceholder.typicode.com/todos");
//     const todos = await response.json();

//     todos.forEach((todo) => {
//       const todoItem = document.createElement("div");
//       todoItem.textContent = `${todo.id}. ${todo.title} - Completed: ${todo.completed}`;
//       todoListContainer.appendChild(todoItem);
//     });
//     todoCount.textContent = `Total todos: ${todos.length}`;
//   } catch (error) {
//     console.error("Error fetching todos:", error);
//   }
// };

// listTodos();

// const darkModeButton = document.getElementById("dark-mode");

// const lightModeButton = document.getElementById("light-mode");

// const handleToggleMode = () => {
//   document.body.classList.add("dark-mode");
//   document.body.classList.remove("light-mode");
//   lightModeButton.remove();
// };

// darkModeButton.addEventListener("click", handleToggleMode);

// const todoDiv = document.querySelectorAll("h1");

// const todoDivSingle = document.querySelector("div");

// todoDivSingle.innerHTML = "<h2> All todo lists:</h2>";

// if (todoDiv && todoDiv.length > 0) {
//   todoDiv.forEach((h1) => {
//     h1.textContent = "<h2> All todo lists:</h2>";
//   });
// } else {
//   console.error("Element with tag 'h1' not found.");
// }

// const firstDiv = document.querySelector("div#count");

// const form = document.querySelector("form");
// const input = document.querySelector("#todo-input");

// input.addEventListener("input", (event) => {
//   console.log(`New todo: ${event.target.value}`);
// });

// form.addEventListener("submit", (event) => {
//   event.preventDefault();
// });

const h2 = document.querySelector("h2");
// const h3 = document.querySelector("h3");

// console.log(`Selected h2 element: ${h2.textContent}`);
// console.log(`Selected h3 element: ${h3.textContent}`);

// h2.textContent = "<span style='color: blue;'>Updated H2 Text with HTML</span>";

// h3.innerHTML = "<span style='color: blue;'>Updated H3 Text with HTML</span>";

const changeModeButton = document.querySelector("#change-mode");

changeModeButton.addEventListener("click", () => {
  // Using add and remove
  if (document.body.classList.contains("dark-mode")) {
    document.body.classList.remove("dark-mode");
    document.body.classList.add("light-mode");
  } else {
    document.body.classList.remove("light-mode");
    document.body.classList.add("dark-mode");
  }

  // Using toggle
  // document.body.classList.toggle("dark-mode");
  // document.body.classList.toggle("light-mode");
});

h2.style.color = "red";
