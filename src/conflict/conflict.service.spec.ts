import { Test, TestingModule } from '@nestjs/testing';
import { ConflictService } from './conflict.service';
import { SurveyPassingDto } from './dto';

describe('ConflictService', () => {
    let service: ConflictService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ConflictService],
        }).compile();

        service = module.get<ConflictService>(ConflictService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should identify conflicts based on answer "no"', () => {
        const surveyPassingDto: SurveyPassingDto = {
            id: '123',
            answers: [
                { question: 'Question 1', answer: 'yes' },
                { question: 'Question 2', answer: 'no' },
            ],
        };

        const conflicts = service.calculateConflicts(surveyPassingDto);
        expect(conflicts.length).toBe(1);
        expect(conflicts[0].reason).toBe('Conflict: Answer to question "Question 2" is "no".');
    });

    it('should identify conflicts based on matching answers', () => {
        const surveyPassingDto: SurveyPassingDto = {
            id: '123',
            answers: [
                { question: 'Question 1', answer: 'yes' },
                { question: 'Question 2', answer: 'yes' },
            ],
        };

        const conflicts = service.calculateConflicts(surveyPassingDto);
        expect(conflicts.length).toBe(1);
        expect(conflicts[0].reason).toBe('Conflict: Answer to question "Question 1" is the same as answer to question "Question 2" (answer: "yes").');
    });

    it('should identify multiple conflicts', () => {
        const surveyPassingDto: SurveyPassingDto = {
            id: '123',
            answers: [
                { question: 'Question 1', answer: 'no' },
                { question: 'Question 2', answer: 'no' },
                { question: 'Question 3', answer: 'yes' },
                { question: 'Question 4', answer: 'yes' },
            ],
        };

        const conflicts = service.calculateConflicts(surveyPassingDto);
        expect(conflicts.length).toBe(4);
        expect(conflicts[0].reason).toBe('Conflict: Answer to question "Question 1" is "no".');
        expect(conflicts[1].reason).toBe('Conflict: Answer to question "Question 2" is "no".');
        expect(conflicts[2].reason).toBe('Conflict: Answer to question "Question 1" is the same as answer to question "Question 2" (answer: "no").');
        expect(conflicts[3].reason).toBe('Conflict: Answer to question "Question 3" is the same as answer to question "Question 4" (answer: "yes").');
    });
});
