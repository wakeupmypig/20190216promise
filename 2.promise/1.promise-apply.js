
let Promise = require('./promise');
//1) new Promise中可以夹杂着异步罗技
//2) 同一个实例可以多次then
let p = new Promise(function(resolve,reject){
    resolve('777');
});
// 值的穿透
p.then().then().then((data)=>{
    console.log(data,'4556');
 });

