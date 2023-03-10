import DropZone from "./DropZone.js";
import KanbanAPI from "../api/KanbanAPI.js";

export default class Item {
  constructor(id, content) {
    const bottomDropZone = DropZone.createDropZone();

    this.elements = {};
    this.elements.root = Item.createRoot(id);
    this.elements.input = this.elements.root.querySelector(".kanban__items-input");

    this.elements.root.dataset.id = id;
    this.elements.input.textContent = content;
    this.content = content;
    this.elements.root.appendChild(bottomDropZone);

    const onBlur = () => {
      const newContent = this.elements.input.textContent.trim();

      if (newContent === this.content) {
        return;
      }

      this.content = newContent;
      KanbanAPI.updateItem(id, {
        content: this.content
      });
    };


    this.elements.input.addEventListener("blur", onBlur);
    this.elements.root.addEventListener("dblclick", () => {
      const check = confirm("Are you sure you want to delete this item?");


      if (check) {
        KanbanAPI.deleteItem(id);

        this.elements.input.removeEventListener("blur", onBlur);
        this.elements.root.parentElement.removeChild(this.elements.root);
      }
    });

    this.elements.root.addEventListener("dragstart", e => {
      e.dataTransfer.setData("text/plain", id);
    });


    this.elements.input.addEventListener("drop", e => {
      e.preventDefault();
    });
  }



  static createRoot(id) {
    const range = document.createRange();

    range.selectNode(document.querySelector(".card_container"));

    return range.createContextualFragment(`
      <div class="kanban__item" draggable="true">
        <textarea id="txt_`+id+`" class="kanban__items-input" contenteditable></textarea>
      </div>
      `).children[0];
  }
}