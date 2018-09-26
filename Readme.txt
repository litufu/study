学习步骤记录：
第一次课：
前端使用react + apollo + graphql
1、前端使用create-react-app client
2、前端安装 yarn add apollo-boost react-apollo graphql
服务器端
1、初始化并安装相关依赖：
npm init --yes
npm install --save apollo-server-express graphql
入口文件
index.js
主要内容：
在后端建立schema和对应的resolvers实现基本的查询功能，前端连接到后端通过apollo-client向后端发送请求查询数据并渲染在组件上。

第二次课：
新增修改功能Mutation
在完成mutation后通过update和乐观更新使页面及时更新。

第三次课
在客户端添加route依赖，使用route来为channel建立详情页面。
yarn add react-router react-router-dom
使用withrouter来调用props.match；
使用input type来输入多个变量。


第四课：
使用subscription来进行实时更新。
服务端设置
https://www.apollographql.com/docs/apollo-server/features/subscriptions.html
客户端安装设置：
npm install --save apollo-link-ws subscriptions-transport-ws
https://www.apollographql.com/docs/react/advanced/subscriptions.html
注意：
（1）subscription中的subscribeToMore中的upQurey会和update同样更新cache，因此只能选择update或subscribeToMore两种中的一种，
否则会出现冲突的情况。
（2）updateQuery的更新缓存的时候，需要自己加上__typename，否则会报missing a field __typename的错误。
