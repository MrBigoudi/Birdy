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
        <td>Logout</td>
        <td>api/user/logout avec DELETE</td>
        <td>Permet de detruire une session</td>
        <td>Aucun</td>
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
                "message": "Logout successfully"<br>
            }<br><br>
            Erreur: HTTP 400: Bad Request<br>
            {<br>
                "status": 400,<br>
                "message": "Unable to logout"<br>
            }<br><br>
            Erreur: HTTP 500: Internal Server Error<br>
            {<br>
                "status": 500,<br>
                "message": "Internal error"<br>
                "details": `${error || "Unknown error"}`<br>
            }<br>
        </td>
        <td>
            Erreur lors de la destruction de session -> 400<br>
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
            <br>
            Fichiers client:<br>
            <br>
        </td>
        <td>...</td>
    </tr>
</table>