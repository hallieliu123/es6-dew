const { log } = console;
// 1. promise 对象有三种状态：pending,resolved,rejected,状态一旦改变不可更改
    {
        const p1 = new Promise((res,rej)=>{
            res('success');
            // rej('fail');
        });
        // log('p1--->',p1);
    }
// 2. *** event loop
// 对事件循环的理解: 因为js是单线程运行的,在代码执行时,通过将不同函数的执行上下文压入执行栈中来保证代码的有序执行。
// 在执行同步代码时,如果遇到异步事件,js引擎并不会一直等待其返回结果,而是会将这个事件挂起,继续执行执行栈中的其他任务。
// 当异步事件执行完毕后,再将异步事件对应的回调加入到一个任务队列中等待执行。任务队列可以分为宏任务队列和微任务队列,当当前执行栈中的事件执行完毕后,
// js引擎首先会判断微任务队列中是否有任务可以执行,如果有就将微任务队首的事件压入栈中执行。当微任务队列中的任务都执行完成后再去执行宏任务队列中的任务。

// 宏任务举例: script脚本的执行,setInterval,setTimeout,setImmediate等;
// 微任务举例: promise, process.nextTick, 对dom变化监听的 mutationObserver;

// 什么是执行栈(和课本上的调用栈一样): 可以把执行栈看作是存储函数调用信息的一种栈结构,遵循先进后出的原则,后执行的函数会先弹出栈。
    {
        // log('1');
        // setTimeout(()=>{ log('2') },0);
        // setTimeout(()=>{ log('3') },0);
        // let p1 = new Promise((res,rej)=>{
        //     log('4');
        //     return res()
        // }).then(()=>{
        //     log('5');
        // });
        // p1.then(()=>{
        //     log('6')
        // });
        // log('7');
        // 1,4,7,5,6,2,3

        // console.log(1);
        // setTimeout(()=>{
        //     console.log(2);
        //     Promise.resolve().then(()=>{console.log(3);});
        // });
        // Promise.resolve().then(()=>{console.log(4)});
        // setTimeout(()=>{console.log(5)});
        // console.log(6);
        // 1,6,4,2,3,5

        // console.log(1);
        // setTimeout(()=>{
        //     console.log(2);
        //     Promise.resolve().then(()=>{
        //         console.log(3);
        //         setTimeout(()=>{console.log(7)});
        //     });
        // });
        // Promise.resolve().then(()=>{console.log(4)});
        // setTimeout(()=>{
        //     console.log(5);
        //     Promise.resolve().then(()=>{console.log(8);});
        // });
        // console.log(6);
        // 1,6,4,2,3,5,8,7
    }
// 3.then()
// catch() promise对象的错误具有‘冒泡’性质,它会一直向后传递,直到被promise.catch捕获,如果没有catch去捕获这个错误,它不会传递到外层代码能被try{}catch(){}捕获,浏览器会直接报错;
    {
        // 都返回promise对象
        // let p1 = new Promise((res,rej)=>{
        //     return res('ok');
        // })
        // .then( data => {
        //     a ++;
        //     return data
        // })
        // .then( result1=>{
        //     // log('result1--->',result1); // 因为前面有错误,直接不跳过这个then去执行catch及后面的语句
        // })
        // .catch(err=>{
        //     log('err-1-->',err);
        //     return err
        // })
        // .then(data=>{
        //     log('data--->',data); // data是前面catch返回的err
        // });

        // then函数中自定义promise对象
        let p2 = new Promise((res,rej)=>{
            return res('ok')
        })
        .then(()=>{
            return new Promise((res,rej)=>{res('inner ok')})
        })
        .then( data =>{ 
            // log(data)
        });

        // resolve(promise) 情况, 此时p1的状态决定了p2的状态，p2自身状态无效, // 实际是返回的原对象，看Promise.resolve() (如果参数是promise实例,那么Promise.resolve将不做
        // 任何修改,直接返回该实例);
        // reject(promise) 情况, 此时p2状态还是rejected,并且catch住的err是p1的promise对象(原因是Promise.reject不会像resolve一样去转化参数的值).
        {
            const p1 = new Promise((res, rej)=>{
                // return res('p1 ok');
                return rej('p1 failed');
              });
              const p2 = new Promise((res, rej)=>{
                return res(p1);
              });
              p2.then(data=>{
                log('data-->',data);
              }).catch(err=>{
                log('err-->',err);
              });
        }
    }
