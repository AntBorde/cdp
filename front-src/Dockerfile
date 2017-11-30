FROM node:9

USER node

WORKDIR /home/node

COPY ./package.json .

COPY ./package-lock.json .

RUN npm install

EXPOSE 4200
