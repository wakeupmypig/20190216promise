
// let Promise = require('./promise');
//1) new Promise中可以夹杂着异步罗技
//2) 同一个实例可以多次then
let p = new Promise(function(resolve,reject){
    reject(1000);    
});
// 值的穿透
p.finally(()=>{ // node版本的问题 8以上
    console.log('hello');
    return 100;
}).catch(err=>{
    console.log(err,'err');
});

// 实现promise.finally方法
// finally 最终的 


// Promise.all 等待所有的promise都执行完