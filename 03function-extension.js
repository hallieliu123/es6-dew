// 1.函数参数默认值 

// 2.解构赋值与函数参数默认值

// 区分函数参数中对  对象的解构赋值默认值 和 函数参数的默认值

function m1({ x = 0, y = 0 } = { }){
    return [ x, y ]
}



function m2( { x, y } = { x: 0, y: 0 } ){
    return [ x, y ]
}

m1();
m2();

m1({});
m2({});

m1({ x: 3, y:8 });
m2({ x: 3, y:8 });

m1({ x: 3 });
m2({ x: 3 });

// 3. 函数参数作用域   --- 一旦给函数参数指定默认值，函数初始化时函数参数部分就会形成一个单独的作用域；是{}的父作用域

{  // 以下俩例子也太变态了。完全没有实际意义么
    var x = 1;
    function foo( x, y = function(){ x = 2 }){ 
        
        var x = 3;

        y();

        console.log( x );

    }
    
    foo(); // 3
    x  // 1
    
}

{
    var x = 1;
    function foo( x, y = function(){ x = 2 } ){
        
        x = 3;

        y();

        console.log( x );

    }

    foo(); // 2
    x // 1

}

// 4.函数参数默认值是惰性求值的

    function throwIfMissing(){
        throw new Error( 'Missing Parameter!' );
    }

    function f( mustBeProvided = throwIfMissing() ){}   

    // f();

// 5.rest参数，rest参数是数组    
    function add( ...values ){     
        let sum = 0;
        for( let value of values ){
            sum += value; 
        }
        return sum;
    }
    console.log('add--->',add(1,2,3,4,5))
    function push( arr, ...items ){ 
        items.forEach( item => {
            arr.push( items )
        });
    }
// 6.箭头函数
    // ** 箭头函数内部没有this，所以它内部的this指向外层代码块中的this，并且指向定义时的this，并非执行时的this.
    // 内部没有arguments对象
    // 不能用作generator函数
    // 不能用作构造函数
    {
        function foo(){
            setTimeout(()=>{
                console.log( 'myId--->',this.myId );
            },1000)
        }
        var myId = 1;
        // foo.call({ myId: 2 }); // 2
    }
    {
        function Timer(){
            this.s1 = 0;
            this.s2 = 0;
            setInterval(()=>{
                this.s1 ++;
            },1000);
            setInterval(function(){
                this.s2 ++;
            },1000)
        }
        var myTimer = new Timer(); 
        // setTimeout(()=>{ console.log( 's1--->', myTimer.s1 )},3100); // 3    
        // setTimeout(()=>{ console.log( 's2--->', myTimer.s2 )},3100); // 0 
    }
    {
        function foo(){
            return () => {
                return () => {
                    return () => {
                        console.log( 'myId--多层次->',this.myId );
                    }
                }
            }
        }
        var f = foo.call({ myId: 1}); 
        f.call({ myId: 2 })()();  // 1 
        f().call({ myId: 3 })();  // 1
        f()().call({ myId: 4 });  // 1
    }

    // 箭头函数嵌套使用
        // 实现数组中插入一个元素
    {
        function insert(value){
            return {
                into: function(arr){
                    return {
                        after: function( afterValue ){
                            arr.splice(arr.indexOf(afterValue) + 1,0,value);
                            return arr
                        }
                    }
                }
            }
        }
        let a1 = insert(10).into([1,2]).after(1);
        console.log('a1--->',a1);
    }
    {
        const insert = ( value ) => ({ into: ( arr )=> ({ after: ( afterValue )=>{
            arr.splice( arr.indexOf(afterValue) + 1, 0, value );
            return arr;
        } }) })
        let a2 = insert( 10 ).into( [1,2] ).after(1);
        console.log('a2--->',a2);
    }
    // 管道机制部署   第一个函数的返回值是第二个函数的参数，依次类推～  -- 妙哉妙哉 ！！！
    {
        const pipeline = (...funcs) => value => funcs.reduce((prev,cur)=>{
            return cur(prev);
        },value);
        const plus = (a) => a + 1;
        const mult = (a) => a * 2;
        const result = pipeline( plus,mult )( 5 );
        console.log('result--->',result);
    }
    // 尾调用定义: 函数最后一步调用另一个函数叫做尾调用
    // 尾调用的意义: 函数调用会在内存中形成一个调用记录即‘调用帧’,保存调用位置和内部变量.如果在A函数中调用B,那么在A的调用帧
    // 上方就有一个B的调用帧,如果B函数又调用了C函数,那么B上方又有一个C的调用帧,依此类推就形成了'调用栈'.如果说在只在一个函数的
    // 最后一步调用另一个函数,并且被调用的函数内部没有使用到外部函数的变量或方法,那么这个函数的调用帧就不被保留了,也就是内部函数调用帧取代了外部函数的调用帧,
    // 这样就节省了内存。
    // 递归和尾递归: 递归非常耗费内存,因为需要同时保留很多个调用帧,容易造成栈溢出; 而尾递归只需保留一个调用帧,所以尾递归永远不会发生'栈溢出'
    
    {
        function factorial1( num ){
            if( num === 1 ) return 1;
            return num * factorial1( num - 1 ); 
        }

        function factorial2( num, total ){
            if( num === 1 ) return total;
            return factorial2( num - 1, num * total )
        }

        factorial1(5);
        console.log('factorial2(5)---->',factorial2(5,1));   
        // 对递归的优化 1 - 使用尾递归
        function tailFactorial( n , total ){
            if( n === 1 ) return total;
            return tailFactorial( n - 1 , n * total);
        }
        function factorial3( n ){
            return tailFactorial( n, 1 );
        }

        factorial3(5);

        function curring( fn, total ){
            return function( n ){
                return fn.call( this, n, total )
            }
        }
        const factorial4 = curring( tailFactorial, 1 );

        factorial4(5);

        function factorial5( n, total = 1 ){
            if( n === 1 ) return total;
            return factorial5( n - 1, n * total );
        }

        factorial5( 5 );

        console.log('factorial(5)',factorial1(5),factorial2(5,1),factorial3(5),factorial4(5),factorial5(5));
    }

    // 对递归的优化 2 - 递归改为循环
    {
        function sum(x, y) {
            if(y>0) {
                return sum.bind(this, x+1, y-1);
            } else {
                return x;
            }
        }
        function trampoline(f) {
            while(f && f instanceof Function){
                f = f();
            }
            return f;
        }
    }

// 尾调优化只在严格模式下起作用

