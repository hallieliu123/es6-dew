const { log } = console;

// 1. 数组解构赋值 & 指定默认值( === undefined时默认值生效)
    {
        let [[a,b,...c],d = 4,e,f ] = [[1,2,3],,5,6,7];
        log(a,b,c,d,e,f);
        
        // 玩玩而已
        let arr = ['a','b','c'];
        let {0:first,[arr.length-1]:last,length:len} = arr;
        log('first--->',first);
        log('last--->',last);
        log('len--->',len);
    }

// 2. 对象的解构赋值 & 指定默认值( === undefined时默认值生效)         // {a:a}前面是匹配模式，后面是变量
    {
        let {a,a:{c:{e,f = 0}},b} = {a:{c:{e:5},d:10},b:{}};  
        log('a->',a); 
        log('e->',e); 
        log('f->',f); 
    }
// 3. 字符串的解构赋值 & 指定默认值( === undefined时默认值生效) 
    {
        let [a,b,c,d,e = 'no'] = 'hell';
        log('a->',a);
        log('b->',b);
        log('c->',c);
        log('d->',d);
        log('e->',e);
        let { length: len } = 'hell'; // string & arr都可以这样解构length属性
        log('len-->',len)
    }
// 4. 函数参数的解构赋值 & 指定默认值( === undefined时默认值生效) -> 这个很有意思
    {
        function matchVal1({x=0,y=1}={}){
            log('matchVal1--x-y->',[x,y]);
        }
        function matchVal2({x,y}={x:0,y:1}){
            log('matchVal2--x-y->',[x,y]);
        }
        function matchVal3({x,y}){  // 
            log('matchVal3--x-y->',[x,y]);
        }
        matchVal1({x:10}); // 10 1
        matchVal2({x:10}); // 10 undefined

        matchVal1({}); // 0 1
        matchVal2({}); // undefined undefined

        matchVal1(); // 0,1
        matchVal2(); // 0,1  
        
        // matchVal3(); // 报错  - 这个才能体现出来给函数参数指定默认值的重要性
    }








// 字符串的扩展
// includes(),startsWith(),endsWith(),模版字符串
    {
        let str = 'hello';
        log(str.includes('l'));
        log(str.startsWith('he'));
        log(str.endsWith('lo'));
    }


