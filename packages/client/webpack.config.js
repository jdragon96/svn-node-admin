// https://taenami.tistory.com/125

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require("path");
const webpack = require('webpack');

module.exports = (env, argv) => {
  const prod = argv.mode === "development";
    
  return {
    mode: prod ? "production" : "development",
    // devtool: prod ? "hidden-source-map" : "eval",
    devtool: "inline-source-map",
    // 프로그램 엔트리포인트
    entry: "./src/index.tsx",
    // 번들링 출력 경로 및 파일이름 설정
    output: {
      // 파일 출력 경로
      path: path.join(__dirname, "./dist"),
      // https://webpack.kr/guides/public-path/
      // 모든 세셋에 대한 기본 경로를 지정할 수 있음
      // output.path  디렉터리로 내보내는 모든 파일은 output.publicPath 에서 참조됨
      // publicPath: "./",
      // 번들링 될 파일 이름
      filename: "main.js",
    },
    // 개발용 서버
    // port: 포트
    // hot: Hot module replacement 기능 활성화
    devServer: {
      port: 5005,
      hot: true,
      // https://www.robinwieruch.de/webpack-react-router/
      // webpack은 root(/) 경로밖에 모름. 따라서, 각 router 값을 저장해야 함
      historyApiFallback: true,
    },
    // 허용되는 파일 확장자
    resolve: {
      // 절대경로 설정
      // tsconfig.json에서 baseUrl/Paths/include 또한 설정해야 한다.
      alias: {
        "@": path.resolve(__dirname, "./src/"),
      },
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    // 
    module: {
      rules: [
      {
        test: /\.(tsx|ts)$/,
        use: ["babel-loader", "ts-loader"],
        exclude: /node_modules/,
      },
      ],
    },
    plugins: [
      // 자주 사용되는 모듈을 미리 등록하여 매번 작성하지 않게 하는 플러그인
      new webpack.ProvidePlugin({
        React: "react",
      }),
      // 1. HTML 파일에 번들링 된 자바스크립트 파일을 삽입
      // 2. 플러그인으로 빌드하면 HTML 파일로 아웃풋에 생성
      new HtmlWebpackPlugin({
        template: './public/index.html',
        minify: process.env.NODE_ENV === 'production' ? {
          collapseWhitespace: true, // 빈칸 제거
          removeComments: true, // 주석 제거
        } : false,
      }),
      // new HtmlWebpackPlugin(),
      // 번들링을 할 때마다 이전 번들링 결과를 제거
      new CleanWebpackPlugin(),
    ],
  }
};