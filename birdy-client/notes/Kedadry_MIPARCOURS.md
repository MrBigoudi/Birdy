# Arbre des composants React

```
App
|
+--- BrowserRouter
     |
     +--- Suspense
          |
          +--- Loading
          |    |
          |    +--- BirdyLogo
          |
          +--- Routes
               |
               +--- NotFound
               |
               +--- Login
               |    |
               |    +--- BirdyLogo
               |
               +--- Signup
               |    |
               |    +--- BirdyLogo
               |
               +--- Dashboard
               |    |
               |    +--- NavBar
               |    |    |
               |    |    +--- BirdyLogo
               |    |    |
               |    |    +--- [MenuIcon]
               |    |
               |    +--- TimeLine
               |    |    |
               |    |    +--- [Tweet || TweetDeleted]
               |    |         |
               |    |         +--- [TweetIcon]
               |    |         |
               |    |         +--- [CustomLink]
               |    |
               |    +--- SideBar
               |         |
               |         +--- SearchBar
               |
               +--- Profile
                    |
                    +--- NavBar
                    |    |
                    |    +--- BirdyLogo
                    |    |
                    |    +--- [MenuIcon]
                    |
                    +--- TimeLine
                    |    |
                    |    +--- NewTweet
                    |    |
                    |    +--- [Tweet || TweetDeleted]
                    |         |
                    |         +--- [TweetIcon]
                    |         |
                    |         +--- [CustomLink]
                    |
                    +--- SideBar
                         |
                         +--- SearchBar
```

## Legende

> <strong>[</strong>&nbsp;<em>component</em>&nbsp;<strong>]</strong> -> Liste de composants<br>
> <em>componentA</em>&nbsp;<strong>||</strong>&nbsp;<em>componentB</em> -> Le composantA ou le composantB selon un ??tat

# Les composants et leur r??le

## App
<br>

### R??le

>
><ul>
>    <li>Utilise des routers pour g??rer les d??placements au sein du site</li>
>    <li>
>        G??re les erreurs de navigation en redirigeant vers le composant 
>        <strong>NotFound</strong>
>    </li>
>    <li>
>        Fait appel ?? un composant <strong>Suspense</strong> 
>        pour afficher le composant <strong>Loading</strong> 
>        lors des chargements
>    </li>
></ul>
<br>

### Props

> <ul><li>Aucun</li></ul>

### States

> <ul><li>Aucun</li></ul>

### Avancement

> <ul><li>Termin??</li></ul>

### Preview

> <em>Ce composant n'appara??t jamais physiquement sur la page</em>

<br>
<hr />

## Loading
<br>

### R??le

> <ul><li>Affiche le logo du site et un message lors des temps de chargements</li></ul>

### Props

> <ul><li>Aucun</li></ul>

### States

> <ul><li>Aucun</li></ul>

### Avancement

> <ul><li>Termin??</li></ul>

### Preview

> Le composant Loading:
> <br><br>
> ![alt preview of the Loading component](./previews/Loading.png "Loading component")
<br>
<hr />

## BirdyLogo
<br>

### R??le

> <ul><li>Le logo du site</li></ul>

### Props

> <ul><li>Aucun</li></ul>

### States

> <ul><li>Aucun</li></ul>

### Avancement

> <ul><li>Termin??</li></ul>

### Preview

> Le composant BirdyLogo:
> <br><br>
> ![alt preview of the BirdyLogo component](./previews/BirdyLogo.png "BirdyLogo component")
<br>
<hr />

## NotFound
<br>

### R??le

> <ul><li>La page s'affichant en cas d'erreur de routage</li></ul>

### Props

> <ul><li>Aucun</li></ul>

### States

> <ul><li>Aucun</li></ul>

### Avancement

> <ul><li>Termin??</li></ul>

### Preview

> Le composant NotFound:
> <br><br>
> ![alt preview of the NotFound component](./previews/NotFound.png "NotFound component")
<br>
<hr />

## Login
<br>

### R??le

