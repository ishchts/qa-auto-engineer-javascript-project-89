import { render, screen } from '@testing-library/react';
import { expect, test, beforeEach, vi, describe } from 'vitest';
import App from '../src/App';
import userEvent from '@testing-library/user-event';

const mockScrollIntoView = vi.fn();

beforeEach(() => {
    window.HTMLElement.prototype.scrollIntoView = mockScrollIntoView;
});

const runApp = () => {
    const user = userEvent.setup();
    render(<App />);

    return { user };
}

describe('Widget App', () => {
    test('Opens chat widget when "Открыть Чат" is clicked', async () => {
        const { user } = runApp();

        const button = screen.getByText('Открыть Чат');
        await user.click(button);

        const dialog = await screen.findByRole('dialog');
        const closeButton = screen.getByLabelText('Close');
        const startDialogButton = screen.getByText('Начать разговор');
        const dialogTitle = 'Виртуальный помощник';

        expect(dialog).toHaveTextContent(dialogTitle);
        expect(startDialogButton).toBeInTheDocument();
        expect(closeButton).toBeInTheDocument();

        await user.click(closeButton);
        expect(dialog).not.toBeInTheDocument();
    });

    test('career change scenario', async () => {
        const { user } = runApp();

        const button = screen.getByText('Открыть Чат');
        await user.click(button);

        const startDialogButton = await screen.findByText('Начать разговор');
        await user.click(startDialogButton);

        const switchButton = await screen.findByText('Сменить профессию или трудоустроиться');
        await user.click(switchButton);

        const detailsButton = await screen.findByText('Расскажи подробнее');
        await user.click(detailsButton);

        const subscribeButton = await screen.findByText('Останусь здесь, запишусь на курс');
        expect(subscribeButton).toBeInTheDocument();
        const startButton = await screen.findByText('Вернуться в начало');

        await user.click(startButton);

        const tryButton = await screen.findByText('Попробовать себя в IT');
        const advancedButton = await screen.findByText('Я разработчик, хочу углубить свои знания');

        expect(switchButton).toBeInTheDocument();
        expect(tryButton).toBeInTheDocument();
        expect(advancedButton).toBeInTheDocument();


        await user.click(switchButton);
        const otherTryButton = await screen.findByText('А есть что-нибудь попроще');
        await user.click(otherTryButton);
    });

    test('Try your hand at IT', async () => {
        const { user } = runApp();

        const button = screen.getByText('Открыть Чат');
        await user.click(button);

        const startDialogButton = await screen.findByText('Начать разговор');
        await user.click(startDialogButton);
        const tryButton = await screen.findByText('Попробовать себя в IT');
        await user.click(tryButton);

        await screen.findByText('Интересно');
        await screen.findByText('А что по поводу смены профессии?');
        await screen.findByText('Вернуться назад');
    });
});
