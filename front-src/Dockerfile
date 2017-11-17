FROM node:9

USER node

RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY ./package.json .

COPY ./package-lock.json .

RUN npm install

COPY . .

EXPOSE 4200

CMD ["npm","start"]
