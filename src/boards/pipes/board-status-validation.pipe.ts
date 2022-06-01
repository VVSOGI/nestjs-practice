import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { BoardStatus } from '../boards.model';

interface UpdateValueType {
  id: string;
  status: BoardStatus;
}

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOption = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];

  transform(value: UpdateValueType, metadata: ArgumentMetadata) {
    const status = value.status.toUpperCase();
    const isRightValue = this.StatusOption.find((item) => item === status);

    if (isRightValue) {
      return value;
    }

    throw new BadRequestException(`${status} is not match in status`);
  }
}
