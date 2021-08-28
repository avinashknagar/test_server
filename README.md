# test_server
NodeJS test server. Contains single API that will generate subtraction test at random.

node must be installed to run this project.

Steps to run on unix:
1. Clone the repository
2. Create environment file using the command: echo "PORT=7000" >> .env
3. Install node packages and run server using the command: npm i && node app.js 


Once the server is running, request can be made to /subtraction API. Please find a sample curl request below:

curl -X POST \
  http://localhost:7000/subtraction \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: a4ae6b2a-b44f-54e8-6cf5-fe6423c317f3' \
  -d '{
	"noOfQuestions": 4,
	"noOfDigitsInMinuend": 4,
	"noOfDigitsInSubtrahend": 4,
	"borrowFlag": false
}'
