import {  Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Param() body:string): string {
    console.log("🚀 ~ file: app.controller.ts:10 ~ AppController ~ getHello ~ body:", body)
    return this.appService.getHello();
  }
}
