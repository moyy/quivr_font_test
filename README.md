- [Quivr 前端 实验](#quivr-前端-实验)
  - [1. 运行](#1-运行)
    - [1.1. 环境](#11-环境)
    - [1.2. 安装](#12-安装)
    - [1.3. 运行](#13-运行)
  - [2. HTTP API](#2-http-api)
    - [2.1. setting.ts](#21-settingts)
    - [2.2. app.ts](#22-appts)
    - [2.3. user.ts](#23-userts)
    - [2.4. brain.ts](#24-braints)
    - [2.5. file.ts](#25-filets)
    - [2.6. crawl.ts](#26-crawlts)
    - [2.7. chat.ts](#27-chatts)

# Quivr 前端 实验

## 1. 运行

### 1.1. 环境

+ Docker 开了 Supabase 后端 http://localhost:8080
+ Docker 开了 Quivr 后端，http://localhost:5050

### 1.2. 安装

``` bash

npm install
npm install -g http-server

```

### 1.3. 运行

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

### 2.1. setting.ts

三个配置：

|变量名|作用|
|--|--|
|QUIVR_SERVER_URL|Quivr 服务器|
|SUPABASE_URL|Supabase 服务器，用于 注册/登录|
|SUPABASE_ANON_KEY|Quivr，用于 创建 Supabase 客户端|

### 2.2. app.ts

|API|方法|作用|
|--|--|--|
|/|GET|查看服务器状态|

### 2.3. user.ts

+ supabase 注册
+ supabase 登录
    - 登陆完毕，拿到 access_token, 保存起来，供下次 自动登录；

|API|方法|作用|
|--|--|--|
|/user|GET|取用户信息|

### 2.4. brain.ts

|API|方法|作用|
|--|--|--|
|/brains|GET|大脑|
|/brains/default/|GET|默认大脑，第一次登录后，自动创建|
|brains/{brain_id}|GET|取id指定的大脑|
|brains/{brain_id}|DELETE|取id指定的大脑|
|/brains/|POST|创建大脑，body = JSON-字符串|

### 2.5. file.ts

|API|方法|作用|
|--|--|--|
||||

### 2.6. crawl.ts

|API|方法|作用|
|--|--|--|
||||

### 2.7. chat.ts

|API|方法|作用|
|--|--|--|
||||