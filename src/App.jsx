import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import NavBar from './Components/NavBar'
import NewNote from './Components/NewNote'
import Trash from './pages/Trash'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Archive from './pages/Archive'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'
import ProtectedRoute from './Components/ProtectedRoute'
import PublicRoute from './Components/PublicRoute'
import {
  getNotes,
  createNote,
  pinNote as apiPinNote,
  archiveNote as apiArchiveNote,
  trashNote as apiTrashNote,
  restoreNote as apiRestoreNote,
  deleteNote as apiDeleteNote,
} from './api/notesApi'

function App() {
  const [notes, setNotes] = useState([]);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  useEffect(() => {
    // Only fetch once there's a logged-in user — calling this while logged
    // out would just 401 (and the ProtectedRoute below keeps this page
    // unreachable anyway, but this also covers the moment right after
    // logging in).
    if (isAuthenticated) {
      loadNotes();
    } else {
      setNotes([]);
    }
  }, [isAuthenticated]);

  const loadNotes = async () => {
    try {
      const data = await getNotes();
      setNotes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('failed to load notes', error);
      setNotes([]);
    }
  };

  const [tagFilter, setTagFilter] = useState('')

  // Swap one note in local state for the fresh copy the backend just
  // returned, so the UI updates immediately without a full refetch.
  const replaceNote = (updated) => {
    setNotes((current) => current.map((note) => (note._id === updated._id ? updated : note)))
  }

  // Every action below now actually calls the backend (BE-Notes
  // PATCH /notes/:id/pin|archive|trash|restore, DELETE /notes/:id) instead
  // of only touching local React state, which never persisted.

  const addNote = async (noteData) => {
    const note = await createNote(noteData)
    setNotes((current) => [note, ...current])
    return note
  }

  const pinNote = async (id) => {
    const updated = await apiPinNote(id)
    replaceNote(updated)
  }

  const archiveNote = async (id) => {
    const updated = await apiArchiveNote(id)
    replaceNote(updated)
  }

  const trashNote = async (id) => {
    const updated = await apiTrashNote(id)
    replaceNote(updated)
  }

  const restoreNote = async (id) => {
    const updated = await apiRestoreNote(id)
    replaceNote(updated)
  }

  const deleteNote = async (id) => {
    await apiDeleteNote(id)
    setNotes((current) => current.filter((note) => note._id !== id))
  }

  return (
    <Routes>
      {/* Auth pages render standalone, without the notes NavBar chrome.
          PublicRoute bounces an already-logged-in user straight to "/". */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Route>

      {/* Everything below requires a logged-in user — ProtectedRoute
          redirects to /login otherwise. Each user's notes are already
          scoped server-side (BE-Notes getAllNotes filters by req.userId),
          so whatever loads here is only that user's own notes. */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<NavBar notes={notes} tagFilter={tagFilter} onTagFilterChange={setTagFilter} />}>
          <Route index element={<Home notes={notes} tagFilter={tagFilter} onTagFilterChange={setTagFilter} onPin={pinNote} onArchive={archiveNote} onTrash={trashNote} />} />
          <Route path="new" element={<NewNote onSave={addNote} />} />
          <Route path="archive" element={<Archive notes={notes} onRestore={restoreNote} onTrash={trashNote} />} />
          <Route path="trash" element={<Trash notes={notes} onRestore={restoreNote} onDelete={deleteNote} />} />
        </Route>
      </Route>
    </Routes>
    
  )
}

export default App
