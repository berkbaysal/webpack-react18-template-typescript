const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = function (env, argv) {
    const isProduction = argv.mode === "production";
    const isDevelopment = !isProduction;

    return {
        entry:  "./src/index.tsx",
        output: {
            path: path.join(__dirname, '/dist'),
            filename: '[name][contenthash:8].js',
            publicPath: (isDevelopment ? "/" : "../")
        },
        devServer: {
            port: 9000,
            historyApiFallback: true
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js"]
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    test: /\.(ts|tsx)$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: "ts-loader"
                        }
                    ]
                },
                {
                    test: /\.scss$/,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : "style-loader",
                        "css-loader",
                        "sass-loader"
                    ],
                },
                {
                    test: /\.(png|jpg|jpeg|gif)/,
                    loader: "file-loader",
                    options: {
                        outputPath: "./assets/img",
                        publicPath: "../assets/img"
                    }
                },
                {
                    test: /\.svg$/i,
                    issuer: /\.[jt]sx?$/,
                    use: ['@svgr/webpack'],
                }

            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "assets/css/[name][contenthash:8].css"
            }),
            new HtmlWebpackPlugin({
                template: './public/index.html',
                filename: (isDevelopment ? "index.html" : "./public/index.html")
            })
        ]
    };

}