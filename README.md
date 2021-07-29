# 项目名称
- **技术支持**：该项目基于 `react`，由`xiongsongsong`创建于 `2019`年 `12`月 `9`日。
- **前后端分离情况**：
  >- 前后端分离开发；
  >- 静态资源由`前端`上线；
  >- 域名由`前端`申请。
- **项目说明**：***

### 目录
- [项目名称](#项目名称)
    - [1.项目特性](#1项目特性)
    - [2.项目功能](#2项目功能)
    - [3.相关链接](#3相关链接)
    - [4.相关页面](#4相关页面)
    - [5.相关指令](#5相关指令)
    - [6.本地开发](#6本地开发)
    - [7.跨域问题](#7跨域问题)
    - [8.编译打包（上预发、上线流程）](#8编译打包上预发上线流程)
      - [上线](#上线)
      - [上预发](#上预发)
    - [9.相关文档](#9相关文档)
      - [1.prd文档（erp@**）](#1prd文档erp)
      - [2.后端接口文档（erp@**）](#2后端接口文档erp)
      - [3.设计稿（erp@**）](#3设计稿erp)
      - [4.外部依赖等其他文档](#4外部依赖等其他文档)
    - [10.目录结构](#10目录结构)
    - [11.上线日志](#11上线日志)
    - [12.关联项目](#12关联项目)
    - [13.注意事项](#13注意事项)
    - [14.其他说明](#14其他说明)
      - [1.环境变量与模式](#1环境变量与模式)
      - [2.开发PC端页面](#2开发pc端页面)
      - [3.commit message 规范](#3commit-message-规范)
      - [4.代码规范与格式化](#4代码规范与格式化)

### 1.项目特性
>* [React](https://reactjs.org/)
>* [React Router](https://reacttraining.com/react-router/web/guides/quick-start)
>* [axios](https://www.kancloud.cn/yunye/axios/234845)
>* [postcss-pxtorem自动将px转成rem，计算规则为： 750px设计稿 -----> 7.5rem](https://github.com/cuth/postcss-pxtorem)
>* [Commitizen规范git commit](https://juejin.im/post/5bd2debfe51d457abc710b57)
>* [Redux](https://redux.js.org/)可配置
>* TypeScript支持，`ts`文件可直接引入使用

### 2.项目功能
- [x] `ts`支持
- [ ] `webpack`的`html`压缩插件更新


### 3.相关链接

- 线上域名：[https://**.*.com](https://**.*.com)
- 预发域名：[https://**.*.com](https://**.*.com)
- 代码库地址：[https://**.*.com](https://**.*.com)
- 上线地址：[https://**.*.com](https://**.*.com)

### 4.相关页面
- 页面1：[https://**.*.com](https://**.*.com)

### 5.相关指令
```
$ npm install            # 安装依赖 或者 yarn install
$ npm run serve          # 运行项目(本地开发) 或者 npm start
$ npm run build:prod     # 生产环境打包
$ npm run build:dev      # 预发环境打包
$ npm run generatePage   # 生成新的页面
```

### 6.本地开发

1. `npm install`(安装package.json下项目依赖)；
2. `npm run serve`(安装成功后启动项目)；
3. 项目在本地`localhost:8008`端口运行。

### 7.跨域问题
- 配置host：127.0.0.1 dev.*.com
- 配置devServer的proxy，配置路径为：vue.config.js -> devServer -> proxy

### 8.编译打包（上预发、上线流程）

**注意：提交代码时请使用commitzen，否则commit message不符合规范无法提交，具体参考：https://juejin.im/post/5bd2debfe51d457abc710b57**

#### 上线

1. 从Master新建分支开发，每次上预发或上线之前，都需要拉取远端master代码，保证本地master代码为最新，合并master代码；
2. 上线前：切换到本地master分支，合并开发分支代码到本地master分支；
3. `npm run build:prod`打包代码。检查**deploy/index.html**中是否为线上域名（ '//api.m.jd.com/api'）；
4. 提交代码至master远程；
5. 在jdos的[**应用](http://console.jdos.jd.com/#/**/image)下，进行master的编译镜像；
6. 在预发分支上先上线编译好的镜像，没有问题后，准备正式环境上线；
7. 在正式环境上线，执行滚动更新，每次1个，间隔40秒（防止线上更新代码期间无法访问）；
8. 结束后进行上线确认，否则会影响团队其他成员的上线。

#### 上预发

1. 在开发分支上执行`npm run build:dev`打包代码；
2. 提交代码至分支远程；
3. 在jdos的[**应用](http://console.jdos.jd.com/#/**/image)下，进行开发分支a的编译镜像，上预发。

### 9.相关文档

#### 1.prd文档（erp@**）

* [设计说明](http://**.jd.com)
* [埋点](http://**.jd.com)

#### 2.后端接口文档（erp@**）

* [商详页](http://**.jd.com)
* [订单&优惠券](http://**.jd.com)

#### 3.设计稿（erp@**）

* [设计稿](http://**.jd.com)
* [交互稿](http://**.jd.com)

#### 4.外部依赖等其他文档

* [文档1](http://**.jd.com)
* [文档2](http://**.jd.com)

### 10.目录结构

```
├── deploy                         # 打包后生成的文件
├── node_modules                   # 安装的依赖
├── public                         # 静态资源文件夹
└── src
    ├── App.jsx || App.ts          # 整体应用
    ├── App.scss                   # 全局样式
    ├── index.ts || index.js       # 应用入口文件
    ├── api                        # 接口
    ├── assets                     # 项目依赖的一些静态资源
    ├── components                 # 公共组件
    ├── router                     # vue-router
    ├── styles                     # 公共样式
    ├── pages                      # 页面视图组件
      ├── pageA                    # 页面A
        ├── components             # 页面A中使用的组件
        ├── api.js                 # 页面A中使用的api接口
        ├── components             # 页面A中使用的组件
        ├── mock.js                # 页面A中使用mock数据
├── .babelrc                       # babelh转码配置文件
├── .browserslistrc                # 在不同的前端工具间共享目标浏览器
├── .editorconfig                  # 统一编辑器代码风格
├── .eslintrc.js                   # 代码检查配置文件
├── .gitignore                     # git忽略文件
├── package.json                   # npm包描述文件
├── package-lock.json              # 记录当前状态下实际安装的各个npm package的具体来源和版本号
├── yarn.lock                      # 使用yarn时记录当前状态下实际安装的各个npm package的具体来源和版本号
├── postcss.config.js              # css转换规则
├── tsconfig.json                  # TypeScript配置规则文件
├── README.md                      # 项目说明
```

### 11.上线日志

- 2019.6.10上线1.0.0版本，---首次上线，***等基础功能
- 2019.7.13上线1.0.1版本，---修复 *bug,增加 *功能

### 12.关联项目

### 13.注意事项

1. 上线出问题后，及时用上一个镜像资源重新上线，不要回滚。
2. 上线与上预发的打包指令存在区别。
3. 全局安装commitzen提交代码，规范git commit message，具体参考：https://juejin.im/post/5bd2debfe51d457abc710b57

### 14.其他说明
#### 1.开发PC端页面
本模板主要针对移动端开发，采用rem作为尺寸单位，为此使用postcss插件，自动将px转换成rem，同时根据屏幕宽度自动计算根字体大小。

如果想要开发PC页面则需要将上述特性移除：

- 移除postcss的pxtorem插件，配置路径为：postcss.config.js -> postcss-pxtorem
- 移除对根字体大小的计算，配置路径为：main.js -> rem

#### 2.commit message 规范
全局安装commitzen提交代码，规范git commit message，具体参考：https://juejin.im/post/5bd2debfe51d457abc710b57

#### 3.代码规范与格式化
代码规范标准为`standard`，建议使用`prettier`格式化代码，代码编辑使用`VS Code`，安装`prettier`扩展，`shift + alt + f` 格式化代码。也可以运行 `npm run lint`修复不符合规范的代码。

注意：书写的代码不符合规范将无法提交代码。
