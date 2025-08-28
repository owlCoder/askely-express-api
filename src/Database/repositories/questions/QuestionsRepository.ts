
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { Question } from "../../../Domain/models/Question";
import { IQuestionRepository } from "../../../Domain/repositories/questions/IQuestionsRepository";
import db from "../../connection/DbConnectionPool";

export class QuestionsRepository implements IQuestionRepository {
  
  async create(question: Question): Promise<Question> {
    try {
      const query = `
        INSERT INTO questions (pitanje, tezina)
        VALUES (?, ?)
      `;
      const [result] = await db.execute<ResultSetHeader>(query, [
        question.pitanje,
        question.tezina
      ]);
      if (result.insertId) {
        return new Question(result.insertId, question.pitanje, question.tezina);
      }
      return new Question();
    } catch (error) {
      ;
      return new Question();
    }
  }

  async getAll(): Promise<Question[]> {
    try {
      const query = `SELECT * FROM questions ORDER BY id ASC`;
      const [rows] = await db.execute<RowDataPacket[]>(query);
      return rows.map(row => new Question(row.id, row.pitanje, row.tezina));
    } catch (error) {
      ;
      return [];
    }
  }

  async update(question: Question): Promise<Question> {
    try {
      const query = `
        UPDATE questions 
        SET pitanje = ?, tezina = ?
        WHERE id = ?
      `;
      const [result] = await db.execute<ResultSetHeader>(query, [
        question.pitanje,
        question.tezina,
        question.id
      ]);
      if (result.affectedRows > 0) {
        return question;
      }
      return new Question();
    } catch (error) {
      ;
      return new Question();
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      const query = `
        DELETE FROM questions 
        WHERE id = ?
      `;
      const [result] = await db.execute<ResultSetHeader>(query, [id]);
      return result.affectedRows > 0;
    } catch (error) {
      ;
      return false;
    }
  }

  async getRandomQuestionsByTezina(tezina: number, limit: number): Promise<Question[]> {
    try {
      const query = `
        SELECT * FROM questions
        WHERE tezina = ?
        ORDER BY RAND()
        LIMIT ?
      `;
      const [rows] = await db.execute<RowDataPacket[]>(query, [tezina, limit]);
      return rows.map(row => new Question(row.id, row.pitanje, row.tezina));
    } catch (error) {
      ;
      return [];
    }
  }
}
