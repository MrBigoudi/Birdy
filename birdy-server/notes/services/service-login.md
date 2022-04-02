<table>
    <tr>
        <th>NOM</th>
        <td>login</td>
    </tr>
    <tr>
        <th>URL</th>
        <td>api/login avec POST</td>
    </tr>
    <tr>
        <th>DESCRIPTION</th>
        <td>Permet de récupérer une clef de connexion valable un certain temps</td>
    </tr>
    <tr>
        <th>PARAMETRES</th>
        <td>
            emailAddress: l'adresse email de l'utilisateur,<br>
            passwd: le mot de passe de l'utilisateur<br>
        </td>
    </tr>
    <tr>
        <th>FORMAT SORTIE</th>
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
    </tr>
    <tr>
        <th>EXEMPLE SORTIE</th>
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
    </tr>
    <tr>
        <th>ERREURS POSSIBLES</th>
        <td>
            Données incomplètes -> 400,<br>
            Mauvaise données d'authentification -> 401,<br>
        </td>
    </tr>
    <tr>
        <th>AVANCEMENT</th>
        <td>A faire</td>
    </tr>
    <tr>
        <th>CLASSES / FICHIERS .js</th>
        <td>...</td>
    </tr>
    <tr>
        <th>INFOS SUPPLEMENTAIRES</th>
        <td>...</td>
    </tr>
    </tr><td></td><td></td></tr>
</table>