Function.prototype.before = function(callback){ // 在原型上扩展
    let that = this;
    return function(){ 
        callback();
        that.apply(that,arguments); // 改变this指向 可以传递参数（数组）
    }
}

function fn(value){
    console.log('我要吃饭',value)
}

let newFn = fn.before(function(){
   console.log('刷牙')
});

newFn('我','你');