import { Injectable } from "@nestjs/common";

@Injectable()
export class SocketService{
    private onlineUser = new Map<string,string>();

    mapUser(userId:string,clientId:string){
        return   this.onlineUser.set(userId,clientId);
    }

    removeMapping(userId:string){
        return   this.onlineUser.delete(userId);
    }

     getClient(userId:string){
        return   this.onlineUser.get(userId);
    }
}