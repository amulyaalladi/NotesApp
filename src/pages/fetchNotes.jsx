import useNotes from "../hooks/useNotes";

function fetchNotes() {

    const { notes, loading } = useNotes();

    if (loading)
        return <h2>Loading...</h2>;

    return (
        <>
            {notes.map(note => (
                <div key={note._id}>
                    <h3>{note.title}</h3>
                    <p>{note.description}</p>
                </div>
            ))}
        </>
    );
}

export default fetchNotes;