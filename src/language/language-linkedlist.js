class _Node {
    constructor(value, next) {
      this.value = value;
      this.next = next;
    }
  }
  
  class LinkedList {
    constructor() {
      this.head = null;
    }
  
    insertNew(item) {
      if (this.head === null) {
        this.head = new _Node(item, null);
      }
      else {
        let tempNode = this.head;
        while (tempNode.next !== null) {
          tempNode = tempNode.next;
        }
        tempNode.next = new _Node(item, null);
      }
    }
  
    ifIncorrect() {
      let currNode = this.head; 
      let upNextNode = this.head.next;
      let tempNode = upNextNode.next;
  
      currNode.value.memory_value = 1; 
      currNode.value.incorrect_count++;
  
      this.head = upNextNode; 
      this.head.next = currNode; 
      currNode.next = tempNode; 

      upNextNode.value.next = currNode.value.id;
      currNode.value.next = tempNode.value.id;
    }
    
    ifCorrect() {
      let currNode = this.head; 
      let tempNode = this.head;
      let positionCount = 0;
      let position = 0;
  
      currNode.value.memory_value = (currNode.value.memory_value * 2); 
      position = currNode.value.memory_value; 
      currNode.value.correct_count++; 
  

      while ((currNode.next !== null) && (positionCount !== position)) {
        currNode = currNode.next;
        positionCount++;
      }
  
      this.head = this.head.next; 
      tempNode.next = currNode.next; 
      currNode.next = tempNode; 
  

      tempNode.value.next = !tempNode.next ? null : tempNode.next.value.id;
      currNode.value.next = tempNode.value.id;
      this.head.value.next = this.head.next.value.id;
    }
  

    seeAll() {
      if (!this.head) {
        return null;
      }
  
      let node = this.head;
      let all = [];
      while (node.next) {
        all.push(node.value);
        node = node.next;
      }
  
      all.push(node.value);
      return all;
    }
  }
  
  module.exports = LinkedList;