#!/bin/bash

echo "Running mongo replica set"

docker stop mongo-rs0-1 && docker rm mongo-rs0-1

docker stop mongo-rs0-2 && docker rm mongo-rs0-2

docker stop mongo-rs0-3 && docker rm mongo-rs0-3

docker stop mongo-rs-setup && docker mongo-rs-setup

cd mongo-rs0-1 && docker build -t mongo-rs0-1 .

cd ..

cd mongo-rs0-2 && docker build -t mongo-rs0-2 .

cd ..

cd mongo-rs0-3 && docker build -t mongo-rs0-3 .

cd ..

cd setup && docker build -t mongo-rs-setup .

docker run --net mynet --name mongo-rs0-1 -d -v mongo-rs0-1:/data/db -p 27017:27017 mongo-rs0-1

docker run --net mynet --name mongo-rs0-2 -d -v mongo-rs0-2:/data/db -p 27018:27017 mongo-rs0-2

docker run --net mynet --name mongo-rs0-3 -d -v mongo-rs0-3:/data/db -p 27019:27017 mongo-rs0-3

docker run --net mynet --name mongo-rs-setup mongo-rs-setup
