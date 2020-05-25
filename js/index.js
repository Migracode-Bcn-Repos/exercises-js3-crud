import { getTypeForms, getResponses } from "./api.js";
import { useState, updateState } from "./state.js";

const tbody = document.querySelector("tbody");

(async function () {
  updateState({ typeForms: await addResponses(await getTypeForms()) });
  updateTable();
})();

async function addResponses(typeForms) {
  return await Promise.all(
    typeForms.map(async (typeForm) => ({
      ...typeForm,
      responses: await getResponses(typeForm.id),
    }))
  );
}

function updateTable() {
  tbody.innerHTML = null;
  const { typeForms } = useState();
  typeForms.forEach((typeForm) => {
    const row = createRow(typeForm);
    tbody.appendChild(row);
  });
}

function createRow(typeForm) {
  const row = document.createElement("tr");
  const values = [typeForm.title, typeForm.responses, typeForm.self.href];
  const actions = [
    { name: "Edit", callback: editItem },
    { name: "Delete", callback: deleteItem },
  ];

  values.forEach((value) => {
    const cell = createCell(typeForm.id, value);
    row.appendChild(cell);
  });

  actions.forEach((action) => {
    const cell = createCell(typeForm.id, action.name);
    cell.addEventListener("click", action.callback);
    row.appendChild(cell);
  });

  return row;
}

function createCell(id, value) {
  const cell = document.createElement("td");
  cell.id = id;
  cell.innerText = value;
  return cell;
}

function editItem(event) {
  window.open(`pages/edit.html?id=${event.target.id}`, "_self");
}

function deleteItem(event) {
  const { typeForms } = useState();
  updateState({
    typeForms: typeForms.filter((item) => item.id !== event.target.id),
  });
  updateTable();
}
