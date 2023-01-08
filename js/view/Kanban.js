export default class Kanban {
  constructor(root) {
    this.root = root;

    Kanban.columns().forEach(column => {
      // TODO: create instance a Column class
      

    });
  }


  static columns() {
    return [
      {
        id: 1,
        title: "Do List"
      },
      {
        id: 2,
        title: "In Progress"
      },
      {
        id: 3,
        title: "Completed"
      }
    ];
  }
}