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
        <td>LikeTweet</td>
        <td>api/user/:_id/tweet/:tweet_id/like avec PUT</td>
        <td>Permet de mettre a jour le compteur de like d'un tweet a partir de son identifiant</td>
        <td>
            _id: l'identifiant du tweet,<br>
        </td>
        <td>
            Succes: HTTP 200: Ok<br>
            {<br>
                "status": 200,<br>
                "message": `Tweet '${req.params._id}' liked successfully`
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
                "message": `Tweet '${req.params._id}' liked successfully`
            }<br><br>
            Erreur: HTTP 409: Conflict<br>
            {<br>
                "status": 409,<br>
                "message": "Tweet has already been liked by this user"<br>
            }<br><br>
            Erreur: HTTP 404: Not Found<br>
            {<br>
                "status": 404,<br>
                "message": "Tweet not found"<br>
            }<br><br>
            Erreur: HTTP 404: Not Found<br>
            {<br>
                "status": 404,<br>
                "message": "Liker not found"<br>
            }<br><br>
            Erreur: HTTP 500: Internal Server Error<br>
            {<br>
                "status": 500,<br>
                "message": "Internal error"<br>
            }<br>
        </td>
        <td>
            Tweet deja like par l'utilisateur -> 409<br>
            Tweet pas dans la base de donnees -> 404<br>
            Utilisateur incconu -> 404<br>
            Erreur interne -> 500<br>
        </td>
        <td>Fini</td>
        <td>
            apiUser.js (in src/api),<br>
            tweets.js (in src/entities/),<br>
            testLikeTweet.js (in tests/)
        </td>
        <td>...</td>
    </tr>
</table>