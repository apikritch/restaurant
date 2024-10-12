FROM node:18.14.2-alpine

WORKDIR /server

COPY package.json ./

COPY pnpm-lock.yaml ./

RUN npm install -g pm2

RUN npm install -g pnpm

RUN pnpm install

COPY . .

EXPOSE 8080

CMD ["pm2-runtime", "start", "ecosystem.config.cjs"]
