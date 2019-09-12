const { log } = console;

// 1. es6中的类其实是es5中构造函数的语法糖. 
//    基本使用对比， 类不可以直接调用；类的原型属性不可枚举；
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
        log('p1---->',p1);
        // p1.say();
        // p2.say();
        // log(p1);
        // log(p2);
        // log('Person1.prototype--->',Person1.prototype);
        // log('Person2.prototype--->',Person2.prototype);
        log(Object.keys(Person1.prototype));  // 可枚举
        log(Object.keys(Person2.prototype));  // 不可枚举
        // Person2('Blue','17');  // 不可直接调用类
        // 复习
        // for...in  可遍历：可枚举 + 继承属性
        // Object.keys() 可遍历：可枚举属性
        // Object.getOwnPropertyNames() 可遍历：不可枚举属性 + 可枚举属性 

    }
// 2. 类内不加constructor，它会自动生成;
    {
        class Person{}
        log('Person.prototype-->',Person.prototype);
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
        log('str--->',str.charCodeAt(0));
        log('str--->',String.fromCharCode(20320)); // 直接被构造函数自己调用的方法就是静态方法
        let p1 = new Person('Simon','17');
        // p1.isPerson(p1);
       log( 'Person.isPerson(p1)-->',Person.isPerson(p1) );
    //    log('p1.country',p1.country);
       log('Person.country--->',Person.country);

       class Engineer extends Person{
           constructor(name,age,salary){ // 整个constructor不写，可以不写super，创建对象时默认自己回去调用constructor和传值；
                super(name,age);         // 写了constructor就必须写super,super就是手动去调用父类的constructor构造函数
                this.salary = salary;
           }
           say(){
                log('blablabla~~~');
           }
       }
       let e1 = new Engineer('Nick','17','20000');
       e1.say();
       log('e1--->',e1);
    }

// 字符编码  子类修改父类方法 


