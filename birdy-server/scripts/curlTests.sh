#!/bin/bash

function parseIdFromCurlRespond(){
    echo "$(echo $1 | sed -E -n 's/^.*"id":"(.*)"}$/\1/p')";
}

printf "TESTS CURL\n\n\n";


printf "Tests Login:\n\n";

testLogin=$(curl -X POST -H "Content-Type: application/json" -d '{"username": "testLogin", "fullname": "fulltestLogin", "dateOfBirth": "2000-05-12", "emailAddress": "testLogin@test.com", "passwd": "1234"}' http://localhost:4000/api/user/signup);
echo "Creation user";
echo "${testLogin}";
testLogin=$(parseIdFromCurlRespond "${testLogin}");
printf "Test connection\n";
curl -X POST -H "Content-Type: application/json" -d '{"emailAddress": "testLogin@test.com", "passwd": "1234"}' http://localhost:4000/api/user/login;
printf "\nTest wrong email address\n";
curl -X POST -H "Content-Type: application/json" -d '{"emailAddress": "wrongEmail@test.com", "passwd": "1234"}' http://localhost:4000/api/user/login;
printf "\nTest wrong password\n";
curl -X POST -H "Content-Type: application/json" -d '{"emailAddress": "testLogin@test.com", "passwd": "wrongPassword"}' http://localhost:4000/api/user/login;
printf "\nTest missing password\n";
curl -X POST -H "Content-Type: application/json" -d '{"emailAddress": "testLogin@test.com"}' http://localhost:4000/api/user/login;
printf "\nTest missing email address\n";
curl -X POST -H "Content-Type: application/json" -d '{"passwd": "1234"}' http://localhost:4000/api/user/login;
printf "\nTest deconnection\n";
curl -X DELETE -H "Content-Type: application/json" http://localhost:4000/api/user/logout;
printf "\nSupression user\n";
curl -X DELETE -H "Content-Type: application/json" "http://localhost:4000/api/user/${testLogin}";
printf "\n\n\n";

printf "Tests Signup:\n\n";

testSignup=$(curl -X POST -H "Content-Type: application/json" -d '{"username": "testSignup", "fullname": "fulltestSignup", "dateOfBirth": "2000-05-12", "emailAddress": "testSignup@test.com", "passwd": "1234"}' http://localhost:4000/api/user/signup);
echo "Creation user";
echo "${testSignup}";
testSignup=$(parseIdFromCurlRespond "${testSignup}");
printf "Test username already taken\n";
curl -X POST -H "Content-Type: application/json" -d '{"username": "testSignup", "fullname": "fulltestSignup", "dateOfBirth": "2000-05-12", "emailAddress": "testSignup2@test.com", "passwd": "1234"}' http://localhost:4000/api/user/signup;
printf "\nTest email address already taken\n";
curl -X POST -H "Content-Type: application/json" -d '{"username": "testSignup2", "fullname": "fulltestSignup", "dateOfBirth": "2000-05-12", "emailAddress": "testSignup@test.com", "passwd": "1234"}' http://localhost:4000/api/user/signup;
printf "\nTest username missing\n";
curl -X POST -H "Content-Type: application/json" -d '{"fullname": "fulltestSignup", "dateOfBirth": "2000-05-12", "emailAddress": "testSignup2@test.com", "passwd": "1234"}' http://localhost:4000/api/user/signup;
printf "\nTest fullname missing\n";
curl -X POST -H "Content-Type: application/json" -d '{"username": "testSignup2", "dateOfBirth": "2000-05-12", "emailAddress": "testSignup2@test.com", "passwd": "1234"}' http://localhost:4000/api/user/signup;
printf "\nTest date of birth missing\n";
curl -X POST -H "Content-Type: application/json" -d '{"username": "testSignup2", "fullname": "fulltestSignup", "emailAddress": "testSignup2@test.com", "passwd": "1234"}' http://localhost:4000/api/user/signup;
printf "\nTest email address missing\n";
curl -X POST -H "Content-Type: application/json" -d '{"username": "testSignup2", "fullname": "fulltestSignup", "dateOfBirth": "2000-05-12", "passwd": "1234"}' http://localhost:4000/api/user/signup;
printf "\nTest password missing\n";
curl -X POST -H "Content-Type: application/json" -d '{"username": "testSignup2", "fullname": "fulltestSignup", "dateOfBirth": "2000-05-12", "emailAddress": "testSignup2@test.com"}' http://localhost:4000/api/user/signup;
printf "\nTest fullname wrong format\n";
curl -X POST -H "Content-Type: application/json" -d '{"username": "testSignup2", "fullname": "fulltestSignup2", "dateOfBirth": "2000-05-12", "emailAddress": "testSignup2@test.com", "passwd": "1234"}' http://localhost:4000/api/user/signup;
printf "\nTest inappropriate fullname\n";
curl -X POST -H "Content-Type: application/json" -d '{"username": "testSignup2", "fullname": "fuk", "dateOfBirth": "2000-05-12", "emailAddress": "testSignup2@test.com", "passwd": "1234"}' http://localhost:4000/api/user/signup;
printf "\nTest invalid date of birth\n";
curl -X POST -H "Content-Type: application/json" -d '{"username": "testSignup2", "fullname": "fulltestSignup", "dateOfBirth": "yep", "emailAddress": "testSignup2@test.com", "passwd": "1234"}' http://localhost:4000/api/user/signup;
printf "\nTest underaged\n";
curl -X POST -H "Content-Type: application/json" -d '{"username": "testSignup2", "fullname": "fulltestSignup", "dateOfBirth": "2021-05-12", "emailAddress": "testSignup2@test.com", "passwd": "1234"}' http://localhost:4000/api/user/signup;
printf "\nTest inappropriate username\n";
curl -X POST -H "Content-Type: application/json" -d '{"username": "ash0le", "fullname": "fulltestSignup", "dateOfBirth": "2000-05-12", "emailAddress": "testSignup2@test.com", "passwd": "1234"}' http://localhost:4000/api/user/signup;
printf "\nTest username wrong format\n";
curl -X POST -H "Content-Type: application/json" -d '{"username": "testSignup2 wrongformat", "fullname": "fulltestSignup", "dateOfBirth": "2000-05-12", "emailAddress": "testSignup2@test.com", "passwd": "1234"}' http://localhost:4000/api/user/signup;
printf "\nSupression user\n";
curl -X DELETE -H "Content-Type: application/json" "http://localhost:4000/api/user/${testSignup}";
printf "\n\n\n";