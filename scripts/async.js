// function getData() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const data = { name: "John", age: 30 };
//       resolve(data);
//       //   reject(new Error("Failed to fetch data"));
//     }, 5000);
//   });
// }

// // const fetachedData = getData()
// //   .then((data) => {
// //     console.log("Data received:", data);
// //   })
// //   .then(() => {
// //     console.log(`Name: ${data.name}, Age: ${data.age}`);
// //     console.log("Data processing complete.");
// //   })
// //   .catch((error) => {
// //     console.error("Error fetching data:", error);
// //   });

// try {
//   const data = async () => {
//     const result = await getData();
//     return result;
//   };
//   //   const data = await getData();
//   console.log("Data received:", data);
//   console.log(`Name: ${data.name}, Age: ${data.age}`);
//   console.log("Data processing complete.");
// } catch (error) {
//   console.error("Error fetching data:", error);
// }

console.log("1");

setTimeout(() => {
  console.log("2");
}, 0);

console.log("3");
