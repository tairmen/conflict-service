export class AnswersDto {
    readonly answer: string;
    readonly question: string;
}

export class SurveyPassingDto {
    readonly answers: AnswersDto[];
    readonly id: string;
}