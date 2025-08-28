import { Router, Request, Response } from "express";
import { QuestionDto } from "../../Domain/DTOs/questions/QuestionDto";
import { IQuestionsService } from "../../Domain/services/questions/IQuestionsService";
import { ValidateNewQuestionEntry } from "../validators/questions/NewQuestionValidator";

export class QuestionController {
  private router: Router;
  private questionsService: IQuestionsService;

  constructor(questionsService: IQuestionsService) {
    this.router = Router();
    this.questionsService = questionsService;
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/questions', this.create.bind(this));
    this.router.get('/questions', this.getAll.bind(this));
    this.router.get('/questions/random', this.getRandom.bind(this));
    this.router.put('/questions/:id', this.update.bind(this));
    this.router.delete('/questions/:id', this.delete.bind(this));
  }

  /**
   * POST /api/v1/questions
   * Kreira novo pitanje
   */
  private async create(req: Request, res: Response): Promise<void> {
    try {
      const { pitanje, tezina } = req.body;

      // Validate inputs
      if (ValidateNewQuestionEntry(pitanje, tezina).uspesno == false) {
        res.status(400).json({ success: false, message: 'Pitanje i težina su obavezna polja za unos.' });
        return;
      }

      const questionDto = new QuestionDto(0, pitanje, tezina);
      const createdQuestion = await this.questionsService.create(questionDto);

      if (createdQuestion.id !== 0) {
        res.status(201).json({ success: true, message: 'Uspešno kreirano pitanje', data: createdQuestion });
      } else {
        res.status(500).json({ success: false, message: 'Kreiranje pitanja nije uspelo.' });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  }

  /**
   * GET /api/v1/questions
   * Vraća sva pitanja
   */
  private async getAll(req: Request, res: Response): Promise<void> {
    try {
      const questions = await this.questionsService.getAll();

      res.status(200).json({ success: true, data: questions });
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  }

  /**
   * GET /api/v1/questions/random
   * Vraća nasumična pitanja na osnovu težine
   */
  private async getRandom(req: Request, res: Response): Promise<void> {
    try {
      const { tezina, limit } = req.query;

      if (!tezina || !limit) {
        res.status(400).json({ success: false, message: 'Težina i limit su obavezna.' });
        return;
      }

      const randomQuestions = await this.questionsService.getRandomQuestionsByTezina(
        parseInt(tezina as string),
        parseInt(limit as string)
      );

      res.status(200).json({ success: true, data: randomQuestions });
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  }

  /**
   * PUT /api/v1/questions/:id
   * Ažurira postojeće pitanje
   */
  private async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const { pitanje, tezina } = req.body;

      if (!id || !pitanje || !tezina) {
        res.status(400).json({ success: false, message: 'Nevalidni podaci za ažuriranje.' });
        return;
      }

      const updatedQuestion = await this.questionsService.update(new QuestionDto(id, pitanje, tezina));

      if (updatedQuestion.id !== 0) {
        res.status(200).json({ success: true, message: 'Pitanje je uspešno ažurirano.', data: updatedQuestion });
      } else {
        res.status(404).json({ success: false, message: 'Pitanje nije pronađeno.' });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  }

  /**
   * DELETE /api/v1/questions/:id
   * Briše pitanje
   */
  private async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);

      if (!id) {
        res.status(400).json({ success: false, message: 'Nevalidan ID.' });
        return;
      }

      const success = await this.questionsService.delete(id);

      if (success) {
        res.status(200).json({ success: true, message: 'Pitanje uspešno obrisano.' });
      } else {
        res.status(404).json({ success: false, message: 'Pitanje nije pronađeno.' });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  }

  /**
   * Getter za router
   */
  public getRouter(): Router {
    return this.router;
  }
}
