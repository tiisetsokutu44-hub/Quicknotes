// ---------- Select elements ----------
const form = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const searchInput = document.querySelector("#search-input");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

const MAX_LENGTH = 200;

// ---------- Data ----------
let notes = []; // each: { id, text, category, createdAt }

// ---------- Count message ----------
function updateCount() {
  if (notes.length === 0) {
    noteCount.textContent = "No notes yet. Add your first one!";
  } else if (notes.length === 1) {
    noteCount.textContent = "1 note";
  } else {
    noteCount.textContent = notes.length + " notes";
  }
}

// ---------- Render ----------
function render() {
  notesList.textContent = ""; // clear the list

  notes.forEach(function (note) {
    const li = document.createElement("li");
    li.classList.add("note-card", "category-" + note.category);

    const text = document.createElement("p");
    text.classList.add("note-text");
    text.textContent = note.text; // textContent, never innerHTML

    const meta = document.createElement("div");
    meta.classList.add("note-meta");

    const badge = document.createElement("span");
    badge.classList.add("note-badge");
    badge.textContent =
      note.category + " • " + new Date(note.createdAt).toLocaleString();

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.type = "button";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function () {
      deleteNote(note.id);
    });

    meta.append(badge, deleteBtn);
    li.append(text, meta);
    notesList.appendChild(li);
  });

  updateCount();
}

// ---------- Validation ----------
function validate(text) {
  if (text === "") {
    return "Please write something before adding a note.";
  }
  if (text.length > MAX_LENGTH) {
    return (
      "Note is too long (" + text.length + "/" + MAX_LENGTH + " characters)."
    );
  }
  return ""; // no error
}

// ---------- Add ----------
function addNote(text, category) {
  const note = {
    id: Date.now(),
    text: text,
    category: category,
    createdAt: new Date().toISOString(),
  };
  notes.unshift(note); // newest first
  render();
}

// ---------- Delete ----------
function deleteNote(id) {
  notes = notes.filter(function (note) {
    return note.id !== id;
  });
  render();
}

// ---------- Events ----------
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = noteInput.value.trim();
  const error = validate(text);

  if (error) {
    errorMessage.textContent = error;
    return;
  }

  errorMessage.textContent = "";
  addNote(text, categorySelect.value);
  noteInput.value = "";
  noteInput.focus();
});

noteInput.addEventListener("input", function () {
  errorMessage.textContent = "";
});

// ---------- Start ----------
render();
