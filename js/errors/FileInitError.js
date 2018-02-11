class FileInitError extends Error {
    constructor(index, resp) {
        super(`由于${resp.data.message}, 文件初始化失败`)
        this.index = index;
    }
}

export default FileInitError;