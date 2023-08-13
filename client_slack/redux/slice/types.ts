export interface IUser {
    id: string  
    name: string     
    password: string
    displayName: string
    status: string
    phone: string
    email: string     
    avatar: string
    createdAt:string  
    updatedAt:string  
    deletedAt:string
}
export interface IChannel {
    id: string
    name: string
    isPublic: boolean
    userId:String[]   
    users:IUser[] 
    thread:IThread[]
}

export interface IThread{
    id:String   
    createdAt:string  
    updatedAt:string  
    deletedAt:string
    isEdited:boolean
    channel:IChannel
    channelId:string   
    messages:IMessages[]
}
export interface IMessages{
    id:String   
    message:String
    createdAt:string 
    updatedAt:string 
    deletedAt:string
    threadId:string
    thread:IThread
}
