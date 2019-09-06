
    const { log } = console; 

// 1. 扩展运算符 ...
    {
        function foo( x, y, z ){}
        let a1 = [ 1, 2, 3 ];
        foo( ...a1 );

        const { max } = Math;
        max.apply( null, [ 1,2,3 ] );

        let a2 = [1,2,3],
            a3 = [4,5,6];
        Array.prototype.push.apply(a2,a3);
        // a2
        // 等同于
        a2.push(...a3);

        a1.concat( a2,a3 );
        // 等同于
        [ ...a1,...a2,...a3 ]

        const [head,...tail] = [1,2,3,4,5,6];

        [ ...'helloworld' ]

        // 类数组转化为真数组

        // 遍历 set,map,generator
    }
// 2. Array.from()
    {
        let a1 = {
            '0':'a',
            '1':'b',
            '2':'c',
            length: 3
        };
        Array.prototype.slice.call(a1)
        // 等同于
        Array.from(a1);

        Array.from('hellowrold',(item,index)=> `${ index }-${item}-6` )
    }
// 3.Array.of()

// 4.find(),findIndex(),fill(),enties(),keys(),values(),includes(),空位处理
    {
        let a1 = [1,2,3,4,5];
        let value1 = a1.find( ( item,index )=>{ log('find value-->',index,item); return item > 2 } )
        log( 'value1--->',value1 );
        
        let index1 = a1.findIndex( ( item,index )=>{ log('find value-->',index,item); return item > 2 } )
        log( 'index1--->',index1 );

        Array(5).fill(8);

        a1.entries();

        a1.includes(1);

    }



