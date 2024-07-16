import { Injectable } from '@nestjs/common';
import { Conflict } from '../entities/conflict.entity';
import { SurveyPassingDto } from './dto';

@Injectable()
export class ConflictService {
    calculateConflicts(surveyPassing: SurveyPassingDto) {
        const conflicts: Conflict[] = [];

        // Проверка на ответ "no"
        for (const item of surveyPassing.answers) {
            if (item.answer.toLowerCase() === 'no') {
                const conflict = new Conflict();
                conflict.reason = `Conflict: Answer to question "${item.question}" is "no".`;
                conflict.info = surveyPassing.id;
                conflicts.push(conflict);
            }
        }

        // Проверка на совпадающие ответы
        for (let i = 0; i < surveyPassing.answers.length; i++) {
            for (let j = i + 1; j < surveyPassing.answers.length; j++) {
                if (surveyPassing.answers[i].answer === surveyPassing.answers[j].answer) {
                    const conflict = new Conflict();
                    conflict.reason = `Conflict: Answer to question "${surveyPassing.answers[i].question}" is the same as answer to question "${surveyPassing[j].question}" (answer: "${surveyPassing[j].answer}").`;
                    conflict.info = surveyPassing.id;
                    conflicts.push(conflict);
                }
            }
        }

        return conflicts;
    }
}
