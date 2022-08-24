import { NodeTree } from "./NodeTree.js";

class ImplementTree {
  root;
  constructor(){
    this.root=null
  }

  getBalancingFactor(nodeTree){
    if(nodeTree===null){
      return 0
    }
    return this.nodeHeight(nodeTree.left) - this.nodeHeight(nodeTree.right)
  }

  nodeHeight(nodeTree){
    if(nodeTree===null){
      return -1
    }
    return nodeTree.height
  }
  insertPublic(id, content){
    this.root = this.insert(this.root, id, content)
  }
  
  insert(tree, id, content){
    if(tree===null){
      return new NodeTree(id, content)
    } else if(id<tree.id){
      tree.left = this.insert(tree.left, id, content)
    } else if( id > tree.id){
      tree.right = this.insert(tree.right, id, content)
    } else {
      return tree
    }

    tree.height = 1 + Math.max(this.nodeHeight(tree.left),
      this.nodeHeight(tree.right))
    
    const balancingFactor = this.getBalancingFactor(tree)
    const balancingFactorRight = this.getBalancingFactor(tree.right)
    const balancingFactorLeft = this.getBalancingFactor(tree.left)

    if(balancingFactor>1 && balancingFactorLeft>=0){
      return this.simpleRightRotation(tree)
    }
    if(balancingFactor < -1 && balancingFactorRight <=0){
      return this.simpleLeftRotation(tree)
    }
    if(balancingFactor > 1 && balancingFactorLeft<0){
      tree.left = this.simpleLeftRotation(tree.left)
      return this.simpleRightRotation(tree)
    }
    if(balancingFactor< -1 && balancingFactorRight>0){
      tree.right = this.simpleRightRotation(tree.right)
      return this.simpleLeftRotation(tree)
    }

    return tree
  }

  publicRemove(id){
    this.root = remove(this.root, id)

    
  }
  remove(nodeTree, id){
      if(nodeTree===null){
        return nodeTree
      }
      if(id < nodeTree.id){
        nodeTree.left = this.remove(nodeTree.left, id)
      } else if( id > nodeTree.id){
        nodeTree.right = this.remove(nodeTree.remove, id)
      }else {
        if(nodeTree.left===null && nodeTree.right===null){
          nodeTree = null
        } else if(nodeTree.left===null){
          let temp = nodeTree
          nodeTree = temp.right
          temp = null
        } else if(nodeTree.right===null){
          let temp = nodeTree
          nodeTree = nodeTree.left
          temp = null
        } else {
          let temp = this.nodeMinId(nodeTree.right)
          nodeTree.id = temp.id
          nodeTree.right = this.remove(nodeTree.right, temp.id)
        }
      }
      if(nodeTree===null){
        return nodeTree
      }
      nodeTree.height = 1 + Math.max(this.nodeHeight(nodeTree.left),
       this.nodeHeight(nodeTree.right))

       const balancingFactor = this.getBalancingFactor(nodeTree)
       const balancingFactorRight = this.getBalancingFactor(nodeTree.right)
       const balancingFactorLeft = this.getBalancingFactor(nodeTree.left)
   
       if(balancingFactor>1 && balancingFactorLeft>=0){
         return this.simpleRightRotation(nodeTree)
       }
       if(balancingFactor < -1 && balancingFactorRight <=0){
         return this.simpleLeftRotation(nodeTree)
       }
       if(balancingFactor > 1 && balancingFactorLeft<0){
         nodeTree.left = this.simpleLeftRotation(nodeTree.left)
         return this.simpleRightRotation(nodeTree)
       }
       if(balancingFactor< -1 && balancingFactorRight>0){
         nodeTree.right = this.simpleRightRotation(nodeTree.right)
         return this.simpleLeftRotation(nodeTree)
       }
   
       return nodeTree     
      
  }
  nodeMinId(nodeTree){
    let temp = nodeTree
    while(temp.left !==null){
      temp = temp.left
    }
    return temp
  }

  simpleRightRotation(nodeTree){
    let temp1 = nodeTree.left
    let temp2 = temp1.right

    temp1.right = nodeTree
    nodeTree.left = temp2

    nodeTree.height = 1 + Math.max(this.nodeHeight(nodeTree.left), this.nodeHeight(nodeTree.right))
    temp1.height = 1 + Math.max(this.nodeHeight(temp1.left), this.nodeHeight(temp1.right))

    return temp1
  }

  simpleLeftRotation(nodeTree){
    let temp1 = nodeTree.right
    let temp2 = temp1.left

    temp1.left = nodeTree
    nodeTree.right = temp2

    nodeTree.height = 1 + Math.max(this.nodeHeight(nodeTree.left), this.nodeHeight(nodeTree.right))
    temp1.height = 1 + Math.max(this.nodeHeight(temp1.left), this.nodeHeight(temp1.right))

    return temp1
  }

  printPublic() {
		console.log(this.root.id + "(" + this.root.height + ")");
		const tab = "  ";
		this.print(this.root.left, tab, true);
		this.print(this.root.right, tab, false);
	}

  print(tree, tab, isLeft) {
		
		if (tree == null)
			return;
		
		if (isLeft) {
			console.log(tab + "L:");
			tab += "|  ";
		
		} else {
			console.log(tab + "R:");
			tab += "   ";
		}

		console.log(tree.id + "(" + tree.height + ")");
		this.print(tree.left, tab, true);
		this.print(tree.right, tab, false);
	}

  preOrder(tree){
    if(tree!==null){
      console.log(tree.content)
      this.preOrder(tree.left)
      this.preOrder(tree.right)
    }
  }
  inOrder(tree){
    if(tree!==null){
      this.inOrder(tree.left)
      console.log(tree.content)
      this.inOrder(tree.right)
    }
  }

  postOrder(tree){
    if(tree!==null){
      this.postOrder(tree.left)
      this.postOrder(tree.right)
      console.log(tree.content)
    }
  }

  countNodes(tree){
    if(tree===null) return 0
    else return 1 + this.countNodes(tree.left) + this.countNodes(tree.right)
  }

  countLeafs(tree){
    if(tree===null){
      return 0
    } else if(tree.left===null && tree.right===null){
      return 1
    } 
    else {
      return this.countLeafs(tree.left) + this.countLeafs(tree.right)
    }
  }

  calcHeight(tree){
    if(tree===null) return -1
    const left = this.calcHeight(tree.left)
    const right = this.calcHeight(tree.right)

    if(left > right){
      return left + 1
    }else{
      return right + 1
    }
  }

  calcHeightIt(tree){
    let height=0
    let nodesCount
    let nodeInLevel = []
    let currentNode
    
    if(tree ===null){
      return 0
    }
    nodeInLevel.push(tree)
    while (nodeInLevel.length!==0) {
      height++
      nodesCount = nodeInLevel.length
      while(nodesCount--){
        currentNode = nodeInLevel[0]
        if(currentNode.left!==null){
          nodeInLevel.push(currentNode.left)  
        }
        if(currentNode.right!==null){
          nodeInLevel.push(currentNode.right)
        }
        nodeInLevel.shift()
      }
    }
    return height -1
  }
  setFather(tree, father=null){
    if(tree!==null){
      tree.setFather(father)
      
      console.log("father: "+tree.father?.content+" content: "+tree.content)
      this.setFather(tree.left, tree)
      this.setFather(tree.right, tree)
    }
  }
}

export{ImplementTree}