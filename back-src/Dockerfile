FROM node:9

USER node

WORKDIR /home/node/app

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY app.js .
COPY db.js .

EXPOSE 3000

CMD ["npm", "run", "docker-dev"]
