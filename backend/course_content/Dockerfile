FROM node:21.6.1

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 4003

CMD ["npm","start"]

# RUN addgroup app && adduser -S app -G app
# USER app

# WORKDIR /app
# COPY --chown=app:node package*.json ./
# RUN npm install
# COPY --chown=app:node . .

# EXPOSE 4001

# CMD node index.js