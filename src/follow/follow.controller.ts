import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { FollowService } from './follow.service';
import { JwtGaurd } from 'src/auth/auth.gaurd';
import { type Request } from 'express';

@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}
     
  @Post('follow-user')
  @UseGuards(JwtGaurd)
  followUser(@Req() req:Request,@Query('id') following:string){
    const follower = req.user as any
    return this.followService.followUser(follower.id,following)
  }

  @Post('unfollow-user')
  @UseGuards(JwtGaurd)
  unFollowUser(@Req() req:Request,@Query('id') following:string){
    const follower = req.user as any
    return this.followService.unFollowUser(follower.id,following)
  }
  
}
