import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ResponseController } from './response.controller';
import { ResponseService } from './response.service';
import { ResponseSchema } from './schema/response.schema';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Response', schema: ResponseSchema }]),
    forwardRef(() => AuthModule),
  ],
  controllers: [ResponseController],
  providers: [ResponseService],
  exports: [
    ResponseService, 
    MongooseModule 
  ],
})
export class ResponseModule {}
