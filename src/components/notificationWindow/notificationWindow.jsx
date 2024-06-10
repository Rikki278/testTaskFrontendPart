import React from 'react';
import styles from './notificationWindow.module.scss';
import { useTranslation } from "react-i18next";

function NotificationWindow({typeOfWindow}) {
    const [t, i18n] = useTranslation("translation"); // Use translation hook to get translation function and i18n instance
    return (
        <div className={typeOfWindow === 'loading' ? styles.loadingWindow : styles.errorWindow}>
            <h2>{t(`notificationWindow.${typeOfWindow}`)}</h2> {/* Display translated content based on typeOfWindow */}
        </div>
    );
}

export default NotificationWindow;