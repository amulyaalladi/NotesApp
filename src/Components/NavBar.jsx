import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/authSlice'
import { logoutUser } from '../services/authServices'


const NavBar = ({ notes = [], tagFilter = '' }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)

  const handleLogout = async () => {
    try {
      await logoutUser()
    } catch (error) {
      // Even if the backend call fails (e.g. token already expired),
      // still clear the local session below so the user isn't stuck.
      console.error('logout request failed', error)
    } finally {
      dispatch(logout())
      navigate('/login')
    }
  }

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

          <div className="flex items-center gap-3">
            {user?.name && (
              <span className="hidden text-sm text-slate-300 sm:inline">
                Hi, {user.name}
              </span>
            )}
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-semibold text-slate-100 transition hover:bg-slate-800"
            >
              Logout
            </button>
          </div>
        </div>
        </div>
        <Outlet />
      </header>

      
    </>
  )
}

export default NavBar
