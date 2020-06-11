import $call from "./call";
import * as $message from "./message";
import { $tap } from "./preset";

const OLD_PAGE = Page;
Page = function (config = {}) {
    config.data = config.data || {};
    let loadEventKeys = [];
    let showEventKeys = [];
    let eventKeys = loadEventKeys;

    config.$message = {
        ...$message,
        on(name, fn) {
            const key = $message.on(name, fn);
            eventKeys.push(key);
            return key;
        },
        race(name, fn) {
            const key = $message.on(name, fn);
            eventKeys.push(key);
            return key;
        },
    };

    if (config.onShareAppMessage) {
        config.onShare = config.onShareAppMessage;
        config.onShareAppMessage = function onShareAppMessage(res) {
            // if ($tap("page.onShareAppMessage.before", this, res)) {
            //     const returns = $call(config, "onShareAppMessage", this, res)
            //     return $tap("page.onShareAppMessage.after", this, returns, res)
            // }
            let returns;
            $tap("page.onShareAppMessage.before", this, (options) => {
                returns = $call(config, "onShare", this, options, (returns) => {
                    return $tap("page.onShareAppMessage.after", this, (a) => a, returns);
                });
            }, res);
            return returns;
        };

        OLD_PAGE({
            ...config,
            onLoad(options = {}) {
                // this.options = options
                // if ($tap("page.onLoad.before", this, true, options)) {
                //     const returns = $call(config, "onLoad", this, options)
                //     return $tap("page.onLoad.after", this, returns, options)
                // }
                $message.emit("page.onLoad", options);
                let returns;
                $tap("page.onLoad.before", this, (options) => {
                    returns = $call(config, "onLoad", this, options, (returns) => {
                        return $tap("page.onLoad.after", this, (a) => a, returns);
                    });
                }, options);
                return returns;
            },
            onShow(options) {
                eventKeys = showEventKeys;
                // if ($tap("page.onShow.before", this, true)) {
                //     const returns = $call(config, "onShow", this, options)
                //     eventKeys = loadEventKeys
                //     return $tap("page.onShow.after", this, returns)
                // }
                let returns;
                $tap("page.onShow.before", this, (options) => {
                    returns = $call(config, "onShow", this, options, (returns) => {
                        return $tap("page.onShow.after", this, (a) => a, returns);
                    });
                }, options);
                eventKeys = loadEventKeys;
                return returns;
            },
            onReady() {
                // if ($tap("page.onReady.before", this, true)) {
                //     const returns = $call(config, "onReady", this)
                //     return $tap("page.onReady.after", this, returns)
                // }
                let returns;
                $tap("page.onReady.before", this, (options) => {
                    returns = $call(config, "onReady", this, options, (returns) => {
                        return $tap("page.onReady.after", this, (a) => a, returns);
                    });
                });
                return returns;
            },
            onHide() {
                // showEventKeys.forEach($message.off)
                // showEventKeys = []
                // if ($tap("page.onHide.before", this, true)) {
                //     const returns = $call(config, "onHide", this)
                //     return $tap("page.onHide.after", this, returns)
                // }
                let returns;
                $tap("page.onHide.before", this, (options) => {
                    returns = $call(config, "onHide", this, options, (returns) => {
                        return $tap("page.onHide.after", this, (a) => a, returns);
                    });
                });
                return returns;
            },
            onUnload() {
                showEventKeys.forEach($message.off);
                loadEventKeys.forEach($message.off);
                loadEventKeys = [];
                showEventKeys = [];
                // if ($tap("page.onUnload.before", this, true)) {
                //     const returns = $call(config, "onUnload", this)
                //     return $tap("page.onUnload.after", this, returns)
                // }
                let returns;
                $tap("page.onUnload.before", this, (options) => {
                    returns = $call(config, "onUnload", this, options, (returns) => {
                        return $tap("page.onUnload.after", this, (a) => a, returns);
                    });
                });
                return returns;
            },
            onPullDownRefresh() {
                // if ($tap("page.onPullDownRefresh.before", this, true)) {
                //     const returns = $call(config, "onPullDownRefresh", this)
                //     return $tap("page.onPullDownRefresh.after", this, returns)
                // }
                let returns;
                $tap("page.onPullDownRefresh.before", this, (options) => {
                    returns = $call(
                        config,
                        "onPullDownRefresh",
                        this,
                        options,
                        (returns) => {
                            return $tap(
                                "page.onPullDownRefresh.after",
                                this,
                                (a) => a,
                                returns,
                            );
                        },
                    );
                });
                return returns;
            },
            onReachBottom() {
                // if ($tap("page.onReachBottom.before", this, true)) {
                //     const returns = $call(config, "onReachBottom", this)
                //     return $tap("page.onReachBottom.after", this, returns)
                // }
                let returns;
                $tap("page.onReachBottom.before", this, (options) => {
                    returns = $call(config, "onReachBottom", this, options, (returns) => {
                        return $tap("page.onReachBottom.after", this, (a) => a, returns);
                    });
                });
                return returns;
            },
            onPageScroll() {
                // if ($tap("page.onPageScroll.before", this, true)) {
                //     const returns = $call(config, "onPageScroll", this)
                //     return $tap("page.onPageScroll.after", this, returns)
                // }
                let returns;
                $tap("page.onPageScroll.before", this, (options) => {
                    returns = $call(config, "onPageScroll", this, options, (returns) => {
                        return $tap("page.onPageScroll.after", this, (a) => a, returns);
                    });
                });
                return returns;
            },
            onResize(size) {
                // if ($tap("page.onResize.before", this, true, size)) {
                //     const returns = $call(config, "onResize", this, size)
                //     return $tap("page.onResize.after", this, returns, size)
                // }
                let returns;
                $tap("page.onResize.before", this, (options) => {
                    returns = $call(config, "onResize", this, options, (returns) => {
                        return $tap("page.onResize.after", this, (a) => a, returns);
                    });
                }, size);
                return returns;
            },
            onTabItemTap(item) {
                // if ($tap("page.onTabItemTap.before", this, true, item)) {
                //     const returns = $call(config, "onTabItemTap", this, item)
                //     return $tap("page.onTabItemTap.after", this, returns, item)
                // }
                let returns;
                $tap("page.onTabItemTap.before", this, (options) => {
                    returns = $call(config, "onTabItemTap", this, options, (returns) => {
                        return $tap("page.onTabItemTap.after", this, (a) => a, returns);
                    });
                }, item);
                return returns;
            },
        });
    }
}
