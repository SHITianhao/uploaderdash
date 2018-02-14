class TimeoutError extends Error {
    constructor(retried) {
        super(`请求超时, ${retried}次重试失败`);
    }
}

export default TimeoutError;