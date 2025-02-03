import { useState, useEffect } from "react"
import axios from "axios"
import NoteDetail from "./NoteDestail"
import { motion, AnimatePresence } from "framer-motion"

interface Note {
  _id: string
  title: string
  description: string
  image: string
}


function NotesList() {
  const [notes, setNotes] = useState<Note[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)

  useEffect(() => {
    fetchNotes()
  }, [])

  const fetchNotes = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get("http://localhost:3000/notes/", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      if (response.status !== 200) {
        throw new Error("Failed to fetch notes")
      }
      console.log(response.data)
      const notesData = Array.isArray(response.data) ? response.data : [response.data]
      setNotes(notesData)
      console.log(notesData)
    } catch (err) {
      console.error("Error fetching notes:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note)
  }

  const handleCloseDetail = () => {
    setSelectedNote(null)
  }

  const handleUpdateNote = (updatedNote: Note) => {
    setNotes(notes.map((note) => (note._id === updatedNote._id ? updatedNote : note)))
    setSelectedNote(updatedNote)
  }

  const handleDeleteNote = (deletedNoteId: string) => {
    setNotes(notes.filter((note) => note._id !== deletedNoteId))
    setSelectedNote(null)
  }

  if (isLoading) {
    return <div className="mt-4 text-center">Loading notes...</div>
  }
  

  return (
    <div className="mt-10 relative">

      <h2 className="text-xl font-bold mb-4 text-center">Your Notes</h2>
      {notes.length === 0 ? (
        <p className="text-center text-gray-500">No notes found.</p>
      ) : (
        <div className="space-y-2 max-w-2xl mx-auto border-2 border-gray-300 rounded-md">
          {notes.filter((note) => note !== null).map((note) => (
            <motion.div
              key={note._id}
              className="bg-white p-3 rounded shadow italic cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => handleNoteClick(note)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Title: "{note.title}"
            </motion.div>
          ))}
        </div>
      )}
      <AnimatePresence>
        {selectedNote ? (
          <NoteDetail
            note={selectedNote}
            onClose={handleCloseDetail}
            onUpdate={handleUpdateNote}
            onDelete={handleDeleteNote}
            token={localStorage.getItem("token") || ""}

          />
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export default NotesList

