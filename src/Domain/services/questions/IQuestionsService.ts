import { QuestionDto } from "../../../Domain/DTOs/questions/QuestionDto";

export interface IQuestionsService {
  create(question: QuestionDto): Promise<QuestionDto>;
  getAll(): Promise<QuestionDto[]>;
  update(question: QuestionDto): Promise<QuestionDto>;
  delete(id: number): Promise<boolean>;
  getRandomQuestionsByTezina(tezina: number, limit: number): Promise<QuestionDto[]>;
}
