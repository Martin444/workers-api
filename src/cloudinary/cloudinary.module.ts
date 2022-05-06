import { Global, Module } from '@nestjs/common';
import { CloudinaryService } from './services/cloudinary.service';
import { CloudinaryProvider } from './provider/cloudinary';
import { CloudinaryController } from './controllers/cloudinary/cloudinary.controller';

@Global()
@Module({
    imports: [CloudinaryModule],
    providers: [CloudinaryService, CloudinaryProvider],
    exports: [CloudinaryService],
    controllers: [CloudinaryController],
})
export class CloudinaryModule {}
