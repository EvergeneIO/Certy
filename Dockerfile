FROM hayd/deno:latest

WORKDIR /app

COPY /src ./

CMD [ "deno", "run", "-A", "mod.ts", ]

# Some other commands
#COPY package*.json ./
#RUN npm install