// import "./src/login"
import "./App"
import "./Component"
import * as $global from "./global"
import * as $message from "./message"
import "./Page"
import $preset from "./preset"
import $request from "./request"
import * as $router from "./router"

Promise.prototype.finally = function (callback) {
    const P = this.constructor
    return this.then(
        value => P.resolve(callback()).then(() => value),
        reason => P.resolve(callback()).then(() => { throw reason })
    )
}

/**
 * 检查小程序是否有更新
 * @returns Promise
 */
function $checkUpdate() {
    const update_manager = wx.getUpdateManager()
    // 监听向微信后台请求检查更新结果事件。
    update_manager.onCheckForUpdate(function (res) {
        $message.emit("app.update", res)
    })
    // 监听小程序有版本更新事件
    update_manager.onUpdateReady(function () {
        $message.emit("app.update.ready", update_manager.applyUpdate)
    })
    // 监听小程序更新失败事件
    update_manager.onUpdateFailed(function (err) {
        $message.emit("app.update.fail", err)
    })
}

function getNetworkType() {
    wx.getNetworkType({
        success: res => {
            if (res.networkType === "none") {
                $message.emit("net.fail", res)
            } else {
                $message.emit("net.change", res.networkType)
            }
        },
        fail: err => {
            $message.emit("net.error", err)
        }
    })
}

/**
 * 检查小程序网络状况
 */
function $checkNetwork() {
    getNetworkType()
    wx.onNetworkStatusChange(() => {
        getNetworkType()
    })
}

$checkUpdate()
$checkNetwork()


App.$router = $router

App.$read = $global.read
App.$write = $global.write
App.$del = $global.del
App.$clean = $global.clean

App.$on = $message.on
App.$race = $message.race
App.$emit = $message.emit
App.$off = $message.off

const $core = { $message, $global, $router, $request, $take: $preset }

export function $plugin(plugin) {
    if (typeof plugin === "function") plugin($core)
    else console.error("plugin 应该是一个函数")
}
