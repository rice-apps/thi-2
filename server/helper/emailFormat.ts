const email = require("./sendEmailVerification");

module.exports = (to: string) => {
    return {
        from: "THI <onboarding@resend.dev>",
        to: to,
        subject: "THI Verification Code",
        html: "<p>code is 12345</p>",
    };
};
