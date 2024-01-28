라이브러리 추가
[개별]
$ yarn workspace projectA pkg-name@4.2.1
[전체]
$ yarn add pkg-name@4.2.1 -W

[예시]
yarn workspace @svn-admin/client axios

패키지에 의존성 추가하기
[A패키지를 B에서 사용하는 경우]
$ yarn workspace B add A

yarn workspace client dev


yarn 구축방법
1. root에 yarn init 후, 옵션 설정
2. packages 폴더에 개별 패키지 설치
3. root에서 yarn install


SVN
$ svnserve -d -r /home/ubuntu/repo --listen-port 5335

$ ps -ef | grep svn | grep -v grep

/etc/sysconfig/svnserve 파일 확인
$ cat /etc/sysconfig/svnserve
# OPTIONS is used to pass command-line arguments to svnserve.
# 
# Specify the repository location in -r parameter:
OPTIONS="-r /var/svn"


/etc/sysconfig/svnserve 파일 수정 
OPTIONS="--threads -r /home/svn --listen-port 5335"