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
        <td>NewTweet</td>
        <td>/apiTweet/tweet/newTweet avec POST</td>
        <td>
            Permet de creer un nouveau tweet et de le placer dans la liste des tweets de l'auteur
        </td>
        <td>
            author: l'id de l'auteur,<br>
            content: le message du tweet,<br>
            image: le lien vers l'image ou le GIF du tweet<br>
        </td>
        <td>
            Succes: HTTP 201: Created<br>
            {<br>
                "status": 201,<br>
                "message": ${corresponding message}<br>
            }<br><br>
            Erreur: <br>
            {<br>
                "status": ${HTTP number},<br>
                "message": ${corresponding message}<br>
            }<br>
        </td>
        <td>
            Succes: HTTP 201: Created<br>
            {<br>
                "status": 201,<br>
                "message": "New tweet created",<br>
                "id": ${_id}<br>
            }<br><br>
            Erreur: HTTP 40O: Bad Request<br>
            {<br>
                "status": 400,<br>
                "message": "Missing Fields"<br>
            }<br><br>
            Erreur: HTTP 422: Unprocessable Entity<br>
            {<br>
                "status": 422,<br>
                "message": "Invalid image"<br>
            }<br><br>
            Erreur: HTTP 422: Unprocessable Entity<br>
            {<br>
                "status": 422,<br>
                "message": "Invalid message"<br>
            }<br><br>
            Erreur: HTTP 404: Not Found<br>
            {<br>
                "status": 404,<br>
                "message": "Author doesn't exists"<br>
            }<br><br>
            Erreur: HTTP 500: Internal Server Error<br>
            {<br>
                "status": 500,<br>
                "message": "Internal error"<br>
            }<br>
        </td>
        <td>
            Tweet vide -> 400<br>
            Message invalide ou inapproprie -> 422<br>
            Mauvais format d'image -> 422<br>
            Autheur non reconnu -> 404<br>
            Erreur interne -> 500<br>
        </td>
        <td>Fini</td>
        <td>
            Fichiers utilises par le service:<br>
            apiTweet.js (in src/api/)<br>
            tweets.js (in src/entities/)<br>
            <br>
            Fichiers test:<br>
            testLikeTweet.js (in tests/testUsers/)<br>
            testDeleteTweets.js (in tests/testTweets/)<br>
            testGetTweets.js (in tests/testTweets/)<br>
            testNewTweet.js (in tests/testTweets/)<br>
            <br>
            Fichiers client:<br>
            NewTweet.js (in src/components/Timeline/)<br>
            <br>
        </td>
        <td>...</td>
    </tr>
</table>