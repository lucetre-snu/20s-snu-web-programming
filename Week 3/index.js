// alert('hello world2');


const sum = (n) => {
    result = 0;
    for (let i = 1; i <= n; i++) {
        result += i;
    }
    return result;
};

console.log(sum(10));


const printStars = (n) => {
    result = '';
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < i; j++)
            result += ' ';
        for (let j = n-i; j > 0; j--)
            result += '*';
        result += '\n';
    }
    console.log(result);
};

printStars(5);