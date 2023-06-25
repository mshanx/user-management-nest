FROM node:16-alpine

WORKDIR /app
COPY package*.json .
COPY tsconfig*.json ./
RUN yarn install
COPY . .
RUN yarn run build
CMD ["node", "dist/src/main.js"]