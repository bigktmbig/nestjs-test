import { PartialType } from '@nestjs/mapped-types';
import { CreateNormalPostDto } from './create-normal-post.dto';

export class UpdateNormalPostDto extends PartialType(CreateNormalPostDto) {
	title: string;
	content: string;
}
