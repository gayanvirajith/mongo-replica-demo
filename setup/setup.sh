#!/bin/bash

echo ******************************************************
echo Starting the replica set
echo ******************************************************

sleep 10 | echo Waiting 10 seconds to ready the cluster
mongo mongodb://mongo-rs0-1:27017 replicaSet.js
