class User{
    constructor(db){
        this.db = db;
        // suite plus tard avec la bd
    }

    checkEmailAddress(emailAddress){
        return true;
    }

    checkPasswd(passwd){
        return true;
    }

    checkUsername(username){
        return true;
    }
}

exports.default = User;