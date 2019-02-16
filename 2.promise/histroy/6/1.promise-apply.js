let fs = require('fs');
function readFile(url){
    return new Promise((resolve,reject)=>{
        fs.readFile(url,'utf8',function(err,data){
            if(err) reject(err);
            resolve(data);
        })
    })
}
Promise.race = function(values){ 
    return new Promise((resolve,reject)=>{
        for(let i = 0;i<values.length;i++){
            let current = values[i];
            if(current && current.then && typeof current.then == 'function'){
                // promise
                current.then(resolve,reject)
            }else{
               resolve(current);
            }
        }
    });
}
// 赛跑

Promise.race([1,readFile('./name.txt','utf8'),readFile('./age.txt','utf8')]).then(data=>{
    console.log(data);
},err=>{
    console.log(err);
});



Promise.reject().then(data=>{
    console.log('ok')
}).catch(err=>{
    console.log('err');
})