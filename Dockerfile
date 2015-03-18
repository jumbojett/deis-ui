FROM gliderlabs/alpine

COPY dist /src
COPY nginx.conf /conf/nginx.conf
COPY docker-startup.sh /conf/startup.sh

RUN apk-install ca-certificates nginx
RUN mkdir /tmp/nginx

EXPOSE 443
CMD ["/conf/startup.sh"]
