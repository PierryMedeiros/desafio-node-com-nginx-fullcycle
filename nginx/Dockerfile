FROM nginx:1.15.0-alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/default.conf

#RUN mkdir /var/www/html -p && touch /var/www/html/index.php
#ENTRYPOINT [ "/docker-entrypoint.sh" ]
#CMD [ "nginx", "-g", "daemon off" ]