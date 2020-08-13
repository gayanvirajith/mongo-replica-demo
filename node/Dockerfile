FROM node:10

#create a working directory
WORKDIR /usr/src/app

#copy package.json file under the working directory
COPY package.json /usr/src/app/

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . /usr/src/app/

#start nodejs server
CMD node index.js

