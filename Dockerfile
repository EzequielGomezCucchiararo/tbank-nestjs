# Dockerfile

FROM node:11-alpine
WORKDIR /app
COPY package.json /app
RUN yarn install
COPY . /app
EXPOSE 8081
CMD ["npm", "start"]
