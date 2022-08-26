class BaseError extends Error {
    constructor({ message, code, httpCode }) {
        super()
        this.message = message
        this.code = code
        this.httpCode = httpCode
    }

    toJSON() {
        return {
            error: this.message,
            code: this.code,
            httpCode: this.httpCode
        }
    }

    stringify() {
        return `Error: ${this.message}
        code: ${this.code}
        httpCode: ${this.httpCode}`
    }
}

module.exports = BaseError