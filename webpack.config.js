const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// * create pages arrat
const pages = ['index'];
// * object scripts entry
const entryObject = {};
pages.forEach((page) => {
 entryObject[page] = path.resolve(__dirname, `src/ts/${page}/index.ts`);
});
module.exports = {
 // * mode
 mode: 'production',
 // * set entry
 entry: entryObject,
 // * set output
 output: {
  path: path.resolve(__dirname, 'dist'),
  filename: './[name][contenthash].js',
  clean: true,
  assetModuleFilename: '[name][ext]',
 },
 devtool: 'source-map',
 devServer: {
  static: {
   directory: path.resolve(__dirname, 'dist'),
  },
  port: 3000,
  open: true,
  hot: true,
  compress: true,
  historyApiFallback: true,
 },
 resolve: {
  extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', 'css'],
 },
 module: {
  rules: [
   // * sass compile and css loaders
   {
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
   },
   // * babel compile and backward compability
   {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: {
     loader: 'babel-loader',
     options: {
      presets: ['@babel/preset-env', '@babel/preset-react'],
     },
    },
   },
   // * compile typeScript files
   {
    test: /\.(ts|tsx)$/,
    use: 'ts-loader',
    exclude: /node_modules/,
   },
   // * import images
   {
    test: /\.(png|svg|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
   },
  ],
 },
 // * create html pages
 plugins: pages.map((page) => {
  return new HtmlWebpackPlugin({
   title: page,
   filename: `${page}.html`,
   template: `src/${page}.html`,
   chunks: [page],
  });
 }),
};
