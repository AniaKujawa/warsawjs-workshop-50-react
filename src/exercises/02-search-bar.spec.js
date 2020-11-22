import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar } from '../products-list/SearchBar/SearchBar';
import React from 'react';

describe('SearchBar', () => {
    const getInput = function() {
        return screen.getByPlaceholderText('Szukaj produktu...');
    };
    const getClearButton = function() {
        return screen.queryByRole('button', { name: 'Wyczyść' }); // bo ma go nie byc, wiec nie mozna z get
    };
    const getSearchButton = function() {
        return screen.queryByRole('button', { name: 'Szukaj' });
    };

    const searchMock = jest.fn();

    //ale niefajnie gdy musimy przekazać parametrów
    beforeEach(( onSearch = searchMock ) => {
        render(<SearchBar onSearch={onSearch} />);
    });

    afterEach(() => {
        searchMock.mockClear();
        cleanup();
    });

    // beforeAll()

    // afterAll()

    it('should show typed text in input', () => {
        const input = screen.getByPlaceholderText('Szukaj produktu...');
        userEvent.type(input, 'apple');

        expect(input).toHaveDisplayValue('apple');
    });

    it('should not show clear button when no text typed', () => {
        const button =  getClearButton();

        expect(button).not.toBeInTheDocument();
    });

    it('should show clear button when some text typed', () => {
        const input = getInput();
        userEvent.type(input, 'apple');
        const button = getClearButton(); //mozna z get

        expect(button).toBeInTheDocument();
    });

    // TODO Zadania:
    // 1. Napisz test który sprawdzi, że po kliknięciu przycisku "Wyczyść" uprzednio wprowadzony tekst zostanie usunięty

    it('should clear input when Clear button clicked', () => {
        const input = getInput();
        userEvent.type(input, 'apple');

        const button = getClearButton();
        userEvent.click(button);

        expect(input).toHaveDisplayValue('');
    });

    // 2. Napisz test który sprawdzi, że przycisk "Szukaj" będzie miał status disabled gdy brak tekstu

    it('should have disabled "Search" button when no text', () => {
        const button = getSearchButton();

        expect(button).toBeDisabled();
    });

    // 3. Napisz test który sprawdzi, że funkcja onSearch zostanie odpalona z odpowiednim tekstem, gdy wpisano tekst i kliknięto przycisk
    // HINT: użyj asercji toHaveBeenCalledWith()

    it('should call onSearch when is text and clicked search', () => {
        const input = getInput();
        userEvent.type(input, 'apple');

        const button = getSearchButton();
        userEvent.click(button);

        expect(searchMock).toHaveBeenCalledWith('apple');
    });
});
