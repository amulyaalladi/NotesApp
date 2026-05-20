import React from 'react'

function NoteCard({ note, onPin, onArchive, onTrash, onRestore, onDelete,pinned }) {
  return (
    <article className="rounded-xl border border-white-800 bg-slate-950 p-4 shadow-sm shadow-slate-900">
      <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            {note.pinned && (
              <span className="rounded-full bg-white-300 px-2 py-1 font-semibold text-slate-950">
                Pinned
              </span>
            )}
            {note.archived && (
              <span className="rounded-full bg-white-300 px-2 py-1 font-semibold text-slate-950">
                Archived
              </span>
            )}
            {note.trashed && (
              <span className="rounded-full bg-rose-500 px-2 py-1 text-[11px] font-semibold uppercase text-white">
                

                Trash
              </span>
            )}
          </div>
          <div className="text-sm text-slate-400">{new Date(note.createdAt).toLocaleDateString()}</div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {onPin && !note.archived && !note.trashed && (
            <button
              type="button"
              onClick={() => onPin(note.id)}
              className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-semibold text-slate-100 transition hover:bg-slate-800"
            >
              {note.pinned ? 'Unpin' : 'Pin'}
            </button>
          )}
          {onArchive && !note.archived && !note.trashed && (
            <button
              type="button"
              onClick={() => onArchive(note.id)}
              className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-semibold text-slate-100 transition hover:bg-slate-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
</svg>

              
            </button>
          )}
          {onTrash && !note.trashed && (
            <button
              type="button"
              onClick={() => onTrash(note.id)}
              className="inline-flex h-8 items-center justify-center rounded-full border border-rose-500 bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-200 transition hover:bg-rose-500/20"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9L14.4 18.999a2.25 2.25 0 01-2.244 2.077H9.26A2.25 2.25 0 017.016 18.999L6.67 9m8.53-3.21a1.125 1.125 0 011.022.166M9.26 5.79a48.108 48.108 0 013.478-.397m7.5 0V4.874c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0C11.31 2.71 10.4 3.695 10.4 4.874v.916m7.5 0H3.75"
                />
              </svg>
            </button>
          )}
          {onRestore && (note.archived || note.trashed) && (
            <button
              type="button"
              onClick={() => onRestore(note.id)}
              className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-semibold text-slate-100 transition hover:bg-slate-800">
              Restore
            </button>
          )}
          {onDelete && note.trashed && (
            <button
              type="button"
              onClick={() => onDelete(note.id)}
              className="rounded-full border border-rose-500 bg-rose-500 px-3 py-1 text-xs font-semibold text-white transition hover:bg-rose-400"
            >
              Delete
            </button>
          )}
        </div>
      </div>
      <h3 className="mb-2 text-lg font-semibold text-white">{note.title}</h3>
      <p className="text-sm leading-6 text-slate-300">{note.content || 'No details yet.'}</p>
      <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-400">
        {note.tags.length > 0 ? note.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-slate-800 px-2 py-1">{tag}</span>
        )) : <span>No tags</span>}
      </div>
    </article>
  )
}

export default NoteCard