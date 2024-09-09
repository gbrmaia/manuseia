import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ErroCrudService } from './erro-crud.service';
import { CreateErroCrudDto } from './dto/create-erro-crud.dto';
import { UpdateErroCrudDto } from './dto/update-erro-crud.dto';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('erro-crud')
export class ErroCrudController {
  constructor(private readonly erroCrudService: ErroCrudService) {}

  @Post()
  create(@Body() createErroCrudDto: CreateErroCrudDto) {
    return this.erroCrudService.create(createErroCrudDto);
  }

  @Get()
  findAll() {
    return this.erroCrudService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.erroCrudService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateErroCrudDto: UpdateErroCrudDto,
  ) {
    return this.erroCrudService.update(id, updateErroCrudDto);
  }

  @Delete(':errorCode')
  remove(@Param('errorCode') errorCode: number) {
    return this.erroCrudService.remove(errorCode);
  }

  @Post('review')
  addReview(@Body() createReviewDto: CreateReviewDto) {
    return this.erroCrudService.addReview(createReviewDto);
  }

  @Get('dashboard')
  getDashboard() {
    return this.erroCrudService.getDashboard();
  }

  @Get('reviews/filter')
  getFilteredReviews(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.erroCrudService.getFilteredReviews(
      new Date(startDate),
      new Date(endDate),
    );
  }
}
