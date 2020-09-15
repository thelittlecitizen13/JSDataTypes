class User {
    constructor(username, password) 
    {
        this.pwd = Symbol('password');
        this.username = username;
        this[this.pwd] = password;
    }
    getPassword()
    {
        return this[this.pwd];
    }
    login(password) {
        if (this.getPassword() == password) {
            return true;
        }
        else { return false; }

    }
}
class UserManagement {
    constructor() {
        this.allUsers = [];
        this.onlineUsers = [];
    }
    getUserByUserName(username) {
        let user = this.allUsers.find(usr => usr.username == username);
        return user;
    }
    checkIfUserExist(username) {
        return this.allUsers.map(u => u.Username).includes(username);
    }
    regiter(username, password) {
        if (!this.checkIfUserExist(username)) {
            var user = new User(username, password);
            this.allUsers.push(user);
            return `${username} registered succesfully`;
        }
        else {
            return 'Username already taken';
        }
    }
    login(username, password) {
        let user = this.getUserByUserName(username);
        if (!user) {
            return "User not found";
        }
        else {
            if (user.login(password)) {
                this.onlineUsers.push(user);
                return `Welcome, ${user.username}`;
            }
            else {
                return "wrong password!";
            }
        }
    }
    logout(username) {
        let user = this.getUserByUserName(username);
        if (!user) {
            return "User not found";
        }
        if (this.isUserLoggedIn(username)) {
            var index = this.onlineUsers.indexOf(user);
            this.onlineUsers.splice(index, 1);
            return `${username} logged out!`;
        }
        else {
            return `${username} already offline!`;
        }
    }
    isUserLoggedIn(username) {
        let user = this.getUserByUserName(username);
        if (this.onlineUsers.includes(user)) {
            return true;
        }
        else {
            return false;
        }
    }

}

var management = new UserManagement();
console.log(management.regiter("Assa", "1234"));
console.log(management.regiter("Assa", "2222"));
console.log(management.regiter("Rom", "1234"));
console.log(management.login("Assa", "2222"));
console.log(management.login("Assa", "1234"));
console.log(management.login("Rom", "1234"));
console.log(management.logout("Assa"));
console.log(management.logout("Assa"));