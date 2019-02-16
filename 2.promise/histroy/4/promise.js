function Promise (executor){
    let self = this;
    self.value = undefined;
    self.reason = undefined
    self.status = 'pending'; 
    self.onResolevedCallbacks = []; 
    self.onRejectedCallbacks = []; // 存放所有失败的回调
    function resolve(value){
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
        }catch(e){ //  防治别人的库中既调用了成功又有失败
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
    onRejected = typeof onRejected === 'function'? onRejected:function(err){
        throw err;
    }
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
                    console.log('err')
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
module.exports = Promise;

