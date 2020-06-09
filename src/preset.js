const lifetimeFn = {}
let APP_INIT = false

export function $tap(lifetime, instance, callback = a => a, initParams) {
    if (lifetimeFn[lifetime])
        return lifetimeFn[lifetime].map(fn => fn.bind(instance)).reduce((cb1, cb2) => {
            return (value) => cb2(value, cb1)
        }, callback)(initParams) // 倒序串行, callback 最后执行, return决定返回值, next决定调用链
    else return callback(initParams)
}
export default function $preset(lifetime, callback) {
    if (APP_INIT) return console.warn("不能在小程序已初始化完成之后参与应用的生命周期")
    if (typeof callback === "function") {
        if (!Array.isArray(lifetimeFn[lifetime])) {
            lifetimeFn[lifetime] = []
        }
        lifetimeFn[lifetime].push(callback)
    }
}

export function appInit() {
    APP_INIT = true
}
