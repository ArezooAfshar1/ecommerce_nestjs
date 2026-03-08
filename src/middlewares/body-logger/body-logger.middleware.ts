import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class BodyLoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const body = req.body;
    if(!body){
      console.log("this request dont have body!")
    }else{
      console.log(body)
    }
    next();
  }
}
