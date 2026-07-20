import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtGaurd } from 'src/auth/auth.gaurd';
import {type Request } from 'express';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @UseGuards(JwtGaurd)
  create(@Body() createCommentDto: CreateCommentDto,@Req() req: Request) {
    const user = req.user as any
    return this.commentService.create(createCommentDto,user);
  }

  @Get()
  findAll(@Body() body :{postId:string}) {
    return this.commentService.findAll(body.postId);
  }

  @Patch()
  @UseGuards(JwtGaurd)
  update(@Body() updateCommentDto: UpdateCommentDto,@Req() req : Request) {
    const user = req.user as any
    return this.commentService.update( updateCommentDto,user.id);
  }

  @Delete()
  remove(@Body() body: {commentId:string},@Req() req : Request) {
    const user = req.user as any
    return this.commentService.remove( body.commentId,user.id);
  }
}
