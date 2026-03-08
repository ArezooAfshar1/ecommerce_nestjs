import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class BodyLoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const body = req.body;
    if( Object.keys(body).length === 0 ){
      return res.status(400).send({ statusCode: 400, message: "this request dont have body!"})
    }

    console.log(body);
    next();
  }
}
