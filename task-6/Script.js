const draggableList = document.getElementById("draggable-list");
let draggedItem = null;

draggableList.addEventListener("dragstart", (event) => {
  if (draggedItem) {
    draggedItem.classList.remove("dragging");
  }
  draggedItem = event.target;
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/html", draggedItem.innerHTML);
  event.target.classList.add("dragging");
});

draggableList.addEventListener("dragenter", (event) => {
  const targetItem = event.target.closest(".draggable-item");
  if (targetItem && targetItem !== draggedItem) {
    const allItems = draggableList.querySelectorAll(".draggable-item");
    allItems.forEach((item) => {
      item.style.borderTop = "";
      item.style.borderBottom = "";
    });

    const boundingRect = targetItem.getBoundingClientRect();
    const offset = boundingRect.y + boundingRect.height / 2;

    if (event.clientY > offset) {
      targetItem.style.borderBottom = "double 2px #333";
      targetItem.style.borderTop = "none";
    } else {
      targetItem.style.borderTop = "double 2px #333";
      targetItem.style.borderBottom = "none";
    }
  }
});

draggableList.addEventListener("dragleave", (event) => {
  const targetItem = event.target.closest(".draggable-item");
  if (targetItem && targetItem !== draggedItem) {
    targetItem.style.borderTop = "none";
    targetItem.style.borderBottom = "none";
  }
});

draggableList.addEventListener("dragover", (event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
});

draggableList.addEventListener("drop", (event) => {
  event.preventDefault();
  const targetItem = event.target.closest(".draggable-item");

  if (targetItem && targetItem !== draggedItem) {
    if (
      event.clientY >
      targetItem.getBoundingClientRect().top + targetItem.offsetHeight / 2
    ) {
      targetItem.parentNode.insertBefore(draggedItem, targetItem.nextSibling);
    } else {
      targetItem.parentNode.insertBefore(draggedItem, targetItem);
    }
  }

  targetItem.style.borderTop = "";
  targetItem.style.borderBottom = "";
  draggedItem.style.opacity = "";
});
