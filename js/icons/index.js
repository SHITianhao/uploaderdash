import FolderIcon from './Folder';
import FolderOpenIcon from './FolderOpen';
import FileIcon from './File';
// PDF Icon
const pdfRex = [/application\/pdf/];
import PDFIcon from './PDF';
// PPT Icon
const pptRex = [
    /application\/vnd.ms-powerpoint/, 
    /application\/vnd.openxmlformats-officedocument.presentationml.presentation/
];
import PPTIcon from './PPT';
// Image Icon
const imageRex = [/image\/*/];
import ImageIcon from './Image';
// Video Icon
const videoRex = [/video\/*/];
import VideoIcon from './Video';
// Music Icon
const musicRex = [/audio\/*/];
import MusicIcon from './Music';
// Excel Icon
const excelRex = [
    /application\/vnd.ms-excel/,
    /application\/vnd.openxmlformats-officedocument.spreadsheetml.sheet/
];
import ExcelIcon from './Excel';
// Word Icon
const wordRex = [
    /application\/msword/,
    /application\/vnd.openxmlformats-officedocument.wordprocessingml.document/
];
import WordIcon from './Word';
// ZIP Icon
const zipRex = [
    /application\/x-gzip/,
    /application\/gzip/,
    /application\/x-7z-compressed/,
    /application\/x-tar/,
    /application\/zip/,
    /application\/x-zip-compressed/
];
import ZipIcon from './Zip';

const rexMatch = (str, rexList=[]) => {
    return rexList.map(rex => {
        return str.match(rex);
    }).reduce((prev, curr) => {
        return prev || curr;
    }, false)
}

export const getFileIcon = (file) => {
    const type = file.type;
    if (rexMatch(type, pdfRex)) {
        return PDFIcon;
    } else if (rexMatch(type, pptRex)) {
        return PPTIcon;
    } else if (rexMatch(type, imageRex)) {
        return ImageIcon;
    } else if (rexMatch(type, videoRex)) {
        return VideoIcon;
    } else if (rexMatch(type, musicRex)) {
        return MusicIcon;
    } else if (rexMatch(type, excelRex)) {
        return ExcelIcon;
    } else if (rexMatch(type, wordRex)) {
        return WordIcon;
    } else if (rexMatch(type, zipRex)) {
        return WordIcon;
    } else {
        return FileIcon;
    }
}

export const getFolderIcon = (collapsed) => (
    collapsed ? <FolderIcon /> : <FolderOpenIcon />
)
import Merge from './Merge';
export const MergeIcon = Merge;