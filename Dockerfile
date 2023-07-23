FROM node:lts
EXPOSE 8080 6006
WORKDIR /heat-app
COPY entry.sh /tmp/ 
COPY env/.env /heat-app/.env

# tmp폴더는 컨테이너가 실행되는 동안만 존재하는 임시 폴더이다.
# 여기서 작업명령을 내리더라도 WORKDIR로 지정한 /heat-app 폴더에서 실행된다
