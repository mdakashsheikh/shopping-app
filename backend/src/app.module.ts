import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const isProduction = configService.get('NODE_ENV') === 'production'

        return {
          pinoHttp: {
            transport: isProduction 
              ? undefined 
              : {
                  target: 'pino-pretty',
                  options: {
                    singleLine: true,
                },
              lebel: isProduction ? 'info' : 'debug'
            }
          }
        }
      },
      inject: [ConfigService]
    }),
    ConfigModule.forRoot(), UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
