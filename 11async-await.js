const { log } = console;

// 1. async 函数内的 await 后面可以跟 promise对象，也可以是原始类型值(这时是同步操作);
// 2. aync 函数执行时一旦遇到 await 就先返回，先执行其他函数。async 函数返回一个promise对象。.then(()=>{})

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
            try{
                let res1 = await request(10);
                log('res1--->',res1);
                let res2 = await request(20);
                log('res2--->',res2);
                let res3 = await request(200);
                log('res3--->',res3);
                return res3
            }catch(error){
                // log('error--->',error);
                return error;
            }
        }
        handle()
            .then((data)=>{
                log('check--->',data);
            })
        log('2');
    }

// 3. 写法
    {
        // 函数声明式
        async function fn(){};
        // 函数表达式
        const fn = async function(){}
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
