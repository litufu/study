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
