import React, { useEffect, useState} from 'react'

import NavBar from './Components/NavBar'
import NewNote from './Components/NewNote'
import Trash from './pages/Trash'
import FilterTag from './Components/FilterTag'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Archive from './pages/Archive'






function App() {
  const [notes, setNotes] = useState(() => {
    const raw = localStorage.getItem('notes')
    if (!raw) return []

    try {
      return JSON.parse(raw)
    } catch {
      return []
    }
  })

  const [tagFilter, setTagFilter] = useState('')

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  const updateNote = (id, changes) => {
    setNotes((current) =>
      current.map((note) => {
        if (note.id !== id) return note
        const payload = typeof changes === 'function' ? changes(note) : changes
        return { ...note, ...payload }
      })
    )
  }

  const addNote = (note) => {
    setNotes((current) => [...current, { ...note, pinned: false, archived: false, trashed: false }])
  }

  const pinNote = (id) => {
    updateNote(id, (note) => ({ pinned: !note.pinned }))
  }

  const archiveNote = (id) => {
    updateNote(id, { archived: true, trashed: false, pinned: false })
  }

  const trashNote = (id) => {
    updateNote(id, { trashed: true, archived: false, pinned: false })
  }

  const restoreNote = (id) => {
    updateNote(id, { trashed: false, archived: false })
  }

  const deleteNote = (id) => {
    setNotes((current) => current.filter((note) => note.id !== id))
  }

  return (
    <Routes>
      <Route path="/" element={<NavBar notes={notes} tagFilter={tagFilter} onTagFilterChange={setTagFilter} />}>
        <Route index element={<Home notes={notes} tagFilter={tagFilter} onTagFilterChange={setTagFilter} onPin={pinNote} onArchive={archiveNote} onTrash={trashNote} />} />
        <Route path="new" element={<NewNote onSave={addNote} />} />
        <Route path="archive" element={<Archive notes={notes} onRestore={restoreNote} onTrash={trashNote} />} />
        <Route path="trash" element={<Trash notes={notes} onRestore={restoreNote} onDelete={deleteNote} />} />
       
      </Route>
    </Routes>
    
  )
}

export default App
