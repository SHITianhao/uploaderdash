<?php
namespace OCA\UploaderDash\Db\Entity;

use JsonSerializable;

use OCP\AppFramework\Db\Entity;

class FileEntity extends Entity implements JsonSerializable {

    protected $fileId;
    protected $userId;
    protected $filename;
    protected $fileMd5;
    protected $totalChunk;
    protected $relativePath;
    protected $rootPath;
    protected $completed;
    protected $fileSize;

    protected $uploadedChunks;

    public function jsonSerialize() {
        return [
            'id' => $this->id,
            'fileId' => $this->fileId,
            'userId' => $this->userId,
            'filename' => $this->filename,
            'fileMd5' => $this->fileMd5,
            'totalChunk' => $this->totalChunk,
            'rootPath' => $this->rootPath,
            'relativePath' => $this->relativePath,
            'completed' => $this->completed == 1, // 1 true, 0 false
            'fileSize' => $this->fileSize,
            'uploadedChunks' => $this->uploadedChunks
        ];
    }
}