import React, { useEffect, useState } from 'react'; // Import React, useEffect, and useState hooks
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material"; // Import components from Material-UI
import { useTranslation } from "react-i18next"; // Import useTranslation hook for i18n
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch and useSelector hooks from react-redux
import { removePost } from "../../../store/noteSlice"; // Import removePost action from noteSlice
import Modal from "../../modal/modal"; // Import Modal component

function NoteCard({noteTitle, noteContent, id, noteDate}) {
    const [t, i18n] = useTranslation("translation"); // Use translation hook to get translation function and i18n instance
    const language = useSelector(state => state.notes.language); // Select language from Redux state
    const dispatch = useDispatch(); // Get the dispatch function from Redux
    const [open, setOpen] = useState(false); // State for controlling modal open/close
    const openCloseModal = () => {
        setOpen(prevState => !prevState); // Function to toggle modal state
    };

    // Modal component
    const modal = open ? <Modal noteDate={noteDate} id={id} noteTitle={noteTitle} noteContent={noteContent}
                                openModal={openCloseModal}/> : null;

    // Determine time language based on selected language
    let timeLanguage = language === 10 ? "en-US" : "ua-UA";

    // Format date
    const formattedDate = formatDate(noteDate);

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        };
        return date.toLocaleDateString(timeLanguage, options);
    }

    // Handle delete note action
    const handleDelete = () => {
        dispatch(removePost(id));
    };

    // Open modal to edit data
    const openEditDataModel = () => {
        openCloseModal();
    };

    // Change language effect
    useEffect(() => {
        if (language === 10) {
            i18n.changeLanguage("en");
        } else {
            i18n.changeLanguage("ua");
        }
    }, [language]); // useEffect runs whenever language changes

    return (
        <>
            <Card className={'noteCard'} id={id} sx={{maxWidth: 345}}>
                <CardContent className={'cardContent'}>
                    <Typography gutterBottom variant="h5" component="div">
                        {noteTitle}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {noteContent}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {formattedDate}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button style={{color: '#E1AFD1'}} id={'editButton'} onClick={openEditDataModel}
                            size="small">{t("noteCard.editButton")}</Button>
                    <Button style={{color: '#E1AFD1'}} id={'deleteButton'} onClick={handleDelete}
                            size="small">{t("noteCard.deleteButton")}</Button>
                </CardActions>
            </Card>
            {modal}
        </>
    );
}

export default NoteCard; // Export the NoteCard component
