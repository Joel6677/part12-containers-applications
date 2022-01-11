FROM node:16

USER node
  
WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci 

RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache

ENV DEBUG=playground:*

CMD npm start