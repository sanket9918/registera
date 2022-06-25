FROM node:16-alpine
WORKDIR /app
RUN npm install -g http-server
COPY package* /app/
RUN npm install
COPY . .
# RUN npm run build
EXPOSE 3000
CMD [ "npm", "run","dev","--","--host" ]