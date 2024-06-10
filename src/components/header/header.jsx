import React, { useEffect, useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import style from "./header.module.scss";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../store/noteSlice";
import Modal from "../modal/modal";

function Header() {
    const [open, setOpen] = useState(false); // State to control modal visibility
    const dispatch = useDispatch(); // Get the dispatch function from Redux
    const language = useSelector(state => state.notes.language); // Get selected language from Redux

    const [t, i18n] = useTranslation("translation"); // Translation hook

    // Open/close modal
    const openCloseModal = () => {
        setOpen(prevState => !prevState);
    };

    // Modal component
    const modal =  open ? <Modal openModal={openCloseModal}/> : null;

    // Handle language change
    const handleChange = (event) => {
        dispatch(actions.changeLanguage(event.target.value)); // Dispatch action to change language
    };

    // Handle click on "Add Note" button
    const addNoteHandle = () => {
        openCloseModal(); // Open modal
    };

    // Change language when language state changes
    useEffect(() => {
        if (language === 10) {
            i18n.changeLanguage("en");
        } else {
            i18n.changeLanguage("ua");
        }
    }, [language]);

    return (
        <>
            <header>
                <div className={style.tittle}>
                    {t("header.title")} {/* Translate header title */}
                </div>
                {/* Add Note button */}
                <Button style={{backgroundColor: '#E1AFD1'}} id={'addButton'} onClick={addNoteHandle} variant="contained" className="addButton">
                    {t("header.addNote")} {/* Translate add note button text */}
                </Button>
                {/* Language selection */}
                <FormControl  sx={{m: 1, minWidth: 120}}>
                    <InputLabel id="demo-simple-select-label">{t("header.language")}</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={language}
                        label="Language"
                        onChange={handleChange}
                    >
                        <MenuItem value={10}>EN</MenuItem>
                        <MenuItem value={20}>UA</MenuItem>
                    </Select>
                </FormControl>
            </header>
            {modal} {/* Render modal component */}
        </>
    );
}

export default Header;
