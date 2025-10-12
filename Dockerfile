FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

COPY docker-entrypoint.sh .
RUN chmod +x docker-entrypoint.sh

EXPOSE 3000
ENV NODE_END=development

ENTRYPOINT [ "./docker-entrypoint.sh" ]