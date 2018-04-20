# sharely-filesharing
Distributed programming project

Install `npm install`
Running `npm start`
Running docker image
`docker run -d --name=web --publish=3600:3600 --hostname=web alin/sharely`
Removing docker image
`docker rm -f web`
Building image
`docker build -t alin/sharely .`
Watching logs
`docker logs web`