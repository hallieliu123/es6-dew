const { log } = console;
// async 其实是生成器generator的语法糖
// 1. async 函数内的 await 后面跟 promise对象，也可以是原始类型值(但会被转成一个立即resolve的promise对象。这时是同步操作 );
// 2. async 函数执行时一旦遇到 await 就先返回，先执行其他函数。async 函数返回一个promise对象。.then(()=>{});

    // 简单使用测试
    {
        function request(value){
            return new Promise((res,rej)=>{
                setTimeout(()=>{
                    if(value<100){
                        return res(value);
                    }
                    rej('出错了');
                },1000)
            })
        }
        async function handle(){
            log('1');
            // try{
                let res1 = await request(10);
                log('res1--->',res1);
                let res2 = await request(20);
                log('res2--->',res2);
                let res3 = await request(200);
                log('res3--->',res3);
                return res3
            // }catch(error){
                // log('error--->',error);
                // return error;
            // }
        }
        // handle()
        //     .then((data)=>{
        //         log('check--->',data);
        //     })
        //     .catch((err)=>{
        //         log('err--->',err)
        //     })
        // log('2');
    }

// 3. 写法
    {
        // 函数声明式
        // async function fn(){};
        // 函数表达式
        // const fn = async function(){}
        //对象
        let obj = {
            async fn(){

            }
        };
        //类
        class A{
            constructor(){

            }
            async fn(){

            }
        }
        //箭头函数
        const fn = async () => {}
    }
// 4. async函数返回值promise的状态变化, 碰到错误/return 语句就返回，错误可以被catch捕获
    {
        // 报错可以被catch捕获，但是阻止了后面代码执行
        async function f(){
            let r1 = await 1;
            // log('r1--------->',r1); // resolve的结果
            let r2 = await r1;
            abc
            return await r2;
        }
        f()
            .then(data=>{
                log('data',data)
            })
            .catch(err=>{
                // log('err--->',err);
            });

        // promise 状态变为rejected会被catch方法捕获，但是也会阻止后面代码执行
        async function f1(){
            let r1 = await Promise.reject('aiyou,chu cuo le!');
            // log('r1--->',r1);
            let r2 = await 10;
            return r2;
        }
        f1()
            .then(data=>{
                log( data )
            })
            .catch(err=>{
                // log('err------------->',err)
            })
        // 综上，如果想继续执行下面的代码，可以将可能出错的那部分代码用try{}catch(err){}包裹，以防阻塞后续代码执行

// 5. 错误处理的两种方式，try{}catch(err){}, .catch((err)=>{});4中已有例子

// 6. 并发执行 VS 继发执行
        {
            // 并发执行  
            {
                function request(value){
                    return new Promise((res,rej)=>{
                        setTimeout(()=>{
                            if(value<100){
                                return res(value);
                            }
                            rej('出错了');
                        },1000)
                    })
                }
                let dp = ['10','20','30'];
                // 1
                async function f1(){
                    let p1 = request('10');
                    let p2 = request('20');
                    let p3 = request('30');
                    let [v1,v2,v3] = await Promise.all([p1,p2,p3]); // 这样解构赋值厉害了！！！
                    log('v1，v2，v3--->',v1,v2,v3);
                }
                // f1();
                // 2
                async function f2(){
                    let p1 = request('10');
                    let p2 = request('20');
                    let pp1 = await p1;
                    let pp2 = await p2;
                    return [pp1,pp2];
                }
            // f2().then(data=>{ log(data) });
               // 3.
               async function f3(){
                   let promises = dp.map(item=>request(item));
                   log('promises',promises);
                   let results = [];
                   for(let p of promises){
                        let response = await p;
                        results.push(response);
                        log('response--->',response);  // 一起打印出来的，并发成功
                   }
                   return results
               }
               f3().then(data=>{ 
                //    log('f3--data--->',data);
                 });
               // 4.
               async function f4(){
                    let promises = dp.map(item=>request(item));
                    log('promises',promises);
                    return await Promise.all(promises);
                }
                f4()
                    .then(data=>{
                        // log('f4-data',data);
                    })
            }
            // 继发执行 --> 一半不会这样去做，要等到上面的请求返回才去做下次请求，太耗时，并且有一个挂掉就全挂了
            {   
                function request(value){
                    return new Promise((res,rej)=>{
                        setTimeout(()=>{
                            if(value<100){
                                return res(value);
                            }
                            rej('出错了');
                        },1000)
                    })
                }
                let dp = ['10','20','30'];
                async function f(){
                    for(let url of dp){  
                        let response = await request(url); // 坚持自己，就算全世界都不理解你，不必解释。用结果碾压他们。
                        log( response ); // response是resovle的结果
                    }
                }
                // f()
            }
        }
// 7. await 后面可以是promise对象，也可以是原始类型的值（这时是同步操作，但是会被转化为立即resolve的promise对象。await ... 返回的是resolve或者reject的结果，并非promise对象）

// 8. 知道一下async函数的实现原理：它是generator和自动执行器封装成的一个函数。

// 9. 了解内容：异步遍历器接口，它调用next()方法后返回的是promise对象，把原来的{value:'',done:false}作为then方法的参数传入；
//    它被部署在对象的Synbol.asyncIterator属性上了。

// 10. for await ...of...用来遍历异步/同步的遍历器对象

// 11. 了解内容：异步generator函数
        {
            async function* asyncG(){
                yield 1;
                yield 2;
                yield 3;
            }
            // for await(let item of asyncG()){
            //     log('item--->',item);
            // }
            let it = asyncG();
            it.next()
                .then(data=>{
                    log('asyncG-1->',data);
                    return it.next();
                })
                .then(data=>{ 
                    log('asyncG-2->',data);
                });
        };
}