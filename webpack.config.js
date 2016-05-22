var path = require("path")

module.exports = {
    entry: {
        app: [
            "./src/main.js"
        ]
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /nodes_modules/,
                loaders: ["babel", "eslint"],
                preset: "es2015"
            }
        ]
    }
}
