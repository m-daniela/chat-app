FROM node:14.15.0

WORKDIR /chat-app/zephon

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]