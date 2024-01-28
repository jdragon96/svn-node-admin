# 1. based on Alpine linux
FROM node:slim

# 2.1 Update apk
RUN apk update
# 2.2. Nodejs
RUN apk add --no-cache subversion \ 
    apk add --no-cache vim

# 3. 폴더 아키텍트 구축
# 3.0 /app 폴더 생성 및 이동
WORKDIR /app
# 3.1 해당 폴더에 있는 모든 파일을 /app 폴더로 카피한다.
COPY . /app

# 4. 환경 구축
# 4.1. NodeJS 환경 구축
RUN yarn install
