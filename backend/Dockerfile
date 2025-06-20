FROM node:18-alpine
WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm install

# Copy & migrate
COPY . .
RUN npm run migrate

EXPOSE 3001
CMD ["node", "src/app.js"]
