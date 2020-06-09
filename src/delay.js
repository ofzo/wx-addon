
import * as $message from "./message"
export default function delay(timeout = 1000, id) {
    return new Promise(resolve => {
        const timeId = setTimeout(resolve, timeout)
        id && $message.race(`delay.${id}`, () => {
            clearTimeout(timeId)
        })
    })
}
