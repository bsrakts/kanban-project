import KanbanAPI from "../api/KanbanAPI.js";

export default class DropZone {
  static createDropZone() {
    const range = document.createRange();

    range.selectNode(document.querySelector(".card_container"));

    const dropZone = range.createContextualFragment(`
    <div class="kanban__dropzone">
      </div>
    `).children[0];

    dropZone.addEventListener("dragover", e => {
      e.preventDefault();
      dropZone.classList.add("kanban__dropzone--active");
    });

    dropZone.addEventListener("dragleave", () => {
      dropZone.classList.remove("kanban__dropzone--active");
    });

    dropZone.addEventListener("drop", e => {
      e.preventDefault();
      dropZone.classList.remove("kanban__dropzone--active");

      const columnElement = dropZone.closest(".card-it");
      const columnId = Number(columnElement.dataset.id);
      const dropZonesInColumn = Array.from(columnElement.querySelectorAll(".kanban__dropzone"));
      const droppedIndex = dropZonesInColumn.indexOf(dropZone);
      const itemId = Number(e.dataTransfer.getData("text/plain"));
      var itemContent = tinymce.get('txt_'+itemId).getContent();
      const droppedItemElement = document.querySelector(`[data-id="${itemId}"]`);
      // const insertAfter = dropZone.parentElement.classList.contains("kanban__items") ? dropZone.parentElement : dropZone;
      if (droppedItemElement.contains(dropZone)) {
        return;
      }
      function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
      };
      tinymce.get('txt_' + itemId).remove();
      document.getElementById('txt_'+itemId).remove();
      var newNode = htmlToElement('<textarea id="txt_'+itemId+'" class="kanban__items-input" contenteditable draggable="true">'+itemContent+'</textarea>');
      e.currentTarget.parentNode.insertBefore(newNode, e.currentTarget.nextSibling);
      tinymce.init({
    selector: "#txt_"+itemId,
    plugins: "emoticons",
    toolbar: "emoticons",
    toolbar_location: "bottom",
    menubar: true,
    /* … */
    height: 300
      });
      // insertAfter.after(droppedItemElement);
      KanbanAPI.updateItem(itemId, {
        columnId,
        position: droppedIndex
      });
    });

    return dropZone;
  }
};



