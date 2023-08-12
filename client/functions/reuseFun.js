export const sourceFunc = (user) =>{
    if(user && user.image){
        return user.image
    }
    else{
        return "/images/avatarDefault.png"
    }
}