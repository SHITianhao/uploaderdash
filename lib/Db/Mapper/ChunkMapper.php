<?php
namespace OCA\UploaderDash\Db\Mapper;

use OCP\IDbConnection;
use OCP\AppFramework\Db\Mapper;

class ChunkMapper extends Mapper {

    private static $db_name = 'uploading_chunks';

    public function __construct(IDbConnection $db) {
        parent::__construct($db, self::$db_name, '\OCA\UploaderDash\Db\Entity\ChunkEntity');
    }

    public function find($id, $fileId) {
        $sql = 'SELECT * FROM `*PREFIX*'.self::$db_name.'` WHERE id = ? AND file_id = ?';
        return $this->findEntity($sql, [$id, $fileId]);
    }

    public function findAll($fileId) {
        $sql = 'SELECT * FROM `*PREFIX*'.self::$db_name.'` WHERE file_id = ?';
        return $this->findEntities($sql, [$fileId]);
    }

}