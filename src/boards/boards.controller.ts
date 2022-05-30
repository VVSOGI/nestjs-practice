import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Board } from './boards.model';
import { BoardsService } from './boards.service';
import { CreateBoardDTO } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private BoardsService: BoardsService) {}

  @Get()
  getAllBoards(): Board[] {
    return this.BoardsService.getAllBoards();
  }

  @Get('/:id')
  getBoardById(@Param('id') id: string): Board {
    return this.BoardsService.getBoardById(id);
  }

  @Post()
  createBoard(@Body() CreateBoardDTO: CreateBoardDTO): Board[] {
    return this.BoardsService.createBoard(CreateBoardDTO);
  }
}
