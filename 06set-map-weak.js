
const { log } = console;

// 1.Set 一大特征是它每一项的值都是唯一的。
// 基本使用，属性和方法; 只要有遍历接口都可以使用都可以转化成set数据结构 
    {
        let s1 = new Set([2,3,4]);
        s1.add(1).add(5).add(6);
        // for(let item of s1){   
        //     log( item );
        // }
        let result1 = s1.delete(2);  
        // log('result1--->',result1);
        let len = s1.size;
        // log('s1.length--->',len);
        let result2 = s1.has(6);
        // log('result2--->',result2);
        s1.clear();
        // log('s1--->',s1);

        const s2 = new Set();
        [1,2,3,4,5].forEach(item=>s2.add(item));
        log(s2); //{1, 2, 3, 4, 5}
        // 转化为数组
        log([...s2]);
        log(Array.from(s2));
    }
// 2.遍历 Set, keys() = values() set数据只有键值没有键名所以keys()和values()返回的都是value的遍历器对象,entries() = [keys(),values()]; 返回的都是遍历器对象
// forEach();使用回调函数遍历每个成员
// for...of... 可直接遍历set
// 交/并/差 集  
    {
        let s1 = new Set(['a','b','c']);
        let keys = s1.keys();
        // log('s1.keys--->',s1.keys());
        // log(keys.next());
        // log(keys.next());
        // log(keys.next());
        // log(keys.next());
        for(let item of s1.keys()){
            // log('s1.keys-->',item);
        }
        for(let item of s1.values()){
            // log('s1.values-->',item);
        }
        for(let [key,value] of s1.entries()){
            // log('s1.keys-->',[key,value]);
        }
        s1.forEach((item,index,s)=>{
            // log(item,index,s);
        })

        for(let item of s1) {
            log(item); // a,b,c
        }

            // 交/并/差集
        let a1 = [0,1,2,3,4];
        let a2 = [3,4,5,6,7];
        
        let intersect = a1.filter( item => a2.includes(item) ); 
        // log('intersect--->',intersect);

        let union = [...new Set([...a1,...a2])];
        // log('union--->',union);

        let difference = a1.filter( item => !a2.includes(item) );
        // log('difference--->',difference); 
    }
// 3. map 类似于对象也是键值对的集合,但键不像对象一样仅限于字符串,各种类型的值包括对象都可以当作键.也就是说object解构提供了‘字符串-值’的对应,map提供了‘值-值’的对应.
// 基本使用，键可以是 *对象 / 数组 / set / map
    {
        const m = new Map();
        const o = {p: 'hello'};
        m.set(o, 'content'); // {Object => "content"}
        m.has(o); // true
        m.get(o); // 'content'
        m.size; // 1
        m.delete(o); // true
        m.clear();

        const m1 = new Map([ // 不仅仅是数组，实际任何有iterator接口且每个成员都是一个双元素数组的数据结构都可以作为Map构造函数的参数
            ['title', 'author'],
            ['name', 'Amy'],
        ]); 
        log(m1); //{'title' => 'author', 'name' => 'Amy'}
        // Map构造函数接受数组作为参数,实际执行的是:
        const m2 = new Map();
        [['title', 'author'],['name', 'Amy']].forEach(([key, value])=>{
            m2.set(key, value);
        });
        
        // map的键与数据内存地址绑定，只要内存地址不同就视为不同的键
        const m4 = new Map();
        m4.set('a', 'content1');
        m4.set('a', 'content2');
        log(m4.get('a')); // content2, 相同键名第一个值会被覆盖

        const m3 = new Map();
        const k1 = ['a'];
        const k2 = ['a'];
        m3.set(k1,'content1');
        m3.set(k2,'content2');
        log(m3.get(k1));
        log(m3.get(k2));
    }
// 4. map 属性和方法
    {
        // let m1 = new Map();
        // m1.set('name','Simon').set({'name':'Blue'},'Secret');
        // log('m1.size--->',m1.size);
        // let r1 = m1.get('name');
        // log(r1);
        // let r2 = m1.has('name');
        // log(r2);
        // m1.delete('name');
        // m1.clear();
        // let r3 = m1.has('name');
        // log(r3);
        // log('m1--->',m1);
    }
// 5. 遍历 map,keys(),values(),entries()返回的都是遍历器对象；  
// for..of..., m[Symbol.iterator] === m.entries
// forEach()使用回调函数遍历每个成员
    {
        let m2 = new Map();
        let obj1 = { 'name': 'Blue' };
        m2.set('name','Simon');
        m2.set(obj1,'secret');
        for( let item of m2 ){
            // log( 'item--->',item );
        }
        for(let key of m2.keys() ){
            // log('key--->',key);
        }
        for(let value of m2.values() ){
            // log('value--->',value);
        }
        for(let item of m2.entries() ){
            // log( 'item--->',item );
        }
        let entries = m2.entries();
        // log( entries.next() ); //{value: [name, simon], done: false}
        // log( entries.next() ); 
        // log( entries.next() ); //{value: undefined, done: true}
        // m2.forEach((value,key,m2)=>{ log(key,value,m2); });
    }
