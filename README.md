# Parking Business Application

## An application to manage parking space

A simple NestJs/NodeJs based Parking Management app where users can check the occupancy of the parking spaces in the building, check in during entering for parking and checkout when they leave.

#### Contains two main components
- Parking Check-in and Check-out
- Occupancy status of each parking spaces


## Tech

DigiHome uses a number of open source projects to work properly:

- [NestJs] - Powerful TS Based Backend Framework
- [MySQL] - SQL based Database
- [Docker] - containerization tool

## Installation

This App requires [Nodejs](https://node.org/) version 18 to run.

Note: Make sure you have Docker and Docker compose installed in your machine

Step-1: Clone or Open the repository first

Step-2: 
```sh
docker compose up -d

```
Project should be running at localhost:3000

Note: If you are running for the first time and you want to insert some example data, 
then you need to connect to MySQL running at port 3306 and then run sql script 
`script.sql` present at `/mysql` directory

API Documentation can be viewed at localhost:3000/api

## Working and Description of APIs:

### Check In: 
- Takes in vehicleType and isResident as request param
- Checks if parking space is available for given vehicle type or resident and if yes
allocates parking space, if not throws appropriate message
- After allocating parking space, opens up a parking session for given vehicle and returns the session id of it
- Response contains session id and space id allocated to it

CURL Command:
```sh
curl -X 'POST' \
  'http://localhost:3000/parkingBusiness/checkIn' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
   "vehicleType": "CAR",
   "isResident": false
}'
```

### Check Out: 
- Takes in parkingSessionId and isResident as request param
- Checks if given session id exists and if yes, ends the session and 
- Calculates parking cost according to type of vehicle and duration of parking
- If it is resident, cost is 0 
- Returns the length of parking time and total cost incurred
- Response contains totalCost, sessionLengthInHoursMinutes, and parkingSpaceId

CURL Command:
```sh
curl -X 'POST' \
  'http://localhost:3000/parkingBusiness/checkOut' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "parkingSessionId": "8267bc87-d12b-4129-8d5e-d7eba24dfda5",
  "isResident": false
}'
```

### Occupancy: 
- Accepts requests parameters page and limit for paginated result
- page: from which page data needs to be sent and limit: no of result (default limit of 10 if page and limit has not been passed)
- Returns list of all parking spaces with spaceId and occupancy status
- Response contains list of parkingSpaceId, vehicleType and isOccupied

CURL Command:
```sh
curl -X 'GET' \
  'http://localhost:3000/parkingBusiness/occupation?page=1&limit=100' \
  -H 'accept: */*'
```

## Future Enhancements (things I would have done if had extra time)
- Use of secure and more sophisticated authentication (jwt based auth)
- Work on making application more secure
- Add more test coverage
- Have user journey tests using selenium
- Have monitoring and alarms setup for the application
- Create CICD pipeline for the project
- Deploy project in the Cloud    