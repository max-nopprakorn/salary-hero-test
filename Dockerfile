FROM node:14-alpine3.12

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 8080

CMD [ "npm", "run", "start:dev" ]

# RUN npm install -g nodemon

# CMD [ "nodemon", "index.js" ]
