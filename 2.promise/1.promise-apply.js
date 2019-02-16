let fs = require('mz/fs'); // nodeapi=> promise 
// bluebird 蓝鸟 promise的库
// npm init -y  npm install bluebird

function promisify(fn){ // node中 util模块自带了这个功能
    return function(...args){ // args = [name,'utf8']
        return new Promise((resolve,reject)=>{
            fn(...args,function(err,data){
                if(err) reject(err);
                resolve(data);
            }); // fs.readFile('name.txt','utf8);
        })
    }
}
// let readFile = promisify(fs.readFile);
Promise.all([1,fs.readFile('./name.txt','utf8'),fs.readFile('./age.txt','utf8')]).then(data=>{
   return 100
},err=>{
    console.log(err);
}).then(data=>{
});

// promise的三个状态 怎么互相转化
// promise异步 发布订阅模式
// 当前成功的回调 和失败的回调必须不能在当前上下文中执行 Promise.then()
// prototype.then方法 必须返回一个新的promise 
// resolvePromise （promise a+） 判断then中函数的返回结果  Promise.defer
// catch 就是then的简写  （finally）  
// Promise all race resolve reject
// promisify  bluebird  mz  util
