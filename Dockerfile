# Here we can include images from 3rd parties

# The version of image from Docker Hub for Node
FROM node:12.16.3

# working directory
WORKDIR /usr/src/smart-brain-api

# Copy is whatever we want from our current directory into the container
# first argument the copy location 2nd argument where do we want it in the container
# COPY ROOTDIR ROOTDIR
# EG: COPY package.json ./    ....if we only wanted to copy package.json
COPY ./ ./

# What commands do we want to run- you can run multiple RUN steps that help build the image we want
RUN npm install

RUN npm install nodemon

# The command we want to run in the container after we grab the node version
# the "sh" stands for Shell profile
# executes on default when you run the build image
# can only have ONE CMD- always at the endof the file
CMD ["sh"]


