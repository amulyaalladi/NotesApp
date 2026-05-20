import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewNote = ({ onSave }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')
  const navigate = useNavigate()

  const handleSave = () => {
    const trimmedTitle = title.trim()
    if (!trimmedTitle) return

    const note = {
      id: Date.now(),
      title: trimmedTitle,
      content: content.trim(),
      tags: tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      createdAt: new Date().toISOString(),
    }

    onSave?.(note)
    navigate('/')
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
          value={content}
          onChange={(event) => setContent(event.target.value)}
          className="mb-4 h-32 w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 focus:ring-2 focus:ring-indigo-200"
          placeholder="Write your note here..."
        ></textarea>

        <label className="mb-1 block text-sm font-medium text-slate-200">Tags:</label>
        <input
          value={tags}
          onChange={(event) => setTags(event.target.value)}
          className="mb-4 w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 focus:ring-2 focus:ring-indigo-200"
          placeholder="Give your note a Tag..."
        />

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={handleSave}
            className="rounded-md bg-indigo-500 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-400"
            type="button"
          >
            Save
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