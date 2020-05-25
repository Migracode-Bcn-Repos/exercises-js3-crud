const baseUrl = "https://api.typeform.com/forms";
const Authorization = "";

async function request(endpoint = "", options = {}) {
  return await fetch(baseUrl + endpoint, {
    ...options,
    headers: { ...options.headers, Authorization },
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));
}

export async function getTypeForms() {
  return await request().then((res) => res.items);
}

export async function getResponses(id) {
  return await request(`/${id}/responses`).then((res) => res.total_items);
}

export async function putTypeForm({ id, title }) {
  return await request(`/${id}`, {
    method: "PUT",
    body: JSON.stringify({ title }),
  }).then((res) => res.id === id && res.title === title);
}
