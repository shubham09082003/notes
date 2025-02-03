import axios from "axios";
import { useEffect, useState } from "react";

import useSpeechRecognition  from "../../hook/useSpeechRecognition";

export default function MainArea() {
    const [description, setDescription] = useState("")
    const [image, setImage] = useState<string | null>(null)
    const [title, setTitle] = useState("");
    const { text, isListening, startListening, stopListening } = useSpeechRecognition();

    useEffect(() => {
        if (text) {
            setDescription((prev) => prev + text);
        }
    }, [text]);

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setDescription(e.target.value)
    }
  
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setImage(reader.result as string)
        }
        reader.readAsDataURL(file)
      }
    }

    const handleSave = async () => {
        try {
    
            const response = await axios.post("http://localhost:3000/notes/", {title, description, image},
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `${localStorage.getItem("token")}`
                    }
                }
            )
            if (response.status !== 200) {
                throw new Error("Failed to save notes")
            }else{
                alert("Notes saved successfully!");
                setDescription("")
                setImage(null);
                setTitle("");
            }
        } catch (error) {
          console.error("Error saving notes:", error)
          alert("Failed to save notes. Please try again.")
        }
    
      }



    return (
        <div className="max-w-2xl mx-auto mt-10 ">
        <div>
            <input type="text" placeholder=" Title" className="w-full mb-4 h-12 border border-gray-300 rounded-md p-2" onChange={(e) => setTitle(e.target.value)} />
        </div>

            <textarea
            value={description}
            onChange={handleTextChange}
            placeholder="Enter your notes here..."
            rows={10}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md resize-y"

        />
        <div className="flex justify-between mb-4">
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="image-upload" />
            <label
            htmlFor="image-upload"
            className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 transition duration-300"
            >
            Upload Image
            </label>
            <div className="flex gap-2">
            <button 
            onClick={isListening ? stopListening : startListening}  
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300">
                {isListening ? "Stop" : "Record"}
            </button>


            <button
            onClick={handleSave}
            
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
            >
            Save Notes
            </button>
            </div>
        </div>

        {image && (
            <div className="mt-4">
            <img src={image || "/placeholder.svg"} alt="Uploaded" className="max-w-full max-h-96 rounded-md" />
            </div>
        )}
        </div>
    )
};
