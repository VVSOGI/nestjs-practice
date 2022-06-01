import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Board } from './boards.entity';
import { BoardStatus } from './boards.model';
import { CreateBoardDTO } from './dto/create-board.dto';
import { UpdateBoardDTO } from './dto/update-board.dto';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  async createBoard(createBoardDTO: CreateBoardDTO): Promise<Board> {
    const { title, description } = createBoardDTO;

    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });

    await this.save(board);
    return board;
  }

  async getAllBoards(): Promise<Board[]> {
    return this.find();
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.findOne(id);

    if (found) {
      return found;
    }

    throw new NotFoundException(`Can't found ${id}`);
  }

  async deleteBoard(id: number) {
    const found = await this.getBoardById(id);
    await this.delete(found.id);
  }

  async updateBoardStatus(updateBoardDTO: UpdateBoardDTO): Promise<Board> {
    const { id, status } = updateBoardDTO;
    const board = await this.getBoardById(id);

    board.status = status;
    await this.save(board);

    return board;
  }
}
