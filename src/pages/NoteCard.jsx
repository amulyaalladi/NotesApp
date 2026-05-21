import React from 'react'

function NoteCard({ note, onPin, onArchive, onTrash, onRestore, onDelete,pinned }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-300">
      <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            {note.pinned && (
              <span className="rounded-full bg-slate-100 px-2 py-1 font-semibold text-slate-950">
                Pinned
              </span>
            )}
            {note.archived && (
              <span className="rounded-full bg-slate-100 px-2 py-1 font-semibold text-slate-950">
                Archived
              </span>
            )}
            {note.trashed && (
              <span className="rounded-full bg-rose-500 px-2 py-1 text-[11px] font-semibold uppercase text-white">
                Trash
              </span>
            )}
          </div>
          <div className="text-sm text-slate-500">{new Date(note.createdAt).toLocaleDateString()}</div>
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
             Archive
            </button>
          )}
          {onTrash && !note.trashed && (
            <button
              type="button"
              onClick={() => onTrash(note.id)}
              className="inline-flex h-8 items-center justify-center rounded-full border border-rose-500 bg-black-900/10 px-3 py-1 text-xs font-semibold text-red-900 transition hover:bg-rose-500/20"
            >
             Delete
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
      <h3 className="mb-2 text-lg font-semibold text-slate-950">{note.title}</h3>
      <p className="text-sm leading-6 text-slate-700">{note.content || 'No details yet.'}</p>
      <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
        {note.tags.length > 0 ? note.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-slate-100 px-2 py-1 text-slate-700">{tag}</span>
        )) : <span className="text-slate-500">No tags</span>}
      </div>
    </article>
  )
}

export default NoteCard