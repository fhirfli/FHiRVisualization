// Utility function to provide a sanitized error
function sanitizeError(env, err) {
    // Only return the error object if in development,
    // in production just return UNKNOWN to prevent leaking system information
    if (!env.PRODUCTION) {
        return {error: err};
    } else {
        return {error: 'UNKNOWN'};
    }
}

module.exports = sanitizeError;