> <ul>
>   <li>G??re la connexion d'un utilisateur</li>
>   <li>
>       Redirige vers le composant <strong>Profile</strong> 
>       de l'utilisateur en cas d'authentification r??ussie
>   </li>
>   <li>
>       Change d'??tat en cas de mauvais mot de passe ou d'email invalid<br>
>       <em>En cas de mauvais mot de passe on vide aussi le champ <strong>Password</strong> du formulaire</em>
>   </li>
> </ul>

### Props

> <ul><li>Aucun</li></ul>

### States

> <ul><li>Le formulaire contenant l'adresse email et le mot de passe</li></ul>

### Avancement

> <ul><li>Termin??</li></ul>

### Preview

> Le composant Login :
> <br><br>
> ![alt preview of the Login component](./previews/LogIn.png "Login component")
> <br><br><br>
> En cas d'adresse email invalide :
> <br><br>
> ![alt preview of the Login component when invalid email](./previews/LogInWrongMail.png "Login component when invalid email")
> <br><br><br>
> En cas de mot de passe invalide :
> <br><br>
> ![alt preview of the Login component when invalid password](./previews/LogInWrongPasswd.png "Login component when invalid password")
<br>
<hr />

## Signup
<br>

### R??le

> <ul>
>   <li>G??re l'inscription d'un utilisateur</li>
>   <li>
>       Redirige vers le composant <strong>Profile</strong> 
>       de l'utilisateur en cas d'inscription r??ussie
>   </li>
>   <li>
>       Change d'??tat si un utilisateur avec cette adresse email ou ce pseudo existe d??j??
>   </li>
> </ul>

### Props

> <ul><li>Aucun</li></ul>

### States

> <ul>
>   <li>
>       Le formulaire contenant le pseudo, la date de naissance, le nom complet,
>    l'adresse email et le mot de passe
>   </li>
>   <li>
>      Le message d'erreur ?? afficher 
>   </li>
> </ul>

### Avancement

> <ul><li>Termin??</li></ul>

### Preview

> Le composant Signup :
> <br><br>
> ![alt preview of the Signup component](./previews/SignUp.png "Signup component")
> <br><br><br>
> En cas d'adresse email d??j?? utilis??e par un autre utilisateur :
> <br><br>
> ![alt preview of the Signup component when email already taken](./previews/SignUpMailTaken.png "SignUp component when email already taken")
> <br><br><br>
> En cas de pseudo d??j?? utilis?? par un autre utilisateur :
> <br><br>
> ![alt preview of the Signup component when username already taken](./previews/SignUpUsernameTaken.png "SignUp component when username already taken")
<br>
<hr />

## Dashboard
<br>

### R??le

> <ul>
>   <li>La page d'acceuil du site</li>
>   <li>Affiche les tweets les plus r??cents</li>
>   <li>Permet de voir les r??ponses ?? ces tweets</li>
>   <li>Redirige vers les pages d'inscription et de connections</li>
>   <li>Permet de g??rer quelques options basiques</li>
>   <li>Permet de faire quelques recherches globales dans le site</li>
> </ul>

### Props

> <ul><li>Aucun</li></ul>

### States

> <ul><li>Aucun</li></ul>

### Avancement

> <ul><li>En cours</li></ul>

### Preview

> Le composant Dashboard:
> <br><br>
> ![alt preview of the Dashboard component](./previews/Dashboard.png "Dashboard component")
<br>
<hr />

## Profile
<br>

### R??le

> <ul>
>   <li>La page d'un utilisateur connect??</li>
>   <li>Affiche les tweets les plus r??cents</li>
>   <li>Permet de g??rer les options de l'utilisateur</li>
>   <li>
>         Donne acc??s ?? la liste des personnes suivis, des personnes 
>         qui nous suivent, des messages priv??s, des messages aim??s, des messages retweet??s
>         et des tweets envoy??s par l'utilisateur
>   </li>
>   <li>Permet de faire des recherches globales dans le site et locales ?? l'utilisateur</li>
>   <li>Permet d'aimer un tweet, d'y r??pondre, de le retweeter et de le partager</li>
> </ul>

### Props

> <ul><li>Aucun</li></ul>

### States

