class NodeTree{
  id
  content;
  height;
  left;
  right;

  constructor(id, content){
    this.content = content;
    this.id = id
    this.left = null
    this.right = null
    this.height=0
  }

  setFather(fatherNode){
    this.father = fatherNode
  }

  setLeft(leftNode){
    this.left = leftNode;
  }

  setRight(rightNode){
    this.right = rightNode
  }
}

export {NodeTree}