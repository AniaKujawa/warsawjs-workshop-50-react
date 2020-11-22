import { cleanup, render, screen, waitFor, waitForElementToBeRemoved, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { ProductsList } from '../products-list/ProductsList';
import nock from 'nock';
import { MemoryRouter } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

describe('ProductsList', () => {
    it('should display available categories', async () => {
        // DEMO
    });

    it('should display products on a list', async () => {
        const products = [
            { id: 1, name: 'Apple' },
            { id: 2, name: 'Samsung' },
        ];

        nock('http://localhost')
            .get('/products')
            .reply(200, products);
        
        nock('http://localhost')
            .get('/categories')
            .reply(200, []);
        
        render(<BrowserRouter><ProductsList /></BrowserRouter>);

        // -> nie trzeba robić await
        // waitForElementToBeRemoved(() => {
        //     return screen.getByText('Wczytywanie...')
        // }); 

        await screen.findByTestId('products'); //find zamiast get i query dla Promise

        const displayedProducts = screen.getAllByTestId('product');
        //const displayedProducts = within(productList).getAllByRole('heading', { level: 4 });


        expect(displayedProducts.map(item => item.textContent)).toEqual(['Apple', 'Samsung']);
    });


    it('should filter list when searched for some text', async () => {
        // DEMO
    });

    // TODO: Napisz test weryfikujący, że po kliknięciu na kategorię przefiltrujemy listę produktów
    // HINT: zweryfikuj, że odpowiednie parametry zostały wysłane do API
    // HINT: poczekaj, aż produkty się przerenderują na stronie
    it('should filter list when selected some category', async () => {

    });
});
