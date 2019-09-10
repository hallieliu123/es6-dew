
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

        let obj2 = {
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
// 2.Object.is();
    {
        // log('+0 === -0',+0 === -0);
        // log('NaN === NaN',NaN === NaN);

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
            let objNew = new obj.constructor();
            for( let key in obj ){
                if( typeof obj === 'object' ){
                    objNew[key] = deepClone(obj[key]);
                }
                objNew[key] = obj[key];
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
// 7. Object.getOwnPropertyDescriptors()
// 8. 对象的扩展运算符
    {   
        const obj1 = Object.create({x:1,y:2});
        obj1.z = 3;
        // const { x, ...{y,z} } = obj1;
        // log('x,y,z-->',x,y,z);
    }


