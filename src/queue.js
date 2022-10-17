const { NotImplementedError } = require('../extensions/index.js');
const { ListNode } = require('../extensions/list-node.js');

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
class Queue {
  linkedList = null;

  convertArrayToList(arr) {
    return arr.reverse().reduce((acc, cur) => {
      if (acc) {
        const node = new ListNode(cur);
        node.next = acc;
        return node;
      }

      return new ListNode(cur);
    }, null);
  }

  getUnderlyingList() {
    let arr = [];
    if (this.linkedList.value !== null || this.linkedList.value !== undefined) {
      do {
        arr.push(this.linkedList.value);

        this.linkedList = this.linkedList.next;

        if (this.linkedList?.next === null) {
          arr.push(this.linkedList.value);
        }
      } while (this.linkedList?.next != null);
    }
    return this.convertArrayToList(arr.reverse());
  }

  enqueue(value) {
    if (!this.linkedList) {
      this.linkedList = new ListNode(value);
      return;
    }

    const newLinkedList = new ListNode(value);
    newLinkedList.next = this.linkedList;

    this.linkedList = newLinkedList;
  }

  dequeue() {
    return this.dequeueInternal(this.linkedList, { isPrevElementFinal: true });
  }

  dequeueInternal(currentListElement, isPrevObj) {
    if (currentListElement.next === null) {
      isPrevObj.isPrevElementFinal = true;
      return;
    }
    else { 
      const returnedValue = this.dequeueInternal(currentListElement.next, isPrevObj);
      if (returnedValue !== undefined)
        return returnedValue;
    }

    if (isPrevObj.isPrevElementFinal) {
      const valueToReturn = currentListElement.next.value;
      currentListElement.next = null;

      isPrevObj.isPrevElementFinal = false;

      return valueToReturn;
    }
  }
}

module.exports = {
  Queue
};
