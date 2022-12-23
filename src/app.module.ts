import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL, {
      dbName: 'wish_db'
    }),
    AuthModule,
    UsersModule
  ]
})
export class AppModule {}
