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
            // $data = $this->fileMapper->insert($file);
            array_push($resp, $file);
        }
        
        return new DataResponse($resp);
    }

    /**
     * @NoCSRFRequired
     * 
     * @param int $fileId
     * @param string $md5
     */
	public function createChunk($fileId, $md5) {
        $chunk = new ChunkEntity();
        $chunk->setFileId($fileId);
        $chunk->setChunkMd5($md5);

        $file = $_FILES;
        $this->storage->saveTempChunk($md5, $file['data'], 0);
        return new DataResponse(array('file' => $file['data'], "chunk" => $chunk));
    }

}