import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MongooseModule.forRoot(
      'mongodb://127.0.0.1:27017/project',
    ),
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService, 
  //   {
  //   provide: APP_GUARD,
  //   useClass: JwtAuthGuard
  // }
],
})
export class AppModule {}
