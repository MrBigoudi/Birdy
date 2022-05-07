# Howto

To run the website :

```sh
#Open a new terminal

$ cd ./birdy-server
$ npm run serve
```

```sh
#Open a second terminal

$ cd ./birdy-client
$ npm start
```

---
<br>

## Node Modules
<br>

To install all the needed modules instead of getting them from github :

```sh
#Open a terminal

$ cd ./birdy-server
$ npm install
$ cd ../birdy-client
$ npm install
```

Then you should have all the dependencies downloaded correctly<br>
Go back to [Howto](#howto) if you want to launch Birdy<br>
<br>

---
<br>

## Server Scripts
<br>

A few usefull scripts are available on this project:

<br>

### Curl requests
<br>

If you want to try some curl requests, there is a sample given in <em>birdy-server/scripts/curlTests.sh</em> that you can modify if you want.

First launch the server,<br>
```sh
#Open a new terminal

$ cd ./birdy-server
$ npm run serve
```

Then launch the script,<br>

```sh
#Open a second terminal

$ cd ./birdy-server
$ sudo chmod u+x scripts/curlTests.sh #make sure you have the correct rights to do so
$ npm run curlTests
```

<br>

### Clean Databases
<br>

If you want to empty the databases ( <strong>BE CAREFUL AS THIS IS NOT RECOVERABLE</strong> ) you can use the script in <em>birdy-server/scripts/cleanDB.js</em>.

First launch the server,<br>

```sh
#Open a new terminal

$ cd ./birdy-server
$ npm run serve
```

Then launch the script,<br>

```sh
#Open a second terminal

$ cd ./birdy-server
$ npm run cleanDB #once again be sure you want to do it, as this is unrecoverable
```

<br>

### Init Databases
<br>

If you want to initiate the databases with some random stuff you can use the script in <em>birdy-server/scripts/initDB.js</em> ( only works once due to avoid redundancy in the database ).<br>
If you then want to try the website there will be one user called <em>q</em> with the credentials :<br>
emailAddress: <em>q@q.q</em><br>
password: <em>q</em><br>
This user is made as simple as that to perform fast tests without spending to much time on the login page ^^ .<br>

First launch the server,<br>

```sh
#Open a new terminal

$ cd ./birdy-server
$ npm run serve
```

Then launch the script,<br>

```sh
#Open a second terminal

$ cd ./birdy-server
$ npm run initDB #will not work twice if you don't clean the database before a second use
```
<br>

---
<br>

## Server Tests
<br>

If you want to try some mocha / chai tests you can use and modify the ones given in <em>birdy-server/tests/*</em>.

```sh
#Open a new terminal

$ cd ./birdy-server
$ npm run serve
```

Then launch the tests,<br>

```sh
#Open a second terminal

$ cd ./birdy-server
$ npm test # be carrefull to use correct credentials on your tests to not interfere with the real databases
```
<br>