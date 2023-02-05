import { PartialType } from '@nestjs/mapped-types';
import { CreatePaidPostDto } from './create-paid-post.dto';

export class UpdatePaidPostDto extends PartialType(CreatePaidPostDto) {
    title: string;
    content: string;
    regularPrice: number;
    salePrice: number;
}
