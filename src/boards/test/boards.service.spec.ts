import { Test, TestingModule } from '@nestjs/testing';
import { BoardsService } from '../boards.service';
import { CreateBoardDTO } from '../dto/create-board.dto';

describe('BoardsService', () => {
  let service: BoardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoardsService],
    }).compile();

    service = module.get<BoardsService>(BoardsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getAllBoards must be return []', () => {
    expect(service.getAllBoards()).toEqual([]);
  });

  it('createBoards make board and insert boards', () => {
    const title = 'benny';
    const description = 'is one of higher';
    expect(service.createBoard({ title, description })[0].title).toBe('benny');
  });

  it('getBoardById find board by id', () => {
    const title = 'test';
    const description = 'test1';
    const board = service.createBoard({ title, description })[0];
    const { id } = board;

    expect(service.getBoardById(id)).toBe(board);
  });
});
