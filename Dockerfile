FROM nginx:1.27-alpine

COPY nginx.conf.template /etc/nginx/templates/default.conf.template
COPY index.html styles.css script.js /usr/share/nginx/html/
COPY assets /usr/share/nginx/html/assets

ENV PORT=8080
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
