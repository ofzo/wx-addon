import { createKey } from "./createKey"

// 构造EventBus
const EVENT_HANDLER = {}


/**
 * @description: 将消息保存到当前的消息队列中
 * @param {string} 事件名称
 * @param {function} 触发执行的回调
 */
export function on(name, func) {

    if (!EVENT_HANDLER[name]) {
        EVENT_HANDLER[name] = {}
    }
    const key = createKey()
    EVENT_HANDLER[name][key] = func
    return key
}
/**
 * @description: 发送消息/触发事件
 * @param {string} 事件名称
 * @param {any} 传递的数据
 */
export function emit(name, ...msg) {
    if (typeof name === "string") {
        if (!EVENT_HANDLER[name]) return
        console.log(`[收到消息 ${name} ] `, ...msg)
        Object.values(EVENT_HANDLER[name]).forEach(fn => {
            setTimeout(fn, 10, ...msg)
        })
    }
}
/**
 * @description: 移除监听某个消息触发的某个事件
 * @param {String | Function} name
 */
export function off(name) {
    Object.values(EVENT_HANDLER).forEach(e => {
        Object.entries(e).forEach(([key, fn]) => {
            if (key === name || fn === name) {
                delete e[key]
            }
        })
    })
}

export function race(key, fn) {
    return on(key, (message) => {
        fn(message)
        off(fn)
    })
}
