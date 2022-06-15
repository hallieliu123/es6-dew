const { log } = console;
// 1. export / import 基本使用： 以下多种写法熟练掌握几种常用的即可   
    // script标签添加上type='module'后默认是添加了defer命令(当然可以显示的更改)
// import { a,b,c } from './14module2.js';  
    // log(a,b);
    // c();

// import * as tool from './14module2.js';
//   log(tool.a,tool.b);
//   tool.c();

// import { a,b,c as getName } from './14module2.js';
//     log(a,b);
//     getName();

// import { a,b,getName } from './14module2.js';
//     log(a,b);
//     getName();

// import { getUrl } from './14module2.js';
//     getUrl();

// import getName from './14module2.js';
//     getName();

// import { getName, getUrl } from './14module3.js';
//     getName();
//     getUrl(); 

// import c from './14module3.js'
//     c();

// import * as tool from './14module3.js'
//     tool.getName();
//     tool.getUrl();
//     tool.abc();

// 2.使用跨模块常量时, 可以将多个模块的常量放入一个index.js中抛出，例如： export {a} from './m1'; export {b} from './m1';

// 3. import() 这还是一个提案，异步加载某个模块，返回一个promise对象，联系实际，点击出弹窗这个功能用这个方法很好，即点击后才加载这个模块
//  适用场合: 按需加载, 条件加载

// 4. es6 模块化 与 commonjs 模块化
//    commonjs 是运行时加载，并且模块输出的是值的复制, 是缓存，不存在实时更新；es6 module是编译时加载或者说是静态加载，并且模块输出的是值的动态引用；
//    commonjs require加载时，加载整个对象，然后再取对象中的属性或方法。es6 module import时只是import要求的变量或方法，因此效率也更高。
//    commonjs 模块顶层this指向当前模块，es6 module 顶层的this指向undefined
//    (commonjs 中抛出的变量则是缓存，不存在实时更新；es6 module中export出来的接口与它对应的值是动态绑定关系)
    // import {num,add} from './14module2.js';
    // log(num);
    // add();
    // log(num);

    // import { obj } from './14module3.js';
    // obj.add();
    // log(obj.num); // 1
    // import './14module2.js';// 2 
// 5. es6模块 与 commonjs 模块的循环加载
//  commonjs模块在首次require加载一个模块时，即在内存中生成一个描述该模块的对象，之后再有模块加载这个模块直接从内存中取值，不会重新执行。
//  es6循环加载在加载a模块时用到b模块，那么先去加载b模块，此时b模块又要用到a模块，a模块已经在执行了，所以不会再去执行，而是将模块代码先执行完，
//     内部用到的a模块的变量是undefined的，执行完b，执行权交换给a，继续执行。但是它的一大特点是，从模块中import的变量都是引用的，所以只要值
//     一旦改变，边立刻能获得。这是与commonjs最大的不同

// 5. es6模块加载commonjs模块，commonjs模块加载es6模块
    // es6加载commonjs模块: node会自动将module.exports属性当作export default
    {
        // 自定义模块
        // import module from './commonjsmodule.js';  // commonjs 对变量的缓存机制依然存在
        // 已下载包模块，// commonjs模块运行时才能确定输出接口，所以要采用整体加载 而不能这样加载import {readFile} from 'fs';
        // import express from 'express'; 
        // let app = express();
    }
    // commonjs模块加载es6模块: 
    {
        // es6.js
        // let a = 1;
        // export default a;  // 这种情况require加载出的对象会缓存
        // a = null; // 在引入的模块不会生效
        // common.js
        // let es6Module = require('./es6.js'); 
        // es6Module.default.a // 1

    }   
// 6. script加载模式: 
//    <script></script> 同步加载js脚本
//    <script src='' defer></script>  // 渲染完再执行，多个按顺序 ( 渲染结束后DOMContentLoaded事件触发前)
//    <script src='' async></script>  // 下载完就执行，多个不能预测顺序 
//    defer(渲染完再执行) / async(下载完即执行) 是脚本异步加载，渲染引擎不会等脚本下载和执行，而是先执行后面的代码。
//    defer会等到整个页面渲染结束再执行。async是一旦下载完成就中断渲染然后执行，执行完再接着渲染。


// es6模块化默认是严格模式，顶层对象this是undefined，不是window,所以变量都不会挂载在window上了(包括用var定义的变量);
//  但是window对象还是能访问到的。





