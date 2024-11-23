'use client'

import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase-config'
import Login from '../components/Login'
import Feed from '../components/Feed'
import Header from '../components/Header'
import Profile from '../components/Profile'

export default function Home() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentView, setCurrentView] = useState('feed')

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header user={user} setCurrentView={setCurrentView} />
      {user ? (
        currentView === 'feed' ? (
          <Feed user={user} />
        ) : (
          <Profile user={user} />
        )
      ) : (
        <div className="flex justify-center items-center h-[calc(100vh-64px)]">
          <Login />
        </div>
      )}
    </div>
  )
}
