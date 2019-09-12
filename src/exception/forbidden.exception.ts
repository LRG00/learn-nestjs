import { HttpStatus, HttpException } from '@nestjs/common';


export class ForbiddenException extends HttpException {
  constructor() {
    super({
      status: HttpStatus.FORBIDDEN,
      error: 'This is a custom message',
    }, 403);
  }
}