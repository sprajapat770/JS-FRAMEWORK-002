console.log(global);

const fun = (name) => setTimeout(() =>{
    console.log(`Hello ${name}`);
}, 1000);

fun('vikram');