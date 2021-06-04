import { PartialType } from '@nestjs/swagger';
import { CreateIngredientlogDto } from './create-ingredientlog.dto';

export class UpdateIngredientlogDto extends PartialType(CreateIngredientlogDto) {}
