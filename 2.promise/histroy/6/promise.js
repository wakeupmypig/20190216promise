function Promise (executor){
    // 在promise内部定义一个状态 当前promise的状态
    let self = this;
    self.value = undefined;
    self.reason = undefined
    self.status = 'pending'; // 默认promise的状态是pengding
    self.onResolevedCallbacks = []; // 存放所有成功的回调
    self.onRejectedCallbacks = []; // 存放所有失败的回调
    function resolve(value){
        // (value!=null && typeof value === 'object') || typeof value == 'function'
        if(value instanceof Promise){
            // if(value.then && typeof value.then === 'function'){
                return value.then((data)=>{
                    resolve(data)
                },y=>{
                    reject(y);
                });
            // }
        }
        if(self.status === 'pending'){
            self.value = value;
            self.status = 'resolved'; // 成功态
            self.onResolevedCallbacks.forEach(fn=>fn());
        }
    }
    function reject(reason){
        if(self.status === 'pending'){
            self.reason = reason;
            self.status = 'rejected'; // 失败态
            // 发布
            self.onRejectedCallbacks.forEach(fn =>fn());
        }
    }
    try{
        executor(resolve,reject); // 用户会调用resolve ／ reject
    }catch(e){
        reject(e); // 说明失败了
    }
}
// 这个规范 是通用的  我们的promise 可能会在别的promise中使用
// let index = 2;
// Object.defineProperty(x,then,{
//     get(){
//         index--;
//         if(index === 0){
//             throw new Error();
//         }
//     }
// })
function resolvePromise(promise2,x,resolve,reject){ // 判断x 是不是promise 
    if(promise2 === x){ // 表示防止自己等待自己
        return reject(new TypeError('循环引用了'));
    }
    // 保证当前x 是一个引用类型
    let called; // 表示当前有没有被调用过
    if((x!==null && typeof x === 'object') || typeof x === 'function'){
        // 很有可能是一个promise
        try{
            let then = x.then; // then属性具有getter 此时获取时会发生异常 
            if(typeof then === 'function'){ // 就认为promise
                then.call(x,y=>{ // y有可能是一个promise
                    // 一直解析 直到结果是一个常量为止
                    if(called) return;  // 给别人的promise增加的
                    called = true;
                    resolvePromise(promise2,y,resolve,reject);
                    //resolve(y); // 成功拿到成功的结果让promise2变成成功态
                },r=>{
                    if(called) return;
                    called = true;
                    reject(r);
                });
            }else{ // 当前这个then是一个对象 普通对象
                resolve(x); // {a:1}
            }
        }catch(e){ // 
            if(called) return;
            called = true;
            reject(e);
        }
    }else{
        resolve(x);// 普通值 直接成功即可
    }
}
Promise.prototype.then = function(onFulfilled,onRejected){
    onFulfilled = typeof onFulfilled === 'function'?onFulfilled : value=> value;
    onRejected = typeof onRejected === 'function'? onRejected:err=>{throw err}
    let self = this;
    // 调用then后需要再次 返回一个全新的promise
    // 我需要拿到当前then方法 成功或失败执行后的结果
    let promise2 = new Promise(function(resolve,reject){
        if(self.status === 'resolved'){
            setTimeout(()=>{ // 这里要使用promise2 所有 需要增异步保证可以获取到promise2
                try{
                    let x = onFulfilled(self.value);
                    resolvePromise(promise2,x,resolve,reject);
                }catch(e){
                    reject(e); // 如果执行函数时抛出失败 那么会走向下一个then的失败状态
                }
            },0)
        }
        if(self.status === 'rejected'){
            setTimeout(()=>{
                try{
                    let x = onRejected(self.reason);
                    resolvePromise(promise2,x,resolve,reject);
                }catch(e){
                    reject(e);
                }
            },0)
        }
        if(self.status === 'pending'){
            // 订阅
            self.onResolevedCallbacks.push(function(){
                setTimeout(()=>{
                        try{
                            let x =  onFulfilled(self.value);
                            resolvePromise(promise2,x,resolve,reject);
                        }catch(e){
                            reject(e);
                        }
                },0)
            });
            self.onRejectedCallbacks.push(function(){
                setTimeout(()=>{
                    try{
                        let x =  onRejected(self.reason);
                        resolvePromise(promise2,x,resolve,reject);
                    }catch(e){
                        reject(e);
                    }
                },0);
            });
        }
    });
    return promise2;
 
}
// 让你实现一个promise的延迟对象 defer
Promise.defer =Promise.deferred = function(){
    let dfd = {};
    dfd.promise = new Promise((resolve,reject)=>{
        dfd.resolve = resolve;
        dfd.reject = reject;
    })
    return dfd;
}
Promise.prototype.catch = function(errFn){
    return this.then(null,errFn)
}
Promise.all = function(values){ console.log('my-promise')
    return new Promise((resolve,reject)=>{
        let arr = []; // 最终结果的数组
        let index = 0;
        function processData(key,value){
            index++;
            arr[key] = value;
            if(index === values.length){ // 如果最终的结果的个数和values的个数相等 抛出结果即可
                resolve(arr);
            }
        }
        for(let i = 0;i<values.length;i++){
            let current = values[i];
            if(current && current.then && typeof current.then == 'function'){
                // promise
                current.then(y=>{
                    processData(i,y);
                },reject)
            }else{
               processData(i,current);
            }
        }
    })
}
Promise.race = function(values){ 
    return new Promise((resolve,reject)=>{
        for(let i = 0;i<values.length;i++){
            let current = values[i];
            if(current && current.then && typeof current.then == 'function'){
                // race方法 如果已经成功了 就不会失败了 反之一样
                current.then(resolve,reject)
            }else{
               resolve(current);
            }
        }
    });
}
Promise.resolve = function(){
    return new Promise((resolve,reject)=>{
        resolve();
    })
}
Promise.reject = function(){
    return new Promise((resolve,reject)=>{
        reject();
    })
}
module.exports = Promise;
// npm install -g promises-aplus-tests
// promises-aplus-tests promise.js

