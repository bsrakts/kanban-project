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
      console.log("dragover");
    });

    dropZone.addEventListener("dragleave", () => {
      dropZone.classList.remove("kanban__dropzone--active");
      console.log("dragleave");
    });

    dropZone.addEventListener("drop", e => {
      e.preventDefault();
      dropZone.classList.remove("kanban__dropzone--active");

      const columnElement = dropZone.closest(".card-it");
      const columnId = Number(columnElement.dataset.id);

      console.log(columnElement, columnId);
    });

    return dropZone;
  }
};