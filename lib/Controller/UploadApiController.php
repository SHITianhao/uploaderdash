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
     * @NoAdminRequired
     * @param string $rootPath
     * @param array $files
     */
	public function createFiles($rootPath, $files) {
        $resp = array();
        foreach ($files as $fileInfo) {
            $existFiles = $this->fileMapper->findByMD5AndRootPath($fileInfo['md5'], $rootPath, $this->userId);
            if(count($existFiles) != 0) {
                $existFile = $existFiles[0];
                if($existFile->getCompleted()) {
                    $exist = $this->storage->checkFileExist($existFile->getFileId());
                    if(!$exist) {
                        $existFiles = null;
                    }
                }
            }
            if(count($existFiles) != 0) {
                // TODO: Same uploaded file but different path;
                $existFile = $existFiles[0];
                $uploadedChunks = $this->chunkMapper->findAll($existFile->getId());
                if($uploadedChunks == null) $uploadedChunks = [];
                $existFile->setUploadedChunks($uploadedChunks);
                array_push($resp, $existFile);
            } else {
                $file = new FileEntity();
                $file->setUserId($this->userId);
                $file->setFilename($fileInfo['filename']);
                $file->setFileMd5($fileInfo['md5']);
                $file->setTotalChunk($fileInfo['totalChunk']);
                $file->setFileSize($fileInfo['fileSize']);
                $file->setCompleted(false);
                $file->setRootPath($rootPath);
                $path = $fileInfo['relativePath'];
                if(empty($fileInfo['relativePath'])) {
                    $path = $fileInfo['filename'];
                }
                $file->setRelativePath($path);
                $data = $this->fileMapper->insert($file);
                array_push($resp, $data);
            } 
        }
        
        return new DataResponse($resp);
    }

    /**
     * @NoAdminRequired
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
     * @NoAdminRequired
     * @param int $fileId
     */
	public function mergeChunks($fileId) {
        $file = $this->fileMapper->find($fileId, $this->userId);
        $fileMD5 = $file->getFileMd5();
        $totalChunk = $file->getTotalChunk();
        $targetPath = $file->getRootPath() . '/' . $file->getRelativePath();
        $fileId = $file->getFileId();
        $fileSize = $file->getFileSize();

        $targetFile = $this->storage->mergeChunks($fileMD5, $fileSize, $totalChunk, $targetPath);
        $file->setFileId($targetFile->getId());
        $file->setCompleted(true);
        
        $this->storage->cleanChunks($fileMD5);
        return new DataResponse($this->fileMapper->update($file));
    }

}