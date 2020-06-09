export default function $call(object, keyPath, thisObject, args, callback = a => a) {
    let obj = object
    const keys = keyPath.split(".")
    for (let index = 0; index < keys.length; index++) {
        if (obj[keys[index]])
            obj = obj[keys[index]]
        else return callback(args)
    }
    if (typeof obj === "function")
        return callback(obj.call(thisObject, args))
}
