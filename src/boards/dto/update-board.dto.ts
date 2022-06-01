import { Validate } from 'class-validator';
import { BoardStatus } from '../boards.model';
import { BoardStatusValidationPipe } from '../pipes/board-status-validation.pipe';

export class UpdateBoardDTO {
  @Validate(BoardStatusValidationPipe)
  id: string;
  status: BoardStatus;
}
