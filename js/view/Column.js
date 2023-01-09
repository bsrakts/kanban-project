import KanbanAPI from "../api/KanbanAPI.js";
import Item from "./Item.js";

export default class Column {
  constructor(id, title) {
    this.elements = {};
    this.elements.root = Column.createRoot();
    this.elements.title = this.elements.root.querySelector(".status_title");
    this.elements.items = this.elements.root.querySelector(".kanban__items");
    this.elements.addItem = this.elements.root.querySelector(".add_items");

    this.elements.root.dataset.id = id;
    this.elements.title.textContent = title;

    this.elements.addItem.addEventListener("click", () => {
      const newItem = KanbanAPI.insertItem(id, "");

      this.renderItem(newItem);
    });

    KanbanAPI.getItems(id).forEach(item => {
      this.renderItem(item)
    });

  }

  static createRoot(){
    const range = document.createRange();

    range.selectNode(document.querySelector(".card_container"));

    return range.createContextualFragment(`
      <div class="col-4 card-it">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title status_title"></h3>
          </div>
          <div class="card-body kanban__items">
            <div contenteditable class="kanban__items-input"></div>
            <div class="kanban__dropzone"></div>
          </div>

        </div>
        <button class="add_items" type="button">+ Add</button>
      </div>
    `).children[0];
  }

  renderItem(data) {
    const item = new Item(data.id, data.content);

    this.elements.items.appendChild(item.elements.root);
  }
}