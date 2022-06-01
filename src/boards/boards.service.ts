import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './boards.model';
import { v4 as uuid } from 'uuid';
import { CreateBoardDTO } from './dto/create-board.dto';
import { UpdateBoardDTO } from './dto/update-board.dto';
import { BoardRepository } from './boards.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './boards.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  createBoard(createBoardDTO: CreateBoardDTO): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDTO);
  }

  getAllBoards(): Promise<Board[]> {
    return this.boardRepository.getAllBoards();
  }

  getBoardById(id: number): Promise<Board> {
    return this.boardRepository.getBoardById(id);
  }

  deleteBoard(id: number) {
    return this.boardRepository.deleteBoard(id);
  }

  updateBoardStatus(updateBoardDTO: UpdateBoardDTO): Promise<Board> {
    return this.boardRepository.updateBoardStatus(updateBoardDTO);
  }
}
