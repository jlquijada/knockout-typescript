# Example of use of Knockout with TypeScript

Based on the example found in [Using TypeScript With Knockout](https://keepinguptodate.com/pages/2019/12/using-typescript-with-knockout/)

## Setting up the project

Run the following commands in the parent directory for your project:

`mkdir project-name`

`cd project-name`

`npm init -y`

`git init && git add . && git commit -m "Initial commit"`

`npm i --save knockout`

`npm i --save-dev typescript`

`npm i --save-dev webpack webpack-cli webpack-dev-server html-webpack-plugin error-overlay-webpack-plugin html-loader`

`npm i --save-dev @babel/core @babel/preset-env @babel/preset-typescript @babel/plugin-proposal-class-properties babel-loader`

`npm i --save-dev css-loader dart-sass sass-loader style-loader mini-css-extract-plugin`

## Adding the index.html file

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Knockout TypeScript</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa" crossorigin="anonymous"></script>
</head>

<body>
    <main class="container-fluid">
        <h1 class="mt-4">Using TypeScript With Knockout</h1>

        <!-- The element Knockout will bind to -->
        <div id="app">

        </div>
    </main>
</body>

</html>
```

## Adding the src/style.scss file

For example:

```scss
#app {
    background-color: #f5f5f5;
}
```

## Adding the src/index.ts file

For example:

```typescript
import './style.scss';
import * as ko from 'knockout';

class AppViewModel {
    constructor() {
        )
    }
}


ko.applyBindings(
    new AppViewModel(),
    document.getElementById('app'));
```

## Adding the scripts to package.json

```json
{
    "scripts": {
        "serve": "webpack-dev-server",
        "serve-o": "webpack-dev-server --open",
        "build": "webpack --mode production"
    },
}
```

## Adding the .babelrc file

```json
{
    "presets": [
        "@babel/preset-env",
        "@babel/typescript"
    ],
    "plugins": [
        "@babel/proposal-class-properties"
    ]
}
```

## Configure webpack.config.js

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'development',
    entry: {
        app: './src/index.ts'
    },
    devtool: 'source-map', // Generate separate source map files
    devServer: {
        static: path.join(__dirname, 'dist'),
        liveReload: true,
        port: 3000,
        devMiddleware: {
            publicPath: 'http://localhost:3000/'
        }
    },
    plugins: [
        new ErrorOverlayPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new MiniCssExtractPlugin({
            linkType: "text/css",
            filename: "[name].css",
            chunkFilename: "[id].css",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ]
            },
            {
                test: /\.(js|ts)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.html$/, // All Knockout.js component HTML templates
                use: 'html-loader' // Adds the component templates to the bundle
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.ts']
    }
};

```
