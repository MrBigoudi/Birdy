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
        <td>Follow</td>
        <td>/api/user/:_id/follows avec POST</td>
        <td>
            Permet de suivre un utilisateur et de modifier la db users en consequence
        </td>
        <td>
            _id: l'identifiant de l'utilisateur<br>
            followId: l'identifiant de la personne a suivre<br>
        </td>
        <td>
            Succes: HTTP 200: Ok<br>
            retour: ${corresponding message}<br>
            <br><br>
            Error: ${HTTP number}<br>
            retour: ${corresponding message}<br>
        </td>
        <td>
            Succes: HTTP 200: Ok<br>
            retour : `New follow successfully added`<br>
            <br><br>
            Error: HTTP 409: Conflict<br>
            retour: `Already following user ${followId}`<br>
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