import {APP_NAME} from '@Constants'
// PDF Icon
const pdfRex = [/application\/pdf/];
// PPT Icon
const pptRex = [
    /application\/vnd.ms-powerpoint/, 
    /application\/vnd.openxmlformats-officedocument.presentationml.presentation/
];
// Image Icon
const imageRex = [/image\/*/];
// Video Icon
const videoRex = [/video\/*/];
// Music Icon
const musicRex = [/audio\/*/];
// Excel Icon
const excelRex = [
    /application\/vnd.ms-excel/,
    /application\/vnd.openxmlformats-officedocument.spreadsheetml.sheet/
];
// Word Icon
const wordRex = [
    /application\/msword/,
    /application\/vnd.openxmlformats-officedocument.wordprocessingml.document/
];
// ZIP Icon
const zipRex = [
    /application\/x-gzip/,
    /application\/gzip/,
    /application\/x-7z-compressed/,
    /application\/x-tar/,
    /application\/zip/,
    /application\/x-zip-compressed/
];

const rexMatch = (str, rexList=[]) => {
    return rexList.map(rex => {
        return str.match(rex);
    }).reduce((prev, curr) => {
        return prev || curr;
    }, false)
}

export const Icon = ({name}) => (
    <img 
        preserveAspectRatio="xMinYMin meet" 
        src={`${OC.imagePath(APP_NAME, name)}`}
        className="icon" />
)

/**
 * 
 * @param {File} file 
 */
export const getFileIcon = (file) => {
    const type = file.type;
    if (rexMatch(type, pdfRex)) {
        return 'pdf';
    } else if (rexMatch(type, pptRex)) {
        return 'ppt';
    } else if (rexMatch(type, imageRex)) {
        return 'image';
    } else if (rexMatch(type, videoRex)) {
        return 'video';
    } else if (rexMatch(type, musicRex)) {
        return 'music';
    } else if (rexMatch(type, excelRex)) {
        return 'excel';
    } else if (rexMatch(type, wordRex)) {
        return 'word';
    } else if (rexMatch(type, zipRex)) {
        return 'zip';
    } else {
        return 'file';
    }
}

export const getFolderIcon = (collapsed) => (
    collapsed ? <Icon name={'folder'}/> : <Icon name={'folder_open'}/>
)