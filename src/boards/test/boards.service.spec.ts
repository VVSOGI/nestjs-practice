import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Board, BoardStatus } from '../boards.model';
import { BoardsService } from '../boards.service';

describe('BoardsService', () => {
  let service: BoardsService;
  let title: string, description: string, board: Board;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoardsService],
    }).compile();
    service = module.get<BoardsService>(BoardsService);

    description = 'test1';
    board = service.createBoard({ title, description })[0];
    title = 'test';
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getAllBoards must be return length 1', () => {
    expect(service.getAllBoards().length).toEqual(1);
  });

  it('createBoards make board and insert boards', () => {
    const title = 'benny';
    const description = 'is one of higher';
    expect(service.createBoard({ title, description })[1].title).toBe('benny');
  });

  it('getBoardById find board by id', () => {
    const { id } = board;
    expect(service.getBoardById(id)).toBe(board);
  });

  it('if getBoardById not found item throw error', () => {
    expect(() => {
      service.getBoardById('sapdo22');
    }).toThrowError(NotFoundException);
  });

  it('deleteBoard can delete some board', () => {
    const { id } = board;
    service.deleteBoard(id);
    expect(service.getAllBoards()).toEqual([]);
  });

  it('updateBoardStatus can change status of some board', () => {
    const { id } = board;
    const changeStatus = BoardStatus.PRIVATE;
    expect(
      service.updateBoardStatus({ id, status: changeStatus }).status,
    ).toEqual(changeStatus);
  });
});
