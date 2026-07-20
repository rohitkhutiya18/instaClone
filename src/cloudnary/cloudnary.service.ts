import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloundnary } from 'cloudinary';

@Injectable()
export class CloudnaryService {
    constructor(private readonly configService : ConfigService){
           cloundnary.config({
                cloud_name:configService.get('cloudName'),
                api_key:configService.get('cloudApiKey'),
                api_secret:configService.get('cloudApiSecret'),
           })
    }

    async uploadImageInCloud(path:string){
        return await cloundnary.uploader.upload(path,{folder:'instaClone'});
    }

    async deleteImageInCloud(imagePublicId:string){
   
        try {
            const result =  await cloundnary.uploader.destroy(imagePublicId);
            
            return result
        } catch (error) {
            console.log(error)
        }
    }
}
