#### vue项目模板生成步骤
1. 安装node.js
    * 安装，访问node.js官网下载Windows安装包进行安装(安装包内包含node和npm)。
    * 验证是否安装成功,在dos命令行执行以下命令：
        * 执行：`node -v`，node安装成功会显示版本号。
        * 执行：`npm -v`，npm安装成功会显示版本号。
2. 安装npm的阿里镜像
    * 执行：`npm i -g cnpm --registry=https://registry.npm.taobao.org`
3. 安装vue-cli脚手架
    * 安装，在dos命令行执行：`npm i -g vue-cli`
    * 验证是否安装成功,执行：`vue -V`,安装成功会显示版本号。
4. 安装webpack
    * 安装，在dos命令行执行：`cnpm install -g webpack`
    * 验证
5. 载入vue项目模板
    * 执行：`vue init webpack 项目名`，随后按下图操作
![模板步骤](https://raw.githubusercontent.com/LinWenLiGit/vue-template/master/%E6%A8%A1%E6%9D%BF%E5%88%9B%E5%BB%BA%E6%AD%A5%E9%AA%A4.png)


#### 修改vue项目名称步骤：
1. 修改根目录下的package.json文件，把name修改成你的项目名称
2. 修改根目录下面的index.html文件，把title改成你的项目名称（非必要）
3. 如果已执行过`npm instrall`，需要删掉node_modules文件夹，重新执行一次`npm instrall`，之前通过npm安装的插件，也要重新安装.





# vue-template

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
