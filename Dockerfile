FROM node:latest

WORKDIR /app

COPY /src ./
EXPOSE 80

CMD [ "command" ]

# Some other commands
#COPY package*.json ./
#RUN npm install