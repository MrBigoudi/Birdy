<table>
    <tr>
        <th>NOM</th>
        <th>URL</th>
        <th>DESCRIPTION</th>
        <th>PARAMETRES</th>
        <th>FORMAT SORTIE</th>
        <th>EXEMPLE SORTIE</th>
        <th>ERREURS POSSIBLES</th>
        <th>AVANCEMENT</th>
        <th>CLASSES / FICHIERS .js</th>
        <th>INFOS SUPPLEMENTAIRES</th>
    </tr>
    <tr>        
        <td>GetUser</td>
        <td>/api/user/:_id avec GET</td>
        <td>Permet d'obtenir les informations sur un utilisateur a partir de son identifiant</td>
        <td>
            _id: l'identifiant de l'utilisateur<br>
        </td>
        <td>
            Succes: HTTP 200: Ok<br>
            {<br>
                "username": ${username},<br>
                "fullname": ${fullname},<br>
                "dateOfBirth": ${dateOfBirth},<br>
                "emailAddress": ${emailAddress},<br>
                "passwd": ${passwd},<br>
                "following": [ ${_idUser1}, ${_idUser2}, ... ],<br>
                "followers": [ ${_idUser1}, ${_idUser2}, ... ],<br>
                "tweets": [ ${_idTweet1}, ${_idTweet2}, ... ],<br>
                "tweetsLiked": [ ${_idTweet1}, ${_idTweet2}, ... ],<br>
                "tweetsRetweeted": [ ${_idTweet1}, ${_idTweet2}, ... ],<br>
                "tweetsReplied": [ ${_idTweet1}, ${_idTweet2}, ... ],<br>
                "profilePicture": ${profilePicture},<br>
                "dateCreated": ${dateCreated},<br>
                "_id": ${_id},<br>
            }<br><br>
            Erreur: <br>
            {<br>
                "status": ${HTTP number},<br>
                "message": ${corresponding message}<br>
            }<br>
        </td>
        <td>
            Succes: HTTP 200: Ok<br>
            {<br>
                ...
            }<br><br>
            Erreur: HTTP 404: Not Found<br>
            {<br>
                "status": 404,<br>
                "message": "User not found"<br>
            }<br><br>
            Erreur: HTTP 500: Internal Server Error<br>
            {<br>
                "status": 500,<br>
                "message": "Internal error"<br>
            }<br>
        </td>
        <td>
            Utilisateur pas dans la base de donnees -> 404<br>
            Erreur interne -> 500<br>
        </td>
        <td>Fini</td>
        <td>
            Fichiers utilises par le service:<br>
            apiUser.js (in src/api/)<br>
            users.js (in src/entities/)<br>
            <br>
            Fichiers test:<br>
            testLogin.js (in tests/testUsers/)<br>
            testSignup.js (in tests/)<br>
            <br>
            Fichiers client:<br>
            Profile.js (in src/pages/)<br>
            SideBar.js (in src/components/SideBar/)<br>
            <br>
        </td>
        <td>...</td>
    </tr>
</table>