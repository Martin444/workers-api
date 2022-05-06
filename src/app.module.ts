import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { environment } from './enviroment';
import { DatabaseModule } from './database/database.module';
// import { EstafetaModule } from './estafeta/estafeta.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { OpenpayModule } from './openpay/openpay.module';
// import * as Joi from 'joi';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: environment[process.env.NODE_ENV] || '.env',
            load: [config],
            isGlobal: true,
            // validationSchema: Joi.object({}),
        }),
        AuthModule,
        UsersModule,
        DatabaseModule,
        CloudinaryModule,
        OpenpayModule,
        // EstafetaModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
