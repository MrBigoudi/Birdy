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
        <td>RetweetTweet</td>
        <td>/api/user/:_id/tweet/:_tweetId/retweet avec PUT</td>
        <td>Permet de retweet un message et de modifier les db users et tweets en consequence</td>
        <td>
            _id: l'id l'utilisateur voulant retweet le tweet<br>
            _tweetId: l'id du tweet retweet<br>
        <td>
        <td>
            Succes: HTTP 200: Ok<br>
            {<br>
                "status": 200,<br>
                "message": ${corresponding message}<br>
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
                "status": 200,<br>
                "message": `Tweet '${req.params._id}' retweeted successfully`<br>
            }<br><br>
            Erreur: HTTP 409: Conflict<br>
            {<br>
                "status": 409,<br>
                "message": "Tweet has already been retweeted by this user"<br>
            }<br><br>
            Erreur: HTTP 404: Not Found<br>
            {<br>
                "status": 404,<br>
                "message": "Tweet not found"<br>
            }<br><br>
            Erreur: HTTP 404: Not Found<br>
            {<br>
                "status": 404,<br>
                "message": "Retweeter not found"<br>
            }<br><br>
            Erreur: HTTP 500: Internal Server Error<br>
            {<br>
                "status": 500,<br>
                "message": "Internal error"<br>
                "details": `${error || "Unknown error"}`<br>
            }<br>
        </td>
        <td>
            Tweet deja retweet par l'utilisateur -> 409<br>
            Tweet non present dans la db -> 404<br>
            User non present dans la db -> 404<br>
            Erreur interne -> 500<br>
        </td>
        <td>Fini</td>
        <td>
            Fichiers utilises par le service:<br>
            apiUser.js (in src/api/)<br>
            users.js (in src/entities/)<br>
            tweets.js (in src/entities/)<br>
            <br>
            Fichiers test:<br>
            testLikeTweet.js (in tests/testUsers/)<br>
            <br>
            Fichiers client:<br>
            Tweet.js (in src/components/Timeline/)<br>
            <br>
        </td>
        <td>...</td>
    </tr>
</table>