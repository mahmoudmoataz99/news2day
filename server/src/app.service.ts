import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return 'Welcome to News Today APIs';
  }

  getStatus() {
    return {
      status: 'running',
      version: '1.0.0',
      timestamp: new Date(),
    };
  }
}
