## vg-cli
1. 进行文件路径的分离与文件路径的解分离
2. html文件内部的 ```css```、```js``` 、```inc``` 绝对路径补全
3. 一键打包分离后的文件到桌面

## 安装 vg-cli
1. 执行 ```npm i -g vg-cli``` 全局安装 vg-cli
2. 执行 ```vg init <分离路径>``` 初始化配置
3. 执行 ```npm run build``` 进行文件分离,
4. 支持分离部分文件 ```npm run build:[type]```，目前 type 支持 ```html```、```css```、```js``` 、```inc```、```image```
5. 执行 ```npm run restore``` 进行文件解分离（从dist文件里面进行解分离），同第4点支持解分离部分文件
6. 执行 ```npm run zip``` 打包dist文件夹里面的文件到桌面

