class Global{
    constructor(){
        this.global=[];
    }
    EnterUserData(id,room,name,img){
        var global={id,room,name,img};
        this.global.push(global);
    }
    GetGlobalData(room){
        var GlobalList=this.global.filter(function(user){
            return user.room===room;
        });
        var Namearray=GlobalList.map(function(user){
            return{
                username:user.name,
                userimg:user.img
            }
        })
        return Namearray;
    }
    RemoveUser(id){
        var user = this.GetUser(id);
        if(user){
            this.global = this.global.filter((user) => user.id !== id);
        }
        return user;
    }
    GetUser(id){
        var getUser = this.global.filter((userId) => {
            return userId.id === id;
        })[0];
        return getUser;
    }
}
module.exports={Global};