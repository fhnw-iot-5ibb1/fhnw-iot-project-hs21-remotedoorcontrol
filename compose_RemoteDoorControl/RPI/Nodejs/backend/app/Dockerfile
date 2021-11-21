FROM node:12
WORKDIR /app
COPY ["package.json", "package-lock.json", "./app/"]
RUN npm install
COPY . .
CMD ["npm", "run", "start"]
EXPOSE 4001

