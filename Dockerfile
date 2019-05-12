# Dockerfile
# run with docker container run -p 3000:8081 karmapp

FROM node:11-alpine
WORKDIR /app
COPY package.json /app
RUN yarn install
COPY . /app
EXPOSE 8081
CMD ["npm", "start"]
