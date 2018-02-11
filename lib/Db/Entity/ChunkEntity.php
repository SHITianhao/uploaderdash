<?php
namespace OCA\UploaderDash\Db\Entity;

use JsonSerializable;

use OCP\AppFramework\Db\Entity;

class ChunkEntity extends Entity implements JsonSerializable {

    protected $fileId;
    protected $chunkMd5;
    protected $chunkIndex;

    public function jsonSerialize() {
        return [
            'id' => $this->id,
            'fileId' => $this->fileId,
            'chunkMd5' => $this->chunkMd5,
            'chunkIndex' => $this->chunkIndex
        ];
    }
}