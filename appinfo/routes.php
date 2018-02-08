<?php
/**
 * Create your routes in here. The name is the lowercase name of the controller
 * without the controller part, the stuff after the hash is the method.
 * e.g. page#index -> OCA\UploaderDash\Controller\PageController->index()
 *
 * The controller class has to be registered in the application.php file since
 * it's instantiated in there
 */
return [
    'routes' => [
	   ['name' => 'page#index', 'url' => '/', 'verb' => 'GET'],
       ['name' => 'page#do_echo', 'url' => '/echo', 'verb' => 'POST'],
       ['name' => 'upload_api#create_files', 'url' => '/files', 'verb' => 'POST'],
       ['name' => 'upload_api#create_chunk', 'url' => '/chunks', 'verb' => 'POST'],
       ['name' => 'upload_api#merge_chunks', 'url' => '/merge', 'verb' => 'POST'],
       ['name' => 'file_system_api#listSubDir', 'url' => '/subdirs', 'verb' => 'GET'],
    ]
];
