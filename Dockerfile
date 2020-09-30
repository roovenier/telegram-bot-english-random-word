FROM node:12.13-alpine

RUN mkdir /app

WORKDIR /app

COPY . .

RUN npm install

CMD ["npm", "run", "start"]
