<?php
namespace OCA\UploaderDash\AppInfo;

use OCP\AppFramework\App;

use OCA\UploaderDash\Storage\FileStorage;


class Application extends App {

    public function __construct(array $urlParams=array()){
        parent::__construct('uploaderdash', $urlParams);

        $container = $this->getContainer();

        /**
         * Storage Layer
         */
        $container->registerService('FileStorage', function($c) {
            return new FileStorage(
                $c->query('ServerContainer')->getRootFolder()
            );
        });

    }
}