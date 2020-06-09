
新版架构图
```
+--------------------------------------------------------------------------------------------------------------+
|    +-----------------------------------------------------+                         +-plugin------------+     |
|    |                                                     |                         |                   |     |
|    |                                                     |                         |      logger       |     |
|    |                                                     |                         |                   |     |
|    |                  业务层                              |      +---------+        +-------------------+     |
|    |                                                     |      |         |        |                   |     |
|    |                                                     | <--- |   App   | <----  |      socket       |     |
|    |                                                     |      |         |        |                   |     |
|    +---------------------------------------------------- +      +---------+        +-------------------+     |
|    |          |          |          |         |          |           ^             |                   |     |
|    |    Page  |    Page  |    Page  |  Page   |   Page   |           |             |         ...       |     |
|    |          |          |          |         |          |           |             |                   |     |
|    +-----------------------------------------------------+           |             +-------------------+     |
|            ^                                                         |                      ^                |
|            |                                                         |                      |                |
|            |                                                         |                      |                |
|            +---------------------------------------------------------+----------------------+                |
|            |                                                                                                 |
|            |                                                                                                 |
|    +-----core------------------------------------------------------------------------------------------+     |
|    |                   |                   |                   |                   |                   |     |
|    |     message       |      preset       |      global       |       request     |       router      |     |
|    |                   |                   |                   |                   |                   |     |
|    +-------|---------------------|-------------------|-------------------|------------------|----------+     |
+------------|---------------------|-------------------|-------------------|------------------|----------------+
             |                     |                   |                   |                  +---> 路由切换
             |                     |                   |                   |
             |                     |                   |                   +----->网络请求
             |                     |                   |
             |                     |                   +---->用于处理全局状态, 会自动更新到本地存储, 应用启动时会提前恢复
             |                     |
             |                     +---->公共逻辑处理, 可以同步参与到应用的生命周期、 特定的动作中, 如路由变动, 请求成功等
             |
             +---->用于通知应用的各种状态变动(异步), 如: 全局数据变动, 网络切换, 应用或页面的各个生命周期等等
```


API

```ts
function $plugin(name: String | PluginFn, plugin?: PluginFn)

function PluginFn(core: Core): Object

interface Core {
    $message: {
        on(key:String, callback: Function): String,
        emit(key: String, data: Any),
        off(key: String),
        race(key: String, callback: FUnction)
    },
    $global: {
        read(key: String): Any,
        write(key: String, data: Any): Any,
        del(key: String),
        clean()
    },
    $router: {
        goto(path: String, data: Object): Promise,
        redirect(path: String, data: Object): Promise,
        switchto(tab: String): Promise,
        back(delta: Number): Promise
    },
    $request(url: String, data: Object): Promise,
    $take(lifetime: String, callback: Function)
}

```

可参与的生命周期
`app.onLaunch`
`app.onShow`
`app.onHide`
`app.onPageNotFound`
`app.onError`

`component.lifetimes.attached`
`component.lifetimes.detached`
`component.pageLifetimes.show`
`component.pageLifetimes.hide`
`component.pageLifetimes.resize`
`component.created`
`component.attached`
`component.ready`
`component.moved`
`component.detached`
`component.error`
