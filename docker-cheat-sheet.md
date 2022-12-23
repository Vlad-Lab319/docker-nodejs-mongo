# Docker Cheat Sheet

## Show

`docker ps` - show a list of running containers
`docker ps -a` - show all containers

`docker image ls` || `docker images` - show a list of images
`docker volume ls`

`docker logs docker-nodejs-mongo-demo-node-mongo-1 -f` - show the logs of container

## Delete

`docker rm CONTAINER` - delete a container
`docker rm -f CONTAINER` - delete running container
`docker container prune` - delete stopped containers

`docker rmi IMAGE` - delete image
`docker image prune` - delete dangling images
`docker image prune -a` - delete all unused images

## Manage

`docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --scale node-mongo=2` - run containers with `yml` file
`docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build -V` - run with re-building
`docker-compose -f docker-compose.yml -f docker-compose.dev.yml down` - stop running containers with `yml` file

`docker exec -it docker-nodejs-mongo-demo-redis-1 bash` - start a shell inside a running container


# AWS

## SSH

`sudo chmod 600 "key".pem` - activte key on local machine
`ssh -i "key".pem ubuntu@ec2-"number".compute-1.amazonaws.com` - connect to cloud machine

## Install Docker in cloud

`curl -fsSL https://get.docker.com -o get-docker.sh` 
`sh get-docker.sh`

## Install docker-compose

`curl -SL https://github.com/docker/compose/releases/download/v2.14.2/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose`

## See also: 
* [Docker labs](https://dockerlabs.collabnix.com/docker/cheatsheet/) for more info