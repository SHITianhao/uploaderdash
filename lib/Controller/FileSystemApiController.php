<?php
namespace OCA\UploaderDash\Controller;

use OCP\AppFramework\ApiController;
use OCP\IRequest;
use OCP\AppFramework\Http\JSONResponse;
use OCP\AppFramework\Http\DataResponse;

use OCA\UploaderDash\Storage\FileStorage;

class FileSystemApiController extends ApiController {
    private $userId;
    private $storage;

    public function __construct($AppName,
            IRequest $request, 
            FileStorage $FileStorage,
            $UserId) {
        parent::__construct($AppName, $request);
        $this->storage = $FileStorage;
        $this->userId = $UserId;
    }

    /**
     * @NoCSRFRequired
     * 
     * @param string $path
     */
	public function listSubDir($path) {
        $content = $this->storage->listSubDir($path);

        return new JSONResponse($content);
    }
}