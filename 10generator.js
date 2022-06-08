const { log } = console;
// 1. generator（生成器）处理异步任务，内部封装多个异步任务，每步异步操作用yield注明就可以了。

// 2. generator暂停和恢复执行，体内外的数据交换，错误处理机制，这些特性使得其拥有异步编程的完成解决方案
    {
        function* g(){
            try{
                let res = yield 1;
                yield `${ res } no no`;
            }catch(err){
                log('err--->',err);
            }
           
        }
        let it1 = g();
        log(it1.next());
        log(it1.next('bla~'));
        it1.throw('fail'); // 忽然领悟了体外错误，体内抛出的意义。
    }

// 3. thunk函数--> javascript中的thunk函数是将一个多参函数，改写为一个只接收callback函数的单参函数。
//    可以实现自动执行generator生成器函数, 即当异步操作有了结果自动交出执行权。
//    使用thunk处理生成器，本质还是在回调函数里面处理数据.
    {
        // 模拟thunk函数
        {
            function thunk(fn1){
                return function(...rest){
                    return function(fn2){
                        return fn1.apply(null,[...rest,fn2]);
                    }
                }
            }
            function myLog(a,b,c){
                return c(a,b);
            }
            let ft = thunk(myLog);
            ft(1,2)(log);
        }
        
        // thunk源码练习  --- 思考: 内存占用很大，每层函数内存都不能完全释放
        {
            function thunkify(fn1){
                return function(...rest){
                    return function(fn2){
                        let called; // 防止多次调用 ---> 妙哉 ！
                        rest.push(function(...rest2){
                            if( called ) return
                            fn2.apply(null,rest2); 
                            called = true;
                        })
                        return fn1.apply(null,rest);
                    }
                }
            }
            function f(a,b,callback){
                let sum = a + b;
                callback(`thunkify--->${ sum }`);
                callback(`thunkify--->${ sum }`);
            }
            let ft = thunkify(f);
            ft(10,20)(log);
        }

        // 使用thunk函数自动执行generator生成器 --> 前提，yield 后面必须是thunk函数  
        {   
            // let fs = require('fs');
            // let ft = thunkify(fs.readFile); 
            function* g(){
                let res1 = yield ft('url1');
                // 处理 res1
                let res2 = yield ft('url2');
                 // 处理 res2
                let res3 = yield ft('url3');
                //  // 处理 res3
            }
            function run(g){  
                let it = g();  
                function next(err,data){
                    // 处理错误 / 数据
                    let result = it.next(data);
                    if( result.done ) return;
                    result.value(next);
                }
                next();
            }
            // run(g);
        }
    }
// 4. co模块也可以实现自动执行generator生成器函数, 即当异步操作有了结果自动交出执行权。
//    co模块接收 generator生成器函数,yield后必须是promise对象或者thunk函数，返回promise对象
//    co模块支持处理并发的异步操作
//    此处源码不写了，有时间可以研究下
      {
        // let co = require('co');
        function* g(){
            // ...
            let re1 = yield Promise;
            let re2 = yield Promise;
            let re3 = yield Promise;
        }
        // co(g).then(()=>{ console.log('generator函数执行成功了。。。') });

        //可处理并发操作
        // co(function*(){
        //     let res = yield [
        //         Promise.resolve(1),
        //         Promise.resolve(2),
        //     ];
        //     log('res--->',res);
        // })
        //     .then(()=>{

        //     })
        //     .catch(()=>{

        //     })
      }






      