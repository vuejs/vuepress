FROM node:12.10.0

# Create directory where we will place the application
WORKDIR /usr/src/app

# Copy application source code to the image
COPY . .

RUN yarn install
# Which port the application expose
EXPOSE 8080

# How we will run application
ENTRYPOINT yarn dev:docs