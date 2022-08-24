import { ImplementTree } from "./ImplementTree.js"
import { NodeTree } from "./NodeTree.js"


function main(){
  const avlTree = new ImplementTree()
  avlTree.insertPublic(11, "Lápis");
  avlTree.insertPublic(12, "Borracha");
  avlTree.insertPublic(13, "Caderno");
  avlTree.insertPublic(14, "Apontador");
  avlTree.insertPublic(15, "Corretivo");
  avlTree.insertPublic(17, "Caneta");
  avlTree.insertPublic(7, "Copo");
  avlTree.insertPublic(10, "Chilito");
  avlTree.insertPublic(16, "Cocada");
  
  
  avlTree.preOrder(avlTree.root);

  avlTree.printPublic();
}

main();