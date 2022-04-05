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
        <td>Add Comment</td>
        <td>api/tweet/comment avec POST</td>
        <td>Ajoute un commentaire sous un tweet</td>
        <td>
            text: le texte du tweet
            image: l'image (animée ou non) du tweet
            (Au moins l'un des deux champs doit être renseigné)
        </td>
        <td>
            Succes: HTTP 200: Ok<br>
            {<br>
            status: 200,<br>
            message: "New comment added"<br>
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
            status: 200,<br>
            message: "New comment added"<br>
            }<br><br>
            Erreur: HTTP 40O: Bad Request<br>
            {<br>
                "status": 400,<br>
                "message": "Fields are missing"<br>
            }<br>
        </td>
        <td>
            Données incomplètes -> 400,<br>
        </td>
        <td>TODO</td>
        <td>...</td>
        <td>None</td>
    </tr>
</table>