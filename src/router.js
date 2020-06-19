import { $tap } from "./preset"


function format(data = {}) {
    const entries = Object.entries(data)
    if (entries.length === 0) {
        return ""
    }
    return "?" + entries.map(([key, value]) => {
        if (value === void 0 || value === "") {
            return ""
        }
        return `${key}=${value}`
    }).join("&")
}

/**
 * 跳转到 `page` 页面并向 `page` 页面传递数据
 * @param {string} page 要跳转到的页面
 * @param {object} data 要传递的数据
 * @returns {Promise}
 */
export function goto(page, data = {}) {
    // $setState(page, data)
    const currentPage = getCurrentPages().pop()
    return $tap("router.goto.before", currentPage, () => {
        return new Promise((resolve, reject) => {
            wx.navigateTo({
                url: page + format(data),
                success() {
                    $tap("router.goto.success", currentPage, () => {
                        resolve()
                    })
                },
                fail(err) {
                    $tap("router.goto.fail", currentPage, () => {
                        reject(err)
                    })
                }
            })
        })
    }, { page, data })
}

/**
 * 向前返回 `delta` 数量的页面，并向目标页面传递数据
 * @param {number} delta
 */
export function back(delta = 1) {
    const currentPage = getCurrentPages().pop()
    return $tap("router.back.before", currentPage, () => {
        return new Promise((resolve, reject) => {
            wx.navigateBack({
                delta,
                success() {
                    $tap("router.back.success", currentPage, () => {
                        resolve()
                    })
                },
                fail(err) {
                    $tap("router.back.fail", currentPage, () => {
                        reject(err)
                    })
                }
            })
        })
    }, { delta })
}
/**
 *  替换当前页面
 * @param {string} page
 * @param {*} data
 */
export function redirect(page, data = {}) {
    const currentPage = getCurrentPages().pop()
    return $tap("router.redirect.before", currentPage, () => {
        return new Promise((resolve, reject) => {
            wx.redirectTo({
                url: page + format(data),
                success() {
                    $tap("router.redirect.success", currentPage, () => {
                        resolve()
                    })
                },
                fail(err) {
                    $tap("router.redirect.fail", currentPage, () => {
                        reject(err)
                    })
                }
            })
        })
    }, { page, data })
}
export function switchto(tab) {
    const currentPage = getCurrentPages().pop()
    return $tap("router.switchto.before", currentPage, () => {
        return new Promise((resolve, reject) => {
            wx.switchTab({
                url: tab,
                success() {
                    $tap("router.switchto.success", currentPage, () => {
                        resolve()
                    })
                },
                fail(err) {
                    $tap("router.switchto.fail", currentPage, () => {
                        reject(err)
                    })
                }
            })
        })
    }, { tab })
}
