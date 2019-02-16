let fs = require('fs');

function readFile(url){
    return new Promise((resolve,reject)=>{
        fs.readFile(url,'utf8',function(err,data){
            if(err) reject(err);
            resolve(data);
        })
    })
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

Promise.all([1,readFile('./name.txt','utf8'),readFile('./age.txt','utf8')]).then(data=>{
    console.log(data);
},err=>{
    console.log(err);
})