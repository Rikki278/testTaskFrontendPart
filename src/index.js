import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { I18nextProvider } from "react-i18next";
import trasnlation_en from "./translation/en/translation.json"
import trasnlation_ua from "./translation/ua/translation.json"
import store from "./store";
import i18next from "i18next";
import { Provider } from "react-redux";

i18next.init({
    interpolation: {escapeValue: false},
    lng: "en",
    resources: {
        en: {
            translation: trasnlation_en
        },
        ua: {
            translation: trasnlation_ua
        },
    }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <I18nextProvider i18n={i18next}>
            <App/>
        </I18nextProvider>
    </Provider>

);

