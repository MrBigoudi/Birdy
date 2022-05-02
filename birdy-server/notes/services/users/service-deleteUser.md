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
        <td>api/user/:_id avec DELETE</td>
        <td>
            Permet de supprimer un utilisateur de la base de donnees a partir de son identifiant
        </td>
        <td>
            _id: l'identifiant de l'utilisateur,<br>
        </td>
        <td>
            Succes: HTTP 200: Ok<br>
            {<br>
                "delete user ${_id}"
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
            Erreur: HTTP 500: Internal Server Error<br>
            {<br>
                "status": 500,<br>
                "message": "Internal error"<br>
            }<br>
        </td>
        <td>
            Erreur interne -> 500<br>
        </td>
        <td>Fini</td>
        <td>
            apiUser.js (in src/api/),<br>
            users.js (in src/entities/),<br>
            testSignup.js (in tests/),<br>
            testLogin.js (in tests/)
        </td>
        <td>...</td>
    </tr>
</table>