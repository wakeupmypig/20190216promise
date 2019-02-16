function Promise (executor){
    // 在promise内部定义一个状态 当前promise的状态
    let self = this;
    self.value = undefined;
    self.reason = undefined
    self.status = 'pending'; // 默认promise的状态是pengding
    function resolve(value){
        if(self.status === 'pending'){
            self.value = value;
            self.status = 'resolved'; // 成功态
        }
    }
    function reject(reason){
        if(self.status === 'pending'){
            self.reason = reason;
            self.status = 'rejected'; // 失败态
        }
    }
    executor(resolve,reject);
}
Promise.prototype.then = function(onFulfilled,onRejected){
    let self = this;
    if(self.status === 'resolved'){
        onFulfilled(self.value);
    }
    if(self.status === 'rejected'){
        onRejected(self.reason);
    }
}
module.exports = Promise;