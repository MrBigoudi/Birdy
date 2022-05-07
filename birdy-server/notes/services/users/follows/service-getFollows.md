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
        <td>getFollows</td>
        <td>/api/user/:_id/follows avec GET</td>
        <td>
            Permet d'obtenir la liste des utilisateurs que suit un utilisateur dont on a l'identifiant
        </td>
        <td>
            _id: l'identifiant de l'utilisateur<br>
        </td>
        <td>
            Succes: HTTP 200: Ok<br>
            retour : [${user1}, ${user2}, ... ]<br>
            <br><br>
            Error: ${HTTP number}<br>
            retour: ${corresponding message}<br>
        </td>
        <td>
            Succes: HTTP 200: Ok<br>
            retour : [${user1}, ${user2}, ... ]<br>
            <br><br>
            Error: HTTP 404: Not Found<br>
            retour: `User not found`<br>
            <br><br>
            Error: HTTP 500: Internal Error<br>
            retour: `Internal error`<br>
        </td>
        <td></td>
        <td>
            Utilisateur inconnu -> 404<br>
            Erreur interne -> 500<br>
        </td>
        <td>Fini</td>
        <td>
            Fichiers utilises par le service:<br>
            apiUser.js (in src/api/)<br>
            users.js (in src/entities/)<br>
            <br>
            Fichiers test:<br>
            testFollows (in tests/testUsers/)<br>
            <br>
            Fichiers client:<br>
            SideBar.js (in src/components/SideBar/)<br>
            <br>
        </td>
        <td>...</td>
    </tr>
</table>