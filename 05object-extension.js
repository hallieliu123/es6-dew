
const { log } = console;

// 1. 对象属性名和方法的简洁写法   
    {
        let a1 = 'a1';
        let obj1 = {
            a1,
            test(){
                log('test1...');
            }
        }
        obj1.test();

        let obj2 = { // 取值器 / 赋值器 
            x: 10,
            get y(){
                return this.x;
            },
            set y( value ){
                if( value > this.x ) this.x = value;
            }
        }
        // log('y--->',obj2.y);
        // obj2.y = 6;
        // log('y--->',obj2.y);
        // obj2.y = 11;
        // log('y--->',obj2.y);
        // log('x--->',obj2.x);
    }
// 2.Object.is(); // 除了以下两个地方，其余与 === 特性相同
    {
        // log('+0 === -0',+0 === -0);  // true
        // log('NaN === NaN',NaN === NaN); // false

        // log( Object.is(+0,-0) );
        // log( Object.is(NaN,NaN));
    }
// 3.Object.assign();
    {
        class A{
            constructor(x,y){
                Object.assign(this,{x,y});
            }
        }
        let obj1 = {};
        Object.assign(obj1,{
            test(){
                console.log('test2...')
            }
        })
        
        function c( origin ){
            let oProperties = Object.getPrototypeOf( obj1 );
            return Object.assign( Object.create( oProperties ),origin );
        }

        // 深拷贝 对象 / 数组 { a: { m: 'node' },b: { n: 'koa' } } / [{ a: { m: 'node' },b: { n: 'koa' },{}]
        function deepClone( obj ){
            let objNew = obj.constructor();
            for(let key in obj){
                if(typeof obj[key] === 'object'){
                    objNew[key] = deepClone(obj[key]);
                }else{
                    objNew[key] = obj[key];
                }
            }
            return objNew;
         }
// 4.可枚举属性 configurable,writable,value,enumerable

        // for ... in ... 自身可枚举属性 + 继承属性
        // Object.keys() 自身可枚举属性
        // Object.getOwnPropertyNames() 自身属性 + 自身不可枚举属性  
    }
// 5. Object.keys(),Object.values(),Object.entries()
    {
        const { keys,values,entries } = Object;
        let obj1 = {
            a: 'Simon',
            b: 'Blue',
            c: 'Nick'
        };
        log(keys( obj1 ));
        for( let key of keys( obj1 ) ){
            log('key1--->',key);
        }
        log(values( obj1 ));
        for( let value of values( obj1 ) ){
            log('value1--->',value);
        }
        log(entries( obj1 ));
        for( let [key2,value2] of entries( obj1 ) ){
            log('key2,value2--->',key2,value2);
        }
    }
// 6. Object.setPrototypeof()覆盖原来的__proto__,Object.getPrototypeOf(),Object.create()
// 7. Object.getOwnPropertyDescriptors(obj,'key') // 获取某个对象中某个属性的描述对象
// 8. 对象的扩展运算符
    {   // 1解构赋值
        let {a,...b} = {a:'1',b:'2',c:'c'};
        const obj1 = Object.create({x:1,y:2});
        obj1.z = 3;
        // const { x, ...{y,z} } = obj1;
        // log('x,y,z-->',x,y,z);  // 扩展运算符用于解构只能复制对象自身属性，所以不行
        // 2取出参数对象的所有可遍历属性
        let obj2 = {a:'1',b:'2',c:'c'};
        let obj3 = { ...obj2 };
    }


