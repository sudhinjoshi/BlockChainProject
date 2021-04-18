hey, this is the readme.md file


### Downloading the Code ###

To download this code, run 

```$git clone https://github.com/eoinco/nci2021.git```

This will create a folder called nci2021 and the code will be downloaded to that folder.

To install the dependencies, make sure you are in the nci2021 folder and run:

```$npm install```


### Web Server ###

we're using express (handlers.js)

To access the routes using curl:

```curl -get 'http://localhost:8080/transfer```

 - load a file of accounts
 - run the distribution
 - run distro via handler (post)
 - do some fun crypto
 - 


### Docker Containers 

To run a docker container, you need to do the following steps:

#### Build it

To build the docker container:

```docker build -t nci/lab2021 .```

run it

#### Interact with it

**View docker images:** ```docker image ls```

**Remove all docker containers etc.**

Do this if something goes wrong(it will refresh all your containers to a known default state)

```docker system prune```: 

**Remove docker images**: ```docker image prune -a -f```: 

**View running docker containers**: ``` docker ps```


**Run the image in docker**: ```docker run -p 41960:8090 --name nci -d nci/lab2021```

**Kill a running container**: ```docker kill <name>```

**Kill a running container(2)**: ```docker kill <CONTAINER_ID>```

**Stop a running container**: ```docker stop <name>```

**Start a running container**: ```docker start <name>```

**View the logs of a container**: ```docker logs <name>```

**View the running logs inside a container**: ```docker logs -f <name>```

### POST Requests

To post a request, passing in data:

```curl -XPOST http://localhost:8090/distribute -H 'content-type: application/json' -d '{"addresses": ["0x9b14eeE99808BaB2a4C6492D37B4D771F75b7631", "0xe8a43eFC2CE385AbA7465101262b03B0d2489c43"]}'```