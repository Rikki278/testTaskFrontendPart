import React, { useEffect } from 'react'; // Import React and useEffect hook
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch and useSelector hooks from react-redux
import { getPosts } from "../../store/noteSlice"; // Import async thunk action from noteSlice
import NoteCard from "./noteCard/noteCard"; // Import NoteCard component
import styles from './note.module.scss'; // Import styles for the component
import NotificationWindow from "../notificationWindow/notificationWindow"; // Import NotificationWindow component

function Note() {
    const dispatch = useDispatch(); // Get the dispatch function from Redux
    const notes = useSelector(state => state.notes.notes); // Select notes from Redux state
    const postStatus = useSelector(state => state.notes.status); // Select status from Redux state
    const error = useSelector(state => state.notes.error); // Select error from Redux state

    // Fetch posts when postStatus is 'idle'
    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(getPosts());
        }
    }, [dispatch, postStatus]); // Dependency array ensures useEffect runs only when postStatus changes

    return (
        <main>
            <div id={'allPosts'} className={styles.wrapper}>
                {postStatus === 'loading' && <NotificationWindow typeOfWindow={'loading'}/>}
                {error && <NotificationWindow typeOfWindow={'errorGetNotes'}/>}
                {postStatus === 'failed' && <NotificationWindow typeOfWindow={'errorGetNotes'}/>}
                {notes.length < 1 && <NotificationWindow typeOfWindow={'noNotes'}/>}
                {postStatus === 'succeeded' && (
                    // Render NoteCard components for each note
                    notes.map(el => (
                        <NoteCard key={el.id} noteDate={el.noteDate} id={el.id} noteTitle={el.noteTitle}
                                  noteContent={el.noteContent}/>
                    ))
                )}
            </div>
        </main>
    );
}

export default Note; // Export the Note component
