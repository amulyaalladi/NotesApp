import React, { useMemo, useState } from 'react'
import { Link,Outlet } from 'react-router-dom'
import NoteCard from './NoteCard'
import FilterTag from '../Components/FilterTag'


function Home({notes = [], onPin, onArchive, onTrash, tagFilter = '' ,onTagFilterChange = () => {}}) {

  // Notes now come from App.jsx (single source of truth, fetched via
  // getNotes() and kept in sync with the backend on every pin/archive/
  // trash/delete action). Home previously fetched its own separate copy
  // here, which meant the buttons on NoteCard updated App's state but
  // this component kept rendering its own stale local copy.
  const [searchQuery, setSearchQuery] = useState('')

  const activeNotes = useMemo(() => notes.filter((note) => !note.archived && !note.trashed), [notes])

  const filteredNotes = useMemo(() => {
    let result = activeNotes

    if (tagFilter) {
      // Backend's Note model has a single `tag` string, not a `tags` array
      result = result.filter((note) => note.tag === tagFilter)
    }

    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase()
      result = result.filter((note) => {
        const titleMatch = (note.title || '').toLowerCase().includes(query)
        // Backend field is `description`, not `content`
        const contentMatch = (note.description || '').toLowerCase().includes(query)
        return titleMatch || contentMatch
      })
    }

    return result
  }, [activeNotes, tagFilter, searchQuery])
  const availableTags = useMemo(() => {
    const activeNotes = notes.filter((note) => !note.archived && !note.trashed)
    const tags = new Set()
    activeNotes.forEach((note) => {
      if (note.tag) tags.add(note.tag)
    })
    return Array.from(tags).sort()
  }, [notes])


  const pinnedNotes = filteredNotes.filter((note) => note.pinned)
  const otherNotes = filteredNotes.filter((note) => !note.pinned)

  return (
    <main className="min-h-screen bg-slate-100 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-white p-6 shadow-[0_20px_80px_-30px_rgba(15,23,42,0.35)]">
          <div className="flex flex-col gap-6 rounded-[1.75rem] bg-slate-950 p-6 text-white shadow-lg sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Notes dashboard</p>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Keep your ideas easy to find</h1>
              <p className="text-sm text-slate-300">Create, organize, and manage your notes all in one place.</p>
            </div>
           
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
              <input
                type="text"
                placeholder="Search title or content"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 sm:w-80"
              />
              
            </div>
            <FilterTag
                          options={availableTags}
                          selectedTag={tagFilter}
                          onFilterChange={onTagFilterChange}
                        />
          </div>

          <div className="mt-8 grid gap-6">
            {pinnedNotes.length > 0 && (
              <section className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Pinned Notes</p>
                    <p className="text-sm text-slate-600">Quick access to your most important notes.</p>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                    {pinnedNotes.length} pinned
                  </span>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {pinnedNotes.map((note) => (
                    <NoteCard key={note._id} note={note} onPin={onPin} onArchive={onArchive} onTrash={onTrash} />
                  ))}
                </div>
              </section>
            )}

            <section className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">All Notes</p>
                  
                </div>
               
              </div>

              {otherNotes.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {otherNotes.map((note) => (
                    <NoteCard key={note._id} note={note} onPin={onPin} onArchive={onArchive} onTrash={onTrash} />
                  ))}
                </div>
              ) : (
                <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
                  {activeNotes.length > 0 ? 'No notes match that filter.' : 'No notes saved yet. Add a note to get started.'}
                </div>
              )}
             
              
            </section>
          </div>
        </div>
        <Outlet />
      </div>
    </main>
  )
}

export default Home