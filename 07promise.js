const { log } = console;
// 1. promise 对象有三种状态：pending,resolved,rejected,状态一旦改变不可更改
    {
        const p1 = new Promise((res,rej)=>{
            res('success');
            // rej('fail');
        });
        // log('p1--->',p1);
    }
// 2. 执行顺序问题，先执行宏任务，再执行微任务，本轮执行结束后，下一轮再执行被推入栈的任务
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
    }
// 3.then(),catch()
    {
        // 都返回promise对象
        let p1 = new Promise((res,rej)=>{
            return res('ok');
        })
        .then( data => {
            // log('data--->',data);
            a
            // return data
        })
        .then( result1=>{
            // log('result1--->',result1);
        })
        .catch(err=>{
            // log('err--->',err);
            return err
        })
        .then(result2=>{
            // log('result2--->',result2);
        });

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

        // resolve(promise) 情况, 此时p1的状态决定了p2的状态，p2自身状态无效
        {
            let p1 = new Promise((res,rej)=>{
                setTimeout(()=>{
                    // log('p1');
                    return res('p1 ok');
                    // return rej('p1 fail');
                },1000)
            });
            let p2 = new Promise((res,rej)=>{
                res(p1);
            });
            // log('p2--->',p2);
        }
    }
// 4.promise 静态方法，resolve(),reject(),all(),race()
    {
        // resolve(),reject()
        let p1 = new Promise((res,rej)=>{
            return res('success');
        })
        .then(data=>Promise.resolve(data))
        // .then(data=>Promise.reject('fail'))
        // .then(data=>log('data--->',data))
        .catch(err=>log(err));

        {
            // all(),race()
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
            Promise.all([p1,p2,p3])
                .then(result=>{
                    // log('result---all--->',result);
                })
                .catch(err=>{
                    // log('fail---all--->',err);
                });
            
            Promise.race([p1,p2,p3])
                .then(result=>{
                    // log('result---race--->',result);
                })
                .catch(err=>{
                    // log('fail---race--->',err);
                });
        }
    }
// 5. Promise.resolve()的promise执行顺序问题-- 2 中已探究

// 6.同步任务同步执行，异步任务异步执行
    {
        const f = ( data ) => { log('data--->',data) };
        const func1 = () => log('first');
        const func2 = () => setTimeout(()=>{ log('first') },1000);
        // const func2 = () => Promise.resolve('first').then(f);
        (async ()=>func2())()
        log('next');
    }

// 7.promise 实现运动
    {   
        // 参数：dom节点，运动的属性，持续时间
        // 计算给出的持续时间内运动的速度
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
            .then(()=>move(oDiv,'height',200,1000))
            .then(()=>move(oDiv,'left',200,1000))
    }


