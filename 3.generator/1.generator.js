// generator 生成器  生成迭代器的

function fns(){
    // 给类数组 添加迭代方法
    let obj = {0:1,1:2,2:3,length:3,[Symbol.iterator]:function(){
        let index = 0;
        let that = this;
        // 迭代器的概念
        return { // 迭代器上拥有next方法
            next(){
                return {value:that[index],done:index++ == that.length}
            }
        }
    }};
    let arr = [...obj];
    console.log(Array.isArray(arr),arr);
}
fns(1,2,3,4,5);

function * read(){ // 生成器生成的迭代器  * 还会配合 yield来使用   （yield产出）
    yield 1;
    yield 2;
    return 100;
}
let it = read();
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());



function fns(){
    // 给类数组 添加迭代方法  generator用法  koa1 基于generator  dva
    let obj = {0:1,1:2,2:3,length:3,[Symbol.iterator]:function*(){
        let that = this;
        let index = 0;
        while(index !== that.length){
            yield that[index++];
        }
    }};
    let arr = [...obj];
    console.log(Array.isArray(arr),arr);
}
fns(1,2,3,4,5);
