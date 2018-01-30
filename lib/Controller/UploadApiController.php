<?php
namespace OCA\UploaderDash\Controller;

use OCP\AppFramework\ApiController;
use OCP\IRequest;
use OCP\AppFramework\Http\JSONResponse;
use OCP\AppFramework\Http\DataResponse;

use OCA\UploaderDash\Db\Mapper\FileMapper;
use OCA\UploaderDash\Db\Mapper\ChunkMapper;

use OCA\UploaderDash\Db\Entity\FileEntity;
use OCA\UploaderDash\Db\Entity\ChunkEntity;

use OCA\UploaderDash\Storage\FileStorage;

use OCA\UploaderDash\Exception\MD5NotMatchException;

class UploadApiController extends ApiController {

    private $fileMapper;
    private $chunkMapper;
    private $userId;
    private $storage;

    public function __construct($AppName,
            IRequest $request, 
            FileMapper $fileMapper, 
            ChunkMapper $chunkMapper,
            FileStorage $FileStorage,
            $UserId) {
        parent::__construct($AppName, $request);
        $this->fileMapper = $fileMapper;
        $this->chunkMapper = $chunkMapper;
        $this->storage = $FileStorage;
        $this->userId = $UserId;
    }


    /**
     * @NoCSRFRequired
     * 
     * @param array $files
     */
	public function createFiles($files) {
        $resp = array();
        foreach ($files as $fileInfo) {
            
            $file = new FileEntity();
            $file->setUserId($this->userId);
            $file->setFilename($fileInfo['filename']);
            $file->setFileMd5($fileInfo['md5']);
            $file->setTotalChunk($fileInfo['totalChunk']);
            $file->setRelativePath($fileInfo['relativePath']);
            $file->setFileSize($fileInfo['fileSize']);
            $file->setCompleted(false);
            $data = $this->fileMapper->insert($file);
            array_push($resp, $data);
        }
        
        return new DataResponse($resp);
    }

    /**
     * @NoCSRFRequired
     * 
     * @param int $fileId
     * @param string $fileMD5
     * @param string $chunkMD5
     * @param int $chunkIndex
     */
	public function createChunk($fileId, $fileMD5, $chunkMD5, $chunkIndex) {
        $chunk = new ChunkEntity();
        $chunk->setFileId($fileId);
        $chunk->setChunkMd5($chunkMD5);
        $chunk->setChunkIndex($chunkIndex);

        // TODO: use request to get file
        $file = $_FILES;
        try {
            $this->storage->saveTempChunk($fileMD5, $file['data'], $chunkMD5, $chunkIndex);
        } catch (MD5NotMatchException $e) {

        }
        
        return new DataResponse($this->chunkMapper->insert($chunk));
    }

    /**
     * @NoCSRFRequired
     * 
     * @param int $fileId
     */
	public function mergeChunks($fileId) {
        $file = $this->fileMapper->find($fileId, $this->userId);
        $fileMD5 = $file->getFileMd5();
        $totalChunk = $file->getTotalChunk();
        $targetPath = $file->getRelativePath();
        $resp = $this->storage->mergeChunks($fileMD5, $totalChunk, $targetPath);
        $this->storage-> cleanChunks($fileMD5);
        return new DataResponse($resp);
    }

}