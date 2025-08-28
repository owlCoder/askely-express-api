import { QuestionDto } from "../../Domain/DTOs/questions/QuestionDto";
import { Question } from "../../Domain/models/Question";
import { IQuestionRepository } from "../../Domain/repositories/questions/IQuestionsRepository";
import { IQuestionsService } from "../../Domain/services/questions/IQuestionsService";

export class QuestionsService implements IQuestionsService {
  constructor(private questionRepository: IQuestionRepository) {}

  // Create a new question
  async create(question: QuestionDto): Promise<QuestionDto> {
    // Convert DTO to Question model before passing it to the repository
    const createdQuestion = await this.questionRepository.create(
      new Question(question.id, question.pitanje, question.tezina)
    );

    return new QuestionDto(createdQuestion.id, createdQuestion.pitanje, createdQuestion.tezina);
  }

  // Get all questions
  async getAll(): Promise<QuestionDto[]> {
    const questions = await this.questionRepository.getAll();

    // Convert Question models to QuestionDto before returning
    return questions.map(
      (q) => new QuestionDto(q.id, q.pitanje, q.tezina)
    );
  }

  // Update an existing question
  async update(question: QuestionDto): Promise<QuestionDto> {
    // Convert DTO to Question model before passing it to the repository
    const updatedQuestion = await this.questionRepository.update(
      new Question(question.id, question.pitanje, question.tezina)
    );

    return new QuestionDto(updatedQuestion.id, updatedQuestion.pitanje, updatedQuestion.tezina);
  }

  // Delete a question by ID
  async delete(id: number): Promise<boolean> {
    return this.questionRepository.delete(id);
  }

  // Get random questions by difficulty level (tezina)
  async getRandomQuestionsByTezina(tezina: number, limit: number): Promise<QuestionDto[]> {
    const questions = await this.questionRepository.getRandomQuestionsByTezina(tezina, limit);

    // Convert Question models to QuestionDto before returning
    return questions.map(
      (q) => new QuestionDto(q.id, q.pitanje, q.tezina)
    );
  }
}