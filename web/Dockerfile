FROM node:9

RUN mkdir /home/node/app

WORKDIR /home/node/app

RUN npm install forever -g

COPY ./package.json /home/node/app

RUN cd /home/node/app && npm install

COPY . /home/node/app

USER node

EXPOSE 3000

CMD ["forever","./bin/www", "-w"]