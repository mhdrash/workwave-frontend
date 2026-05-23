import { Link, useNavigate } from 'react-router'

function Navbar({ user, setUser }) {
  const navigate = useNavigate()
  const isEmployer = user?.is_employer
  const hasCompany = Boolean(user?.company?._id)


  function logOut() {
    localStorage.removeItem('token')
    setUser(null)
    navigate('/')
  }

  return (
    <div className="navbar-shell">
      {/* Routes seen by everyone */}
      <div className="navbar-start">
        <Link className='nav-brand' to='/'>WorkWave</Link>
      </div>

      <div className="navbar-end">
        <div className="navbar-links">
          <Link className='nav-item' to='/'>Job Bank</Link>

          {user ? (
            // Links for protected routes only for logged in users
            <>
              {!isEmployer && (
                <>
                  <Link className='nav-item' to='/my-applications'>My Applications</Link>
                  <Link className='nav-item' to='/profile'>Profile</Link>
                </>
              )}

              {isEmployer && (
                <>
                  <Link className='nav-item' to='/dashboard'>Dashboard</Link>
                  <Link className='nav-item' to='/job-card'>Job Card</Link>
                  {/* <Link className='nav-item' to='/job-list'>Job List</Link> */}
                  <Link className='nav-item' to='/company-form'>Company</Link>
                  {hasCompany && <Link className='nav-item' to='/job-form'>Job Form</Link>}
                </>
              )}

              {/* <Link className='nav-item' to='/job-details'>Job Details</Link> */}


              <span className='nav-user'>{user.cpr || user.username}</span>

              <button className='btn btn-outline btn-sm' onClick={logOut}>Log Out</button>


            </>
          ) :
            (
              // links for not logged in users
              <>
                <Link className='nav-item' to='/sign-up'>Sign up</Link>
                <Link className='nav-item' to='/sign-in'>Sign in</Link>


              </>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar
