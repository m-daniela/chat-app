FROM node:14.15.0

WORKDIR /chat-app/server

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "server"]