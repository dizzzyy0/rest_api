import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';
import { ResponseModule } from 'src/response/response.module';
import { RequestSchema } from './schema/request.schema';
import { ResponseSchema } from 'src/response/schema/response.schema'; 
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Request', schema: RequestSchema },
    ]),
    forwardRef(() => ResponseModule),
    forwardRef(() => AuthModule),
  ],
  controllers: [RequestController],
  providers: [RequestService],
  exports: [RequestService],
})
export class RequestModule {}
