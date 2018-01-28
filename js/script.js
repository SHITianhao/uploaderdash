(function (OC, window, $) {
    'use strict';
    var CHUNK_MAX_SIZE = 1024 * 1024 * 20; // 20MB
    var getChunkSize = function(fileSize) {
        return Math.ceil(fileSize / CHUNK_MAX_SIZE);
    }

    var getFileMD5 = function(file) {

    }

    var UploadFileList = function (baseUrl, fileList) {
        this._baseUrl = baseUrl;
        this._fileList = Array.from(fileList);
    };
    UploadFileList.prototype = {
        upload: function () {
            var deferred = $.Deferred();
            var self = this;

        },
        _uploadFile: function(file) {
            var data = {
                "filaname": file.name,
                "md5": getFileMD5(file),
                "totalChunk": getChunkSize(file.size),
                "relativePath": file.webkitRelativePath,
                "fileSize": file.size
            }
            $.ajax({
                url: self._baseUrl + '/files',
                method: 'POST',
                data: JSON.stringify(data),
            }).done(function () {
                deferred.resolve();
            }).fail(function () {
                deferred.reject();
            });
        }
    }
    

})(OC, window, jQuery);







var onFiles = function(event) {
    var filelist = event.currentTarget.files;
    console.log(filelist);
    createTree(filelist);
}

var onSubmitBtnClick = function(event) {

}

var createFolderNode = function($parent, folderName, isRoot) {
    var exist = $('#upload-tree-folder-'+folderName);
    if(exist.length !== 0) {
        return exist;
    }
    var $folder = document.createElement("ul");
    $folder.appendChild(document.createTextNode(folderName));
    $folder.setAttribute('id', 'upload-tree-folder-'+folderName);

    if(!isRoot) {
        var $folderLi = document.createElement("li");
        $folderLi.appendChild($folder);
        $parent.append($folderLi);
    } else {
        $parent.append($folder);
    }
    return $folder;
}

var createFileNode = function($folder, fileName) {
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(fileName));
    $folder.append(li);
}

var createTree = function(filelist) {
    var $root = $("#upload-tree-root");
    if ($root.children().length !== 0 ) {
        $root.empty();
    }
    
    for (var i = 0; i < filelist.length; i++) {
        var file = filelist[i];
        var path = file.webkitRelativePath;
        var pathList = path.split('/');
        var parentFolder = $root;
        var node = pathList.shift();
        while(node != undefined) {
            var nextNode = pathList.shift();
            if(nextNode == undefined) {
                createFileNode(parentFolder, node);
            } else {
                var isRoot = parentFolder === $root;
                parentFolder = createFolderNode(parentFolder, node, isRoot);
            }
            node = nextNode;
        }
    }
}

var listenInput = function() {
    var $folderInput = $("#upload-folder-input");
    var $fileInput = $("#upload-file-input");
    var $submitBtn = $("#upload-submit");
    $folderInput.on('change', onFiles);
    $fileInput.on('change', onFiles);
    $submitBtn.on('click', onSubmitBtnClick);
}

$(document).ready(function () {
    console.log(app)
    listenInput();
});