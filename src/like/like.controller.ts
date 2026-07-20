import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { JwtGaurd } from 'src/auth/auth.gaurd';
import {type Request } from 'express';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}
  
  @Post()
  @UseGuards(JwtGaurd)
  createAndDelete(@Req() req:Request,@Body() createLikeDto :CreateLikeDto){
    const user = req.user as any
    return this.likeService.createAndDelete(createLikeDto,user.id)
  }

}
