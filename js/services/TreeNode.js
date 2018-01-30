class TreeNode {
    constructor(name) {
        this.name = name;
        this.children = {};
    }

    /**
     * Add Child node
     * 
     * @param string name
     * @param TreeNode node
     */
    addChild = (name, node) => {
        let newChild = {};
        // child: {name: node}
        newChild[name] = node;
        this.children = Object.assign(this.children, newChild);
    }

    removeChild = (name) => {
        delete this.children[name];
    }

    hasChild = (name) => {
        return this.children[name] !== undefined &&  this.children[name] !== null;
    }

    getChild = (name) => {
        return this.children[name];
    }

    getChildrenNum = () => {
        return Object.keys(this.children).length;
    }

    isLeaf = () => {
        return Object.keys(this.children).length === 0;
    }

}

export default TreeNode;