1. Webpack 환경구축
> https://typescript-kr.github.io/pages/tutorials/react-&-webpack.html
> https://imranhsayed.medium.com/set-up-react-app-with-webpack-webpack-dev-server-and-babel-from-scratch-df398174446d
> https://taenami.tistory.com/125

[절대경로 세팅]
>https://ryuhojin.tistory.com/24

1.1 의존성 설치
```
mkdir dist
mkdir src
cd src
mkdir components
cd ..
yarn add react react-dom
yarn add react-router-dom
yarn add -D @types/react @types/react-dom ts-loader typescript source-map-loader
yarn add -D babel-loader @babel/core 
yarn add -D @babel/preset-react @babel/preset-env @babel/preset-typescript
yarn add -D webpack webpack-cli webpack-dev-server
yarn add -D html-webpack-plugin clean-webpack-plugin

yarn add @mui/material @emotion/react @emotion/styled
yarn add @mui/icons-material @mui/material @emotion/styled @emotion/react
```

1.2 tsconfig.json 작성
```
tsc --init
{
  "compilerOptions": {
    "outDir": "./dist/",
    "sourceMap": true,
    "noImplicitAny": true,
    "module": "commonjs",
    "target": "es6",
    "jsx": "react"
  }
}
```

1.3 webpack devserver
```
yarn add -D webpack-dev-server

```