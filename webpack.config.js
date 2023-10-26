
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'development';
var HtmlWebpackPlugin = require('html-webpack-plugin');


  const babelOptions = {
      presets: ['@babel/preset-env','@babel/preset-react', '@babel/preset-typescript'], 
      //options: {
      //      compilerOptions: {
      //          "noEmit": false
      //      }
      //}
  };


module.exports = {
    
    entry: {//The first module we start building a dependency graph around
        'build/bundle': ['./src/main.js']
    },
    resolve: {
        alias: { //changes paths when we query for modules
            svelte: path.resolve('node_modules', 'svelte/src/runtime')
        },
        extensions: [".tsx", '.js', '.svelte', ".ts", '.mjs', ".jsx" ], //what file extensions we can viably resolve
        fallback: { //I think it goes to that stupid directory page because of browserify
         "http": require.resolve("stream-http"), //I had to install these as packages from npm like "npm i path-browserify"
         "path": require.resolve("path-browserify")
        },
        mainFields: ['svelte', 'browser', 'module', 'main'],
        conditionNames: ['svelte', 'browser', 'import']
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
                    emitCss: true,
                    hotReload: !prod
                }
            }
        },
            {
              test: /\.jsx?$/,
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
                options: { allowTsInNodeModules: true,
                    compilerOptions: {
                        "noEmit": false,

                    },
                },
              }],
              exclude:[/server/,
                  /node_modules\/(?!vscode)/,
                  /node_modules\/(?!monaco_editor)/,
                  /node_modules\/(?!lean4)/,
                  /ClientFiles\/m-editor\/(?!abbreviation)/
              ], // Allow .ts imports from node_modules/lean4
            },
            {
              test: /\.tsx?$/,
                include: [
                  /server/,
                  /node_modules\/(?!vscode)/,
                  /node_modules\/(?!monaco_editor)/,
                  /node_modules\/(?!lean4)/,
                  /ClientFiles\/m-editor\/(?!abbreviation)/
                ],
              use: [{
                loader: 'ts-loader',
                options: { allowTsInNodeModules: true,
                    compilerOptions: {
                        "noEmit": true,

                    },
                },
              }]
            },
            {
              test: /\.svg$/,
              issuer: /\.[jt]sx?$/,
              use: [{
                loader: "@svgr/webpack",
                options: { dimensions: false }
              },
              ],
            },
        {
            test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]

        }
    	]
    },
    mode,
    plugins: [
		new MiniCssExtractPlugin({
			filename: 'styles.css'
		}),
    new HtmlWebpackPlugin()
        //new CopyPlugin({ //TODO
         // patterns: [
          //{
            //context: path.resolve(__dirname, 'client', 'public'),
            //from: 'index.html',
          //},
          //  {
          //  context: path.resolve(__dirname, 'client', 'public'),
          //  from: 'onigasm.wasm',
          //},
          //{
          //  context: path.resolve(__dirname, 'client', 'public', 'examples'),
          //  from: '**/*',
          //  to: 'examples/',
          //}, 
          //{
          //  context: path.resolve(path.dirname(require.resolve('@leanprover/infoview/package.json')), 'dist'),
          //  from: '*.production.min.js',
          //},
        //]
        //}),
        //prod && new ReactRefreshWebpackPlugin(),

    ],
    devtool: prod ? false : 'source-map',
    devServer: {
        hot: true,
        static: {
            directory: path.join(__dirname, 'public'),
        }
    }
};
