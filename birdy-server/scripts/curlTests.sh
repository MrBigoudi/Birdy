#!/bin/bash

function parseIdFromCurlRespond(){
    $1
}

printf "TESTS CURL\n\n\n";

printf "Tests Login:\n\n";
testLoginUser=$(curl -X POST -H "Content-Type: application/json" -d '{"username": "testLogin", "fullname": "fulltestLogin", "dateOfBirth": "2000-05-12", "emailAddress": "testLogin@test.com", "passwd": "1234"}' http://localhost:4000/api/user/signup)
echo "testLoginUser: ${testLoginUser}";
printf "\n";
curl -X POST -H "Content-Type: application/json" -d '{"emailAddress": "testLogin@test.com", "passwd": "1234"}' http://localhost:4000/api/user/login;
printf "\n";
curl -X POST -H "Content-Type: application/json" -d '{"emailAddress": "wrongEmail@test.com", "passwd": "1234"}' http://localhost:4000/api/user/login;
printf "\n";
curl -X POST -H "Content-Type: application/json" -d '{"emailAddress": "testLogin@test.com", "passwd": "wrongPassword"}' http://localhost:4000/api/user/login;
printf "\n";
curl -X POST -H "Content-Type: application/json" -d '{"emailAddress": "testLogin@test.com"}' http://localhost:4000/api/user/login;
printf "\n";
curl -X POST -H "Content-Type: application/json" -d '{"passwd": "1234"}' http://localhost:4000/api/user/login;
printf "\n";
curl -X DELETE -H "Content-Type: application/json" http://localhost:4000/api/user/logout;
printf "\n";

curl -X DELETE -H "Content-Type: application/json" http://localhost:4000/api/user/${testLoginUser['id']};
printf "\n";