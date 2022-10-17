const { NotImplementedError } = require('../extensions/index.js');
const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

class BinarySearchTree {
  constructor() {
    this.root_el = null;
  }

  root() {
    if(this.root_el) {
      return this.root_el;
    }
    else{
      return null;
    }
  }

  add(data) {
    this.validateInput(data);
    if(!this.root_el) {
      this.root_el = new Node(data);
    } else {
      this.add_opt(this.root_el, data);
    }
  }

  has(data) {
    this.validateInput(data);
    let node = this.root_el;
    while(node) {
      if(node.data === data){
        return true;
      }
      else if(node.data > data){
        node = node.left;
      } 
      else {
        node = node.right;
      }
    }
    return false;
  }

  find(data) {
    this.validateInput(data);
    let node = this.root_el;
    while(node) {
      if(node.data === data){
         return node;
        }
      if(node.data > data){
        node = node.left;
      } 
      else{ 
        node = node.right;
      }
    }
    return null;
  }

  remove(data) {
    this.validateInput(data);
    let node = this.find(data);
    if(!node){
      return false;
    } 
    this.remove_opt(this.root_el, data);
  }

  min() {
    let node = this.root_el.left;
    let tmpMin = this.root_el.data;
    while(node) {
      if(tmpMin > node.data) {
        tmpMin = node.data;
      }
      else{
      node = node.left;
      }
    }
    return tmpMin;
  }

  max() {
    let node = this.root_el.right;
    let tmpMax = this.root_el.data;
    while(node) {
      if(tmpMax < node.data){
        tmpMax = node.data;
      } 
      else{
      node = node.right;
      }
    }
    return tmpMax;
  }
  
min_opt(node) {
  if(!node.left){
    return node;
  } 
  else{
    return this.min_opt(node.left);
  }
  
}

remove_opt(node, data) {
  if(!node){
    return null;
  } 
  else if(node.data > data) {
    node.left = this.remove_opt(node.left, data);
  } 
  else if(node.data < data) {
    node.right = this.remove_opt(node.right, data);
  } 
  else {
    if(node.left && node.right) {
      let minNode = this.min_opt(node.right);
      node.data = minNode.data;
      node.right = this.remove_opt(node.right, node.data);
    }    
    else if(node.left){
      node = node.left;
    } 
    else if (node.right){
      node = node.right;
    } 
    else node = null;
  }
  return node;
}


add_opt(node, data) {
  if(!node) { return  } 
  else if(node.data > data) {
    if(!node.left) {
      node.left = new Node(data);
    }
    else {
      this.add_opt(node.left, data);
    }
  }
  else {
    if(!node.right) {
      node.right = new Node(data);
    } else {
      this.add_opt(node.right, data);
    }
  }
}

validateInput(data) {
  if(!data) throw new Error("Input not valid");
}
}
module.exports = {
  BinarySearchTree
};