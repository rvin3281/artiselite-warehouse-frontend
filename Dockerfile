FROM node:14 as build 
WORKDIR /app
COPY package*.json ./
RUN npm install -g @angular/cli
RUN npm install
COPY . .
FROM nginx:1.21.1
COPY --from=build /app/dist/artiselite-frontend /usr/share/nginx/html
# Copy the custom nginx.conf file
COPY nginx.conf /etc/nginx/conf.d/
# Remove the default nginx.conf file
RUN rm /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD [ "nginx","-g","daemon off;" ]