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
            status: 200,<br>
            message: "Logout successfully"<br>
            }<br><br>
            Erreur: HTTP 400: Bad Request<br>
            {<br>
                "status": 400,<br>
                "message": "Unable to logout"<br>
            }<br>
        </td>
        <td>idem</td>
        <td>
            Erreur lors de la destruction de session -> 400
        </td>
        <td>Fini</td>
        <td>apiUser.js (in src/api/), users.js (in src/entities/), testLogin.js (in tests/)</td>
        <td>...</td>
    </tr>
</table>