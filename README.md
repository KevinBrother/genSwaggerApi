# gen-api-by-swagger

### 通过后端的swagger文档，生成js或者ts的api接口定义


### TODO
- [ ] 文件有本地缓存功能
- [ ] swagger的api数据接口路径走配置文件
- [ ] 测试文件？
- [ ] 入口文件？ entry的定义。让谁用呢？

- [ ] 支持一次生成多个？具体需求的定义呢

``` javascript
    import api from 'gen-api-by-swagger'
    api.code2ts({
        template: {},
        filepath: path.resolve('./api'),
        swaggerApiUrl: 'http://example.com/common/v2/api-docs?group=api'
    })
```    