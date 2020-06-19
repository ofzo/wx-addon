import * as $message from "./message"
import { $tap } from "./preset"

export default function request(url, data, method, cancelId) {
    Object.entries(data).forEach(([key, value]) => {
        if (value === void 0) console.error(`请求的数据中包含 \`${key} = ${void 0}\`, 请检查是否有误`)
    })

    const options = {
        url,
        data,
        method,
        header: {},
    }

    return $tap("request.before", null, () => {
        return new Promise((resolve, reject) => {
            const task = wx.request({
                ...options,
                success: (res) => {
                    $message.emit("request.success", { options, res })
                    $tap("request.success", null, ({ res }) => {
                        resolve(res.data)
                    }, { options, res, resolve, reject })
                },
                fail(error) {
                    $message.emit("request.fail", { options, error })
                    $tap("request.fail", null, ({ error }) => {
                        reject(error)
                    }, { options, error, resolve, reject })
                },
                complete() {
                    $tap("request.complete", null, a => a, { options })
                }
            })
            $tap("request.after", null, a => a, task)
            if (cancelId)
                $message.race(`request.abort.${cancelId}`, () => {
                    $tap("request.abort", null, () => {
                        task.abort()
                        reject(0)
                    }, task)
                })
        })
    }, options)
}
