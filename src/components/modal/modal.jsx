import React, { useState } from 'react'; // Import React and useState hook
import style from './modal.module.scss'; // Import styles for the component
import { Button } from "@mui/material"; // Import Button component from Material-UI
import { useDispatch } from "react-redux"; // Import useDispatch hook from react-redux
import { useTranslation } from "react-i18next"; // Import useTranslation hook for i18n
import { createPost, editPost } from "../../store/noteSlice"; // Import createPost and editPost actions from noteSlice

const Modal = ({openModal, id = null, noteContent = '', noteTitle = ''}) => {
    const [noteName, setNoteName] = useState(noteTitle); // State for note name
    const [noteContentDescription, setNoteContent] = useState(noteContent); // State for note content
    const dispatch = useDispatch(); // Get the dispatch function from Redux
    const [t, i18n] = useTranslation("translation"); // Use translation hook to get translation function and i18n instance
    const [errorValidation, setErrorValidation] = useState(false); // State for form validation error
    const errorLabel = errorValidation &&
        <label id={'errorLabel'} className={style.error}> {t("errorNote.errorNote")}</label>; // Display error label if validation fails

    // Validation function for form inputs
    const validation = () => {
        return noteName.trim().length > 0 && noteContentDescription.trim().length > 0;
    };

    // Handle save button click
    const handleSave = async () => {
        if (!validation()) {
            setErrorValidation(true); // Set error if validation fails
            return false;
        }
        setErrorValidation(false); // Clear error if validation passes

        let dataToSend = {
            noteContent: noteContentDescription,
            noteTitle: noteName
        };

        if (id) {
            dispatch(editPost({id, post: dataToSend})); // Dispatch editPost action if id exists
            setNoteName(''); // Clear note name input
            setNoteContent(''); // Clear note content textarea
            openModal(); // Close modal after action
        } else {
            dispatch(createPost(dataToSend)); // Dispatch createPost action if id doesn't exist (creating new note)
            setNoteName(''); // Clear note name input
            setNoteContent(''); // Clear note content textarea
            openModal(); // Close modal after action
        }
    };

    // Handle close button click
    const closeModal = () => {
        openModal(); // Close modal
    };

    return (
        <div id={'modalOverlay'} className={style.modalOverlay}>
            <div className={style.modal}>
                <h2>{id ? t("editModal.editNote") : t("addModal.addNote")}</h2>
                <label>
                    {t("addModal.noteName")}
                    <input
                        id={'noteNameInput'}
                        type="text"
                        value={noteName}
                        onChange={(e) => setNoteName(e.target.value)}
                    />
                </label>
                <label>
                    {t("addModal.noteContent")}
                    <textarea
                        id={'noteContentInput'}
                        maxLength="200"
                        style={{resize: 'none'}}
                        value={noteContentDescription}
                        onChange={(e) => setNoteContent(e.target.value)}
                    ></textarea>
                    {errorLabel}
                    <div className={style.wrapperForButtons}>
                        <Button
                            style={{backgroundColor: '#E1AFD1'}}
                            id={'saveButton'}
                            onClick={handleSave}
                            sx={{marginRight: 2}}
                            variant="contained"
                            className="addButton"
                        >
                            {t("addModal.noteSave")}
                        </Button>
                        <Button
                            style={{backgroundColor: '#E1AFD1'}}
                            id={'closeButton'}
                            onClick={closeModal}
                            variant="contained"
                            className="addButton"
                        >
                            {t("addModal.noteClose")}
                        </Button>
                    </div>
                </label>
            </div>
        </div>
    );
};

export default Modal; // Export the Modal component
