import * as $message from "./message"

let GLOBAL = {}

const info = wx.getStorageInfoSync()
info.keys.forEach((key) => {
    const value = wx.getStorageSync(key)
    if (value === null) return
    GLOBAL[key] = value
})

function initGlobal(init) {

    const sys = wx.getSystemInfoSync()
    GLOBAL.pixelRatio = sys.pixelRatio
    GLOBAL.statusBarHeight = sys.statusBarHeight
    // __GLOBAL_.titleHeight = sys.screenHeight - sys.windowHeight - sys.statusBarHeight
    GLOBAL.platform = sys.platform
    GLOBAL.weChatVersion = sys.version
    GLOBAL.screenHeight = sys.screenHeight
    GLOBAL.screenWidth = sys.screenWidth
    GLOBAL.pixelRatio = sys.pixelRatio
    GLOBAL.SDKVersion = sys.SDKVersion
    GLOBAL.model = sys.model
    GLOBAL.language = sys.language
    GLOBAL.system = sys.system
    GLOBAL.brand = sys.brand
    // const model = sys.model
    // __GLOBAL_.isIphoneX = model.search("iPhone X") !== -1
    const menuInfo = wx.getMenuButtonBoundingClientRect()
    GLOBAL.menuInfo = menuInfo
    if (menuInfo.height > 0) {
        GLOBAL.titleHeight = menuInfo.height + (menuInfo.top - sys.statusBarHeight) * 2
    } else {
        GLOBAL.titleHeight = 44
        if (GLOBAL.model === "iPhone X" || GLOBAL.model === "iPhone Xs" || GLOBAL.model === "iPhone 11" || GLOBAL.model === "iPhone 12") {
            GLOBAL.titleHeight = 88
        }
    }
    $message.on("app.onLaunch", () => {
        const menuInfo = wx.getMenuButtonBoundingClientRect()
        const titleHeight = menuInfo.height + (menuInfo.top - sys.statusBarHeight) * 2
        if (GLOBAL.titleHeight !== titleHeight) {
            write("titleHeight", menuInfo.height + (menuInfo.top - sys.statusBarHeight) * 2)
            $message.emit("log.info", "更新menuInfo", menuInfo)
        }
    })

    console.log(`本地存储数据(${info.currentSize}KB)`)

    setTimeout(() => {
        $message.emit("global.$$init$$", { ...GLOBAL, init })
    }, 0)
    // const returns = $tap("global.init")
    // if (typeof returns === "object") {
    //     Object.assign(GLOBAL, null, returns)
    // }
}
initGlobal(true)

export function read(key) {
    let obj = GLOBAL
    const keys = key.split(".")
    for (let index = 0; index < keys.length; index++) {
        const element = keys[index]
        if (obj[element] !== void 0 && obj[element] !== null)
            obj = obj[element]
        else
            if (index === keys.length - 1)
                return obj[element]
            else
                return void 0
    }
    return obj
}


export function write(key, value) {
    GLOBAL[key] = value
    $message.emit(`global.${key}`, value)
    wx.setStorage({
        key: key, data: value
    })
    return value
}

export function del(key) {
    delete GLOBAL[key]
    $message.emit(`global.${key}`, void 0)
    wx.removeStorage({
        key: key,
    })
}
export function clean() {
    wx.clearStorage({
        success() {
            GLOBAL = {}
            $message.emit("global.$$clean$$", void 0)
            // $tap("global.clean", null)
            initGlobal()
        }
    })
}
