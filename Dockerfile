FROM node:14-alpine 
COPY package*.json ./
COPY . .
RUN npm install

EXPOSE 3000
CMD [ "npm", "run", "start" ]
