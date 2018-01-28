<?php
namespace OCA\UploaderDash\Storage;

use OC\ServerContainer;
class FileStorage {

    private $rootStorage;
    private static $_TMP_CHUNK_FOLDER = 'uploading_chunks';

    public function __construct($rootStorage){
        $this->rootStorage = $rootStorage;
    }

    public function saveTempChunk($fileMD5, $file, $chunkIndex) {
        if ($file['error'] == UPLOAD_ERR_OK && is_uploaded_file($file['tmp_name'])) {
            $chunkPath = '/'+ $_TMP_CHUNK_FOLDER + '/' + $fileMD5 + '/' + $chunkIndex;
            $this->rootStorage->touch($chunkPath);
            $chunkFile = $this->rootStorage->get($chunkPath);
            $content = file_get_contents($file['tmp_name']);
            $chunkFile->putContent($content);
        }
    }
}