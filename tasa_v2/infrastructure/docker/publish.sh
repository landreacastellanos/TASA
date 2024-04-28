#!/bin/bash

# Login into artifact registry
gcloud auth login
gcloud auth configure-docker \
    us-central1-docker.pkg.dev \
    --verbosity=none

PROJECT_NAME=tasa-dev-01
REPO_NAME=tasa
TAG=$(date '+%Y-%m-%d-%H-%M-%S')


IMAGES=('tasa_ms' 'stream_ms' 'proxy')
DIRS=('../../back/tasa_microservice' '../../back/stream_microservice' '../../front')


for (( i = 0; i < ${#IMAGES[@]}; i++ ));
do

    # Build docker image
    echo "Building ${IMAGES[i]} image..."
    docker build -t us-central1-docker.pkg.dev/$PROJECT_NAME/$REPO_NAME/"${IMAGES[i]}" \
        -t us-central1-docker.pkg.dev/$PROJECT_NAME/$REPO_NAME/"${IMAGES[i]}":$TAG \
        -f "${DIRS[i]}/Dockerfile" "${DIRS[i]}"

    # Push docker image
    echo "Pushing  ${IMAGES[i]} image..."
    docker push us-central1-docker.pkg.dev/$PROJECT_NAME/$REPO_NAME/"${IMAGES[i]}"
    docker push us-central1-docker.pkg.dev/$PROJECT_NAME/$REPO_NAME/"${IMAGES[i]}":$TAG

done

