class ErrorHandler extends Error{
    statusCode: Number;
  
    constructor(message: any, statusCode: Number = 500) {
      super(message);
      this.statusCode = statusCode;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export default ErrorHandler;