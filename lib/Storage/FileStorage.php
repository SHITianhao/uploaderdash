<?php
namespace OCA\UploaderDash\Storage;

use OCP\Files\IAppData;
use OCP\Files\IRootFolder;
use OCP\Files\NotFoundException;
use OCA\UploaderDash\Exception\MD5NotMatchException;
use OCP\IContainer;
use OC\Files\Filesystem;

class FileStorage {

    /** @var IAppData */
    private $appData;
    /** @var IRootFolder */
    private $rootFolder;
    /** @var string */
    private $currentUser;

    /**
	 * FileStorage constructor.
	 *
	 * @param IAppData $appData
	 * @param IRootFolder $rootFolder
	 * @param string $UserId
	 */
    public function __construct(
            IAppData $appData,
            IRootFolder $rootFolder,
            $UserId){
        $this->appData = $appData;
        $this->rootFolder = $rootFolder;
        $this->currentUser = $UserId;
    }

    public function saveTempChunk($fileMD5, $file, $chunkMD5, $chunkIndex) {
        if ($file['error'] == UPLOAD_ERR_OK && is_uploaded_file($file['tmp_name'])) {
            
            $content = file_get_contents($file['tmp_name']);
            if(md5($content) !== $chunkMD5) {
                throw new MD5NotMatchException();
            }
            try {
                $fileFolder = $this->appData->getFolder($fileMD5);
            } catch (NotFoundException $e) {
                $fileFolder = $this->appData->newFolder($fileMD5);
            }

            try {
                $chunkFile = $fileFolder->getFile($chunkIndex);
            } catch (NotFoundException $e) {
                $chunkFile = $fileFolder->newFile($chunkIndex);
            }

            $chunkFile->putContent($content);

            return $chunkFile;
        }
    }

    private function createFile($userFolder, $targetPath) {
        $folder = $userFolder;
        $paths = explode('/', $targetPath);
        $len = count($paths);
        $file = null;
        for ($i = 0; $i < $len; $i++) {
            $path = $paths[$i];
            if($i < $len - 1) {
                try {
                    $folder = $folder->get($path);
                } catch (NotFoundException $e) {
                    $folder = $folder->newFolder($path);
                }
            } else {
                try {
                    $file = $folder->get($path);
                } catch (NotFoundException $e) {
                    $file = $folder->newFile($path);
                }
            }
        }
        return $file;
    }

    public function cleanChunks($fileMD5) {
        $fileFolder = $this->appData->getFolder($fileMD5);
        $fileFolder->delete();
    }

    public function mergeChunks($fileMD5, $totalChunk, $targetPath) {

        $userFolder = $this->rootFolder->getUserFolder($this->currentUser);
        $targetFile = $this->createFile($userFolder, $targetPath);
        $fileStream = $targetFile->fopen('w+');
        $fileFolder = $this->appData->getFolder($fileMD5);

        for ($i = 0; $i < $totalChunk; $i++) {
            $chunkFile = $fileFolder->getFile($i);
            $content = $chunkFile->getContent();
            fwrite($fileStream, $content);
        }
        fclose($fileStream);
        return $targetFile->getETag();
    }
}