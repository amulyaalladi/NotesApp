import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import NoteCard from './NoteCard'

function Home({ notes, onPin, onArchive, onTrash, tagFilter = '' }) {

  const activeNotes = useMemo(() => notes.filter((note) => !note.archived && !note.trashed), [notes])

  const filteredNotes = useMemo(() => {
    if (!tagFilter) return activeNotes

    return activeNotes.filter((note) => {
      return note.tags.includes(tagFilter)
    })
  }, [activeNotes, tagFilter])

  const pinnedNotes = filteredNotes.filter((note) => note.pinned)
  const otherNotes = filteredNotes.filter((note) => !note.pinned)

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
      <div className="rounded-lg bg-gradient-to-br from-slate-900 to-slate-800 p-4 shadow-lg">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h4 className="mb-2 text-lg font-bold tracking-tight text-white sm:text-xl">Welcome!</h4>
            <Link
              to="/new"
              className="inline-flex items-center justify-center rounded-md bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-300"
            >
              Click here for new note
            </Link>
          </div>
        </div>
      </div>

      {pinnedNotes.length > 0 && (
        <section className="mt-6">
          <h5 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Pinned Notes</h5>
          <div className="grid gap-4 md:grid-cols-2">
            {pinnedNotes.map((note) => (
              <NoteCard key={note.id} note={note} onPin={onPin} onArchive={onArchive} onTrash={onTrash} />
            ))}
          </div>
        </section>
      )}

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        {otherNotes.length > 0 ? (
          otherNotes.map((note) => (
            <NoteCard key={note.id} note={note} onPin={onPin} onArchive={onArchive} onTrash={onTrash} />
          ))
        ) : (
          <div className="rounded-xl border border-dashed border-slate-700 bg-slate-950/80 p-6 text-slate-400">
            {activeNotes.length > 0 ? 'No notes match that filter.' : 'No notes saved yet. Add a note to get started.'}
          </div>
        )}
      </section>
    </main>
  )
}

export default Home