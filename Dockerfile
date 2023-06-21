FROM node:lts
EXPOSE 8080 6006
WORKDIR /heat-app
COPY entry.sh /tmp/
COPY env/.env /heat-app/.env