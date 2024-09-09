import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ErroDocument = Erro & Document;

@Schema()
export class Erro {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  errorCode: number;

  @Prop({ required: true })
  description: string;

  @Prop({ default: 0 })
  positiveReview: number;

  @Prop({ default: 0 })
  negativeReview: number;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ type: [String], default: [] })
  positiveReviewClientCodes: string[];

  @Prop({ type: [String], default: [] })
  negativeReviewClientCodes: string[];

  @Prop({ type: [{ clientCode: String, suggestion: String, date: Date, review: String }], default: [] })
  reviews: { clientCode: string; suggestion: string; date: Date; review: string }[];
}

export const ErroSchema = SchemaFactory.createForClass(Erro);
