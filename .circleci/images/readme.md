# Creating images in dockerhub

1. Ensure you have an account in docker hub

2. Build the image to test

```
docker build -t <account-name>/<image-name>:0.0.1 <path-to-docker>

# e.g.
docker build -t sebastiankade/node10.15-awsebcli .circleci/images/
```

3. When happy build the image with a tag

```
docker build -t <account-name>/<image-name>:<tag-number> <path-to-docker>

# e.g.
docker build -t sebastiankade/node10.15-awsebcli:0.0.1 .circleci/images/
```

4. Publish to dockerhub.

**Note: You must login to docker hub with your USERNAME (not email) and password**

```
docker login
docker push <account-name>/<image-name>:<tag-number>

# e.g.
docker push sebastiankade/node10.15-awsebcli:0.0.1
```

5. Add new image name to .circleci/config.yml
