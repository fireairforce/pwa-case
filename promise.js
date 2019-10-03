readFile(filename,(err,content)=>{
    parseXML(content,(err,xml)=>{

    })
})

readFile(filename).then(content=>parseXML(content)).then(xml=>{}).catch(err=>{})

open().then(handle).then(close,close);
open().then(handle).finally(close);

Promise.resolve(1);
new Promise(resolve => resolve(1))

Promise.reject(err);
new Promise((resolve,reject)=>reject(err));

Promise.all('abc');
Promise.race('abc');

async function readXML(filename){
    const content = await readFile(filename);

    const xml = await parseXML(content);

    return xml;
}


// 用promise并行加载100张图片，但是最多只能保证有10个promise并行运行