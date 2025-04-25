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

*** npm run build ***
necessary for dockerfile 
correct the errors

-> learnt about php
-> kubernetes containerisation
-> 
1. Security: Protect Your Systems
A secure system is non-negotiable. Learn:
 ✔ Authentication & Authorization (OAuth 2.0, JWT)
 ✔ Encryption & Cryptography (AES, RSA)
 ✔ OWASP Top 10 (Common security risks & how to prevent them)
 ✔ Threat Detection (SEIM, IDS, IPS)

2. Performance: Make It Lightning Fast 
Every millisecond counts. Optimize with:
 ✔ Caching Strategies (Redis, Memcached)
 ✔ Rate Limiting & Throttling (Prevent abuse & overload)
 ✔ Load Balancing (Distribute traffic efficiently)
 ✔ Chaos Engineering (Test system resilience)
 ✔ Fault Tolerance (Recover from failures gracefully)

3, Database Engineering: Query 
Backend engineers who understand databases deeply have a huge advantage:
 ✔ Query Optimization & Indexing (Faster queries, better performance)
 ✔ Database Trade-offs (SQL vs NoSQL)
 ✔ Transactions & Isolation Levels (ACID principles)
 ✔ Sharding & Partitioning (Scaling databases effectively)

4. API Design: Build APIs Developers Love 
Design APIs that are scalable, maintainable, and easy to use:
 ✔ OpenAPI 3.0 (Industry-standard API documentation)
 ✔ REST vs GraphQL (Choosing the right approach)
 ✔ Status Codes, Versioning & Pagination (Best practices)

5. Architecture & Paradigms: Choose the Right Structure 
The right architecture makes or breaks a system:
 ✔ Monolith vs Microservices vs Modular Monolith
 ✔ Serverless vs Traditional Backend
 ✔ Concurrency, Parallelism & Multithreading
 ✔ Optimistic vs Pessimistic Locking (Handling data consistency)

6. Distributed Systems: Scaling
Modern backend systems are distributed. Learn:
 ✔ Microservices Patterns (SAGA, CQRS, Event Sourcing)
 ✔ Event-Driven Architecture (Kafka, RabbitMQ)
 ✔ gRPC & Protobuf (Faster, efficient communication)

7. DevOps: Deploy & Manage Systems
Being DevOps-aware helps backend engineers build better software:
 ✔ CI/CD Pipelines (Automate deployments)
 ✔ Containerization (Docker, Kubernetes)
 ✔ Understanding SLAs & Incident Management

8. Observability: Know What's Happening in Your System 
✔ Logging, Monitoring & Tracing (ELK, Prometheus, Jaeger)
 ✔ Performance Profiling & Optimization
 ✔ Alerting & Incident Response

-> async/sync









