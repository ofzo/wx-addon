import $call from "./call"
import * as $message from "./message"
import { $tap } from "./preset"


const OLD_COMPONENT = Component
Component = function (config) {
    let lifetimes
    if (config.lifetimes) {

        lifetimes = {
            ...config.lifetimes || {},
            created(options) {
                $message.emit("component.lifetimes.created", options)
                let returns
                $tap("component.lifetimes.created.before", this, (options) => {
                    returns = $call(config, "lifetimes.created", this, options, (returns) => {
                        return $tap("component.lifetimes.created.after", this, a => a, returns)
                    })
                }, options)
                return returns
            },
            attached(options) {
                $message.emit("component.lifetimes.attached", options)
                let returns
                $tap("component.lifetimes.attached.before", this, (options) => {
                    returns = $call(config, "lifetimes.attached", this, options, (returns) => {
                        return $tap("component.lifetimes.attached.after", this, a => a, returns)
                    })
                }, options)
                return returns
            },
            detached() {
                $message.emit("component.lifetimes.detached")
                let returns
                $tap("component.lifetimes.detached.before", this, (options) => {
                    returns = $call(config, "lifetimes.detached", this, options, (returns) => {
                        return $tap("component.lifetimes.detached.after", this, a => a, returns)
                    })
                })
                return returns
            },
            ready() {
                $message.emit("component.lifetimes.ready")
                let returns
                $tap("component.lifetimes.ready.before", this, (options) => {
                    returns = $call(config, "lifetimes.ready", this, options, (returns) => {
                        return $tap("component.lifetimes.ready.after", this, a => a, returns)
                    })
                })
                return returns
            },
            moved() {
                $message.emit("component.lifetimes.moved")
                let returns
                $tap("component.lifetimes.moved.before", this, (options) => {
                    returns = $call(config, "lifetimes.moved", this, options, (returns) => {
                        return $tap("component.lifetimes.moved.after", this, a => a, returns)
                    })
                })
                return returns
            },
            error(error) {
                $message.emit("component.lifetimes.error")
                let returns
                $tap("component.lifetimes.error.before", this, (options) => {
                    returns = $call(config, "lifetimes.error", this, options, (returns) => {
                        return $tap("component.lifetimes.error.after", this, a => a, returns)
                    })
                }, error)
                return returns
            }
        }
        if (!config.lifetimes.created && config.created) {
            delete lifetimes.created
        }
        if (!config.lifetimes.attached && config.attached) {
            delete lifetimes.attached
        }
        if (!config.lifetimes.detached && config.detached) {
            delete lifetimes.detached
        }
        if (!config.lifetimes.moved && config.moved) {
            delete lifetimes.moved
        }
        if (!config.lifetimes.error && config.error) {
            delete lifetimes.error
        }
    }
    OLD_COMPONENT({
        ...config,
        lifetimes,
        pageLifetimes: {
            ...config.pageLifetimes || {},
            show: function () {
                // 页面被展示
                $message.emit("component.pageLifetimes.show")
                let returns
                $tap("component.pageLifetimes.show.before", this, (options) => {
                    returns = $call(config, "pageLifetimes.show", this, options, (returns) => {
                        return $tap("component.pageLifetimes.show.after", this, a => a, returns)
                    })
                })
                return returns
            },
            hide: function () {
                // 页面被隐藏
                $message.emit("component.pageLifetimes.hide")
                let returns
                $tap("component.pageLifetimes.hide.before", this, (options) => {
                    returns = $call(config, "pageLifetimes.hide", this, options, (returns) => {
                        return $tap("component.pageLifetimes.hide.after", this, a => a, returns)
                    })
                })
                return returns
            },
            resize: function (size) {
                // 页面尺寸变化
                $message.emit("component.pageLifetimes.resize", size)
                let returns
                $tap("component.pageLifetimes.resize.before", this, (options) => {
                    returns = $call(config, "pageLifetimes.resize", this, options, (returns) => {
                        return $tap("component.pageLifetimes.resize.after", this, a => a, returns)
                    })
                }, size)
                return returns
            }
        },
        created(options) {
            $message.emit("component.created", options)
            let returns
            $tap("component.created.before", this, (options) => {
                returns = $call(config, "created", this, options, (returns) => {
                    return $tap("component.created.after", this, a => a, returns)
                })
            }, options)
            return returns
        },
        attached() {
            $message.emit("component.attached")

            let returns
            $tap("component.attached.before", this, (options) => {
                returns = $call(config, "attached", this, options, (returns) => {
                    return $tap("component.attached.after", this, a => a, returns)
                })
            })
            return returns
        },
        ready() {
            $message.emit("component.ready")
            let returns
            $tap("component.ready.before", this, (options) => {
                returns = $call(config, "ready", this, options, (returns) => {
                    return $tap("component.ready.after", this, a => a, returns)
                })
            })
            return returns
        },
        moved() {
            // if ($tap("component.moved.before", this, true)) {
            //     const returns = $call(config, "moved", this)
            //     return $tap("component.moved.after", this, returns)
            // }
            $message.emit("component.moved")
            let returns
            $tap("component.moved.before", this, (options) => {
                returns = $call(config, "moved", this, options, (returns) => {
                    return $tap("component.moved.after", this, a => a, returns)
                })
            })
            return returns
        },
        detached() {
            // if ($tap("component.detached.before", this, true)) {
            //     const returns = $call(config, "detached", this)
            //     return $tap("component.detached.after", this, returns)
            // }
            $message.emit("component.detached")
            let returns
            $tap("component.detached.before", this, (options) => {
                returns = $call(config, "detached", this, options, (returns) => {
                    return $tap("component.detached.after", this, a => a, returns)
                })
            })
            return returns
        },
        error(error) {
            $message.emit("component.error")
            let returns
            $tap("component.error.before", this, (options) => {
                returns = $call(config, "error", this, options, (returns) => {
                    return $tap("component.error.after", this, a => a, returns)
                })
            }, error)
            return returns
        }
    })
}
