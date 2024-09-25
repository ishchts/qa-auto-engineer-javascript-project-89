import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import App from '../src/App';

test('app', () => {
    render(<App />);
    expect(screen.getByText('Lorem, ipsum.')).toBeTruthy();
})