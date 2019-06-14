FROM node:10.15

RUN apt-get update && apt-get install -y \
    python-dev \
    zip \
    jq \
    sudo

RUN curl -O https://bootstrap.pypa.io/get-pip.py

RUN python get-pip.py

RUN pip install awscli --upgrade --user

RUN pip install awsebcli --upgrade --user

RUN mv ~/.local/bin/eb /bin/eb

RUN mv ~/.local/bin/aws /bin/aws
