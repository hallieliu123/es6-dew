const { log } = console;

// 1. class 的继承，子类必须去调用super()，否则会报错。因为super()是去调用父类的构造函数。ES5生成实例时是先创建子类的this，然后将父类的方法属性绑定
//    到子类的this上。ES6是类是先调用super创建父类this,然后子类的构造函数再加工改造父类的this。
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


// 3. super关键字，两种用法：1为函数：去调用父类构造函数  2为对象：当调用父类静态方法是指向父类，当调用父类方法或属性是指向父类原型对象；
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
            for(let key of Reflect.ownKeys(m)){ // *** Reflect.ownKeys() 返回对象/类所有自身属性属性(包括不可枚举属性)，数组
                if( key != 'constructor' && key != 'name' && key != 'prototype' ){
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


