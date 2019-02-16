// lodash after 在多少次之后 执行某个方法
 
// 私有化  预制了times变量
function after(times,callback){
    return function(){
        if(--times == 0){
            callback();
        }
    }
}
let newFn = after(3,function(){
    console.log('after~~~');
})

newFn();
newFn();
newFn();