// 在发开发中 1) 接口的并发

// 树组件 获取文件夹的信息 ＋  文件的接口 ＝ 渲染的数据

// fs模块 node的一个核心模块  在node API中 所有的回调函数的第一个参数都是err error-first
// code runner 默认会以根文件夹为基准

let fs = require('fs');
// let arr = [];
// function out(data){
//     arr.push(data);
//     if(arr.length == 2){
//         console.log(arr);
//     }
// }
function after(times,fn){
    let arr = []
    return function(data){ // 每次调用out 会触发此函数
        arr.push(data);
        if( --times == 0){ // 当目标达到后 调用callback
            fn(arr);
        }   
    }
}
let out = after(2,function(data){
    console.log(data);
});
fs.readFile('./directory.txt','utf8',function(err,data){
    out(data);
});
fs.readFile('./file.txt','utf8',function(err,data){
    out(data);
});

// 发布订阅 promise redux eventBus  观察者模式（基于发布订阅的）
// 发布  &&  订阅