// 观察 和 被观察者  被观察者 要存放在观察者中 被观察者 
// 要提供一个 更新的方法，当被观察者的数据发生变化时 需要执行被察者的update方法

function Observer(){
    this.state = '不开心的';
    this.arr = [];
}
Observer.prototype.attach = function(s){
    this.arr.push(s); // 把每个小的subject放到了被观察者中
}
Observer.prototype.setState = function(newState){
    this.state = newState; // 当被观察者发生变化后
    // s指代的是 Subject的实例  通知每个观察者 调用更新方法
    this.arr.forEach(s=>s.update(this.state));
}

function Subject(name,target){
    this.name = name;
    this.target = target;
}

Subject.prototype.update = function(newState){
    console.log(this.name +'监控到了宝贝的'+newState+'变化');
}
let o = new Observer();
let s1 = new Subject('我',o);
let s2 = new Subject('我媳妇',o);
o.attach(s1);
o.attach(s2);
o.setState('开心');
o.setState('不开心'); // 观察者模式 是有关系  （基于发布订阅的）