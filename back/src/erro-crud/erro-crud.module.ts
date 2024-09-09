import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ErroCrudService } from './erro-crud.service';
import { ErroCrudController } from './erro-crud.controller';
import { Erro, ErroSchema } from './erro-crud.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Erro.name, schema: ErroSchema }])],
  controllers: [ErroCrudController],
  providers: [ErroCrudService],
})
export class ErroCrudModule {}