// 6. map 与其他数据结构的转换： 数组 / 对象 / json 
    {
        const m1 = new Map();
        m1.set('name', 'Simon').set({ocupation: 'student'}, 'secret');
        log(m1);//{'name' => 'Simon', {ocupation: 'student'} => 'secret'}

        const m2 = new Map();
        m2.set('subject', 'science').set('teacher', 'Sheldon');
        log(m2);//{'subject' => 'science', 'teacher' => 'Sheldon'}

        // map转object(键都是字符串)
        function mapToObject(m) {
            const o = Object.create(null);
            for(let [key, val] of m) {
                o[key] = val;
            }
            return o;
        }
        // map转数组(键包含非字符串)
        function mapToArray(m) {
            return [...m];
        }
        // map转json(键都是字符串)
        function mapToObjectJson(m) {
            const o = mapToObject(m);
            return JSON.stringify(o);
        }
        // map转json(键包含非字符串)
        function mapToArrayJson(m) {
            const o = mapToArray(m);
            return JSON.stringify(o);
        }
        // object转map
        function objToMap(o) {
            const m = new Map();
            for(let key in o) {
                if(o.hasOwnPropertyof(key)) {
                    m.set(key, o[key]);
                }
            }
            return m;
        }
        // 数组成员为一对元素的数组转map
        function arrayToMap(arr) {
            return new Map(arr);
        }
        // json转map(json转为json对象)
        function jsonObjToMap(j) {
            const o = JSON.parse(j);
            return objToMap(o);
        }
        // json转map(json转为数组)
        function jsonArrayToMap(j) {
            const arr = JSON.parse(j);
            return new Map(arr);
        }
    }
// 7. weakMap与Map区别: weakMap只接受对象作为键名; weakMap的键名所指向的键名不计入垃圾回收机制;
{
    const wm = new WeakMap();
    // wm.set('name', 'Simon'); // 报错

    const el1 = document.getElementById('el1');
    const el2 = document.getElementById('el2');
    const arr = [
        [el1, 'some info.']
        [el2, 'some info.']
    ]; 
    // 此时对el1,el2 的引用计数为2, 如果el1,el2不再需要,就要手动去清除arr内的引用,否则el1,el2所占用的内存不会被释放
    arr[0] = null;
    arr[1] = null;

    // 所以如果放入weakMap,当如果对节点的引用被消除,垃圾回收机制就会释放其所占的内存, weakMap这个键值对也会自动消失(没试出来)
    const el3 = document.getElementById('el3');
    const el4 = document.getElementById('el4');
    const wm1 = new WeekMap();
    wm1.set(el3, 'some info.').set(el4, 'some info.'); // 尽管这里有引用el3,el4, 但不会被垃圾回收机制计入,所以引用计数仍然是1

}
//  只有 set(),get(),has(),delete() 4个方法，不可遍历，键是弱引用，值仍是强引用。
// 弱引用：即垃圾回收机制不会将该引用计算在内。只要所引用的对象的其他引用被清除，垃圾回收机制就会释放所占用的内存。
// weakMap的专用场景就是它的键所对应的对象肯能在未来消失的场景。weakMap结构有助于防止内存泄漏。
{
    const wm = new WeakMap();
    let obj = {'name':'Blue'};
    wm.set(obj, 'test');
    wm.has(obj); // true
    wm.get(obj); // 'test'
    wm.delete(obj); // true
    wm.has(obj); // false

    let objVal = {val: 'test'};
    wm.set(obj, objVal);
    objVal = null;
    wm.get(obj); // {val: 'test'}
    
}
// 8. weakMap 使用: 1/为dom添加事件,一旦dom节点消失,与它绑定的handler也会消失;
{
   
    let el1 = document.getElementById('a');
    let el2 = document.getElementById('b');
    let m6 = new WeakMap();
    m6.set(el1,()=>{ }); // 放入浏览器中可运行
    m6.set(el2,()=>{ }); // 放入浏览器中可运行
    el1.addEventListener('click',m6.get(el1),false);
    el2.addEventListener('click',m6.get(el2),false);

    // 2/为对象部署私有属性,A类内的两个内部属性_counter,_action是实例的弱引用,如果实例消失,它们也会随之消失,不会造成内存泄漏  
    // 部署私有属性可以理解,但是后面不会造成内存泄漏不理解 ???
    const Test = (function Test() {
    const _counter = new WeakMap();
    const _action = new WeakMap();
    return class CountDown {
        constructor(counter, action) {
        _counter.set(this, counter);
        _action.set(this, action);
        }
        decline() {
        let counter = _counter.get(this);
        const action = _action.get(this);
        if(counter<=1) {
            action();
            return;
        }
        counter--;
        _counter.set(this, counter);
        }
    }
    })();
    const t1 = new Test(2, () => {log('done'); log(this); });
    t1.decline();
    t1.decline();
}

    


    


