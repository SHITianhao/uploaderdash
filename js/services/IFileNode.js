import TreeNode from './TreeNode';

class IFileNode extends TreeNode {
    constructor(name) {
        super(name);
        this.inited = false;
        this._onUpdate = null;
    }

    isFolder = () => {
        return this.isLeaf();
    }

    filterFileNode = (key) => {
        const child = this.children[key];
        return child.isLeaf();
    }
    
    filterFolderNode = (key) => {
        const child = this.children[key];
        return !child.isLeaf();
    }

    setOnUpdate = (cb) => {
        if(typeof cb === 'function') this._onUpdate = cb;
        return this;
    }
}

export default IFileNode;