
import Kanban from './view/Kanban.js';

// console.log(Kanban);

new Kanban(
  document.querySelector('.kanban')
);

tinymce.init({
    selector: ".kanban__items-input",
    plugins: "emoticons",
    toolbar: "emoticons",
    toolbar_location: "bottom",
    menubar: true,
    /* … */
    height: 300
});
