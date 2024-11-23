import { useState } from 'react'
import { updateProfile } from 'firebase/auth'
import { auth } from '../firebase-config'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function Profile({ user }) {
  const [displayName, setDisplayName] = useState(user.displayName || '')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await updateProfile(auth.currentUser, {
        displayName: displayName,
      })

      alert('Profile updated successfully!')
    } catch (error) {
      console.error('Error updating profile: ', error)
    }
  }

  return (
    <div className="container mx-auto mt-8 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarFallback>{user.displayName ? user.displayName[0].toUpperCase() : user.email[0].toUpperCase()}</AvatarFallback>
              </Avatar>
            </div>
            <Input
              type="text"
              placeholder="Display Name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
            <Button type="submit">Update Profile</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

