// 解决异步编程问题
function * fns(){
    let a = yield 1;
    console.log(a); // ?
    let b = yield 2;
    console.log(b);
    return b;
}

let it = fns();
let { value} = it.next(); // 第一次next传递参数是无意义的
it.next('100'); // 在传递参数 就会把结果传递给上一次yield的返回值
it.next('200');

let fs = require('mz/fs');
function * readAge(){
    let content = yield fs.readFile('./name1.txt','utf8');
    let age = yield fs.readFile(content,'utf8');
    return age;
}
function co(it){ // express + koa 中间件原理
    return new Promise((resolve,reject)=>{
        // 如果是异步迭代
        function next(r){ // 默认只要没有迭代完成 就不能的调用next
            let {value,done} = it.next(r);
            if(!done){ // 没有完成 他才是一个promise
                value.then(r=>{
                    next(r);
                },reject)
            }else{
                resolve(r);
            };
        }
        next();
    });
}
co(readAge()).then(data=>{
    console.log(data);
}).catch(err=>{
    console.log(err);
})
// 我们需要先读取名字 通过name.txt 中的内容 读取年龄
// let it = readAge();
// let {value} = it.next();
// value.then(data=>{
//     let {value} = it.next(data);
//     value.then(data=>{
//         let {value} = it.next(data);
//     })
// })

// es7 async + await  node 7.6 以上  generator + co语法糖
let fs = require('mz/fs');
async function  readAge(){ // 全部 async + await + promise
    try{
        let content = await fs.readFile('./name1.txt','utf8');
        let age = await fs.readFile(content,'utf8');
        return age;
    }catch(e){
        console.log('error',e);
    }
}
// async 函数之行后 返回的是一个promise
readAge().then(data=>{
    console.log(data); 
}).catch(err=>{
    console.log(err);
});

// callback 1）回调地狱  2）无法try/catch捕获异常  3）同步多个异步请求的结果
// then方法 all方法 

// finally commonjs规范 

// 保证出勤率 可以重听  可以开些小课 