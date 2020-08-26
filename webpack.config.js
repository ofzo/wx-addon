const path = require("path")
const webpack = require("webpack")
webpack({
    mode: "production",
    entry: "./src/main.js",
    output: {
        filename: "index.js",
        libraryTarget: "commonjs2",
        path: path.resolve(__dirname)
    },
    resolve: {
        extensions: [".js", ".json"],
    },
    devtool: "source-map",
    module: {
        rules: [{
            test: /\.js$/,
            loader: "babel-loader",
            options: {},
        }]
    }
}).run((err, stats) => {
    if (err) {
        console.error(err.stack || err)
        if (err.details) {
            console.error(err.details)
        }
        return
    }

    const info = stats.toJson()

    if (stats.hasErrors()) {
        console.error(info.errors)
    }

    if (stats.hasWarnings()) {
        console.warn(info.warnings)
    }
    process.stdout.write(stats.toString({
        all: false,
        assets: true,
        colors: true,
    }) + "\n")
})
