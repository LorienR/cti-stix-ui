FROM node:slim
MAINTAINER "unfetter"
LABEL Description="CTI-STIX-UI"

ENV WORKING_DIRECTORY /usr/share/cti-stix-ui

# Install Packages
RUN npm install -g ember-cli
RUN npm install -g bower
RUN apt-get update && apt-get install git -y

# Create Application Directory
RUN mkdir -p $WORKING_DIRECTORY
WORKDIR $WORKING_DIRECTORY
COPY package.json $WORKING_DIRECTORY
COPY bower.json $WORKING_DIRECTORY

# Install Dependencies
RUN npm install
RUN bower --allow-root install
COPY . $WORKING_DIRECTORY

# Start Application
EXPOSE 4200 50000
CMD [ "ember", "server", "--live-reload-port", "50000" ]
