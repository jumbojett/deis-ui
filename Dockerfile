FROM node:0.10
RUN mkdir -p /app
WORKDIR /app

# We add package.json first so that we the operation
# is only "uncached" if package.json changes
COPY package.json /app/
RUN npm install --unsafe-perm

# Same with bower.json
COPY bower.json /app/
RUN ./node_modules/bower/bin/bower install --allow-root

COPY . /app
RUN ./node_modules/grunt-cli/bin/grunt build

CMD ["./node_modules/grunt-cli/bin/grunt", "serve:dist"]
EXPOSE 9000