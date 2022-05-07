#!/bin/bash

function parseIdFromCurlResponse(){
    echo "$(echo $1 | sed -E -n 's/^.*"id":"(.*)"}$/\1/p')";
}

printf "TESTS CURL\n\n\n";



printf "Tests Login:\n\n";


testLogin=$(curl -X POST -H "Content-Type: application/json" -d '{"username": "testLogin", "fullname": "fulltestLogin", "dateOfBirth": "2000-05-12", "emailAddress": "testLogin@test.com", "passwd": "1234"}' http://localhost:4000/api/user/signup);
echo "Creation user";
echo "${testLogin}";
testLogin=$(parseIdFromCurlResponse "${testLogin}");

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
testSignup=$(parseIdFromCurlResponse "${testSignup}");

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



printf "Tests Follow:\n\n";

testFollow1=$(curl -X POST -H "Content-Type: application/json" -d '{"username": "testFollow", "fullname": "fulltestFollow", "dateOfBirth": "2000-05-12", "emailAddress": "testFollow@test.com", "passwd": "1234"}' http://localhost:4000/api/user/signup);
echo "Creation user 1";
echo "${testFollow1}";
testFollow1=$(parseIdFromCurlResponse "${testFollow1}");
testFollow2=$(curl -X POST -H "Content-Type: application/json" -d '{"username": "testFollow2", "fullname": "fulltestFollow", "dateOfBirth": "2000-05-12", "emailAddress": "testFollow2@test.com", "passwd": "1234"}' http://localhost:4000/api/user/signup);
echo "Creation user 2";
echo "${testFollow2}";
testFollow2=$(parseIdFromCurlResponse "${testFollow2}");

printf "Test user1 follow user2\n";
curl -X POST -H "Content-Type: application/json" -d "{\"followId\": \"${testFollow2}\"}" "http://localhost:4000/api/user/${testFollow1}/follows";

printf "\nTest get user1 follows\n";
curl -X GET -H "Content-Type: application/json" "http://localhost:4000/api/user/${testFollow1}/follows";

printf "\nTest error get unkown user follows\n";
curl -X GET -H "Content-Type: application/json" "http://localhost:4000/api/user/42/follows";

printf "\nTest error user1 follow user2 again\n";
curl -X POST -H "Content-Type: application/json" -d "{\"followId\": \"${testFollow2}\"}" "http://localhost:4000/api/user/${testFollow1}/follows";

printf "\nTest user1 unfollow user2\n";
curl -X DELETE -H "Content-Type: application/json" "http://localhost:4000/api/user/${testFollow1}/follows/${testFollow2}";

printf "\nTest user1 follow user2\n";
curl -X POST -H "Content-Type: application/json" -d "{\"followId\": \"${testFollow2}\"}" "http://localhost:4000/api/user/${testFollow1}/follows";

printf "\nSupression user1\n";
curl -X DELETE -H "Content-Type: application/json" "http://localhost:4000/api/user/${testFollow1}";
printf "\nSupression user2\n";
curl -X DELETE -H "Content-Type: application/json" "http://localhost:4000/api/user/${testFollow2}";
printf "\n\n\n";



printf "Tests Clean DB:\n\n";

testCleanDB1=$(curl -X POST -H "Content-Type: application/json" -d '{"username": "testCleanDB", "fullname": "fulltestCleanDB", "dateOfBirth": "2000-05-12", "emailAddress": "testCleanDB@test.com", "passwd": "1234"}' http://localhost:4000/api/user/signup);
echo "Creation user 1";
echo "${testCleanDB1}";
testCleanDB1=$(parseIdFromCurlResponse "${testCleanDB1}");
testCleanDB2=$(curl -X POST -H "Content-Type: application/json" -d '{"username": "testCleanDB2", "fullname": "fulltestCleanDB", "dateOfBirth": "2000-05-12", "emailAddress": "testCleanDB2@test.com", "passwd": "1234"}' http://localhost:4000/api/user/signup);
echo "Creation user 2";
echo "${testCleanDB2}";
testCleanDB2=$(parseIdFromCurlResponse "${testCleanDB2}");

printf "Test acces user 1\n"
curl -X GET -H "Content-Type: application/json" "http://localhost:4000/api/user/${testCleanDB1}";

printf "\nTest acces user 2\n"
curl -X GET -H "Content-Type: application/json" "http://localhost:4000/api/user/${testCleanDB2}";

printf "\nTest clean database\n";
curl -X DELETE -H "Content-Type: application/json" "http://localhost:4000/api/user/clean";

printf "\nTest error acces user 1\n"
curl -X GET -H "Content-Type: application/json" "http://localhost:4000/api/user/${testCleanDB1}";

printf "\nTest error acces user 2\n"
curl -X GET -H "Content-Type: application/json" "http://localhost:4000/api/user/${testCleanDB2}";
printf "\n\n\n";



printf "Tests new Tweet:\n\n";

testNewTweet=$(curl -X POST -H "Content-Type: application/json" -d '{"username": "testNewTweet", "fullname": "fulltestNewTweet", "dateOfBirth": "2000-05-12", "emailAddress": "testNewTweet@test.com", "passwd": "1234"}' http://localhost:4000/api/user/signup);
echo "Creation user 1";
echo "${testNewTweet}";
testNewTweet=$(parseIdFromCurlResponse "${testNewTweet}");

testNewTweetTweet=$(curl -X POST -H "Content-Type: application/json" -d "{\"author\": \"${testNewTweet}\",\"content\":\"This is a test tweet\", \"image\":\"blob:http://localhost:3000/114c6775-2bea-48b9-90bf-2f3b1a86b08d\"}" http://localhost:4000/apiTweet/tweet/newTweet);
echo "Creation tweet 1";
echo "${testNewTweetTweet}";
testNewTweetTweet=$(parseIdFromCurlResponse "${testNewTweetTweet}");

printf "\nTest acces tweet 1\n"
curl -X GET -H "Content-Type: application/json" "http://localhost:4000/apiTweet/tweet/${testNewTweetTweet}";

printf "\nTest error missing author\n";
curl -X POST -H "Content-Type: application/json" -d "{\"content\":\"This is a test tweet\", \"image\":\"blob:http://localhost:3000/114c6775-2bea-48b9-90bf-2f3b1a86b08d\"}" http://localhost:4000/apiTweet/tweet/newTweet;

printf "\nTest error missing content\n";
curl -X POST -H "Content-Type: application/json" -d "{\"author\": \"${testNewTweet}\",\"content\":\"\", \"image\":\"\"}" http://localhost:4000/apiTweet/tweet/newTweet;

printf "\nTest error unkown author\n";
curl -X POST -H "Content-Type: application/json" -d "{\"author\": \"42\", \"content\":\"This is a test tweet\", \"image\":\"\"}" http://localhost:4000/apiTweet/tweet/newTweet;

printf "\nTest error inappropriate content\n";
curl -X POST -H "Content-Type: application/json" -d "{\"author\": \"${testNewTweet}\", \"content\":\"This is a fucking test tweet\", \"image\":\"\"}" http://localhost:4000/apiTweet/tweet/newTweet;

printf "\nTest error invalid image format\n";
curl -X POST -H "Content-Type: application/json" -d "{\"author\": \"${testNewTweet}\", \"content\":\"This is a test tweet\", \"image\":\"blob:http://localhost:3000/114c6775-2bea-48b9-90bf-2f3b1a\"}" http://localhost:4000/apiTweet/tweet/newTweet;

printf "\nSupression tweet 1\n";
curl -X DELETE -H "Content-Type: application/json" "http://localhost:4000/apiTweet/tweet/${testNewTweetTweet}";

printf "\nTest error acces tweet 1\n"
curl -X GET -H "Content-Type: application/json" "http://localhost:4000/apiTweet/tweet/${testNewTweetTweet}";

testNewTweetTweet=$(curl -X POST -H "Content-Type: application/json" -d "{\"author\": \"${testNewTweet}\", \"content\":\"This is a test tweet\", \"image\":\"\"}" "http://localhost:4000/apiTweet/tweet/newTweet");
echo "Creation tweet 2";
echo "${testNewTweetTweet}";
testNewTweetTweet=$(parseIdFromCurlResponse "${testNewTweetTweet}");

printf "Supression user 1\n";
curl -X DELETE -H "Content-Type: application/json" "http://localhost:4000/api/user/${testNewTweet}";

printf "\nTest error acces tweet 2\n"
curl -X GET -H "Content-Type: application/json" "http://localhost:4000/apiTweet/tweet/${testNewTweetTweet}";
printf "\n\n\n";



printf "Tests get N Tweets:\n\n";

testGetNTweets=$(curl -X POST -H "Content-Type: application/json" -d '{"username": "testGetNTweets", "fullname": "fulltestGetNTweets", "dateOfBirth": "2000-05-12", "emailAddress": "testGetNTweets@test.com", "passwd": "1234"}' http://localhost:4000/api/user/signup);
echo "Creation user 1";
echo "${testGetNTweets}";
testGetNTweets=$(parseIdFromCurlResponse "${testGetNTweets}");
testGetNTweets2=$(curl -X POST -H "Content-Type: application/json" -d '{"username": "testGetNTweets2", "fullname": "fulltestGetNTweets", "dateOfBirth": "2000-05-12", "emailAddress": "testGetNTweets2@test.com", "passwd": "1234"}' http://localhost:4000/api/user/signup);
echo "Creation user 2";
echo "${testGetNTweets2}";
testGetNTweets2=$(parseIdFromCurlResponse "${testGetNTweets2}");
printf "Creation tweet 1\n";
curl -X POST -H "Content-Type: application/json" -d "{\"author\": \"${testGetNTweets}\",\"content\":\"\", \"image\":\"blob:http://localhost:3000/114c6775-2bea-48b9-90bf-2f3b1a86b08d\"}" http://localhost:4000/apiTweet/tweet/newTweet;
printf "\nCreation tweet 2\n";
curl -X POST -H "Content-Type: application/json" -d "{\"author\": \"${testGetNTweets2}\",\"content\":\"This is a test tweet\", \"image\":\"\"}" http://localhost:4000/apiTweet/tweet/newTweet;

printf "\nTest get N tweets (N=2)\n"
curl -X GET -H "Content-Type: application/json" "http://localhost:4000/apiTweet/tweet/getNTweets/2";

printf "\nTest get N tweets (N=1)\n"
curl -X GET -H "Content-Type: application/json" "http://localhost:4000/apiTweet/tweet/getNTweets/1";

printf "\nSupression user1\n";
curl -X DELETE -H "Content-Type: application/json" "http://localhost:4000/api/user/${testGetNTweets}";
printf "\nSupression user2\n";
curl -X DELETE -H "Content-Type: application/json" "http://localhost:4000/api/user/${testGetNTweets2}";
printf "\n\n\n";



printf "Tests get N Tweets from user:\n\n";

testGetNTweetsFromUser=$(curl -X POST -H "Content-Type: application/json" -d '{"username": "testGetNTweetsFromUser", "fullname": "fulltestGetNTweetsFromUser", "dateOfBirth": "2000-05-12", "emailAddress": "testGetNTweetsFromUser@test.com", "passwd": "1234"}' http://localhost:4000/api/user/signup);
echo "Creation user 1";
echo "${testGetNTweetsFromUser}";
testGetNTweetsFromUser=$(parseIdFromCurlResponse "${testGetNTweetsFromUser}");
printf "Creation tweet 1\n";
curl -X POST -H "Content-Type: application/json" -d "{\"author\": \"${testGetNTweetsFromUser}\",\"content\":\"\", \"image\":\"blob:http://localhost:3000/114c6775-2bea-48b9-90bf-2f3b1a86b08d\"}" http://localhost:4000/apiTweet/tweet/newTweet;
printf "\nCreation tweet 2\n";
curl -X POST -H "Content-Type: application/json" -d "{\"author\": \"${testGetNTweetsFromUser}\",\"content\":\"This is a test tweet\", \"image\":\"\"}" http://localhost:4000/apiTweet/tweet/newTweet;

printf "\nTest get N tweets (N=2)\n"
curl -X GET -H "Content-Type: application/json" "http://localhost:4000/apiTweet/tweet/${testGetNTweetsFromUser}/2";

printf "\nTest get N tweets (N=1)\n"
curl -X GET -H "Content-Type: application/json" "http://localhost:4000/apiTweet/tweet/${testGetNTweetsFromUser}/1";

printf "\nTest clean tweets db\n"
curl -X DELETE -H "Content-Type: application/json" "http://localhost:4000/apiTweet/tweet/clean";

printf "\nTest vide get N tweets (N=2)\n"
curl -X GET -H "Content-Type: application/json" "http://localhost:4000/apiTweet/tweet/${testGetNTweetsFromUser}/2";

printf "\nSupression user1\n";
curl -X DELETE -H "Content-Type: application/json" "http://localhost:4000/api/user/${testGetNTweetsFromUser}";
printf "\n\n\n";



printf "Tests Likes:\n\n";

testLike=$(curl -X POST -H "Content-Type: application/json" -d '{"username": "testLike", "fullname": "fulltestLike", "dateOfBirth": "2000-05-12", "emailAddress": "testLike@test.com", "passwd": "1234"}' http://localhost:4000/api/user/signup);
echo "Creation user 1";
echo "${testLike}";
testLike=$(parseIdFromCurlResponse "${testLike}");
testLikeTweet=$(curl -X POST -H "Content-Type: application/json" -d "{\"author\": \"${testLike}\",\"content\":\"This is a test tweet\", \"image\":\"\"}" http://localhost:4000/apiTweet/tweet/newTweet);
echo "Creation tweet 1";
echo "${testLikeTweet}";
testLikeTweet=$(parseIdFromCurlResponse "${testLikeTweet}");

printf "Test acces tweet 1\n"
curl -X GET -H "Content-Type: application/json" "http://localhost:4000/apiTweet/tweet/${testLikeTweet}";

printf "\nTest like tweet\n"
curl -X PUT -H "Content-Type: application/json" "http://localhost:4000/api/user/${testLike}/tweet/${testLikeTweet}/like";

printf "\nTest acces tweet 1\n"
curl -X GET -H "Content-Type: application/json" "http://localhost:4000/apiTweet/tweet/${testLikeTweet}";

printf "\nTest error already liked\n"
curl -X PUT -H "Content-Type: application/json" "http://localhost:4000/api/user/${testLike}/tweet/${testLikeTweet}/like";

printf "\nTest error unknown user\n"
curl -X PUT -H "Content-Type: application/json" "http://localhost:4000/api/user/42/tweet/${testLikeTweet}/like";

printf "\nTest error unknown tweet\n"
curl -X PUT -H "Content-Type: application/json" "http://localhost:4000/api/user/${testLike}/tweet/42/like";

printf "\nTest unlike tweet\n"
curl -X PUT -H "Content-Type: application/json" "http://localhost:4000/api/user/${testLike}/tweet/${testLikeTweet}/unlike";

printf "\nTest acces tweet 1\n"
curl -X GET -H "Content-Type: application/json" "http://localhost:4000/apiTweet/tweet/${testLikeTweet}";

printf "\nTest error not liked\n"
curl -X PUT -H "Content-Type: application/json" "http://localhost:4000/api/user/${testLike}/tweet/${testLikeTweet}/unlike";

printf "\nTest error unknown user\n"
curl -X PUT -H "Content-Type: application/json" "http://localhost:4000/api/user/42/tweet/${testLikeTweet}/unlike";

printf "\nTest error unknown tweet\n"
curl -X PUT -H "Content-Type: application/json" "http://localhost:4000/api/user/${testLike}/tweet/42/unlike";

printf "\nSupression user1\n";
curl -X DELETE -H "Content-Type: application/json" "http://localhost:4000/api/user/${testLike}";
printf "\n\n\n";



printf "Tests Retweets:\n\n";

testRetweet=$(curl -X POST -H "Content-Type: application/json" -d '{"username": "testRetweet", "fullname": "fulltestRetweet", "dateOfBirth": "2000-05-12", "emailAddress": "testRetweet@test.com", "passwd": "1234"}' http://localhost:4000/api/user/signup);
echo "Creation user 1";
echo "${testRetweet}";
testRetweet=$(parseIdFromCurlResponse "${testRetweet}");
testRetweetTweet=$(curl -X POST -H "Content-Type: application/json" -d "{\"author\": \"${testRetweet}\",\"content\":\"This is a test tweet\", \"image\":\"\"}" http://localhost:4000/apiTweet/tweet/newTweet);
echo "Creation tweet 1";
echo "${testRetweetTweet}";
testRetweetTweet=$(parseIdFromCurlResponse "${testRetweetTweet}");

printf "Test acces tweet 1\n"
curl -X GET -H "Content-Type: application/json" "http://localhost:4000/apiTweet/tweet/${testRetweetTweet}";

printf "\nTest retweet tweet\n"
curl -X PUT -H "Content-Type: application/json" "http://localhost:4000/api/user/${testRetweet}/tweet/${testRetweetTweet}/retweet";

printf "\nTest acces tweet 1\n"
curl -X GET -H "Content-Type: application/json" "http://localhost:4000/apiTweet/tweet/${testRetweetTweet}";

printf "\nTest error already retweeted\n"
curl -X PUT -H "Content-Type: application/json" "http://localhost:4000/api/user/${testRetweet}/tweet/${testRetweetTweet}/retweet";

printf "\nTest error unknown user\n"
curl -X PUT -H "Content-Type: application/json" "http://localhost:4000/api/user/42/tweet/${testRetweetTweet}/retweet";

printf "\nTest error unknown tweet\n"
curl -X PUT -H "Content-Type: application/json" "http://localhost:4000/api/user/${testRetweet}/tweet/42/retweet";

printf "\nTest unretweet tweet\n"
curl -X PUT -H "Content-Type: application/json" "http://localhost:4000/api/user/${testRetweet}/tweet/${testRetweetTweet}/unretweet";

printf "\nTest acces tweet 1\n"
curl -X GET -H "Content-Type: application/json" "http://localhost:4000/apiTweet/tweet/${testRetweetTweet}";

printf "\nTest error not retweeted\n"
curl -X PUT -H "Content-Type: application/json" "http://localhost:4000/api/user/${testRetweet}/tweet/${testRetweetTweet}/unretweet";

printf "\nTest error unknown user\n"
curl -X PUT -H "Content-Type: application/json" "http://localhost:4000/api/user/42/tweet/${testRetweetTweet}/unretweet";

printf "\nTest error unknown tweet\n"
curl -X PUT -H "Content-Type: application/json" "http://localhost:4000/api/user/${testRetweet}/tweet/42/unretweet";

printf "\nSupression user1\n";
curl -X DELETE -H "Content-Type: application/json" "http://localhost:4000/api/user/${testRetweet}";
printf "\n\n\n";