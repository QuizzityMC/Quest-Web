import { auth } from '../firebase-config'
import { signOut } from 'firebase/auth'
import { Button } from "@/components/ui/button"

export default function Header({ user, setCurrentView }) {
  const handleLogout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Error signing out: ', error)
    }
  }

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Quest</h1>
        {user && (
          <nav>
            <Button variant="ghost" onClick={() => setCurrentView('feed')}>Feed</Button>
            <Button variant="ghost" onClick={() => setCurrentView('profile')}>Profile</Button>
            <Button variant="destructive" onClick={handleLogout}>Logout</Button>
          </nav>
        )}
      </div>
    </header>
  )
}

