import { BoardStatus } from '../boards.model';

export class UpdateBoardDTO {
  id: string;
  status: BoardStatus;
}
