import express from 'express';
import cors from 'cors';
import { IQuestionsService } from './Domain/services/questions/IQuestionsService';
import { QuestionsService } from './Services/questions/QuestionsService';
import { QuestionController } from './WebAPI/controllers/QuestionsController';
import { IQuestionRepository as IQuestionsRepository } from './Domain/repositories/questions/IQuestionsRepository';
import { QuestionsRepository } from './Database/repositories/questions/QuestionsRepository';

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Repositories
const questionRepository: IQuestionsRepository = new QuestionsRepository();

// Services
const questionsService: IQuestionsService = new QuestionsService(questionRepository);

// Controllers
const questionController = new QuestionController(questionsService);

// Registering routes
app.use('/api/v1', questionController.getRouter());

export default app;