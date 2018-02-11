class ChunkUploadingError extends Error {
    constructor(node, chunkIndex, resp) {
        super(`由于${resp.data.message}, 文件${node.get('filename')} 第${chunkIndex}分片上传失败`);
        this.node = node;
        this.chunkIndex = chunkIndex;
    }
}

export default ChunkUploadingError;