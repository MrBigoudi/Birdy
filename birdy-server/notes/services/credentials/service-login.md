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
        <td>Login</td>
        <td>api/user/login avec POST</td>
        <td>Permet de récupérer une clef de connexion valable un certain temps</td>
        <td>
            emailAddress: l'adresse email de l'utilisateur,<br>
            passwd: le mot de passe de l'utilisateur<br>
        <td>
            Succes: HTTP 200: Ok<br>
            {<br>
            status: 200,<br>
            message: "Email address and password accepted"<br>
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
            message: "Email address and password accepted"<br>
            }<br><br>
            Erreur: HTTP 401: Unauthorized<br>
            {<br>
                "status": 401,<br>
                "message": "Unkown email address"<br>
            }<br><br>
            Erreur: HTTP 401: Unauthorized<br>
            {<br>
                "status": 401,<br>
                "message": "Invalid password"<br>
            }<br><br>
            Erreur: HTTP 40O: Bad Request<br>
            {<br>
                "status": 400,<br>
                "message": "Fields are missing"<br>
            }<br>
        </td>
        <td>
            Données incomplètes -> 400,<br>
            Mauvaise données d'authentification -> 401,<br>
        </td>
        <td>A faire</td>
        <td>...</td>
        <td>...</td>
    </tr>
</table>