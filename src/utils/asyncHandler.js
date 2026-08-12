//promise method

const asyncHandler = (requestHandler) => (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next))
        .catch((err) => next(err));
};

export { asyncHandler };



//async await method
/*
const asyncHandler = (fn) => async(req,res,next) => {
    try {
        await fn(req,res,next)
    } catch (error) {
        res.status(err.code || 500).json({
            success: false,
            message: err.message || "Internal Server Error"
        })
    }
}  
*/

//we have created a wrapper function called asyncHandler that takes a function fn as an argument. It returns an asynchronous function that takes req, res, and next as parameters. Inside the returned function, we use a try-catch block to handle any errors that may occur during the execution of fn. If an error occurs, we send a JSON response with the appropriate status code and error message.
//we do this because we want to avoid writing try-catch blocks in every route handler and instead handle errors in a centralized manner.