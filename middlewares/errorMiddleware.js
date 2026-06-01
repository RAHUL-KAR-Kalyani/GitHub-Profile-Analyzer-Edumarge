const errorHandler = (err, req, res, next) => {

    if (err.response?.status === 404) {
        return res.status(404).json({
            success: false,
            message: "GitHub user not found"
        });
    }

    console.error(err);

    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
};

module.exports = errorHandler;