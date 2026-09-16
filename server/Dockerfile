FROM node:26-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

CMD ["npx", "nodemon", "src/index.js"]