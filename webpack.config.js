const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

  const babelOptions = {
      presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
    plugins: [
      isDevelopment && require.resolve('react-refresh/babel'),
    ].filter(Boolean),
  };


module.exports = {
    entry: {//The first module we start building a dependency graph around
        'build/bundle': ['./src/main.js']
    },
    resolve: {
        alias: { //changes paths when we query for modules
            svelte: path.resolve('node_modules', 'svelte/src/runtime')
        },
        extensions: ['.mjs', '.js', '.svelte', ".jsx", ".tsx", ".ts"], //what file extensions we can viably resolve
        fallback: {
         "http": require.resolve("stream-http"), //I had to install these as packages from npm like "npm i path-browserify"
         "path": require.resolve("path-browserify")
        },
        mainFields: ['svelte', 'browser', 'module', 'main'],
        conditionNames: ['svelte', 'browser']
    },
    output: {
        path: path.join(__dirname, '/public'),
        filename: '[name].js',
        chunkFilename: '[name].[id].js'
    },
    module: {
    rules: [
        {
            test: /\.svelte$/,
            use: {
                loader: 'svelte-loader',
                options: {
                    compilerOptions: {
                        dev: !prod
                    },
                    emitCss: prod,
                    hotReload: !prod
                }
            }
        },
        {
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader'
            ]
            },
            {
              test: /\.(js|jsx)$/,
              exclude: [/server/, /node_modules/],
              use: [{
                loader: require.resolve('babel-loader'),
                options: babelOptions,
              }]
            },
            {
              test: /\.tsx?$/,
              use: [{
                loader: 'ts-loader',
                options: { allowTsInNodeModules: true }
              }],
              exclude:[/server/, /node_modules\/(?!lean4)/], // Allow .ts imports from node_modules/lean4
            },
            {
              test: /\.css$/,
              use: ["style-loader", "css-loader"]
            },
            {
              test: /\.svg$/i,
              issuer: /\.[jt]sx?$/,
              use: [{
                loader: "@svgr/webpack",
                options: { dimensions: false }
              }],
            }
    	]
    },
    mode,
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new CopyPlugin({
          patterns: [{
            context: path.resolve(__dirname, 'client', 'public'),
            from: 'index.html',
          }, {
            context: path.resolve(__dirname, 'client', 'public'),
            from: 'onigasm.wasm',
          }, {
            context: path.resolve(__dirname, 'client', 'public', 'examples'),
            from: '**/*',
            to: 'examples/',
          }, {
            context: path.resolve(path.dirname(require.resolve('@leanprover/infoview/package.json')), 'dist'),
            from: '*.production.min.js',
          }, {
            context: path.resolve(__dirname, 'client', 'public'),
            from: 'favicon.ico',
          }]
        }),
        isDevelopment && new ReactRefreshWebpackPlugin(),

    ].filter(Boolean),
    devtool: prod ? false : 'source-map',
    devServer: {
        hot: true,
        static: {
            directory: path.join(__dirname, 'public'),
        }
    }
};
