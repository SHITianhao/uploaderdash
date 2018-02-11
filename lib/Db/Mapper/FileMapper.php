<?php
namespace OCA\UploaderDash\Db\Mapper;

use OCP\IDbConnection;
use OCP\AppFramework\Db\Mapper;

class FileMapper extends Mapper {

    private static $db_name = 'uploading_files';

    public function __construct(IDbConnection $db) {
        parent::__construct($db, self::$db_name, '\OCA\UploaderDash\Db\Entity\FileEntity');
    }

    public function find($id, $userId) {
        $sql = 'SELECT * FROM `*PREFIX*'.self::$db_name.'` WHERE id = ? AND user_id = ?';
        return $this->findEntity($sql, [$id, $userId]);
    }

    public function findByMD5AndRootPath($fileMD5, $rootPath, $userId) {
        $sql = 'SELECT * FROM `*PREFIX*'.self::$db_name.'` WHERE file_md5 = ? AND user_id = ? AND root_path = ?';
        return $this->findEntities($sql, [$fileMD5, $userId, $rootPath]);
    }

    // public function updateComplete($id) {
    //     $sql = 'UPDATE `*PREFIX*'.self::$db_name.'` SET completed = ? WHERE id = ?';
    //     return $this->update($sql, [true, $id]);
    // }

}