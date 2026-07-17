import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';


@Catch()
export class GlobalErrorFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const req = ctx.getRequest()
    const res = ctx.getResponse()
    
    const exceptionRes = exception instanceof HttpException ?
     exception.getResponse():'internal server error'

  
      const status = exception instanceof HttpException ?
       exception.getStatus() :
        500

    const message =
  typeof res === 'string'
    ? res
    : res['message'];


    res.status(status).json({
      message:exceptionRes,
      
      success:false,
      statusCode:status
    })
  }
}
