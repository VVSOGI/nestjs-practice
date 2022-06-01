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
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

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
  updateBoardStatus(
    @Body(BoardStatusValidationPipe) UpdateBoardDTO: UpdateBoardDTO,
  ): Board {
    return this.BoardsService.updateBoardStatus(UpdateBoardDTO);
  }
  /**
   * Custom Pipe를 DTO안에 넣는 방법
   * controller에 DTO를 사용한 부분에 직접 Pipe를 넣는다.
   */
}
