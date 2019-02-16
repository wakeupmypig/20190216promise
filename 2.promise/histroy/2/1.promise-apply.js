let Promise = require('./promise');
//1) new Promise中可以夹杂着异步罗技
//2) 同一个实例可以多次then
let p = new Promise(function(resolve,reject){
    setTimeout(function(){
        resolve('情人节到了');
    },1000)
});
p.then((value)=>{
    console.log('success',value);
},(reason)=>{
    console.log('error',reason);
})
p.then((value)=>{
    console.log('success',value);
},(reason)=>{
    console.log('error',reason);
})
console.log('end');