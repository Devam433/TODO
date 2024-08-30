//centralized error handler

export const errorHandler = (err,req,res,next)=>{
  const statusCode = res.statusCode == 200 ? 500 : res.statusCode //because the thrown error is not designed to throw 200(as 200 means ok), so if this happens it might be some bug or any server error
  // res.status(statusCode);
  // res.json({
  //   message: err.message,
  //   // Stack trace only in development
  //   stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  // })
  switch(statusCode) {
    case 400 : 
      res.status(statusCode);
      res.json({
        message: err.message,
        // Stack trace only in development
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
      })
      break;
    case 500:
      res.status(statusCode);
      res.json({
        message: err.message,
        // Stack trace only in development
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
      })
      break;
    default:
      console.log('no error')
      break;
  }
} 