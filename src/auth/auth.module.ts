import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: '454545sssfdfgsfg', // replace with your secret key
      signOptions: { expiresIn: '1h' }, // token expiration time
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
