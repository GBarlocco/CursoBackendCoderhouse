const funA = () => {
    console.log(1);
    funB();
    console.log(2);
}

const funB = () => {
    console.log(3);
    funC();
    console.log(4);
}

const funC = () => {
    console.log(5);
}

funA();