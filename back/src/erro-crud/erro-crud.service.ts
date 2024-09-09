import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateErroCrudDto } from './dto/create-erro-crud.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateErroCrudDto } from './dto/update-erro-crud.dto';
import { Erro, ErroDocument } from './erro-crud.schema';

@Injectable()
export class ErroCrudService {
  constructor(@InjectModel(Erro.name) private erroModel: Model<ErroDocument>) {}

  async create(createErroCrudDto: CreateErroCrudDto): Promise<Erro> {
    const { errorCode } = createErroCrudDto;

    // Verifica se já existe um erro com o mesmo título
    const existingError = await this.erroModel.findOne({ errorCode }).exec();
    if (existingError) {
      throw new ConflictException('Erro já cadastrado');
    }

    const createdErro = new this.erroModel(createErroCrudDto);
    return createdErro.save();
  }

  async findAll(): Promise<Erro[]> {
    return this.erroModel.find().exec();
  }

  async findOne(id: string): Promise<Erro> {
    const erro = await this.erroModel.findById(id).exec();
    if (!erro) {
      throw new NotFoundException(`Erro com id ${id} não encontrado`);
    }
    return erro;
  }

  async update(id: string, updateErroCrudDto: UpdateErroCrudDto): Promise<Erro> {
    const updatedErro = await this.erroModel.findByIdAndUpdate(id, updateErroCrudDto, { new: true }).exec();
    if (!updatedErro) {
      throw new NotFoundException(`Erro com id ${id} não encontrado`);
    }
    return updatedErro;
  }

  async remove(id: string): Promise<any> {
    const deletedErro = await this.erroModel.findByIdAndDelete(id).exec();
    if (!deletedErro) {
      throw new NotFoundException(`Erro com id ${id} não encontrado`);
    }
    return deletedErro;
  }

  async addReview(createReviewDto: CreateReviewDto): Promise<Erro> {
    const { errorCode, clientCode, review } = createReviewDto;
    const erro = await this.erroModel.findOne({ errorCode }).exec();
    if (!erro) {
      throw new NotFoundException(`Erro com código ${errorCode} não encontrado`);
    }

    // Verifica se o cliente já deu review
    if (erro.reviews.some(r => r.clientCode === clientCode)) {
      throw new ConflictException(`Cliente com código ${clientCode} já deu review.`);
    }

    // Adiciona a avaliação
    erro.reviews.push(createReviewDto);

    // Atualiza contadores
    if (review === 'positive') {
      erro.positiveReview += 1;
      erro.positiveReviewClientCodes.push(clientCode);
    } else if (review === 'negative') {
      erro.negativeReview += 1;
      erro.negativeReviewClientCodes.push(clientCode);
    }

    return erro.save();
  }

  async getDashboard(): Promise<any> {
    const erros = await this.erroModel.find().exec();
    const totalReviews = erros.reduce((acc, erro) => acc + erro.reviews.length, 0);
    const averageReviewsPerSuggestion = totalReviews / erros.length;
    return {
      totalReviews,
      averageReviewsPerSuggestion,
    };
  }

  async getFilteredReviews(startDate: Date, endDate: Date): Promise<any> {
    const erros = await this.erroModel.find({
      'reviews.date': { $gte: startDate, $lte: endDate },
    }).exec();
    return erros.map(erro => ({
      errorCode: erro.errorCode,
      reviews: erro.reviews.filter(review => review.date >= startDate && review.date <= endDate),
    }));
  }
}
