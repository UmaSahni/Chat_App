
export const getSender = (loggedUser, users) =>{
   
    return users[0]._id === loggedUser._id ? users[1] : users[0]
}


export const isSameSender = (messages,m,i,underId)=>{
    return(
        i< messages.length-1 && 
        (messages[i+1].sender._id !== m.sender._id || 
         messages[i+1].sender._id === undefined &&
         messages[i].sender._id !== underId
        )
    )
}

export const isLastMessage = (messages, i, userId)=>{
    return(
        i === messages.length-1 &&
        messages[messages.length-1].sender._id !== userId &&
        messages[messages.length-1].sender._id
    )
}

export const isSameSenderMargin = (messages, m, i, userId) =>{
    console.log(userId,m)
    if(userId === m.sender._id) {
        console.log(userId, m._id)
        return true
    }
    else return false

   
}

export const isSameUser = (messages, m, i)=>{
    return i > 0 && messages[i-1].sender._id === m.sender._id
}