class User{
    constructor(){
        this.users=[];
    }
    Addusername(id,name,room){
        var user={id,name,room};
        this.users.push(user);
        return user;
    }
    RemoveUser(id){
        var user = this.GetUser(id);
        if(user){
            this.users = this.users.filter((user) => user.id !== id);
        }
        return user;
    }
    GetUser(id){
        var getUser = this.users.filter((userId) => {
            return userId.id === id;
        })[0];
        return getUser;
    }
    GetUserList(room){
        var username=this.users.filter(function(user){
            return user.room===room;
        });
        var NamesArray=username.map(function(user){
            return user.name;
        });
        return NamesArray;
    }
    Getname(id){
        var name=this.users.filter(function(user){
            return user.id!==id;
        })
        var namesarray=name.map(function(user){
            return user.name;
        })
        return namesarray;
    }
}
module.exports={User};