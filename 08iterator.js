const { log } = console;

// 1.原生已部署Symbol.iterator属性的数据结构: array,arrayLike,string,set,map; 调用Symbol.iterator就可以返回遍历器对象
    
// 2.iterator接口实际应用
    {
        // 解构赋值
        let s1 = new Set().add(1).add(2).add(3);
        let [x,y,z] = s1;
        log('x,y,z',x,y,z);
        let [a,...b] = s1;
        log('a,b',a,b);

        //yeild* + 可遍历结构，会自动调用iterator接口
        function* generator(){
            yield 1;
            yield* [2,3,4]; 
            yield 5;
        }
        let g = generator();
        log(g.next());
        log(g.next());
        log(g.next());
        log(g.next());
        log(g.next());
    }
// 3. 使用generator包装对象，用于使用for..of..遍历    
    {
        function* iterateObj(obj){
            for(let key of Object.keys(obj)){
                yield [key,obj[key]]
            }
        }
        let obj = {'name':'Miya','title':'princess','age':'15'};
        for(let item of iterateObj(obj)){
            log('[key,value]',item);
        }
    }
// 4. 模拟 iterator 接口
    {
        let arr = ['a','b','c'];
        function it( arr ){
            let index = -1;
            return {
                next:function(){
                    index ++;
                    return (index <= arr.length) ? { value:arr[index],done: false } : { value:undefined,done:true }
                }
            }
        }
        let i = it(arr);
        log(i.next());
        log(i.next());
        log(i.next());
        log(i.next());
    }
// 解构赋值，for..of,...扩展运算符这些内部都是自动调用iterator接口 
// 数组遍历会调用iterator接口，所以在接收数组为参数的场合都调用了遍历器（iterator）接口: Array.from();Promise.all(),Promise.race(),Set([]),Map();