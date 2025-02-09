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


now let us see docker volumes

now if we start a mongo images and save some data and kill the container the data will be lost

we can solve this problem with volumes
docker volume create volume_database
docker run -v volume_database:/data/db -p 27017:27017 mongo
/data/db are folders where data is stored in mongo-> you can use command given above to check

now if kill the container and start it again the data that we have stored will be there







