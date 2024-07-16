
## Documentation

To check conflicts make
POST /calculate
{
  id: '123',
  answers: [
    { question: 'Question 1', answer: 'yes' },
    { question: 'Question 2', answer: 'no' },
  ],
}


# Run docker with existing db (without docker-compose.yml)

```bash
docker build -t conflict-service .

docker run -d --name conflict-service \
  -e DB_HOST=<your_db_host> \
  -e DB_PORT=<your_db_port> \
  -e DB_USERNAME=<your_db_user> \
  -e DB_PASSWORD=<your_db_password> \
  -e DB_DATABASE=<your_db_name> \
  -p 3000:3000 \
  conflict-service
```



# Run the Docker container with db

```bash
touch .env
```

Example of env file:

```bash
DB_HOST=<your_db_host>
DB_PORT=<your_db_port>
DB_USERNAME=<your_db_user>
DB_PASSWORD=<your_db_password>
DB_DATABASE=<your_db_name>
```

```bash
docker-compose build
docker-compose up
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
