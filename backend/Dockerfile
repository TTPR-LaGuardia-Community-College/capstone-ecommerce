# at the top
FROM node:18

WORKDIR /app

COPY ./package*.json ./

RUN apt-get update && apt-get install -y netcat-openbsd

RUN npm install

COPY . .

# 👇 install dotenv-cli globally (needed for docker env load)
RUN npm install -g dotenv-cli

RUN chmod +x /app/entrypoint.sh

ENTRYPOINT ["sh", "/app/entrypoint.sh"]