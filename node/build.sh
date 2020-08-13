network="qa"
docker build -t node-mongo-check .
docker run --rm --net "${network}" --env-file .env node-mongo-check
