import KanbanAPI from './api/KanbanAPI.js';

console.log(KanbanAPI.insertItem(2, "I am new!"));

KanbanAPI.updateItem(47521, {
  columnId: 1,
  position: 0,
  content: "I am updated!"
});
