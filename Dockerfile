FROM node:0.10-onbuild

RUN npm install -g bower grunt-cli
RUN CI=true bower install --allow-root -F -p
RUN grunt build

EXPOSE 9000

ENV PORT 9000
ENV LIVERELOAD 8443
ENV BIND 0.0.0.0

CMD grunt serve
