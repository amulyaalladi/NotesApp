import React from 'react'
import { useMemo } from 'react'
import NoteCard from './NoteCard'
function Archive({ notes, onRestore, onTrash }) {
  const archivedNotes = useMemo(() => notes.filter((note) => note.archived && !note.trashed), [notes])

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
      <div className="rounded-lg bg-slate-900/80 p-4 shadow-lg">
        <h4 className="mb-4 text-lg font-bold tracking-tight text-white sm:text-xl">Archived Notes</h4>
        <div className="grid gap-4 md:grid-cols-2">
          {archivedNotes.length > 0 ? (
            archivedNotes.map((note) => (
              <NoteCard key={note.id} note={note} onRestore={onRestore} onTrash={onTrash} />
            ))
          ) : (
            <div className="text-center text-slate-200">
              No archived notes yet.
            </div>
          )}
        </div>
      </div>
    </main>
  )
}


export default Archive