> <ul><li>Aucun (ce sont les composants enfants qui vont chager)</li></ul>

### Avancement

> <ul>
>    <li>
>         En cours <em>(il s'agit du composant pouvant encore ??voluer le plus, car il y a toujours plein d'am??liorations et de nouvelles fonctionnalit??s possibles)</em>
>    </li>
> </ul>

### Preview

> Le composant Profile (<em>dans l'??tat actuel, mais des changements sont ?? pr??voir</em>):
> <br><br>
> ![alt preview of the Profile component](./previews/Profile.png "Profile component")
<br>
<hr />

## NavBar
<br>

### R??le

> <ul>
>   <li>Permet de naviguer au sein du Dashboard ou d'un Profile</li>
> </ul>

### Props

> <ul><li>Une liste des icones ?? afficher dans le menu et le handler de leur actions</li></ul>

### States

> <ul><li>Aucun</li></ul>

### Avancement

> <ul><li>Termin??</li></ul>

### Preview

> Le composant NavBar (<em>red border</em>):
> <br><br>
> ![alt preview of the NavBar component](./previews/NavBar.png "NavBar component")
> Le composant NavBar lorsqu'un utilisateur est connect??:
> <br><br>
> ![alt preview of the NavBar component when a user is connected](./previews/NavBarProfile.png "Profile version of the NavBar component")
<br>
<hr />

## MenuIcon
<br>

### R??le

> <ul>
>   <li>G??re un des menus de la bar de navigation</li>
> </ul>

### Props

> <ul>
>    <li>src: la source de l'icone ?? afficher</li>
>    <li>alt: le texte alternatif ?? afficher en cas de mauvais chargement</li>
>    <li>msg: le nom du menu (s'affiche ?? c??t?? de l'icone)</li>
>    <li>onClick: le handler ?? effectuer quand on clique sur le MenuIcon</li>
> </ul>

### States

> <ul><li>Aucun</li></ul>

### Avancement

> <ul><li>Termin??</li></ul>

### Preview

> Le composant MenuIcon:
> <br><br>
> ![alt preview of the MenuIcon component](./previews/MenuIcon.png "MenuIcon component")
<br>
<hr />

## SideBar
<br>

### R??le

> <ul>
>   <li>
>         G??re la recherche sur le site et les redirections vers les formulaires de connexions
>   </li>
> </ul>

### Props

> <ul>
>    <li>logged: permet de savoir si on est sur une page de profile ou sur le dashboard</li>
> </ul>

### States

> <ul><li>Aucun</li></ul>

### Avancement

> <ul><li>Termin??</li></ul>

### Preview

> Le composant SideBar:
> <br><br>
> ![alt preview of the SideBar component](./previews/SideBar.png "SideBar component")
> <br><br><br>
> Le composant SideBar lorsqu'un utilisateur est connect??:
> <br><br>
> ![alt preview of the SideBar component when a user is connected](./previews/SideBarProfile.png "Profile version of the SideBar component")
<br>
<hr />

## SearchBar
<br>

### R??le

> <ul><li>G??re les recherches sur le site</li></ul>

### Props

> <ul><li>Aucun</li></ul>

### States

> <ul><li>Aucun</li></ul>

### Avancement

> <ul><li>En cours (il manque les r??sultats des recherches)</li></ul>

### Preview

> Le composant SearchBar:
> <br><br>
> ![alt preview of the SearchBar component](./previews/SearchBar.png "SearchBar component")
<br>
<hr />

## Timeline
<br>

### R??le

> <ul>
>   <li>Affiche les tweets</li>
>   <li>Affiche les commentaires</li>
>   <li>
>       Permet d'??crire un tweet ou un commentaire <em>(si l'utilisateur est connect??)</em>
>   </li>
> </ul>

### Props

> <ul>
>    <li>tweets: la liste des tweets ?? afficher</li>
>    <li>default: permet de savoir si un utilisateur est connect?? ou non</li>
>    <li>user: l'utilisateur connect??</li>
> </ul>

### States

> <ul>
>    <li>tweetList: la liste des tweets ?? afficher</li>
> </ul>

### Avancement

> <ul><li>En cours</li></ul>

