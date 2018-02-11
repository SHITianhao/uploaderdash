class MergeError extends Error {
    constructor(node, resp) {
        super(`由于${resp.data.message}, 文件 ${node.get('filename')} 上传分片合并操作失败`);
        this.node = node;
    }
}

export default MergeError;