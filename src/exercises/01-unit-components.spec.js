import React from 'react';
import { Button } from '../components/Button/Button';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '../components/Input/Input';

// https://github.com/testing-library/jest-dom

describe('Button', () => {

    it('should render provided text', () => {
        // DEMO
        render(<Button>Testowy przycisk</Button>);

        const button = screen.getByRole('button');

        expect(button).toHaveTextContent('Testowy przycisk');
    });

    it('should allow to disable button', () => {
        // DEMO
        render(<Button disabled={true}>Testowy przycisk</Button>);

        const button = screen.getByText('Testowy przycisk');

        expect(button).toBeDisabled(); // expect(button).not.toBeDisabled();
    });

    it('should make a callback when button clicked', () => {
        // DEMO
        let onClick = jest.fn(); //zamockowana funkcja z jest :)
        render(<Button onClick={onClick}>Testowy przycisk</Button>); 

        userEvent.click(screen.getByText('Testowy przycisk'));

        expect(onClick).toHaveBeenCalled();
    });
});

describe('Input', () => {
    // TODO: Napisz testy komponentu Input

    // 1. Zweryfikuj że wprowadzona wartość jest wyświetlana
    // HINT: wartość podawana jest poprzez property "value"
    // HINT: możesz użyć metod screen.getByPlaceholderText(text) albo screen.getByRole() w celu odnalezienia inputu w drzewie dom
    // HINT: w razie potrzeby możesz użyć metody screen.debug() w celu wyświetlenia wyrenderowanego komponentu

    it('should display input value', () => {
        render(<Input value='Value' />);

        let input = screen.getByRole('textbox'); 
        //getByPLaceholderText('placeholderValue) || getByLabelText('nameOfLabel') || getByTestId() -> w komponencie umieszczamy data-testid

        //screen.debug();

        expect(input).toHaveDisplayValue('Value');
    });

    // 2. Zweryfikuj, że callback onChange zostanie odpalony gdy zmienimy tekst inputa
    // HINT: użyj metody z obiektu userEvent w celu zmiany tekstu
    // HINT: użyj zamockowanej metody w celu weryfikacji

    it('should make a callback when input changed', () => {
        // DEMO
        let onChange = jest.fn(); //zamockowana funkcja z jest :)
        render(<Input onChange={onChange} />);

        let input = screen.getByRole('textbox');

        userEvent.type(input, 'nowy tekst');

        expect(onChange).toHaveBeenCalledWith('nowy tekst');
    });
});
