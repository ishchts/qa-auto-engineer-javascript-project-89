import { screen, cleanup } from '@testing-library/react';
import { expect, test, beforeEach, vi, describe, afterEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import { WidgetPage } from './pages/WidgetPage';
import { AppPage } from './pages/AppPage';

const mockScrollIntoView = vi.fn();

beforeEach(() => {
    window.HTMLElement.prototype.scrollIntoView = mockScrollIntoView;
    vi.clearAllMocks();
});

afterEach(() => {
    cleanup();
});

describe('Widget test', () => {
    test('Opens the dialog and verifies its content', async () => {
        WidgetPage.render();
        const user = userEvent.setup();
        const widget = new WidgetPage(screen, user);

        await widget.openDialog();
        await widget.verifyDialogIsOpen();
    });

    test('Closes the dialog after opening', async () => {
        WidgetPage.render();
        const user = userEvent.setup();
        const widget = new WidgetPage(screen, user);

        await widget.openDialog();
        await widget.closeDialog();

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    test('Opens the conversation and checks the contents of the first screen.', async () => {
        WidgetPage.render();
        const user = userEvent.setup();
        const widget = new WidgetPage(screen, user);

        await widget.openDialog();
        await widget.startDialog();
        await widget.verifyConversationStarted();
        await widget.changeProfessionOrGetAjob();
    });

    test('on new message scrollIntoView ', async () => {
        WidgetPage.render();
        const user = userEvent.setup();
        const widget = new WidgetPage(screen, user);
        await widget.openDialog();
        expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalledTimes(1);
        await widget.startDialog();
        expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalledTimes(2);
    });
});

describe('app test', () => {
    test('form is displayed and submit ', async () => {
        const user = userEvent.setup();
        AppPage.render();
        const app = new AppPage(screen, user);
        app.verifyFormFieldsDisplayed();
        await app.fillFormFiedl();
        await app.submitForm();
        app.expectedSubmitResult();
    });

    test('Widget does not affect the functionality of the application', async () => {
        const user = userEvent.setup();
        AppPage.render();
        const app = new AppPage(screen, user);
        const widget = new WidgetPage(screen, user);

        await widget.openDialog();
        await widget.verifyDialogIsOpen();
        app.verifyFormFieldsDisplayed();
      });
});
