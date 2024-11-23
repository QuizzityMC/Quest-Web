import { useState, useEffect } from 'react';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase-config';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function Feed({ user }) {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate().toLocaleString()
      }));
      setPosts(postsData);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPost.trim() === '') return;

    try {
      await addDoc(collection(db, 'posts'), {
        content: newPost,
        author: user.displayName || user.email,
        authorId: user.uid,
        createdAt: serverTimestamp(),
      });
      setNewPost('');
    } catch (error) {
      console.error('Error adding post: ', error);
    }
  }

  return (
    <div className="container mx-auto mt-8 p-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Create a Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full"
              rows={3}
            />
            <Button type="submit">Post</Button>
          </form>
        </CardContent>
      </Card>
      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarFallback>{post.author[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <CardTitle>{post.author}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p>{post.content}</p>
              <p className="text-sm text-gray-500 mt-2">
                {post.createdAt}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
