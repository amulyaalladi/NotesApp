import React, { useMemo } from 'react'
import { Link, Outlet } from 'react-router-dom'


const NavBar = ({ notes = [], tagFilter = '' }) => {
  
  return (
    <>
      <header className="sticky top-0 z-20 w-full bg-slate-950/95 border-b border-slate-800/70 backdrop-blur-xl shadow-lg">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
     

        
          

        
        <div className="flex items-center gap-3">
          <Link to="/" className="rounded-2xl bg-slate-900 px-4 py-2 text-lg font-semibold tracking-tight text-white shadow-sm shadow-slate-900/50">
            Home
          </Link>
          <nav className="hidden items-center gap-2 text-sm text-slate-300 sm:flex">
            <Link to="/archive" className="rounded-full px-3 py-2 transition hover:bg-blue-700 hover:text-white hover:font-semibold">Archived</Link>
            <Link to="/trash" className="rounded-full px-3 py-2 transition hover:bg-blue-700 hover:text-white hover:font-semibold">Trash</Link>
          </nav>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            to="/new"
            className="inline-flex items-center justify-center rounded-full bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-300"
          >
            Add Note
            
          </Link>
         
         
        </div>
        </div>
        <Outlet />
      </header>

      
    </>
  )
}

export default NavBar