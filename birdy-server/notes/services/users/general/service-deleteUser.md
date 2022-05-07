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
        <td>DeleteUser</td>
        <td>/api/user/:_id avec DELETE</td>
        <td>
            Permet de supprimer un utilisateur de la base de donnees a partir de son identifiant
        </td>
        <td>
            _id: l'identifiant de l'utilisateur,<br>
        </td>
        <td>
            Succes: HTTP 200: Ok<br>
            retour: ${corresponding message}<br>
            <br><br>
            Error: ${HTTP number}<br>
            retour: ${corresponding message}<br>
        </td>
        <td>
            Succes: HTTP 200: Ok<br>
            retour: `delete user ${_id}`
            <br><br>
            Error: HTTP 500: Internal Error<br>
            retour: `Internal error`<br>
        </td>
        <td>
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
            testSignup.js (in tests/testUsers/)<br>
            testLikeTweet.js (in tests/testUsers/)<br>
            testDeleteTweets.js (in tests/testTweets/)<br>
            testGetTweets.js (in tests/testTweets/)<br>
            testNewTweet.js (in tests/testTweets/)<br>
            <br>
            Fichiers client:<br>
            <br>
        </td>
        <td>...</td>
    </tr>
</table>