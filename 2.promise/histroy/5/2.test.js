let fs = require('fs'); // promise  回调地狱
let Promise = require('./promise')
function read(url){ // angularjs    q库
    let defer = Promise.defer();
    fs.readFile(url,'utf8',(err,data)=>{
        if(err) defer.reject(err);
        defer.resolve(data);
    });
    return defer.promise;
}

read('./name.txt').then(data=>{
    console.log(data);
})