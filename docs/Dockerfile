FROM node:18  
WORKDIR /usr/src/app
COPY . .  
RUN npm install -g docsify-cli  
EXPOSE 3000  
CMD ["docsify", "serve", "docs"]  