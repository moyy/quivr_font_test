- [Quivr 前端 实验](#quivr-前端-实验)
  - [1. 部署](#1-部署)
    - [1.1. 安装](#11-安装)
    - [1.2. 运行](#12-运行)
  - [2. HTTP API](#2-http-api)
    - [2.1. app.ts](#21-appts)
    - [2.2. user.ts](#22-userts)
    - [2.3. brain.ts](#23-braints)
    - [2.4. `TODO` file.ts](#24-todo-filets)
    - [2.5. `TODO` crawl.ts](#25-todo-crawlts)
    - [2.6. `TODO` chat.ts](#26-todo-chatts)

# Quivr 前端 实验

## 1. 部署

### 1.1. 安装

``` bash

npm install
npm install -g http-server

```

### 1.2. 运行

运行前，请修改 src/setting.ts 的 三个变量：

|变量名|作用|
|--|--|
|`QUIVR_SERVER_URL`|Quivr 服务器|
|`SUPABASE_URL`|Supabase 服务器，用于 注册/登录|
|`SUPABASE_ANON_KEY`|Quivr，用于 创建 Supabase 客户端|

构建 & 监听 修改代码 重构：

``` bash
npm run start
```

服务器：

``` bash

cd dist

http-server

```

浏览器启动: http://localhost:8080

## 2. HTTP API

### 2.1. app.ts

|API|方法|作用|
|--|--|--|
|/|GET|查看服务器状态|

### 2.2. user.ts

+ supabase 注册
+ supabase 登录
    - 登陆完毕，拿到 access_token, 保存起来，供下次 自动登录；

|API|方法|作用|
|--|--|--|
|/user|GET|取用户信息|

### 2.3. brain.ts

|API|方法|作用|
|--|--|--|
|/brains|GET|大脑|
|/brains/default/|GET|默认大脑，第一次登录后，自动创建|
|brains/{brain_id}|GET|取id指定的大脑|
|brains/{brain_id}|DELETE|取id指定的大脑|
|/brains/|POST|创建大脑，body = JSON-字符串|

### 2.4. `TODO` file.ts


|API|方法|作用|
|--|--|--|
||||

### 2.5. `TODO` crawl.ts

|API|方法|作用|
|--|--|--|
||||

### 2.6. `TODO` chat.ts

|API|方法|作用|
|--|--|--|
||||