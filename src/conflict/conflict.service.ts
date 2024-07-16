import { Injectable } from '@nestjs/common';
import { Conflict } from '../entities/conflict.entity';
import { SurveyPassingDto } from './dto';

@Injectable()
export class ConflictService {
    calculateConflicts(surveyPassing: SurveyPassingDto[]) {
        const conflicts: Conflict[] = [];

        // Проверка на ответ "no"
        for (const item of surveyPassing) {
            if (item.answer.toLowerCase() === 'no') {
                const conflict = new Conflict();
                conflict.reason = `Conflict: Answer to question ${item.question} is "no".`;
                conflict.info = ``;
                conflicts.push(conflict);
            }
        }

        // Проверка на совпадающие ответы
        for (let i = 0; i < surveyPassing.length; i++) {
            for (let j = i + 1; j < surveyPassing.length; j++) {
                if (surveyPassing[i].answer === surveyPassing[j].answer) {
                    const conflict = new Conflict();
                    conflict.reason = `Conflict: Answer to question ${surveyPassing[i].question} is the same as answer to question ${surveyPassing[j].question} (${surveyPassing[j].answer}).`;
                    conflict.info = ``;
                    conflicts.push(conflict);
                }
            }
        }

        return conflicts;
    }
}
