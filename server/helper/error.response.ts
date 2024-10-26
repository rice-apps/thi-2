module.exports = function (errors: any) {
    const { statusCode = 400, message, ...rest } = errors; 
    return { isError: true, statusCode, message, ...rest };
};