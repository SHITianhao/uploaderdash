<?php
namespace OCA\UploaderDash\Db\Entity;

use JsonSerializable;

use OCP\AppFramework\Db\Entity;

class FileEntity extends Entity implements JsonSerializable {

    protected $userId;
    protected $filename;
    protected $fileMd5;
    protected $totalChunk;
    protected $relativePath;
    protected $completed;
    protected $fileSize;

    public function jsonSerialize() {
        return [
            'id' => $this->id,
            'userId' => $this->userId,
            'filename' => $this->filename,
            'fileMd5' => $this->fileMd5,
            'totalChunk' => $this->totalChunk,
            'relativePath' => $this->relativePath,
            'completed' => $this->completed,
            'fileSize' => $this->fileSize
        ];
    }
}