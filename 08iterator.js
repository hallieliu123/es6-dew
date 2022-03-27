const { log } = console;

// 1.原生已部署Symbol.iterator属性的数据结构: array,arrayLike(并非所有的都有iterator接口,eg:{0:'a',1:'b',length:2}就没有),string,set,map;
// 调用Symbol.iterator就可以返回遍历器对象;遍历器对象实际就是一个指针对象;
{
    //模拟iterator接口
    //1创建一个遍历器对象,也就是指针对象
    //2第一次调用指针对象的next方法,指针指向数据结构的第一个成员
    //3第二次调用指针对象的next方法,指针指向数据结构的第二个成员
    //4不断调用next方法,直到它指向数据结构的结束位置
    let arr = ['a','b','c'];
    function it( arr ){
        let index = -1;
        return {
            next:function(){
                index ++;
                return (index < arr.length) ? { value:arr[index],done: false } : { value:undefined,done:true }
            }
        }
    }
    let i = it(arr);
    log(i.next()); //{value: 'a', done: false}
    log(i.next()); //{value: 'b', done: false}
    log(i.next()); //{value: 'c', done: false}
    log(i.next()); //{value: undefined, done: true}

    const oI = arr[Symbol.iterator](); // array中自动部署的iterator
    log(oI.next()); //{value: 'a', done: false}
    log(oI.next()); //{value: 'b', done: false}
    log(oI.next()); //{value: 'c', done: false}
    log(oI.next()); //{value: 'c', done: false}

    // 一个对象如果想使用for...of遍历,必须在Symbol.iterator属性上部署生成遍历器的方法:
    // 使用类部署iterator接口的例子:
    class RangeIterator {
        constructor(start, end) {
            Object.assign(this,{value: start, end});
        }
        [Symbol.iterator]() {
            return this;
        }
        next() {   
            let v = this.value;
            this.value ++;
            if(this.value <= this.end) {
                return {value: value, done: false};
            }
            return {value: undefined, done: true};
        }
    }
    const obj = new RangeIterator(0,3);
    // for(let item of obj){
    //     log(item); // 0 1 2
    // }

    //例3在构造函数的原型链上部署Symbol.iterator接口,调用它即返回iterator对象,调用该对象上的next方法,返回一个值的同时,将指针指向下一个实例;
    function Obj(value){
        this.value = value;
    }
    Obj.prototype[Symbol.iterator] = function(){
        let current = this;
        return {
            next: function() {
                if(current) {
                    let value = current.value;
                    current = current.next; // 将指针指向下一个实例
                    return {value, done: false};
                }
                return {value: undefined, done: true};
            }
        }
    }
    const one = new Obj(1);
    const two = new Obj(2);
    const three = new Obj(3);
    one.next = two;
    two.next = three;
    for(let item of one) {
        // log(item); // 1 2 3
    }
}

// 2.iterator接口实际应用
    {
        // 解构赋值 (实际只要部署过iterator接口的数据结构都可以使用数组形式进行解构)
        let s1 = new Set().add(1).add(2).add(3);
        let [x,y,z] = s1;

        log('x,y,z',x,y,z);
        let [a,...b] = s1;
        log('a,b',a,b);

        const m = new Map();
        const key = {a: 1, b:2};
        const value = {title: 'test'};
        m.set(key, value);
        let [a] = m;
        log(a); // [{a: 1, b:2}, {title: 'test'}];

        //使用扩展运算符转化为数组
        const str = 'hello';
        [...str] // 'h','e','l','l','o'

        //yeild* + 可遍历结构，会自动调用它的iterator接口
        function* generator(){
            yield 1;
            yield* [2,3,4]; 
            yield 5;
        }
        let g = generator();
        log(g.next());
        log(g.next());
        log(g.next());
        log(g.next());
        log(g.next());
    }
// 3. 使用generator包装对象，用于使用for..of..遍历    
    {
        function* iterateObj(obj){
            for(let key of Object.keys(obj)){
                yield [key,obj[key]]
            }
        }
        let obj = {'name':'Miya','title':'princess','age':'15'};
        for(let item of iterateObj(obj)){
            log('[key,value]',item);
        }
    }
// for..of 内部也是自动调用iterator接口(一个数据结构只要部署了Symbol.iterator属性就被视为部署了iterator接口,iterator接口主要供for...of消费)

