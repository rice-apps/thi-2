module.exports = function (errors: any) {
    const { statusCode, message, ...rest } = errors; 
    return { success: false, statusCode, message, ...rest };
};