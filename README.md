# devops
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

# docker run -p -v ./app:/nextapp/app 3000:3000 nextapp
-> this command help in running the container
-> with bind mounts
-> here app folder of local monts to nextapp/app folder of container
-> now change in any file will go to container
* mount app folder to -> nextapp/app folder of container

*** Bind mounts ***
->to make for any change that happen in local also be seen in container
-> as a developer you work on local machine 
-> so when you change the container code donot change
-> Bind mounts help here









