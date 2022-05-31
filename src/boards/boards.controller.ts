import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Board } from './boards.model';
import { BoardsService } from './boards.service';
import { CreateBoardDTO } from './dto/create-board.dto';
import { UpdateBoardDTO } from './dto/update-board.dto';

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
  @UsePipes(ValidationPipe)
  createBoard(@Body() CreateBoardDTO: CreateBoardDTO): Board[] {
    return this.BoardsService.createBoard(CreateBoardDTO);
  }

  @Delete('/:id')
  deleteBoard(@Param('id') id: string): Board[] {
    return this.BoardsService.deleteBoard(id);
  }

  @Patch('')
  updateBoardStatus(@Body() UpdateBoardDTO: UpdateBoardDTO): Board {
    return this.BoardsService.updateBoardStatus(UpdateBoardDTO);
  }
}
