FROM node:21.6.1

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 4005

CMD ["npm","start"]
