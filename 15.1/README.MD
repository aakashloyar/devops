docker images -> to see images

docker run imagename-> to run a image

docker ps -> to see container


docker rmi imagename --force -> to remove the image 


docker kill container_id-> to stop the container





//building a image
docker build -t imgaak .-> . represent the current directory has dockerfile
-t -> for tags

docker run image-> to run the image


docker push username/imagename-> to push the image to dockerhub

***layers in docker

layers are each line in docker file 
you visit each line one by one 
if code of 1 line changed then all line below it will be executed again 
otherwise they will be catched 

so it is better to structure your dockerfile for maximum catching 




dockerregistry//where all images are present

dockerengine//which run on your machine and interact with your terminal

terminal// with which you interact


docker exec <container_name_or_id> ls /path/to/directory
//now here this is command to see folder structure of image

docker exec -it <container_name_or_id> /bin/bash
//this command it to interact with image

exit ->to exit out of container


now let us see docker volumes

now if we start a mongo images and save some data and kill the container the data will be lost

we can solve this problem with volumes
docker volume create volume_database
docker run -v volume_database:/data/db -p 27017:27017 mongo
/data/db are folders where data is stored in mongo-> you can use command given above to check

now if kill the container and start it again the data that we have stored will be there


docker volumes ls
docker network ls

docker ps -> to show the running containers
docker ps -a -> to show all the containers

//so now you can have application that may need to talk to other container

//suppose on 1 container your application is running and on other your database is running 
//so how they can interact 

step1-> create a network
 docker network create my_custom_network

step2-> start mongo container with some name 
docker run -d -v volume_database:/data/db --name mongo --network my_custom_network -p 27017:27017 mongo

here name is mongo as you can see

step3-> replace the uri in you app "localhost" with this "name" 
const mongouri="mongodb://mongo:27017/mydatabase"

step4-> run the image 
docker run -d -p 3000:3000 --name backend --network my_custom_network image_tag


now you can check using the docker logs container id



pushing images to docker repository
if aakashloyar/check is my repository and i want to push 
imgaak               v1        e59eb40c46a4   About a minute ago   1.11GB
This image to docker


aakash@aakash-VivoBook-ASUSLaptop-X421EAYB-X413EA:~$ docker tag imgaak:v1 aakashloyar/check:v1
aakash@aakash-VivoBook-ASUSLaptop-X421EAYB-X413EA:~$ docker push aakashloyar/check:v1
The push refers to repository [docker.io/aakashloyar/check]
d8b7c43d87af: Pushed 
acc3e4b7863d: Pushed 
eeee99d8d340: Pushed 
f8f2a6b080b3: Mounted from aakashloyar/imgaak 
5840fe29196a: Mounted from aakashloyar/imgaak 
809420f2cf10: Mounted from aakashloyar/imgaak 
b5117a85f41c: Mounted from aakashloyar/imgaak 
1419c9484da1: Mounted from aakashloyar/imgaak 
dafb8aed9f7f: Mounted from aakashloyar/imgaak 
41d4dc7516bb: Mounted from aakashloyar/imgaak 
c0f51bbdc37d: Mounted from aakashloyar/imgaak 
91b542912d12: Mounted from aakashloyar/imgaak 
v1: digest: sha256:8f97d9ead13f243efd4379f0c012065951ac9a518fe2dffbfdb5363c3e88d6b4 size: 2839
aakash@aakash-VivoBook-ASUSLaptop-X421EAYB-X413EA:~$ 


This is the way to push 
docker build -t imgaak:v1 .
creating a image with tagname

docker compose -> to aviod large number of commands

version:'3.8'
services:
  mongodb:
    image: mongodb
    container_name: mongocont
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db

  backend22:
    image: imgexp
    container_name: backend_app
    depends_on:
      - mongodb
    ports:
      - "3000:3000"
    environment:
      MONGO_URL: "mongodb://mongodb:27017"

volumes:
  mongodb_data:    



version: "3.8"
services:
  mongodb:
    image: mongo
    container_name: mongocont
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db

  backend22:
    build: .
    container_name: backend_app
    depends_on:
      - mongodb
    ports:
      - "3000:3000"
    environment:
      MONGO_URL: "mongodb://mongocont:27017"

volumes:
  mongodb_data:    

network automatically created for them 
volume is created by use 

this is upated one for directly building image 


//this is the way how developers work
//they give the github repo to a new developer and he has to just
run this command
docker-compose up -d --build

he is ready to contribute

docker compose down
//to down it 


//now we will learn bind mounts
//to make for any change that happen in local also be seen in container

docker run -v /path/on/host:/path/in/container image_name


version: "3.8"

services:
  mongodb:
    image: mongo
    container_name: mongocont
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db

  backend22:
    build: .
    container_name: backend_app
    depends_on:
      - mongodb
    ports:
      - "3000:3000"
    environment:
      MONGO_URL: "mongodb://mongocont:27017"
    volumes:
      - ./app:/app  # 🔹 Bind mount: Syncs local './app' directory with '/app' in the container
    working_dir: /app  # Set working directory to '/app'

volumes:
  mongodb_data:




apt-get update
apt-get install vim-> to use vim command inside container





