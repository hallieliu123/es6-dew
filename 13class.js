const { log } = console;

// 1. class 的继承，子类必须去调用super()，否则会报错。因为super()是去调用父类的构造函数。
//    类中的this: ES5生成实例时是先创建子类的this，然后将父类的方法属性绑定到子类的this上。ES6是类是先调用super创建父类this,子类的this是继承父类的this，然后对其加工。
     {
         class A{}
         class B extends A{
            constructor(){
                this.name = 'S'; // 报错，必须先调用super.因为子类的this是继承父类的this，然后对其加工
                super();
            }
         }
        //  new B();
     }
// 2. Object.getPrototypeof()
     {
        class A{
            say(){}
        }
        class B extends A{
           constructor(){
               super();
           }
        }
        // log( Object.getPrototypeOf(B) === A ); // 子类的原型是父类
     }


// 3. super关键字，两种用法：1作为函数调用时代表父类构造函数  2调用普通方法代表父类原型对象，3调用父类静态方法是指向父类 (都是方法哈，静态属性和普通属性都无法通过super获取)
//    使用super对象调用父类方法，内部this绑定子类
     {
         class A{  // new.target 返回的是new命令所作用的构造函数
             constructor(){
                 log( new.target.name );
                 this.name = 'Simon';
             }
             static greet(){
                 log('hello');
             }
             greet(){
                 log('hi');
             }
             say(){
                 log( 'A-->',this.name );
             }
         }
         class B extends A{
             constructor(){
                 super(); 
                 this.name = 'Blue';
                //  super.age = '17'; // 这时super就是this
             }
             static greet(){
                super.greet();
            }
            greet(){
                super.greet();
            }
            say(){
                super.say();  // 实际是 A.prototype.say.call(this)
                log(this.age);
            }
         }
        // new A();
        // new B();
        // let b1 = new B();
        // b1.say();        
        // b1.greet();
        // B.greet();
     }  

// 4. 对原生构造函数的继承  
     {
         class myArray extends Array{}
     }

// 5. mixin 混入模式,将多个类的接口混入一个类
     {
         class A{ 
             static say(){}
             drink(){}
         }
         class B{   
             static greet(){ log('hello'); }
             handle(){}
             get html(){}
             set html(value){}
         }
         class C{
             static getData(){}
             manageData(){}
         }
         function copyProperties(Mix,m){
             // Reflect.ownKeys(类) 返回类本身可访问的属性：name,静态属性，静态方法，prototype, length(构造函数参数个数)
            for(let key of Reflect.ownKeys(m)){ // *** Reflect.ownKeys() 返回对象/类所有自身属性属性(包括不可枚举属性)返回数组 和 Object.getOwnPropertyNames()一致
                if(key != 'name' && key != 'prototype' && key != 'length'){
                    let desc = Object.getOwnPropertyDescriptor(m,key);
                    Object.defineProperty(Mix,key,desc);
                }
            }
        }
        function mix(...mixins){
            class Mix{}
            for(let m of mixins){
                copyProperties(Mix,m);
                copyProperties(Mix.prototype,m.prototype);
            }
            return Mix;
        }
        let Mix = mix(A,B,C);
        let m = new Mix();
        // Mix.greet()
        // log('m--->',m);
     }


// 子类继承父类时，父类的属性也是子类的属性，父类的方法是子类原型__proto__上的方法。

