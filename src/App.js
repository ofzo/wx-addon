import $call from "./call"
import * as $message from "./message"
import { $tap, appInit } from "./preset"

const OLD_APP = App
/**
 * 初始化小程序
 * @param {APPConfig} config 小程序配置
 * @typedef {Object} APPConfig
 * @property {Function} onLaunch
 * @returns
 */
App = function (config = {}) {
    appInit()
    OLD_APP({
        ...config,
        onLaunch(options) {
            this.options = options
            $message.emit("app.onLaunch", options)
            let returns
            $tap("app.onLaunch.before", this, (options) => {
                returns = $call(config, "onLaunch", this, options, (returns) => {
                    return $tap("app.onLaunch.after", this, a => a, returns)
                })
            }, options)
            return returns
        },
        onShow(options) {
            $message.emit("app.onShow", options)
            let returns
            $tap("app.onShow.before", this, (options) => {
                returns = $call(config, "onShow", this, options, (returns) => {
                    return $tap("app.onShow.after", this, a => a, returns)
                })
            }, options)
            return returns
        },
        onHide() {
            $message.emit("app.onHide")
            let returns
            $tap("app.onHide.before", this, (options) => {
                returns = $call(config, "onHide", this, options, (returns) => {
                    return $tap("app.onHide.after", this, a => a, returns)
                })
            })
            return returns
        },
        onPageNotFound(error) {
            $message.emit("app.onPageNotFound", error)
            let returns
            $tap("app.onPageNotFound.before", this, (options) => {
                returns = $call(config, "onPageNotFound", this, options, (returns) => {
                    return $tap("app.onPageNotFound.after", this, a => a, returns)
                })
            }, error)
            return returns
        },
        onError(error) {
            $message.emit("app.onError", error)
            let returns
            $tap("app.onError.before", this, (options) => {
                returns = $call(config, "onError", this, options, (returns) => {
                    return $tap("app.onError.after", this, a => a, returns)
                })
            }, error)
            return returns
        }
    })
}
