const { log } = console;

// 1.generator（ 生成器 ）函数就是一个遍历对象生成器。（ 也可以说是一个状态机，内部封装了多个状态. ）
    // 直接调用generator函数，它并不会执行.
    {
        function* g(){
            log('1');
            yield 'a';
            log('2');
            yield 'b';
            log('3');
            return 'c';
        }
        let it = g(); // g内部代码不会执行
        // log('generator--->',it);
        // log( it.next() );
        // log( it.next() );
        // log( it.next() );
        // log( it.next() );
    }
// 2.generator生成器内部yield是暂停标志；
    {
        function* g(){
            log('blablabla~');
        }
        let it = g(); // 内部代码不会执行
        it.next();
    }
// 3.为对象部署一个遍历接口 
    {
        // { value: value, done: false}
        let obj1 = {
            a: '1',
            b: '2',
            c: '3',
            * [Symbol.iterator](){
                let keys = Object.keys(obj1);
                for( let i=0;i<keys.length;i++ ){
                    if(typeof obj1[keys[i]] != 'function'){
                        yield obj1[keys[i]]
                    }
                }  
            }
        };
        // for(let value of obj1 ){  // 自动调用Symbol.iterator方法
        //     log('value--->',value);
        // }
        let it = obj1[Symbol.iterator]();
        // log('obj1---->',[...obj1]);
        // log('obj1--->',it.next());
        // log('obj1--->',it.next());
        // log('obj1--->',it.next());
        // log('obj1--->',it.next());

        function* g(){
            log('abc');
        }
        let i = g();
        // log( i.next() ); // 没有yield 和 return 语句自动返回 { value: undefined, done: true }
    }
// 4. next() 传参,只有一个参数，被当作上次yield语句的返回值
    {
        function* g(){
            log('to start');
            log(`1->${ yield }`);
            log('continue');
            log(`2->${ yield }`);
            return 'finished'
        }
        let it = g();
        it.next(); // to start
        // it.next('a');// 1->a , continue
        // it.next('b');// 2->b { value: 'finished',done: true}
        // it.next();   
    }

// 5. for...of...; 注意点：不会遍历生成器最后的return语句；
    {
        // 计算斐波那契数列
        function* g1(){
            let [prev,cur] = [0,1];
           for(;;){
                [prev,cur]=[cur,prev+cur];
                yield cur;
           }
        }
        let it = g1();
        // log('ffffff--->',it.next());
        // log(it.next());
        // log(it.next());
        // log(it.next());
        // log(it.next());
        for(let item of g1()){
            if( item > 100 ) break;
            // log('item--->',item);
        }
        // 再为对象部署一次遍历接口
        let obj1 = {a: '1',b: '2',c: '3'};
        function* g2(){
            let keys = Object.keys(this);
            for(let key of keys ){
                yield [key,this[key]];
            }
        }
        Object.setPrototypeOf(obj1,{ [Symbol.iterator]: g2 });
        let it2 = obj1[Symbol.iterator]();
        // log('it2--->',it2.next());
        // log('it2--->',...obj1); // 会去自动调用遍历对象生成器函数
        // for...of 当然也能遍历了
    }
// 6. generator（生成器）的return方法： return('param作为next()返回value的值')；try{ }finally{ }
    {
        function* g1(){
            yield 1;
            yield 2;
            yield 3;
            yield 4;
        }
        let it1 = g1();
        // log( 'it1------->',it1.next() );
        // log( 'it1------->',it1.return('b') );
        // log( 'it1------->',it1.next() );

        function* g2(){
            try{
                yield 1;
                yield 2;
            }finally{
                yield 3;
                yield 4;
            }
            yield 5;
        }
        let it2 = g2();
        // log( 'it2------->',it2.next() ); // 1
        // log( 'it2------->',it2.return('b') ); // 3
        // log( 'it2------->',it2.next() ); // 4
        // log( 'it2------->',it2.next() ); // b
        // log( 'it2------->',it2.next() ); // undefined
    }
