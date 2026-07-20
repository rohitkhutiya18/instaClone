import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { CloudnaryModule } from 'src/cloudnary/cloudnary.module';
import { RegisteredUserEntity } from './entities/RegisteredUser.entity';

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity,RegisteredUserEntity]),CloudnaryModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
