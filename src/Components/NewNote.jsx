import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Must match BE-Notes/models/note.js's `tag` enum exactly — the backend
// rejects any other value.
const TAG_OPTIONS = ['work', 'personal', 'study', 'important', 'todo', 'ideas', 'others']

const NewNote = ({ onSave }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tag, setTag] = useState(TAG_OPTIONS[0])
  const [saving, setSaving] = useState(false)
  const navigate = useNavigate()

  const handleSave = async () => {
    const trimmedTitle = title.trim()
    if (!trimmedTitle) return

    setSaving(true)
    try {
      // Field names here (title/description/tag) match BE-Notes' Note
      // model directly — the backend assigns the real _id and createdAt.
      await onSave?.({
        title: trimmedTitle,
        description: description.trim(),
        tag,
      })
      navigate('/')
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to save note'
      toast.error(message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-lg bg-slate-900/60 p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold text-white">Create a New Note</h2>

        <label className="mb-1 block text-sm font-medium text-slate-200">Title:</label>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="mb-4 w-full rounded-md border border-white-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 focus:ring-2 focus:ring-indigo-200"
          type="text"
          placeholder="Enter a Title..."
        />

        <label className="mb-1 block text-sm font-medium text-slate-200">Content:</label>
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="mb-4 h-32 w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 focus:ring-2 focus:ring-indigo-200"
          placeholder="Write your note here..."
        ></textarea>

        <label className="mb-1 block text-sm font-medium text-slate-200">Tag:</label>
        <select
          value={tag}
          onChange={(event) => setTag(event.target.value)}
          className="mb-4 w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 focus:ring-2 focus:ring-indigo-200"
        >
          {TAG_OPTIONS.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-md bg-indigo-500 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
            type="button"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
          <button
            onClick={() => navigate('/')}
            className="rounded-md border border-slate-700 bg-transparent px-4 py-2 text-sm text-slate-200 hover:bg-slate-800"
            type="button"
          >
            Cancel
          </button>
        </div>
      </div>
    </section>
  )
}

export default NewNote;
