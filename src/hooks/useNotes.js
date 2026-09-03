import { useEffect, useState } from "react";
import noteService from "../services/noteServices";

const useNotes = () => {

    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchNotes = async () => {

        setLoading(true);

        try {
            const res = await noteService.getNotes();
            setNotes(res.data);
        } catch (err) {
            console.log(err);
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    return {
        notes,
        setNotes,
        loading,
        fetchNotes
    };
};

export default {
        notes,
        setNotes,
        loading,
        fetchNotes
    };
