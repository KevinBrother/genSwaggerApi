# gen-api-by-swagger

### 通过后端的swagger文档，生成js或者ts的api接口定义


### TODO
- [ ] 使用规则呢, 参考下人家的呢 [anywhere](https://www.npmjs.com/package/anywhere)

- [ ] 测试文件？
- [ ] 怎么测试bin的呢
- [ ] 备注功能 + 参数说明 (jsdoc)

- [ ] 配置文件的定义 api-config.js 支持
        - [ ] 路径和请求方式的配置，导出模式 比如export const + fnName 等等 
        - [ ] 调用的也生成了，让配置中选择，可以不生成
              reqTradition({taskId: this.taskId}).then(rst => {
                console.log("rst", rst)
              })

- [ ] 输出美化一下啊

- [ ] 文件有本地缓存功能
- [ ] swagger的api数据接口路径走配置文件
- [ ] 入口文件？ entry的定义。让谁用呢？

- [ ] 支持一次生成多个？具体需求的定义呢, 
- [ ] 如果是多个的话 需要生成js文件吗？


``` javascript
    import api from 'gen-api-by-swagger'
    api.code2ts({
        template: {},
        filepath: path.resolve('./api'),
        swaggerApiUrl: 'http://example.com/common/v2/api-docs?group=api'
    })
```    