// 4.promise 静态方法，resolve(),reject(),all(),race(),finally()
// Promise.resolve(),参数是promise对象直接返回,不是promise对象返回一个新的状态为resolved的Promise对象; resolved的Promise对象是在本轮‘事件循环’的结束时,而
// 不是在下一轮‘事件循环’的开始时;
// Promise.reject()方法参数会原封不动的作为reject的理由变为后续方法的参数,这一点与Promise.resolve()不同。
    {
        setTimeout(()=>{
            log('4');
        },0);
        new Promise((res, rej)=>{
            return res('2');
        }).then((data)=>{
            log(data);
        });
        Promise.resolve('3').then((data)=>{
            log(data);
        });
        log('1');
        // 1 2 3 4
    }
    {
        // const p = Promise.all([p1, p2, p3]);接收一个成员为promise对象的数组,如果成员不是promise对象则会自动调用Promise.resolve()转为Promise对象;
        // p1,p2,p3都是resolved时 p 的状态才会是resolved,3个实例的返回值组成一个数组返回给p的then回调函数 
        // p1,p2,p3 有一个是rejected那么 p 的状态就是 rejected,并且只有这个rejected的实例的error返回值会传给p的catch去捕获;
        // const p = Promise.race([p1,p2,p3]);同样将多个promise实例包装成一个Promise实例,p1,p2,p3中率先有一个实例率先改变状态,p的状态就跟着改变,
        // 并且那个先改变的Promise实例返回值就传递给 p 的回调函数.
        let p1 = new Promise((res,rej)=>{
            setTimeout(()=>{
                return res('p1')
                // return rej('p1')
            },1000)
        });
        let p2 = new Promise((res,rej)=>{
            setTimeout(()=>{
                return res('p2')
            },2000)
        });
        let p3 = new Promise((res,rej)=>{
            setTimeout(()=>{
                return res('p3')
            },3000)
        });
        Promise.all([p1,p2,p3]).then(result=>{
            // log('result---all--->',result);
        }).catch(err=>{
            // log('fail---all--->',err);
        });
        
        Promise.race([p1,p2,p3]).then(result=>{
            // log('result---race--->',result);
        }).catch(err=>{
            // log('fail---race--->',err);
        });
    }

/** 看出问题 */
// 5.同步任务同步执行，异步任务异步执行(异想用promise包装它，不管它是同步还是步操作的函数);
    {
        // 不知道或者不想区分函数f是同步函数还是异步,但都想用promise来处理它,这样就可以不管f是否包含异步操作都可以用then进行下一步操作和catch方法处理f抛出的错误.
        //1.
        // const func2 = () => Promise.resolve('first').then(f);
        // log('next');
        // 先打印 next
        // 后打印 first
        // 上述方法有个缺点就是即使f是同步函数,也会在本轮事件循环的末尾执行。

        // 同步任务同步执行，异步任务异步执行 又可以接 then 和 catch
        //2.使用async(只是为了后面可以用then和catch)
        // const f = () => log('first');
        // (async () =>f())();
        // log('next');
        // first
        // next
        //3.使用promise
        const f1 = () => {log('first')};
        (() => new Promise(resolve=>{
            resolve(f1());
        }))();
        log('next');
        // first
        // next

        // promise.try();提案可以替代上述操作
        const f = () => {
          log('first');
          return 'first'
        };
        Promise.try(f).then(data=>{
          log(data);
        });
        log('next');
        // first
        // next
        // first
    }

// 6.promise 实现运动
    {   
        // 需求: 写一个函数在一定时间内平滑的改变一个元素的宽度,高度,left值等;
        // 参数：dom节点，运动的属性，持续时间
        // **计算当前的属性值
        // 运动
        // 清除定时器
        const move = (obj,attr,target,duration)=>{
            let o = parseInt(window.getComputedStyle(obj)[attr]);
            let d = target - o;
            let temp = Date.now();
            return new Promise(res=>{
                let myTimer = setInterval(()=>{
                    let t = Date.now() - temp;
                    if( t >= duration ){
                        clearInterval(myTimer);
                        res();
                    }
                    let m = d/duration*t + o; 
                    obj.style[attr] = m + 'px';
                },20)
            })
        }
        let oDiv = document.getElementById('a');
        move(oDiv,'width',200,1000)
            .then(()=>move(oDiv,'height',200,1000)) //观察一下这里如果不返回move的promise对象会发生什么
            .then(()=>move(oDiv,'left',200,1000))
    }

// 7.手写promise实例方法finally()
    {
        // 1.自己写的不和原生的一样，自己写的不管res还是rej回调函数都可以拿到 val / err
        // Promise.prototype.Finally = function(callback){
        //     return this.then(value=>{
        //         callback && callback(value);
        //     },err=>{
        //         callback && callback(err);
        //     })   
        //  }
        //2.原生finally,它使得finally还是返回promise对象
        Promise.prototype.Kinally = function(callback){
            return this.then(val=>{
                return Promise.resolve(callback()).then(()=>val)
            },err=>{
                return Promise.resolve(callback()).then(()=>err)
            });
        }

        new Promise((res,rej)=>{
            setTimeout(()=>{
                res('ok');
            },1000)
        })
        .then(val=>{
            // log('val--->',val);
            // abc
            return val
        })
        .catch((err)=>{
            // log('err--1->',err);
            return err
        })
        // .Finally((val)=>{
        //     log('finally--->',val);
        // })
        .Kinally((val)=>{
            // log('Kinally');
        })
        .then(val=>{
            // log('after-Kinally->',val);
        })
    }
// 8.手写promise静态方法all();
    {
        Promise.Kall = async function(arr){
            let results = [];
            let promises = arr.map(item=>Promise.resolve(item));
            for(let promise of promises){ // for...of 继发执行下面的promise
                results.push(await promise);
            }
            return Promise.resolve(results);
        }   
    }

//9. 图片加载完成,promise的处理
    {
        const preloadImage = (oImg, path) => {
            return new Promise((res, rej)=>{
            oImg.onload = res;
            oImg.onError = rej;
            oImg.src = path;
            });
        };
    }

// 尾调用复习
// 尾递归复习



    
