
    const { log } = console; 

// 1. 扩展运算符 ..., 展开数组转, 或者说是将数组转化为一个用逗号分隔的参数序列
    {  
        function foo( x, y, z ){} 
        let a1 = [ 1, 2, 3 ];
        foo( ...a1 );

        // 代替 apply
        const { max } = Math;
        max.apply( null, ...[ 1,2,3 ] ); 
        max(...a1); 

        let a2 = [1,2,3],
            a3 = [4,5,6];
        Array.prototype.push.apply(a2,a3);
        // a2
        // 等同于
        a2.push(...a3);

        // 合并数组
        a1.concat( a2,a3 );
        // 等同于
        [ ...a1,...a2,...a3 ]

        // 与解构赋值结合使用
        const [head,...tail] = [1,2,3,4,5,6];

        // 字符串转化为数组
        [ ...'helloworld' ]

        // 类数组转化为真数组,任何实现iterator接口的对象都可以使用...转化为真正的数组(见第15章)

        // 遍历 set,map,generator

    }
// 2. Array.from(); 将类数组的对象(不仅包括nodeList,arguments这类，实际只要有length属性的对象就可以)和有遍历接口(iterator)的对象转化为数组;
    {
        let a1 = {
            '0':'a',
            '1':'b',
            '2':'c',
            length: 3
        };
        Array.prototype.slice.call(a1);   
        // 等同于
        Array.from(a1);

        Array.from('hellowrold',(item,index)=> `${ index }-${item}-6`); // array.from()的第二个参数类似于数组的map方法，用来对每个元素进行处理,将处理后的值放入返回的数组
    
        let s = new Set([1,2,3]);
        Array.from(s); // [1,2,3]

        Array.from('helloworld'); // ['h', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd']
    }
// 3.Array.of()  将一组值转为数组,没有值传入就返回空数组
    Array.of(3)      // [3]
    Array.of(3,4,5) // [3,4,5]

    new Array(3) // 元素为空的长度为3的数组
    new Array(3,4,5) // [3,4,5]

// 4.find(),findIndex(),fill(),enties(),keys(),values(),includes(),空位处理
// find(),findIndex() 有查到符合条件第一个成员不再继续遍历的特性
// arr.enties(),arr.keys(),arr.values() 返回遍历器对象，可用for...of去遍历
    {
        let a1 = [1,2,3,4,5];
        let value1 = a1.find( ( item,index )=>{ log('find value-->',index,item); return item > 2 } )
        log( 'value1--->',value1 );
        
        let index1 = a1.findIndex( ( item,index )=>{ log('find value-->',index,item); return item > 2 } )
        log( 'index1--->',index1 );

        Array(5).fill(8); // [8,8,8,8,8] 初始化空数组很方便，['a','b'].fill(6)返回[6,6] 如果有值则会把原来的值覆盖

        a1.entries();

        a1.includes(1);

    }
{
    // indexOf() 不能查到数组中的NaN元素, 它内部严格使用的是===判断
    [NaN].indexOf(NaN); // -1
    [NaN].includes(NaN); // true
}
