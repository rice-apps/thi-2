module.exports = function (errors: {
    statusCode: number;
    message: string;
    rest: object;
}) {
    const { statusCode, message, ...rest } = errors;
    return { success: false, statusCode, message, ...rest };
};
