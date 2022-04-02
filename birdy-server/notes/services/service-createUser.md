<table>
    <tr>
        <th>NOM</th>
        <td>createUser</td>
    </tr>
    <tr>
        <th>URL</th>
        <td>api/user/ avec POST</td>
    </tr>
    <tr>
        <th>DESCRIPTION</th>
        <td>Permet de creer un nouvel utilisateur</td>
    </tr>
    <tr>
        <th>PARAMETRES</th>
        <td>
            username: le pseudo de l'utilisateur,<br>
            fullname: le nom de l'utilisateur,<br>
            dateOfBirth: la date de naissance de l'utilisateur,<br>
            emailAddress: l'adresse email de l'utilisateur,<br>
            passwd: le mot de passe de l'utilisateur<br>
        </td>
    </tr>
    <tr>
        <th>FORMAT SORTIE</th>
        <td>
            Succes: HTTP 201: Created<br>
            {<br>
                "status": 201,<br>
                "message": "New user registered",<br>
                "id": ${id}<br>
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
            Succes: HTTP 201: Created<br>
            {<br>
                "status": 201,<br>
                "message": "New user registered",<br>
                "id": 1<br>
            }<br><br>
            Erreur: HTTP 40O: Bad Request<br>
            {<br>
                "status": 400,<br>
                "message": "Fields are missing"<br>
            }<br><br>
            Erreur: HTTP 409: Conflict<br>
            {<br>
                "status": 409,<br>
                "message": "Username already exists"<br>
            }<br><br>
            Erreur: HTTP 409: Conflict<br>
            {<br>
                "status": 409,<br>
                "message": "Email address already exists"<br>
            }<br><br>
            Erreur: HTTP 422: Unprocessable Entity<br>
            {<br>
                "status": 422,<br>
                "message": "Invalid date of birth"<br>
            }<br><br>
            Erreur: HTTP 422: Unprocessable Entity<br>
            {<br>
                "status": 422,<br>
                "message": "Invalid name"<br>
            }<br>
        </td>
    </tr>
    <tr>
        <th>ERREURS POSSIBLES</th>
        <td>
            Champs manquant,<br>
            Username existe déjà,<br>
            Email existe déjà,<br>
            Date de naissance invalide,<br>
            Nom interdit<br>
        </td>
    </tr>
    <tr>
        <th>AVANCEMENT</th>
        <td>A faire</td>
    </tr>
    <tr>
        <th>CLASSES / FICHIERS .js</th>
        <td>src/entities/users.js ...</td>
    </tr>
    <tr>
        <th>INFOS SUPPLEMENTAIRES</th>
        <td>...</td>
    </tr>
    </tr><td></td><td></td></tr>
</table>