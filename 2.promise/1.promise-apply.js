let fs  = require('fs');
// 先调用第一个接口 第一个接口的输出是下一个的输入
// 恶魔金字塔 回调地狱
// fs.readFile('./name.txt','utf8',function(err,data){
//     fs.readFile(data,'utf8',function(err,data){
//         console.log(data);
//     })
// })

function readFile(url){
    return new Promise((resolve,reject)=>{
        fs.readFile(url,'utf8',function(err,data){
            if(err) reject(err);
            resolve(data);
        })
    })
}
// 链式 调用的特点
// 1） 如果一个then方法 返回一个普通值 这个值会传递给下一次then中作为成功的结果
// 2) 不是普通值 （promise 或者报错了）
// 3) 如果返回的是一个promise 会根据返回的promise 是成功还是失败 决定下一个then是成功还是失败
// 4) 补货错误机制 （1.默认会找离自己最近的then的失败）找不到就向下找
// 5) jquery 链式调用 返回this  promise调用then后 会返回一个新的promise
readFile('./name.txt').then((data)=>{
    return readFile(data+'1'); // age.txt1
}).then(data=>{
    return 100;
}).then(data=>{
    console.log(data)
}).catch(err=>{
    throw err
}).then((data)=>{
    console.log(data);
},()=>{
    console.log('error');
})
// 支持了一步的promise 
// promise 的优点 就是链式调用
