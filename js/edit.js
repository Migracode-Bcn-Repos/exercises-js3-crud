import { getTypeForms, putTypeForm } from "./api.js";
import { useState, updateState } from "./state.js";

const form = document.querySelector("form");

(async function () {
  updateState({ selectedTypeForm: findSelected(await getTypeForms()) });
  setFormValues();
  form.addEventListener("submit", submitForm);
})();

function findSelected(typeForms) {
  const selectedId = getIdFromQueryParams();
  return typeForms.find((typeForm) => typeForm.id === selectedId);
}

function getIdFromQueryParams() {
  return new URLSearchParams(window.location.search).get("id");
}

function setFormValues() {
  const { selectedTypeForm } = useState();
  if (selectedTypeForm) {
    const input = form.querySelector("input#title");
    input.value = selectedTypeForm.title;
    return;
  }
  redirectToHomepage("TypeForm not found");
}

function submitForm(event) {
  event.preventDefault();
  isInputValid() ? updateItem() : alert("Title cannot be empty");
}

function isInputValid() {
  const input = form.querySelector("input#title");
  return !!input.value;
}

async function updateItem() {
  const { selectedTypeForm } = useState();
  const title = form.querySelector("input#title").value;
  const isUpdated = await putTypeForm({ ...selectedTypeForm, title });
  isUpdated
    ? redirectToHomepage("Title updated")
    : alert("Something went wrong, please try again");
}

function redirectToHomepage(message) {
  alert(message);
  window.open("../index.html", "_self");
}
