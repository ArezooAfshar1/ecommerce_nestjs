import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CleanUpJob } from './jobs/clean-up.job';
@Module({
  providers: [TasksService, CleanUpJob],
})
export class TasksModule {}
