let { log } = console;

// 博学之，审问之，慎思之，明辨之，笃行之。 - 《礼记·中庸》 

// let
// 1. 没有变量声明提升（ ** 导致出现了暂时性死区 -- 即在未用let声明变量之前，该变量是不可用的，否则报错 ）
// 2. 一旦声明，变量即绑定该作用域，不受外层作用域影响
    {
        let a = 123;
        {
            // log( a );
            // let a = 456;
        }
    }
// 3. 使用let声明变量，不允许重复声明,否则会报错
    {
        // var b = 1;
        // var b = 2;
        // let a = 1;
        // let a = 2;
    }
// 4. let声明的变量存在块级作用域 - 利用这个特性可以取代原先用闭包模拟块儿级作用域的做法
    {
        let els = document.getElementsByClassName('products'); // 得到一个类数组,具有lenth属性，只可用for循环遍历
            // els = Array.from(els); // 转化为真正的函数
        for(var i=0;i<els.length;i++){
            // els[i].onclick=((i)=>(evt)=>{
            //     alert(evt);
            //     alert(i);
            // })(i);
        }
        for(let i=0;i<els.length;i++){
        //     els[i].onclick = function(){
        //         alert(i);
        //     }
        }
    }
// note: for循环中，小括号内相当于父作用域，大括号内是一个子作用域。

//const
// 1. const声明的变量是一个只读的常量，必须声明时就赋值，否则报错。所谓只读，无非只是保证变量指向的内存地址不可变；其余特性与let一致；
    {
        // const a; // 报错

        // const obj = {}; 
        // obj = {};    // 报错
    }
// Object.freeze()方法，来封装一个真正的能使对象不可变的方法
    {
        // {a:{b:{c:'1'}},d:[{e:'2'}]}
        // [{a:{b:[{c:'1'}]}},{}]
        function constantize(obj){
            Object.freeze(obj);
            for(let key in obj){ 
                if( typeof obj[key] == 'object'){
                    constantize(obj[key])
                }
            }
        }
    }


// 对数组循环的总结
    {
        let arr = ['a','b','c'];
        for(let item of arr){  // 可用 break & continue 
            // if(item == 'b'){
            //     break;
            //     continue;
            // }
            // log(item);
        }

        for(let i in arr){  // 可用 break & continue
        //     if(arr[i] == 'b'){
                // break;
        //         continue;
        //     }
        //     log(arr[i]);
        }

        for(let i=0;i<arr.length;i++){ // 可用 break & continue
            
        }
    }

// 注意for...in...迭代 自身可枚举属性 + 继承属性(es5中除从原生构造函数外继承的属性外，其他皆可获取。es6中,
// 从父类继承的父类自身属性与子类合并在一起成为子类自身的属性了，不可遍历es6类创建对象上原型上的属性。）

// typeof 检测 number / string / boolean / undefined / object