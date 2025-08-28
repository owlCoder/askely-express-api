import { Question } from "../../models/Question";

export interface IQuestionRepository {
  create(question: Question): Promise<Question>;
  getAll(): Promise<Question[]>;
  update(question: Question): Promise<Question>;
  delete(id: number): Promise<boolean>;
  getRandomQuestionsByTezina(tezina: number, limit: number): Promise<Question[]>;
}
