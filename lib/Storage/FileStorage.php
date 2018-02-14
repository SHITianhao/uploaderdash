<?php
namespace OCA\UploaderDash\Storage;

use OC\Files\Filesystem;
use OC\Files\Cache\HomeCache;

use OCP\IContainer;
use OCP\Files\IAppData;
use OCP\Files\IRootFolder;
use OCP\Files\NotFoundException;

use OCP\Lock\LockedException;
use OCA\UploaderDash\Exception\MD5NotMatchException;

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
                $fileFolder = $this->newFolder($this->appData, $fileMD5);
            }

            try {
                $chunkFile = $fileFolder->getFile($chunkIndex);
            } catch (NotFoundException $e) {
                $chunkFile =  $this->newFile($fileFolder, $chunkIndex);
            }

            $chunkFile->putContent($content);

            return $chunkFile;
        }
    }

    private function newFile($folder, $fileName) {
        $success = false;
        while ($success === false) {
            try {
                $file = $folder->newFile($fileName);
                $success = true;
            } catch (LockedException $e) {
                // try again
            }
        }
        return $file;
    }

    private function newFolder($folder, $folderName) {
        $success = false;
        while ($success === false) {
            try {
                $folder = $folder->newFolder($folderName);
                $success = true;
            } catch (LockedException $e) {
                // try again
            }
        }
        return $folder;
    }

    public function createFile($userFolder, $targetPath) {
        // get user root folder
        $folder = $userFolder;
        $paths = explode('/', $targetPath);
        $len = count($paths);
        $file = null;
        for ($i = 0; $i < $len - 1; $i++) {
            $path = $paths[$i];
            try {
                $folder = $folder->get($path);
            } catch (NotFoundException $e) {
                $this->newFolder($folder, $path);
            }
        }
        return $this->newFile($folder, $paths[$len-1]);
    }

    public function cleanChunks($fileMD5) {
        $fileFolder = $this->appData->getFolder($fileMD5);
        $fileFolder->delete();
    }

    public function mergeChunks($fileMD5, $fileSize, $totalChunk, $targetPath) {
        $userFolder = $this->rootFolder->getUserFolder($this->currentUser);
        // TODO: check array
        $targetFile = $this->createFile($userFolder, $targetPath);
        $fileFolder = $this->appData->getFolder($fileMD5);

        $fileStream = $targetFile->fopen('wb');
        ftruncate($fileStream, 0);
		rewind($fileStream);
        for ($i = 0; $i < $totalChunk; $i++) {
            $chunkFile = $fileFolder->getFile($i);
            $content = $chunkFile->getContent();
            fwrite($fileStream, $content);
            fflush($fileStream);
        }
		flock($fileStream, LOCK_UN);
        fclose($fileStream);
        // Update file cache
        Filesystem::touch($targetPath);
        return $targetFile;
    }

    public function listSubDir($absolutPath) {
        $userFolder = $this->rootFolder->getUserFolder($this->currentUser);
        $result = array();
        try {
            $folder = $userFolder;
            $paths = explode('/', $absolutPath);
            $len = count($paths);
            for ($i = 1; $i <= $len - 1; $i++) {
                $path = $paths[$i];
                $folder = $folder->get($path);
            }
            $nodes = $folder->getDirectoryListing();
            for ($i = 0; $i < count($nodes); $i++) {
                $node = $nodes[$i];
                if($node instanceof \OCP\Files\Folder) {
                    array_push($result, $node->getName());
                }
            }
            return $result;
        } catch (NotFoundException $e) {
            return array(); 
        }
    }

    public function checkFileExist($fileId) {
        $userFolder = $this->rootFolder->getUserFolder($this->currentUser);
        return count($userFolder->getById($fileId)) != 0;
    }

}