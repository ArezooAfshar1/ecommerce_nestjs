import { Injectable } from '@nestjs/common';
import { CleanUpJob } from './jobs/clean-up.job';

@Injectable()
export class TasksService {
  constructor(private readonly cleanUp: CleanUpJob) {}

  @Cron('* * * * *')
  cleanOtpData(){
    this.cleanUp.cleanOtp
  }
}
