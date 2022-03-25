
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

        // log( Object.is(+0,-0) ); // false
        // log( Object.is(NaN,NaN)); // true

        // Object.is() ES5 部署实现
        Object.defineProperty(Object, 'is', {
            value: function(x, y) {
                if(x === y) {
                    // +0, -0 不相等情况
                    // +0, 0 是相等的
                    // +0, -0 都和 0 相等
                    return x !== 0 || 1/x === 1/y;
                }
                // NaN 情况
                return x !== x && y !== y; 
            }
        });
    }
// 3.Object.assign(target, source1, source2); 将source对象复制入target,返回target;
// a.1个参数和多个参数的情况
// b.null和undefined在第一个参数会报错的，其余位置直接跳过不报错
// c.只能复制自身可枚举属性(不能复制继承属性和不可枚举属性)
// d.是浅拷贝,只能复制第一层
// e.传入数组会当成对象处理
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
        // 如果需要将继承属性一起复制需要:
        function c( origin ){
            let oProperties = Object.getPrototypeOf( origin );
            return Object.assign( Object.create( oProperties ),origin );
        }

        // 深拷贝 对象 / 数组 { a: { m: 'node' },b: { n: 'koa' } } / [{ a: { m: 'node' },b: { n: 'koa' },{}]
        // JSON.parse(JSON.Stringify(obj)); 会导致 obj 内的 value值是undefined或function的键值对丢失
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
// 4.可枚举属性, 数据属性包括 configurable,writable,value,enumerable

        // for ... in ... 自身可枚举属性 + 继承属性
        // Object.keys() 返回一个 包含自身可枚举属性 的数组
        // Object.getOwnPropertyNames() 返回一个包含 自身属性 + 自身不可枚举属性 的数组
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
// 6. Object.setPrototypeof(obj, newProto)覆盖原来的__proto__,Object.getPrototypeOf(obj),
// Object.create(originProto); 新建一个对象将参数对象作为这个对象的prototype(__proto__);
// 7. Object.getOwnPropertyDescriptor(obj,'key') // 获取对象中某个属性的描述对象
// 8. 对象的扩展运算符
    {   // 1解构赋值,解构赋值是浅复制
        let {a,...b} = {a:'1',b:'2',c:'c'};
        const obj1 = Object.create({x:1,y:2});
        obj1.z = 3;
        // const { x, ...{y,z} } = obj1; // 解构赋值可以取到prototype上的属性
        // log('x,y,z-->',x,y,z);  //1,undefined,3 扩展运算符只能复制对象自身属性，所以取不到y值

        const obj = {a: 1, b: {c: 2}, d: {e: 3}};
        const {a, ...temp} = obj;
        log(temp); // {b: {c: 2}, d: {e: 3}}
        temp.b = 4;
        temp.d.e = 5;
        log(temp);// {a: 1, b: 4, d: {e: 5}}
        log(obj); // {a: 1, b: {c: 2}, d: {e: 5}}

        // 2取出参数对象的所有可遍历属性
        let obj2 = {a:'1',b:'2',c:'c'};
        let obj3 = { ...obj2 };
    }

// 9.null传导运算符
 {
     // 如果要读取message.body.user.firstName:
    const firstName = message && message.body && message.body.user && message.body.user.firstName;
    // 使用null传导运算符就可以
    const firstNameTemp = message?.body?.user?.firstName; // message? 是null或undefined就直接返回 undefined
 }
 
