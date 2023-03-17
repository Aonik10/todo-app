// let products = [
//     {
//         product_name: "The Witchers",
//         type: "book",
//         manufactured: new Date("2019-05-13"),
//         price: 800,
//     },
//     {
//         product_name: "Black Heels",
//         type: "Shoes",
//         manufactured: new Date("2021-07-06"),
//         price: 2500,
//     },
//     {
//         product_name: "Skybags",
//         type: "Bags",
//         manufactured: new Date("2020-09-22"),
//         price: 2200,
//     },
//     {
//         product_name: "OnePlus 9",
//         type: "Mobile Phone",
//         manufactured: new Date("2021-03-23"),
//         price: 49000,
//     },
// ];

// console.log("Original Products are:");
// console.log(products);
// let sortedProducts = products.sort((p1, p2) =>
//     p1.price < p2.price ? 1 : p1.price > p2.price ? -1 : 0
// );

// console.log("Products sorted based on descending order of their prices are:");
// console.log(sortedProducts);

const initialState = [
    {
        id: 1,
        title: "Task 1",
        description: "Task 1 description here",
        date: "2023-03-11",
        completed: true,
        important: true,
    },
    {
        id: 2,
        title: "Task 2",
        description: "Task 2 description here",
        date: "2023-03-12",
        completed: false,
        important: false,
    },
    {
        id: 3,
        title: "Task 2",
        description: "Task 2 description here",
        date: "2022-04-10",
        completed: false,
        important: false,
    },
];

let sortedDates = initialState.sort((p1, p2) =>
    p1.date > p2.date ? 1 : p1.date < p2.date ? -1 : 0
);
console.log(
    "Products sorted based on ascending order of their manufacture dates are:"
);
console.log(sortedDates);
