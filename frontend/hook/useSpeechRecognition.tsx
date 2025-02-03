import { useEffect, useRef, useState } from "react";

declare const webkitSpeechRecognition: any;

const useSpeechRecognition = () => {
    const [text, setText] = useState("");
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        if ("webkitSpeechRecognition" in window) {
            recognitionRef.current = new webkitSpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.lang = "en-US";

            recognitionRef.current.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                setText(transcript);
                recognitionRef.current.stop();
                setIsListening(false);
            };

            recognitionRef.current.onerror = (event: any) => {
                console.error("Speech recognition error:", event.error);
                setIsListening(false);
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };
        }
    }, []);

    const startListening = () => {
        setText("");
        setIsListening(true);
        recognitionRef.current?.start();
    };

    const stopListening = () => {
        setIsListening(false);
        recognitionRef.current?.stop();
    };

    return {
        text,
        isListening,
        startListening,
        stopListening,
        hasRecognitionSupport: !!recognitionRef.current,
    };
};

export default useSpeechRecognition;
