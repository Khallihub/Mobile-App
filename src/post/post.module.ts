import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { MongooseModule } from '@nestjs/mongoose';
import { postSchema } from './post.model';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'post',
      schema: postSchema
    }]),
  ],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
