
const { log } = console;

// 1.Set 基本使用，属性和方法; 只要有遍历接口都可以使用都可以转化成set数据结构 
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
    }
// 2.遍历 Set, keys() = values(),entries() = [keys(),values()];forEach();for...of... ,交/并/差 集
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
// 3. map 基本使用，键可以是 *对象 / 数组 / set / map 
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
// 5. 遍历 map,keys(),values(),entries(),for..of...,forEach()
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
        // log( entries.next() ); 
        // log( entries.next() ); 
        // log( entries.next() ); 
        // m2.forEach((value,key,m2)=>{ log(key,value,m2); });
    }
// 6. map 与其他数据结构的转换： 数组 / 对象 / json 
    {
        // let m3 = new Map().set('name','Simon').set({name:'Blue'},'secret');
        // log([...m3]);
        // log(Array.from( m3, item=>{ log( 'item',item ); return item } ));
        // let m4 = new Map([['name','Miya'],[{'name':'Nick'},'Lord']]);
        // log('m4--->',m4);

        let m5 = new Map().set('name','Miya').set('title','princess');
        {
            let obj1 = {};
            for( let [key,value] of m5.entries() ){
                obj1[key] = value;
            }
            // log('obj1--->',obj1);
            
            let m2 = new Map().set({'name':'Nick'},'Lord').set('name','Miya'); 
            let obj2 = [...m2];
            // log('obj2--->',obj2);
        }
    }
// 7. weakMap键只接受对象， 只有 set(),get(),has(),delete() 4个方法，不可遍历，键是弱引用，值仍是强引用。
    // {
        let obj1 = {'name':'Blue'};
        let obj2 = {'look':'handsome'};
        let obj3 = {'name':'Simon'};
        let m1 = new WeakMap();
        m1.set(obj1,'secret').set(obj3,obj2);
        // m1.set(1,'abc'); // 报错，键只接受对象
        // log('m1-1-1->',m1);
    // }
// 8. weakMap 使用: 1/为dom添加事件   2/为对象部署私有属性
    {
        // let el1 = document.getElementById('a');
        // let el2 = document.getElementById('b');
        // let m6 = new WeakMap();
        // m6.set(el1,()=>{ }); // 放入浏览器中可运行
        // m6.set(el2,()=>{ }); // 放入浏览器中可运行
        // el1.addEventListener('click',m6.get(el1),false);
        // el2.addEventListener('click',m6.get(el2),false);

        let _counter = new WeakMap();
        let _action = new WeakMap();
        class A{
            constructor(counter,action){
                _counter.set(this,counter);
                _action.set(this,action);
            }
            decline(){
                let counter = _counter.get(this);
                if( counter < 1 ) return;
                counter--;
                _counter.set(this,counter);
                if(counter === 0){
                    _action.get(this)();
                }
                return 'whatever'
            }
        }
        let a = new A(3,()=>{log('finished')});
        log(a.decline());
        log(a.decline());
        log(a.decline());
    }



    


