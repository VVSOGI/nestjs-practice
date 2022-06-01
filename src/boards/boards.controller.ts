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
import { Board } from './boards.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDTO } from './dto/create-board.dto';
import { UpdateBoardDTO } from './dto/update-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get()
  getAllBoards(): Promise<Board[]> {
    return this.boardsService.getAllBoards();
  }

  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDTO: CreateBoardDTO): Promise<Board> {
    return this.boardsService.createBoard(createBoardDTO);
  }

  @Delete('/:id')
  deleteBoard(@Param('id') id: number) {
    return this.boardsService.deleteBoard(id);
  }

  @Patch('')
  updateBoardStatus(
    @Body(BoardStatusValidationPipe) UpdateBoardDTO: UpdateBoardDTO,
  ): Promise<Board> {
    return this.boardsService.updateBoardStatus(UpdateBoardDTO);
  }
  /**
   * Custom Pipe를 DTO안에 넣는 방법
   * controller에 DTO를 사용한 부분에 직접 Pipe를 넣는다.
   */
}
