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
        <td>Signup</td>
        <td>api/user/signup avec POST</td>
        <td>Permet de creer un nouvel utilisateur</td>
        <td>
            username: le pseudo de l'utilisateur,<br>
            fullname: le nom de l'utilisateur,<br>
            dateOfBirth: la date de naissance de l'utilisateur,<br>
            emailAddress: l'adresse email de l'utilisateur,<br>
            passwd: le mot de passe de l'utilisateur<br>
        </td>
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
                "message": "Missing Fields"<br>
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
            }<br><br>
            Erreur: HTTP 422: Unprocessable Entity<br>
            {<br>
                "status": 422,<br>
                "message": "Invalid username"<br>
            }<br>
        </td>
        <td>
            Champs manquant -> 400<br>
            Username existe déjà -> 409<br>
            Username au format invalid -> 409<br>
            Email existe déjà -> 409<br>
            Date de naissance au format invalide ou age < 13 ans -> 422<br>
            Nom au format invalide ou nom inapproprie -> 422<br>
        </td>
        <td>Fini</td>
        <td>apiUser.js (in src/api/), users.js (in src/entities/), testSignup.js (in /tests)</td>
        <td>...</td>
    </tr>
</table>