// 7. yield* 遍历有iterator接口的对象 (包括字符串)
    {
        function* g1(){
            yield 1;
            yield 2;
            return 'g1 finished';
        }
        function* g2(){
            let res = yield* g1(); // g1 return出的值赋值给res
            // log('res-->',res);
            yield 3;
        }
        let  it1 = g2();
        // log('yield*------------->');
        // log(it1.next());
        // log(it1.next());
        // log(it1.next());

        // 遍历数组 ['a',['b','c'],['d',['e','f','g']]]; 
        function* g3(arr){
            for( let item of arr ){
                if(Array.isArray(item)){
                    yield* g3(item)
                }else{
                    yield item
                }
            }
        }
        let a1 = ['a',['b','c'],['d',['e','f','g']]];
        for(let item of g3(a1)){
            // log('item----->',item);
        }

        // 遍历二叉树
        let tree = {
            left:{
                left:{
                    left:null,
                    lable:'a',
                    right:null
                },
                lable:'b',
                right:{
                    left:null,
                    lable:'c',
                    right:null
                },
            },
            lable:'d',
            right:{}
        }

        let a2 = [[['a'],'b',['c']],'d',[['e'],'f',['g']]];
        class Tree{
            constructor(left,label,right){
                Object.assign(this,{left,label,right}); // 只复制自身属性
            }
        }
        function makeTree(arr){
            if( arr.length == 1 ) return new Tree(null,arr[0],null);
            return new Tree(makeTree(arr[0]),arr[1],makeTree(arr[2]));
        }
        function* g4(t){
            if(t){
                yield* g4(t.left);
                yield t.label;
                yield* g4(t.right);
            }
        }
        for(let item of g4(makeTree(a2))){
            // log(item);
        }
    }
// 8. 协程：一个函数（或线程）执行到一半，可以暂停执行，把执行权交给另一个函数（或线程），当恢复执行权后可以继续执行，这种可以
//         并行执行，交换执行权的函数（或线程）就叫做协程。
//    generator生成器，实际只是实现了半协程，因为它只能由调用generator函数的对象才能将执行权还给generator函数，全协程则是
//    任何函数都可以让暂停的协程继续执行。

// 9. 异步操作的同步化表达
    {
        // 1.使用generator封装异步请求  2.生成生成器，发起请求，异步->交出执行权  3.执行另外的函数。 4.恢复执行权，继续执行。
        function request(url){
            setTimeout(()=>{
                // log('setTimeout');
                it.next(JSON.stringify({name:'Simon'}));
            },0)
        }
        function* g(){
            let res = yield request('url');
            let result = JSON.parse(res);
            // log('result--->',result);
        } 
        let it = g();
            it.next();
            // log('last');
        
        // 用generator管理控制流，避免回调地狱或大量冗余promise代码。所有task必须是同步。
        {   // 第一个yield返回值作为第二个方法的参数，依次执行每个函数；
            function step1(value){
                return ++value;
            }
            function step2(value){
                return ++value;
            }
            function step3(value){
                return ++value;
            }
            function step4(value){
                return ++value;
            }
            function* g(value){
                let value1 = yield step1(value);
                log('value1--->',value1);
                let value2 = yield step2(value1);
                log('value2--->',value2);
                let value3 = yield step3(value2);
                log('value3--->',value3);
                yield step4(value3);
            }
            function scheduler(it){
               let res = it.next(it.value);
               if(!res.done){
                    it.value = res.value;
                    scheduler(it);
               }
            }
            scheduler(g(1));
        }
    }

// 进程和线程
//  进程是资源（比如CPU、内存等）分配的基本单位，是程序执行时的一个实例。
//   程序运行时系统就会创建一个进程，并为它分配资源，然后把该进程放入进程就绪队列，然后执行。

//  线程是程序执行时的最小单位，它是进程的一个执行流，是CPU调度和分派的基本单位，一个进程可以由很多个线程组成，线程间共享进程的所有资源。

// 区别：1.进程是资源分配的最小单位，线程是程序执行的最小单位。2.一个进程可以有多个线程，每个进程有自己独立的内存空间，线程之间共享内存空间。



