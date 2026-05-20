import React from 'react'

const Trash = ({ notes, onRestore, onDelete }) => {
  const trashedNotes = notes.filter((note) => note.trashed)

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
      <div className="rounded-lg bg-slate-900/80 p-4 shadow-lg">
        <h4 className="mb-4 text-lg font-bold tracking-tight text-white sm:text-xl">Trash</h4>
        <div className="grid gap-4 md:grid-cols-2">
          {trashedNotes.length > 0 ? (
            trashedNotes.map((note) => (
              <article key={note.id} className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 shadow-sm shadow-slate-900/30">
                <div className="mb-3 flex items-center justify-between gap-3 text-sm text-slate-400">
                  <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                  <span>{note.tags.length > 0 ? note.tags.join(', ') : 'No tags'}</span>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">{note.title}</h3>
                <p className="text-sm leading-6 text-slate-300">{note.content || 'No details yet.'}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => onRestore(note.id)}
                    className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-semibold text-slate-100 transition hover:bg-slate-800"
                  >
                    Restore
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(note.id)}
                    className="rounded-full border border-rose-500 bg-rose-500 px-3 py-1 text-xs font-semibold text-white transition hover:bg-rose-400"
                  >
                    Delete permanently
                  </button>
                </div>
              </article>
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