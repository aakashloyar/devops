***Basic Commands ****

# docker run -p x:y
//x-> host machine port
//y-> container port
//this command say that port x of host is connnect to port y of container

# docker run -p 27017:27017 mongo
now if docker run -p 27020:27021 mongo --port 27021
//by default mongo run on 27017 in container but now we are pushing docker to run on specific port in container
//-p -> publish* this means map the port

# docker run -d -p 27018:27019 mongo --port 27019
-d detached mode -> means work separately 

# docker ps
gives all container running

# docker kill container_id
kill the container

# docker images 
gives the images list

# docker run -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
run a postgres container with some password

# docker run -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
# docker run -e POSTGRES_PASSWORD=mysecretpassword -d -p 5433:5432 postgres
if both together then 2 container will formed 


*** About Docker  ***

# 3 main component 
* Docker engine -> main brain every work happen throught this
* Docker CLI -> interaction
* Docker registory-> stores and distributes images

# image vs container
* image -> a lightweight complete package to run a piece of software 
* container -> running instance of a image



*** Some more commands ***
docker exec -it container_id bin/bash
//exec -> to execute command inside the conatiner


*** DockerFile ***
->to push image to docker hub we need to create a dockerfile

//has 2 parts
-> base image
-> command you run on base image

# now let use start understandind DockerFile 


# FROM node:20-alpine
-> this means use node 20 base
-> alpine are lightweight small size and quick than debian

# WORKDIR /app
-> this means inside container there will be app folder as main root dir
-> inside which all file folder package will be there

# COPY . .
-> copy all files from next.js app to app folder

# RUN npm install
->Install dependencies

# RUN npm run build
-> code optimization for production

# EXPOSE 3000
-> port on which it will run 

# CMD ["npm", "run", "start"]
-> cmd-> command 

# Build an image
docker build -t neuraai .
-t giving tagname
. build in current repository

# docker rmi image_id
->Remove an image

# docker logs container_id
->error for specific id

# docker image/ps -a 
-> a -> for list of all

# docker run -p 3000:3000 -e DATABASE_URL="" image_name
-> passing env variable

*** Volumes in Docker ***
-> suppose there is container we start it 
-> we also start mongodb 
-> now we close it 
-> now data lost
-> but volumes help us to persist data

# docker volumes ls
-> list of volumes 

# docker create volume name
-> create volume name

# docker run -v name:/data/db -d -p 27017:27017 mongo
-> running an image with volume
-> now the the container it will store the data in data/db folder

*** Network in Docker ***
-> system can talk to container by port mapping 
-> but container cannot talk to each other 
-> so network help in this

# docker network ls
-> getting network list 

# docker network create testnet
-> creating a network testnet


# docker run -d -v test:/data/db --name mymongo --network testnet -p 27017:27017 mongo
-> now this will start mongo attached to same network
-> this name is super important

# docker run -d -p 3000:3000 --name backend --network testnet image_tag
-> now this is project
-> in this there will be mongourl 
-> mongodb://localhost:27017
replace this localhost with mymongo-> it is like a ip in the network
-> mongodb://mymongo:27017
-> now these can talk with each other


*** Bind mounts ***
->to make for any change that happen in local also be seen in container
-> as a developer you work on local machine 
-> so when you change the container code donot change
-> Bind mounts help here

# docker run -p -v ./app:/nextapp/app 3000:3000 nextapp
-> this command help in running the container
-> with bind mounts
-> here app folder of local monts to nextapp/app folder of container
-> now change in any file will go to container
* mount app folder to -> nextapp/app folder of container
-> -v for volume or bind mount depend on how you declare


# docker run --rm -it image_id sh
-> to see the folder structure of image that is not running

# docker rm container_name
-> removing a container
-> kill is stop a running container

# docker system prune -a --volumes
-> removing unused volumes

# docker image prune -a
-> removing unused images

# docker system prune -a --volumes
-> remove all unused whatever

*** Important ***
* RUN npx prisma migrate dev --name init
* RUN npx prisma generate
* CMD ["npm start"]

* CMD ["sh", "-c", "npx prisma migrate dev --name init && npx prisma generate && npm start"]

-> 1st is incorrect 
-> 2nd is correct
-> in first these execute during build time even before container start
-> in 2nd these execute during run time 
-> Since RUN commands execute at build time, your PostgreSQL container might not be running yet.
-> The migration command (npx prisma migrate dev --name init) depends on a running database, which won’t be available at build time.

# docker compose build
-> build the images in compose file

# docker compose up -d
-> start

# docker compose down 
-> end

# docker compose up -d --build
-> build and start


*** Caching in layers ***
-> suppose 5 layers
-> 2 layers are same so will be cached
-> all now will built again

*** docker-compose file ***
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install || (echo "Install failed!" && exit 1)//if error then show error and exit

COPY . .

RUN npx prisma generate

RUN npm run build || (echo "Build failed!" && exit 1)

EXPOSE 3000

CMD ["sh", "-c", "npm run db:deploy && npm start"]

"db:deploy": "npx prisma migrate deploy"
-> in script of package.json add this


FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate dev && npm start"]
-> sh -c run a shell and execute the given command string


version: "3.8"
services:
  postgre:
    image: postgres
    container_name: postgre
    restart: always
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: myuser
      POSTGRES_PASSWORD: mypassword
      POSTGRES_DB: mydatabase
    volumes:
      - postgre_data:/var/lib/postgresql/data

  neuraai:
    build: .
    container_name: neuraai_app
    depends_on:
      - postgre
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://myuser:mypassword@postgre:5432/mydatabase
      //postgre is service name used as ip 
      //network is automatically added no require to add network
  
volumes:
  postgre_data:  



RUN chmod +x script.sh
-> execute the script.sh file





# sudo lsof -i :5432
-> status of port 


*** healthcheck: ***
servicea
healthcheck:
      test: [ 'CMD-SHELL', 'pg_isready -d $${POSTGRES_DB} -U $${POSTGRES_USER}' ]
      interval: 10s
      timeout: 5s
      retries: 5
serviceb      
depends_on:
      servicea:
        condition: service_healthy
->check health and run b only when a is healthy     


*** dockerhub push ***
# docker tag neuraai aakashloyar/neuraai:latest
->giving a tagname to image
# docker push aakashloyar/neuraai:latest
->pushing the image

# docker pull aakashloyar/neuraai:latest
->pulling image



















