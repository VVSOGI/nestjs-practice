import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './boards.model';
import { v4 as uuid } from 'uuid';
import { CreateBoardDTO } from './dto/create-board.dto';
import { UpdateBoardDTO } from './dto/update-board.dto';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }

  createBoard(createBoardDTO: CreateBoardDTO): Board[] {
    const { title, description } = createBoardDTO;
    const board: Board = {
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC,
    };
    this.boards.push(board);
    return this.boards;
  }

  getBoardById(id: string): Board {
    const found = this.boards.find((board) => board.id === id);

    if (found) {
      return found;
    }

    throw new NotFoundException();
  }

  deleteBoard(id: string): Board[] {
    const found = this.getBoardById(id);
    this.boards = this.boards.filter((board) => board.id !== found.id);
    return this.boards;
  }

  updateBoardStatus(UpdateBoardDTO: UpdateBoardDTO): Board {
    const { id, status } = UpdateBoardDTO;
    const board = this.getBoardById(id);
    board.status = status;
    return board;
  }
}
