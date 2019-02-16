

let fs = require('fs');
function Events(){  // {a:[]}  发布 （发射） 订阅（存） 
    this._arr = [];
}
Events.prototype.on = function(fn){ // 订阅
    this._arr.push(fn);
}
Events.prototype.emit = function(r){ // 发布
    this._arr.forEach(function(fn){
        fn(r);
    })
}
let e = new Events();
let arr = [];
e.on(function(r){
    arr.push(r);
    if(arr.length == 2){
        console.log('读取完毕',arr)
    }
});
fs.readFile('./directory.txt','utf8',function(err,data){
    e.emit(data);
});
fs.readFile('./file.txt','utf8',function(err,data){
    e.emit(data);
});

// 发布订阅 promise redux eventBus  观察者模式（基于发布订阅的）
// 发布  &&  订阅

// 发布订阅的特点  两者无关
// 观察者模式  观察者 ＋ 被观察者  （有关系的）  vue 双向绑定