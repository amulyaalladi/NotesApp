import React from 'react'
import NoteCard from './NoteCard'

const Trash = ({ notes, onRestore, onDelete }) => {
  const trashedNotes = notes.filter((note) => note.trashed)

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
      <div className="rounded-lg bg-slate-900/80 p-4 shadow-lg">
        <h4 className="mb-4 text-lg font-bold tracking-tight text-white sm:text-xl">Trash</h4>
        <div className="grid gap-4 md:grid-cols-2">
          {trashedNotes.length > 0 ? (
            trashedNotes.map((note) => (
              <NoteCard key={note._id} note={note} onRestore={onRestore} onDelete={onDelete} />
            ))
          ) : (
            <div className="text-center text-slate-200 ">
              Trash is empty.
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default Trash
