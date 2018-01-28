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
        $sql = 'SELECT * FROM *PREFIX*'+self::$db_name+' WHERE id = ? AND user_id = ?';
        return $this->findEntity($sql, [$id, $userId]);
    }

    public function findAll($userId) {
        $sql = 'SELECT * FROM *PREFIX*'+self::$db_name+' WHERE user_id = ?';
        return $this->findEntities($sql, [$userId]);
    }

}