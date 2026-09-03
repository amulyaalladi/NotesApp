import api from "./axios";

// Uses the shared axios instance (src/api/axios.js), which already has the
// correct baseURL (.../api), sends the auth cookie, and attaches the Bearer
// token — the old version here used a bare `fetch(BASE_URL)` with none of that,
// hit the wrong path (missing "/notes"), and returned the raw
// { message, notes } wrapper instead of the notes array.

export const getNotes = async () => {
  const { data } = await api.get("/notes");
  return data.notes; // backend responds { message, notes: [...] }
};

export const getNoteById = async (id) => {
  const { data } = await api.get(`/notes/${id}`);
  return data.note;
};

export const createNote = async (noteData) => {
  const { data } = await api.post("/notes", noteData);
  return data.note;
};

// NOTE: BE-Notes currently restricts PUT/DELETE /notes/:id to admin-role
// users only (see notesRouter.js) — calling these as a normal "user" will
// get a 403 until that's changed on the backend.
export const updateNote = async (id, noteData) => {
  const { data } = await api.put(`/notes/${id}`, noteData);
  return data.note;
};

export const deleteNote = async (id) => {
  const { data } = await api.delete(`/notes/${id}`);
  return data;
};

// New backend endpoints (PATCH /notes/:id/...) that actually persist
// pin/archive/trash/restore instead of the frontend faking them with
// local-only state.
export const pinNote = async (id) => {
  const { data } = await api.patch(`/notes/${id}/pin`);
  return data.note;
};

export const archiveNote = async (id) => {
  const { data } = await api.patch(`/notes/${id}/archive`);
  return data.note;
};

export const trashNote = async (id) => {
  const { data } = await api.patch(`/notes/${id}/trash`);
  return data.note;
};

export const restoreNote = async (id) => {
  const { data } = await api.patch(`/notes/${id}/restore`);
  return data.note;
};

// Kept for backward compatibility with any code still importing this name.
export const fetchNotes = getNotes;
