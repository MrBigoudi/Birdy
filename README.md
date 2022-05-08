# The Birdy Project

<em>Project UE LU3IN017: Web Technologies</em><br>
<em>Made by KEDADRY Yannis ( [github MrBigoudi](https://github.com/MrBigoudi) ) 3808875</em>
<br><br>
<em>OBJECTIF: </em>Creating a "twitter clone" named <strong>Birdy</strong>
<br><br>

## Project Structure

---
<br>

### Birdy-client
<br>

The client side of the project running on [http://localhost:3000](http://localhost:3000)<br>
The README.md inside of the folder is from the <em>create-react-app</em> documentation.
<br><br>

<strong>Notes</strong>

>Some notes concerning the ongoing of the client side of the project.

<br>

<strong>Node Modules</strong>

>The modules needed for the client side of birdy to work (see [howto.md](./howto.md#node-modules) for more info)


<br>

<strong>Public</strong>

>The base <strong>index.html</strong> file + the website's favicons.


<br>

<strong>Src</strong>

>The main core of the client side.<br>
>It contains at it's root both the <strong>App.js</strong> used for the global react routing in the website and the <strong>index.js</strong> which serves as the main react rendering function.

<em>AtomComponents</em>

&emsp;&nbsp;Some small react components reused multiple time along the project to gain some time on the coding process.

<em>Components</em>

&emsp;&nbsp;Bigger react components divided into sections which are used to cut pages into smaller manipulable pieces.

<em>Pages</em>

&emsp;&nbsp;The main pages / react components of Birdy.

<em>Constants</em>

&emsp;&nbsp;Constant values used in multiple react components.

<em>Images</em>

&emsp;&nbsp;Images and icons saved locally to avoid import problem during offline testings.

<em>Stylesheets</em>

&emsp;&nbsp;All of the css files used to make this website as pretty as I can (despite my poor artistic sensitivity ^^')

<em>Database (now obsolete)</em>

&emsp;&nbsp;A tiny local database used to test the client side before the server side was made.<br>
&emsp;&nbsp;I keep it as a trace of the work I've done + as a template of what I might still have to implement on the server side

<br>

---
<br>

### Birdy-server
<br>

The server side of the project<br>
It's actually a local server as it'll run on [http://localhost:4000](http://localhost:4000)
<br><br>

<strong>Database</strong>

>The actual databases of the project for containing both the users infos and the tweets infos.

<br>

<strong>Node Modules</strong>

>The modules needed for the server side of birdy to work (see [howto.md](./howto.md#node-modules) for more info)


<br>

<strong>Notes</strong>

>Notes describing the server and especially all the services provided by the custom api.


<br>

<strong>Scripts</strong>

>Scripts for testing or initiate the server and the databases (see [howto.md](./howto.md#server-scripts) for more info)


<br>

<strong>Src</strong>

>The main core of the server side.<br>
>It contains at it's root the files needed to export and create the apis provided by the server.

<em>Api</em>

&emsp;&nbsp;Both the api to manage users and the api to manage tweets.

<em>entities</em>

&emsp;&nbsp;The classes to manage both the users and the tweets.

<br>

<strong>Tests</strong>

>Mocha and chai tests for apis and databases (see [howto.md](./howto.md#server-tests) for more info)


<br>


---
<br>

## Databases

---
<br>

### Users
<br>

Users database's architecture
<br><br>

<strong>Username</strong>

> The username of the user,<br> 
> Must be made out of letters/digits,<br>
> Must be different for every users,<br>
> Must not be inappropriate<br>

<br>

<strong>Fullname</strong>

> The fullname of the user,<br> 
> Must be made out of letters (and spaces between if needed),<br>
> Must not be inappropriate<br>

<br>

<strong>DateOfBirth</strong>

> The birthday of the user,<br> 
> Must be a date,<br>
> Users must be at least 13 to signup<br>

<br>

<strong>Email Address</strong>

> The user's email address,<br> 
> Must be different for every users<br>

<br>

<strong>Password</strong>

> The user's password,<br> 
> (more security checks still need to be implemented)<br>

<br>

<strong>Following / Followers</strong>

> Lists of other uers followed by the user and other users following the user<br> 
> Must contains usersId,<br>
> Initially empty lists<br>

<br>

<strong>Tweets</strong>

> Lists of tweet ids posted by the user<br> 
> Initially empty lists<br>

<br>

<strong>TweetsLiked / TweetsRetweeted / TweetsReplied</strong>

> Lists of tweet ids from respectively tweets liked, retweeted or replied by the user<br> 
> Initially empty lists<br>

<br>

<strong>Profile Picture</strong>

> Path to the profile picture of the user,<br> 
> Initially empty string<br>

<br>

<strong>DateCreated</strong>

> Date from when the user was added to teh db,<br> 
> Initially set to the current date<br>

<br>

---
<br>

### Tweets
<br>

Users database's architecture
<br><br>

<strong>Index</strong><em>(now obsolete)</em>

> The tweet's index,<br> 
> Was initialized using a static counter,<br>
> Has been left behind since every restart of the app was putting the static counter back to 0<br>

<br>

<strong>Author</strong>

> The author's id,<br>
> Set automatically when posting a tweet<br>

<br>

<strong>Content</strong>

> The tweet's content,<br> 
> Must be appropriate<br>

<br>

<strong>Image</strong>

> The tweet's image,<br> 
> Either tweet's content or image must be filled before sending a tweet<br>

<br>

<strong>NbLikes / NbRetweets / NbComments</strong>

> The tweet's counters,<br> 
> Initially set to 0<br> 

<br>

<strong>Likers / Retweeters</strong>

> Lists of uers who liked or retweeted the tweet<br> 
> Must contains usersId,<br>
> Initially empty lists (technically they are sets hence a tweet can't be liked or retweeted twice by the same user)<br>

<br>

<strong>Comments</strong>

> Lists of tweet ids posted by the user<br> 
> Initially empty lists<br>
> Not used for the moment but it'll come handy when the comments will be implemented ( check the [todo list](#todo) for more info on the things yet to be implemented)<br>

<br>

<strong>DateCreated</strong>

> Date from when the user was added to teh db,<br> 
> Initially set to the current date<br>

<br>

---
<br>

## TODO

---
<br>

### Comments

> The biggest missing part of the project are the comments.<br>
> The server api can easily be modified to add the services needed but the client side will need more work<br>

### Search Bar

> One other missing part is the search bar that is currently not searching anything ^^'.<br>
> Once again the server part can be done without any issue, but for the client side I still don't know what look I want for it, however, this is definitely easier to add than the comments.<br>

### Nav Bar

> As you might notice, appart from the <em>home</em> and the <em>list<em> buttons (only when a user is connected) few of the menu in the left pannel are doing interesting stuff.

### Customisation

> For the moment there is no way to customise your profile (profile picture / preferred color ...) neither to modify your personal informations.s meant to be usefull

### General

> In general, there are still a lot of security checks to add to make the site as safe as possible (for the moment, the majority of the security tests are done during the signup like to check users age or usernames and during the posting of a new tweet preventing any inappropriate word).<br>
> I also need to take the website out of the local field and add a way to save images posted by users.<br>
> Finally I'll need to get more statistics from the users for futur data analyses.


<br>


---
<br>

## Issues faced

---
<br>

### Time

> The main issue I've faced was time, we had to do this project (server + client side) in about three months starting from scratch (literally since it was my first time with most of the tools used in web developpment).<br>
> It was sometimes a bit frustrating to not have the time to acquire everything perfectly before moving to another part of the project.<br>
> However the deadline we had was also a good motivation and made me work twice as fast as I've ever done before xD .<br>

### Updates

> Another big issue (not due to the way the project was given) was the fact that for any updates I was doing on my computer, I had one chance out of three to brake something on the website since (as I've learned the hard way xD ) web developpement is a bit <em>messy</em>.
