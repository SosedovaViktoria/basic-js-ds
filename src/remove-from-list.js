const { NotImplementedError } = require('../extensions/index.js');
const { ListNode } = require('../extensions/list-node.js');

/**
 * Given a singly linked list of integers l and an integer k,
 * remove all elements from list l that have a value equal to k.
 *
 * @param {List} l
 * @param {Number} k
 * @return {List}
 *
 * @example
 * For l = [3, 1, 2, 3, 4, 5] and k = 3,
 * the output should be [1, 2, 4, 5]
 *
 * Singly - linked lists are already defined using interface
 * class ListNode {
 *   constructor(x) {
 *     this.value = x;
 *     this.next = null;
 *   }
 * }
 */
 function removeKFromList(newArr, k) {
  let arr = [];
  if (newArr.value !== null || newArr.value !== undefined) {
  do {
  if (newArr.value !== k) {
  arr.push(newArr.value);
  }
  
  newArr = newArr.next;
  
  if (newArr.next === null && newArr.value !== k) {
  arr.push(newArr.value);
  }
  } while (newArr.next != null);
  }
  
  return arr.reverse().reduce((acc, cur) => {
  if (acc) {
  const node = new ListNode(cur);
  node.next = acc;
  return node;
  }
  
  return new ListNode(cur);
  }, null);
  }
module.exports = {
  removeKFromList
};
