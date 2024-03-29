const { log } = console;

// 1. es6中的类其实是es5中构造函数的语法糖. 
//    基本使用对比,类不可以直接调用；类的原型属性不可枚举；
    {
        function Person1(name,age){
            this.name = name;
            this.age = age;
        }
        Person1.prototype.say = function(){
            log('say something...');
        }

        class Person2{
            constructor(name,age){
                this.name = name;
                this.age = age;
            }
            say(){
                log('shuo dian sha...');
            }
        }
        let p1 = new Person1('Simon','17');
        let p2 = new Person2('Blue','17');
        // log('p1---->',p1);
        // p1.say();
        // p2.say();
        // log(p1);
        // log(p2);
        // log('Person1.prototype--->',Person1.prototype);
        // log('Person2.prototype--->',Person2.prototype);
        // log(Object.keys(Person1.prototype));  // 可枚举
        // log(Object.keys(Person2.prototype));  // 不可枚举
        // Person2('Blue','17');  // 不可直接调用类
        // 复习
        // for...in  可遍历：可枚举 + 继承属性
        // Object.keys() 可遍历：可枚举属性
        // Object.getOwnPropertyNames() 可遍历：不可枚举属性 + 可枚举属性 

    }
// 2. 类内不加constructor，它会自动生成;
    {
        class Person{}
        // log('Person.prototype-->',Person.prototype);
    }

// 3. 1/ 静态方法 / 静态属性  --> 只能被类自己调用，不能被实例调用;  
//    2/ 继承 > extends /  super()关键字自动去调用一下父类的constructor; 
//    3/ 
    {
        class Person{
            constructor(name,age){
                this.name = name;
                this.age = age;
            }
            static isPerson(obj){
                return obj instanceof Person;
            }
            say(){
                log('Hi, Person');
            }
        }
        Person.country = 'America';
        let str = '你好';
        // log('str--->',str.charCodeAt(0));
        // log('str--->',String.fromCharCode(20320)); // 直接被构造函数自己调用的方法就是静态方法
        let p1 = new Person('Simon','17');
        // log(Object.keys(p1));  // 只能遍历可枚举属性，连静态属性和静态方法也不能遍历。
        // p1.isPerson(p1);
    //    log( 'Person.isPerson(p1)-->',Person.isPerson(p1) );
    //    log('p1.country',p1.country);
    //    log('Person.country--->',Person.country);

       class Engineer extends Person {
           constructor(name,age,salary){ // 整个constructor不写，可以不写super，创建对象时默认自己回去调用constructor和传值；
                super(name,age);         // 写了constructor就必须写super,super就是手动去调用父类的constructor构造函数
                this.salary = salary;
           }
           say(){
                log('blablabla~~~');
           }
       }
       let e1 = new Engineer('Nick','17','20000');
    //    e1.say();
    //    log('e1--->',e1);
    }

 
//---------------------------------------------------------------------------------------------------------------------

// 1. 基本使用,class类其实是es5构造函数的语法糖，它使得对象的原型写法更加清晰，更加接近面向对象编程的语法而已。
//    a基本使用对比,类不可以直接调用,必须用new命令来调用；类的原型属性不可枚举, 并且实例的原型对象也不可枚举；
    {
        class A {
            a = 'hello';
            static b = 'world';
            say() {
                log('haha~');
            }
        }
        log('类的原型的描述符对象--->', Object.getOwnPropertyDescriptor(A.prototype, 'say'));//{writable: true, enumerable: false, configurable: true, value: ƒ}
        log('类的原型--->', Object.keys(A.prototype)); // []  类的原型属性不可枚举
        log('类的原型--->', Object.getOwnPropertyNames(A.prototype)); // ['constructor', 'say']
        const t = new A();
        log('t的原型对象也不可枚举---->', Object.keys(Object.getPrototypeOf(t))); // []
        log('t的原型对象也不可枚举---->', Object.getOwnPropertyNames(Object.getPrototypeOf(t))); //['constructor', 'say']
    }
//    b表达式写法/声明式写法
    {
        const A = class Me {} // Me 只能类内部使用
        class AA {}
    }
//    c类的数据类型就是函数，类本身就指向其构造函数。
    {
        class Point {}
        log(typeof Point === 'function'); // true
        log(Point === Point.prototype.constructor); // true
    }

//  2. constructor 方法默认返回实例对象，当然返回也能被更改。如果类没有被显示的添加这个方法，它会被默认添加。 
    {
        class Person1{
            constructor(){
                return Object.create(null);
            }
        }
        // let p1 = new Person1();
        // log(p1 instanceof Person1);  // false
    }
//  3. hasOwnProperty();对象的自身属性检测
    {
        class Person1{
            constructor(name,age){
                Object.assign(this,{name,age});
            }
        }
        let p1 = new Person1('Simon','17');
        // log(p1.hasOwnProperty('name'));
        // log(p1.hasOwnProperty('age'));
        // 回忆对象的方法：Object.assign() 1,2,3,4,5,6传入数组,7; Object.getPrototypeOf();Object.setPrototypeOf();
    }
// 4. class 不存在变量声明提升
    {
        // new A(); // 报错
        class A{};
    }
