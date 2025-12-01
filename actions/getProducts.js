'use server'

const sleep = (time) => new Promise(resolve => setTimeout(resolve, time));

function randomValue(array) {
    return array[Math.floor(Math.random() * 10 % 2)];
}

export default async function getProducts() {
    await sleep(1000);

    let res = [];

    for (let i = 1; i <= 50; i++) {
        res.push({name: `Produkt ${i}`, condition: randomValue(['new', 'second hand'])})
    }

    return res;
}