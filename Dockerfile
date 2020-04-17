FROM node:lts-alpine3.9

RUN npm i npm@latest -g

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --no-optional && npm cache clean --force

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]