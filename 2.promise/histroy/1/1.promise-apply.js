// promise 是一个类 (解决异步问题的)
// 自己来实现这个流程
// new Promise时 需要传递一个executor 执行器 (函数) 会立即被调用
// promise 承诺  默认的状态是喷定 等待态(pending) 调用resolve 表示成功了 reject 表示失败了 
// 每一个promise都有一个实例方法 then
// 我们可以从 等待态 转化成成功／失败 但是不能从失败／成功进行转化
let Promise = require('./promise');
let p = new Promise(function(resolve,reject){
    console.log('start');
    reject('情人节到了');
    resolve('情人到了');
});
// es6的内容
p.then((value)=>{
    console.log('success',value);
},(reason)=>{
    console.log('error',reason);
})
console.log('end');