// 5. 只在类内部使用的属性或者方法叫做私有属性或者方法。私有方法: call(), #; 私有属性: # ; 使用#定义还是个提案
//    存值函数和取值函数是定义在属性的descriptor(描述符对象上)的;
    {
        function say( greeting ){
            log('--->',greeting);
            this.g = greeting;
        }
        class A{
            #name = 'Simon';
            #sum(v1, v2) {
                return v1 + v2;
            }
            getVal(v1, v2) {
                return this.#sum(v1, v2)
            }
            print(greeting){
                say.call(this,greeting);
            }
            get name(){
                return this.#name;
            }
            set name(value){
                this.#name = value;
            }
        }
        let a1 = new A();
        // a1.print('Hi');
        log('a1--->', a1); 
        // log(a1.name); // Simon
        // log('a1.sum()--->', a1.sum(1, 2)); // a1.sum is not a function
        // log('a1.getVal()--->', a1.getVal(1, 2)); // 3
        // log('A.prototype--->', A.prototype);
        // log(Object.getOwnPropertyDescriptor(A.prototype, 'name')); // {enumerable: false, configurable: true, get: ƒ, set: ƒ}
    }

// 6. this指向问题，绑定this的两种方法，bind,箭头函数
    {
        class A{
            constructor(name){
                Object.assign(this,{name});
                this.print = (name='Simon') => { 
                    log('name--->',this.name);
                }
            }
            // print(){
                // log('this--->',this);
                // log('name--->',this.name);
            // }
        }
        let a1 = new A('Blue');
        let { print } = a1;
        // a1.print();  // a1
        // print();  // undefined 解构出来后
    }
// 7. class类的getter和setter,这两个函数是定义在属性的描述对象上面（即descriptor）
    {
        class A{
            constructor(el){
                this.el = el;
            }
            get html(){
                return this.el.innerHTML;
            }
            set html(value){
                this.el.innerHTML = value;
            }
        }
        let oDiv = document.getElementById('a');
        let a1 = new A(oDiv);
        // log(a1.html);
        // a1.html = 789;
        // log(a1.html);
        log(Object.getPrototypeOf(a1)); // html成为了实例对象的访问器属性
        // log(a1);
        // let des = Object.getOwnPropertyDescriptor(A.prototype,"html");
    //    log(des);
    //    log(A.prototype); 
    }

// 8. class类的generator函数  
    {
        let a1 = new class{
            constructor(...rest){
                this.props = rest;
            }
            * [Symbol.iterator](){
                for(let item of this.props){
                    yield item;
                }
            }
        }('a','b');
        for( let item of a1 ){
            // log(item);
        };
    };
// 9. 类的静态方法 / 静态属性, 实例不可继承，子类可继承; // 类内部可用super对象调用
    {
        class A{
            static lastname = 'Simon';
            constructor(){
                // ...
            }
            static say(){
                log('static prop - lastname: ',this.lastname); // 静态属性，可拿到
            }
        }
        let a1 = new A();
        // A.say();
        // a1.say();
        class B extends A{ } 
        // B.say(); //
        // log(A.name);
        // log(B.name);

        class C extends B{ 
            static greet(){
                super.say(); // 类内部可用super对象调用 
            }
        }
        // C.greet();
    }

// 10. 实例的属性,可直接写上去了，但不能传参
    {
        class A{
            look = 'handsome';
            static name = 'Blue'; 
        }
        let a1 = new A();
        // log('a1--->',a1);
    }

// 11.new.targe属性: 返回new命令调用的构造函数  
    {
        function Person(name){
            if( new.target == Person ){
                this.name = name
            }else{
                throw new Error('不能直接调用');
            }
        }
        // let p1 = Person('Simon');
    // 使用这个特性就可以创建出 继承后 才能创建的类
        class Shape{
            constructor(){
                if(new.target == Shape){
                    throw new Error('本类不能实例化...');
                }
            }
        }
        class Rec extends Shape{
            constructor(){
                super();
            }
        }
    }

// 面试题系列：[1,2,3] -> [1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]
// [1,2,3,4]
{
    // 
    function getAllCombination(arr) { // [1,2,3,4]
        if(arr.length === 2) return [[arr[0], arr[1]],[arr[1], arr[0]]];
        let result = [];
        for(let i=0; i<arr.length; i++) {
            const arrNew = getArrNew(arr, i); //[2,3,4]           | [3,4] | [2,4]       |  [2,3]
            const temp = getAllCombination(arrNew); // [[3,4],[4,3]]  | [[2,4], [4,2]]      |  [[2,3],[3,2]]
            for(let j=0; j<temp.length; j++) {
                temp[j].splice(0, 0, arr[i]);  // [[2,3,4],[2,4,3]]   | [[3,2,4], [3,4,2]]  |  [[4,2,3],[4,3,2]]
            }
            result = result.concat(temp); // [[2,3,4],[2,4,3]]
        }
        return result;
    }
    function getArrNew(arr, index) {
        const arrNew = [...arr];
        arrNew.splice(index, 1);
        return arrNew;
    }
}

// es5 中的公有方法，公有属性，私有方法，私有属性，特权方法(可以访问私有属性和私有方法) --> 完全不知道这些东西的作用
{
    function Person(name){
        this.name = name;  // 公有属性
        this.greet =function(){} // 特权方法
    }
    Person.prototype.say=function(){}  // 公有方法

    function Student(){
        var userName = ''; // 私有属性
        function say(){ // 私有方法
            log(userName);
        }
        this.greet = function(){ // 特权方法
            return userName;
        }
    }
}









