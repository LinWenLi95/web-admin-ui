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

### 插件安装 在安装后需要在项目路径下重新执行`npm install`

#### 安装Element UI
1. 在项目路径下执行`npm i element-ui -S`
2. 在main.js中添加
    ```javascript
    import ElementUI from 'element-ui';
    import 'element-ui/lib/theme-chalk/index.css';
    
    Vue.use(ElementUI);
    ```
#### 安装Axios
1. 在项目路径下执行`npm install axios`
2. 在main.js中添加
    ```javascript
    import axios from 'axios'
    
    Vue.prototype.$axios = axios
    ```

#### 安装moment.js
1. 在项目路径下执行`npm install moment --save`
2. 在main.js中添加
    ```javascript
    import moment from 'moment'
    
    Vue.filter('dateformat', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
        return moment(dataStr).format(pattern)
    })
    ```
3. 使用：`{{ timeData | dateformat()}}`


