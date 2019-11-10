const { log } = console;
// bind | call | apply 方法的异同点

// 1/ 都是用来改变this指向的；2/ 都是函数的方法，挂载在Function.prototype属性上      

// 目标函数调用call,apply后直接执行，bind被调用后返回一个新函数，调用新函数才会执行目标函数

// 手写 bind 源码
// {
    // 1.返回新函数  2.改变this指向  3.组合参数  4.返回的新函数当作构造函数调用实际是调用的是目标函数
    Function.prototype.myBind = function(newThis,...list1){
        let self = this;  // this 就是目标函数（ 函数是对象 ）

        let fn = function(...list2){
            // 如果是用作构造函数则this应该是实例，直接调用this应该是传入的对象
            let cur = (new.target == fn) ? this : newThis;
            self.apply(cur,[...list1,...list2]);
        }
        fn.prototype = Object.create(self.prototype); // 这里实际直接把fn.prototype整个改变了，所以constructor只能是新对象中原型上的constructor了
        log(fn.prototype.constructor == self);
        return fn;
    }
    function test(...list){
        log(this);
        log(list);
    }
    test.prototype.say = function(){ log('test...')}
    let newTest = test.myBind({a:1},1,2,3);
    new newTest(7,8,9);
    // newTest(4,5,6);
    // log('t--->',t);
    // log('t--->',typeof t);

    // let newTest2 = test.bind({b:1},4,5,6);
    // new newTest2(7,8,9);
   
// }

// Object.create(obj) 返回一个新对象，参数作为新对象的原型对象

