import React from 'react';
import { createRoot } from 'react-dom/client';
import RootRouter from './Route';
import { I18nextProvider } from 'react-i18next';
import i18n from './Locales/i18n';

const container = document.getElementById('root');
const root = createRoot(container ?? document.body);

root.render(
    <I18nextProvider i18n={i18n}>
        <RootRouter />
    </I18nextProvider>,
);