### Preview

> Le composant Timeline:
> <br><br>
> ![alt preview of the Timeline component](./previews/Timeline.png "Timeline component")
<br>
<hr />

## Tweet
<br>

### R??le

> <ul>
>   <li>Affiche un tweet</li>
>   <li>
>       Permet d'interagir avec un tweet <em>(si l'utilisateur est connect??)</em>
>   </li>
> </ul>

### Props

> <ul>
>    <li>tweet: le tweet ?? afficher</li>
>    <li>deleted: permet de savoir si le tweet a ??t?? masqu?? par un utilisateur</li>
>    <li>user: l'utilisateur connect??</li>
>    <li>default: permet de savoir si un utilisateur est connect?? ou s'il s'agit du dashboard</li>
>    <li>onDelete: action ?? r??aliser quand on masque le tweet</li>
> </ul>

### States

> <ul>
>    <li>nbReplies: le nombre de commentaires</li>
>    <li>nbRetweets: le nombre de retweet</li>
>    <li>nbLikes: le nombre d'utilisateurs ayant aim?? le tweet</li>
>    <li>deleted: tweet effac?? ou non</li>
> </ul>

### Avancement

> <ul><li>En cours</li></ul>

### Preview

> Le composant Tweet:
> <br><br>
> ![alt preview of the Tweet component](./previews/Tweet.png "Tweet component")
> <br><br><br>
> Le composant Tweet lorsqu'un utilisateur est connect??:
> <br><br>
> ![alt preview of the Tweet component when a user is connected](./previews/TweetProfile.png "Profile version of the Tweet component")
<br>
<hr />

## TweetDeleted
<br>

### R??le

> <ul>
>   <li>
>         Affiche un tweet masqu?? par l'utilisateur<em>
>         (Le tweet peut ??tre restor?? en rappuyant sur un button)</em>
>   </li>
> </ul>

### Props

> <ul>
>    <li>id: l'identifiant du tweet ?? masquer</li>
>    <li>deleted: permet de savoir si le tweet a ??t?? masqu?? par un utilisateur</li>
>    <li>onDelete: action ?? r??aliser quand on masque le tweet</li>
> </ul>

### States

> <ul>
>    <li>deleted: tweet effac?? ou non</li>
> </ul>

### Avancement

> <ul><li>Termin??</li></ul>

### Preview

> Le composant TweetDeleted:
> <br><br>
> ![alt preview of the TweetDeleted component](./previews/TweetDeleted.png "TweetDeleted component")
<br>
<hr />

## TweetIcon
<br>

### R??le

> <ul><li>G??re l'affichage des icones dans le footer des tweets</li></ul>

### Props

> <ul>
>    <li>name: le nom de l'icone</li>
>    <li>imageSrc: le chemin vers l'image</li>
>    <li>cpt: le compteur ?? afficher <em>(uniquement si cpt>0)</em></li>
>    <li>onClick: action ?? r??aliser quand on clique sur l'icone</li>
> </ul>

### States

> <ul><li>Aucun</li></ul>

### Avancement

> <ul><li>Termin??</li></ul>

### Preview

> Le composant TweetIcon:
> <br><br>
> ![alt preview of the TweetIcon component](./previews/TweetIcon.png "TweetIcon component")
<br>
<hr />

## NewTweet
<br>

### R??le

> <ul><li>Permet ?? l'utilisateur de poster un nouveau tweet</li></ul>

### Props

> <ul>
>    <li>user: l'utilisateur connect??'</li>
>    <li>onPost: l'action ?? r??aliser lorsque l'on veut poster le tweet</li>
> </ul>

### States

> <ul>
>    <li>
>         tweetContent: le contenu du formulaire cach?? derri??re la cr??ation du nouveau tweet
>    </li>
>    <li>
>         error: indique s'il y a une erreur dans le tweet
>    </li>
> </ul>

### Avancement

> <ul><li>En cours</li></ul>

### Preview

> Le composant NewTweet:
> <br><br>
> ![alt preview of the NewTweet component](./previews/NewTweet.png "NewTweet component")
<br>
<hr />