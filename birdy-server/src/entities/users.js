class User{
    constructor(db){
        this.db = db;
        // suite plus tard avec la bd
    }

    create(username, fullname, dateOfBirth, emailAddress, passwd) {
        return new Promise((resolve, reject) => {
            let newUser = {
                username: username,
                fullname: fullname,
                dateOfBirth: dateOfBirth,
                emailAddress: emailAddress,
                passwd: passwd,
                following: {},
                followers: {},
                tweets: {},
                profilePicture: "../../../birdy-client/images/icons/outline_account_circle_white_36dp_2x.png",
                dateCreated: "2022-04-02"
            }

            let userid = 1; // À remplacer par une requête bd
            if(false) {
                //erreur
                reject();
            } else {
                resolve(userid);
            }
        });
    }

    get(userid) {
        return new Promise((resolve, reject) => {
            const user = {
                login: "pikachu",
                password: "1234",
                lastname: "chu",
                firstname: "pika"
            }; // À remplacer par une requête bd
    
            if(false) {
                //erreur
                reject();
            } else {
                if(userid == 1) {
                    resolve(user);
                } else {
                    resolve(null);
                }
            }
        });
    }

    //return true if email already exists
    checkEmailAddress(emailAddress){
        return new Promise((resolve, reject) => {
            if(false) {
                //erreur
                reject();
            } else {
                resolve(true);
            }
        });
    }

    //renvoie l'id de l'utilisateur de mail emailAddress et de mdp passwd
    //renvoie une erreur si le mdp ne correspond pas
    checkPasswd(emailAddress, passwd){
        return new Promise((resolve, reject) => {
            let userid = 1; // À remplacer par une requête bd
            if(false) {
                //erreur
                reject();
            } else {
                resolve(userid);
            }
        });
    }

    //renvoie true si le pseudo existe deja
    checkUsername(username){
        return new Promise((resolve, reject) => {
            if(false) {
                //erreur
                reject();
            } else {
                resolve(true);
            }
        });
    }

    //renvoie true si le nom est valide
    checkFullName(fullname){
        return new Promise((resolve, reject) => {
            if(false) {
                //erreur
                reject();
            } else {
                resolve(true);
            }
        });
    }

    //renvoie true si la date est valide
    checkDateOfBirth(dateOfBirth){
        return new Promise((resolve, reject) => {
            if(false) {
                //erreur
                reject();
            } else {
                resolve(true);
            }
        });
    }
}

exports.default = User;