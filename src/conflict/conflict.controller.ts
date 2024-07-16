import { Controller, Post, Body } from '@nestjs/common';
import { ConflictService } from './conflict.service';
import { SurveyPassingDto } from './dto';

@Controller('calculate')
export class ConflictController {
  constructor(private readonly conflictService: ConflictService) {}

  @Post()
  calculate(@Body() surveyPassing: SurveyPassingDto) {
    return this.conflictService.calculateConflicts(surveyPassing);
  }
}
