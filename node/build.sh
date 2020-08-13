network="qa"
docker build -t node-mongo-check .
docker run --rm --net "${network}" node-mongo-check
