// import { NotFoundException } from '@nestjs/common';
// import { Test, TestingModule } from '@nestjs/testing';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { BoardsController } from '../boards.controller';
// import { Board } from '../boards.entity';
// import { BoardStatus } from '../boards.model';
// import { BoardRepository } from '../boards.repository';
// import { BoardsService } from '../boards.service';
// import { CreateBoardDTO } from '../dto/create-board.dto';

// describe('BoardsService', () => {
//   let service: BoardsService;
//   let boardRepository: BoardRepository;
//   let title: string, description: string, board: Board;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [BoardsController],
//       providers: [
//         BoardsService,
//         {
//           provide: getRepositoryToken(BoardRepository),
//           useClass: MockBoardEntity,
//         },
//       ],
//     }).compile();
//     service = module.get<BoardsService>(BoardsService);
//     boardRepository = module.get<BoardRepository>(BoardRepository);

//     description = 'test1';
//     title = 'test';
//     board = await service.createBoard({ title, description })[0];
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });

//   it('getAllBoards must be return length 1', async () => {
//     const board = await service.getAllBoards();
//     console.log(board);
//     expect(board).toEqual(1);
//   });

//   it('createBoards make board and insert boards', () => {
//     const title = 'benny';
//     const description = 'is one of higher';
//     expect(service.createBoard({ title, description })[1].title).toBe('benny');
//   });

//   it('getBoardById find board by id', () => {
//     const { id } = board;
//     expect(service.getBoardById(id)).toBe(board);
//   });

//   it('if getBoardById not found item throw error', () => {
//     expect(() => {
//       service.getBoardById(12412);
//     }).toThrowError(NotFoundException);
//   });

//   it('deleteBoard can delete some board', () => {
//     const { id } = board;
//     service.deleteBoard(id);
//     expect(service.getAllBoards()).toEqual([]);
//   });

//   it('updateBoardStatus can change status of some board', async () => {
//     const { id } = board;
//     const changeStatus = BoardStatus.PRIVATE;
//     expect(
//       await (
//         await service.updateBoardStatus({ id, status: changeStatus })
//       ).status,
//     ).toEqual(changeStatus);
//   });
// });
