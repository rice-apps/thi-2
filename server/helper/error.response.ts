module.exports = function (errors: any) {
    const { statusCode = 400, mCode, message, ...rest } = errors; 
    return { isError: true, statusCode, mCode, message, ...rest };
};