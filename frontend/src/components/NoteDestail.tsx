import { useState } from "react"
import { motion } from "framer-motion"
import axios from "axios"

interface Note {
  _id: string
  title: string
  description: string
  image: string
}


interface NoteDetailProps {
  note: Note
  onClose: () => void
  onUpdate: (updatedNote: Note) => void
  onDelete: (deletedNoteId: string) => void
  token: string
}

function NoteDetail({ note, onClose, onUpdate, onDelete, token }: NoteDetailProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedNote, setEditedNote] = useState(note)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)


  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await axios.put(`http://localhost:3000/notes/${note._id}`, {
        title: editedNote.title,
        description: editedNote.description,
        image: editedNote.image || null,
      }, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      })

      if (response.status === 200) {
        onUpdate(response.data)
        setIsEditing(false)
      } else {
        throw new Error("Failed to update note")
      }
    } catch (err) {
      console.error("Error updating note:", err)
      setError("Failed to update note. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setEditedNote({ ...editedNote, image: reader.result as string})
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDelete = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await axios.delete(`http://localhost:3000/notes/${note._id}`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      if (response.status === 200) {
        onDelete(note._id)
      } else {
        throw new Error("Failed to delete note")
      }
    } catch (err) {
      console.error("Error deleting note:", err)
      setError("Failed to delete note. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <motion.div className="bg-white rounded-lg p-6 w-full max-w-2xl" layoutId={`note-${note._id}`}>
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold">
            {isEditing ? (
              <input
                type="text"
                value={editedNote.title}
                onChange={(e) => setEditedNote({ ...editedNote, title: e.target.value })}
                className="border rounded px-2 py-1"
              />
            ) : (
              note.title
            )}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            {isEditing ? (
              <textarea
                value={editedNote.description}
                onChange={(e) => setEditedNote({ ...editedNote, description: e.target.value })}
                className="w-full h-32 border rounded px-2 py-1"
              />
            ) : (
              <p>{note.description}</p>
            )}
          </div>
          <div className="w-full md:w-1/3">
            {isEditing ? (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full border rounded px-2 py-1"
                placeholder="Image URL"

              />
            ) : (
              <div></div>
            )}
          </div>
        </div>
        {error && <div className="mt-4 text-red-500">{error}</div>}
        <div className="mt-4 flex justify-end gap-2">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          ) : (
            <button
              onClick={handleEdit}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-green-300"
              disabled={isLoading}
            >
              Edit
            </button>
          )}
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:bg-red-300"
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default NoteDetail

