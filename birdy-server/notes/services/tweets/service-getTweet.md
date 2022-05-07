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
        <td>GetTweet</td>
        <td>/apiTweet/tweet/:_id avec GET</td>
        <td>Permet d'obtenir les informations sur un tweet a partir de son identifiant</td>
        <td>
            _id: l'identifiant du tweet,<br>
        </td>
        <td>
            Succes: HTTP 200: Ok<br>
            {<br>
                "author": ${author},<br>
                "content": ${content},<br>
                "image": ${image},<br>
                "nbLikes": ${nbLikes},<br>
                "nbRetweets": ${nbRetweets},<br>
                "nbComments": ${nbReplies},<br>
                "comments": { ${_idTweet1}, ${_idTweet2}, ... },<br>
                "dateCreated": ${dateCreated}<br>
                "_id": ${_id}<br>
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
                "message": "Tweet not found"<br>
            }<br><br>
            Erreur: HTTP 500: Internal Server Error<br>
            {<br>
                "status": 500,<br>
                "message": "Internal error"<br>
            }<br>
        </td>
        <td>
            Tweet pas dans la base de donnees -> 404<br>
            Erreur interne -> 500<br>
        </td>
        <td>Fini</td>
        <td>
            Fichiers utilises par le service:<br>
            apiTweets.js (in src/api/)<br>
            tweets.js (in src/entities/)<br>
            <br>
            Fichiers test:<br>
            testNewTweet.js (in tests/testTweets/)<br>
            testDeleteTweets.js (in tests/testTweets/)<br>
            <br>
            Fichiers client:<br>
            Tweet.js (in src/components/Timeline/)<br>
            <br>
        </td>
        <td>...</td>
    </tr>
</table>