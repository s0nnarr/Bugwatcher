
export const apiAudit = (req, res, next) => {
    const method = req.method;
    const url = req.originalUrl;
    const timestamp = new Date().toISOString();
    const user = req.user ? req.user.id : 'Unknown';
    const body = req.body ? JSON.stringify(req.body) : '';
    console.log(`[${timestamp}] ${method} request to ${url} by User ID: ${user}\nRequest Body: \n   ${body}`);

    next();
}