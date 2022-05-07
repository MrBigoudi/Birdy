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
        <td>getNTweets</td>
        <td>/apiTweet/tweet/getNTweets/:nbTweets avec GET</td>
        <td>
            Permet d'obtenir la liste des nbTweets les plus recents
        </td>
        <td>
            nbTweets: le nombre de tweets a recuperer<br>
        </td>
        <td>
            Succes: HTTP 200: Ok<br>
            retour : [${tweet1}, ${tweet2}, ... ]<br>
            <br><br>
            Error: ${HTTP number}<br>
            retour: ${corresponding message}<br>
        </td>
        <td>
            Succes: HTTP 200: Ok<br>
            retour : [${tweet1}, ${tweet2}, ... ]<br>
            <br><br>
            Error: HTTP 500: Internal Error<br>
            retour: `Internal error`<br>
        </td>
        <td></td>
        <td>
            Erreur interne -> 500<br>
        </td>
        <td>Fini</td>
        <td>
            Fichiers utilises par le service:<br>
            apiTweet.js (in src/api/)<br>
            tweets.js (in src/entities/)<br>
            <br>
            Fichiers test:<br>
            testGetTweets (in tests/testTweets/)<br>
            <br>
            Fichiers client:<br>
            Dashboard.js (in src/pages/)<br>
            Profile.js (in src/pages/)<br>
            Timeline.js (in src/components/Timeline/)<br>
            <br>
        </td>
        <td>...</td>
    </tr>
</table>