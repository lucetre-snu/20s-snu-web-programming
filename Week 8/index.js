const fetch = require('node-fetch');
const fs = require('fs');
const cheerio = require('cheerio')

// const res = fetch('https://naver.com');
// console.log(res);

// const f = () => {
//     console.log('hello');
// };

// // Callback
// setTimeout(f, 2000);


// // Async
// fs.readFile('./test.txt', 'utf8', (err, res) => {
//     if(err) {
//         console.error(err);
//         return;
//     }
//     console.log(res);
// });

// // 시간이 더 오래 걸리는 이유?
// fs.readFile('./test2.txt', 'utf8', (err, res) => {
//     if(err) {
//         console.error(err);
//         return;
//     }
//     console.log(res);
// });


// fs.readFile('./test.txt', 'utf8', (err, res) => {
//     if(err) {
//         console.error(err);
//         return;
//     }
//     console.log(res);

//     fs.writeFile('./test2.txt', res + ' test2', (err2, res2) => {
//         if(err2) {
//             console.error(err2);
//             return;
//         }
//         fs.readFile('./test2.txt', 'utf8', (err3, res3) => {
//             if(err3) {
//                 console.error(err3);
//                 return;
//             }
//         });
//         console.log('test2: ' + res);
//     });
// });



// // Promise
// let a = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         // resolve('Promise success');
//         reject(new Error('error occured!'));
//     }, 1000);
// });

// a.then((res) => {
//     console.log(res);
// }).catch((err) => {
//     console.error(err);
// });

// fetch('https://airbnb.co.kr').then((res) => {
//     console.log(res);
// });


const url = 'http://cba.snu.ac.kr/ko/notice';

titles = [];
fetch(url)
.then(res => res.text())
.then(txt => {
    console.log(txt);
    const $ = cheerio.load(txt)
    const titleNodes = $('.text_title');
    titleNodes.each((i, e) => {
        titles.push($(e).text());
    });
    console.log(titles);
});