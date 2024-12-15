const responseMessages = {
    success: {
        created: "{operation} created successfully.",
        deleted: "{operation} deleted successfully.",
        fetched: "{operation} fetched successfully.",
        operationSuccessful: "{operation} completed successfully.",
        toggled: "{operation} toggled successfully.",

    },
    error: {
        notFound: "{operation} not found.",
        invalidInput: "Invalid {operation} provided.",
        internalServerError: "An internal server error occurred. Please try again later.",
        limitReached: "Limit reached for {operation}.",
        timeout: "Timeout reached for {operation}.",
        alreadyExists: "{operation} already exists.",
        failed : "{operation} failed.",
        notInitialized: "{operation} not initialized.",
        denied: "{operation} denied.",
        missingParameter: "{operation} missing parameter.",
    },
};

module.exports = {responseMessages};