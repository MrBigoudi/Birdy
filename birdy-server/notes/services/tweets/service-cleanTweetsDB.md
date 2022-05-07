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
        <td>CleanTweetsDB</td>
        <td>/apiTweet/tweet/clean avec DELETE</td>
        <td>Permet de remettre a 0 la base de donnees tweets.db</td>
        <td>Aucun</td>
        <td>
            Succes: HTTP 200: Ok<br>
            retour: ${corresponding message}<br>
            <br><br>
            Error: HTTP 500: Internal Error<br>
            retour: ${corresponding message}<br>
        </td>
        <td>
            Succes: HTTP 200: Ok<br>
            retour: `${nbRemoved} tweets deleted successfully from the database`
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
            apiTweets.js (in src/api/)<br>
            tweets.js (in src/entities/)<br>
            <br>
            Fichiers test:<br>
            cleanDB.js (in scripts/)<br>
            <br>
            Fichiers client:<br>
            <br>
        </td>
        <td>...</td>
    </tr>
</table>