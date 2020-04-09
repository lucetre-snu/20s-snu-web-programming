
function printStars(n) {
    if(isNaN(n)) {
        console.log('input number is NaN');
        return;
    }
    if(n % 2 === 0) {
        console.log('input number is even!');
        return;
    }
    let str = '';
    for(let i = 0; i < n/2; i++)
        str += ' '.repeat(n/2-i) + '*'.repeat(i*2+1) + '\n';
    console.log(str);
}

printStars(11);
printStars(2);
printStars();


arr = [2, 4, 3, 5, 7];

arr.forEach(element => {
    console.log(element);
});

arr = arr.map(element => {
    return element*2;
});

console.log(arr);

console.log(arr.map(e => e*2));

const dom = document.getElementById('hero');

console.log(dom);
// console.log(document.getElementById('hero$'));
console.log(document.getElementsByTagName('li'));
// console.log(document.getElementsByTagName('li$'));
console.log(document.querySelectorAll('.books-wrapper'));


toggle = false;

// arrow function을 쓰지 않는 이유: this 쓰기 위해서
dom.addEventListener('click', function() {
    if(this.getAttribute('toggle') === '1') {
        this.textContent = '사실 아니다';
        this.setAttribute('toggle', '2');
    }
    else {
        this.textContent = '나는 전설이다';
        this.setAttribute('toggle', '1');
    }
    console.log(dom);

    // toggle = !toggle;
    // if(toggle)
    //     this.textContent = '사실 아니다';
    // else
    //     this.textContent = '나는 전설이다';
});
