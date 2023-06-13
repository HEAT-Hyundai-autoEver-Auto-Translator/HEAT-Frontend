FROM node:lts
RUN npm install -g yarn
EXPOSE 8080
WORKDIR /app
COPY entry.sh /tmp/
