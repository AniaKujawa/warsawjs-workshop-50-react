import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Categories } from '../products-list/Categories/Categories';

describe('Categories', () => {
    it('should display provided categories', () => {
        const categories = [{ key: 'mobile', label: 'mobile' }, { key: 'smartwatch', label: 'smartwatch' }];

        render(<Categories categories={categories} />);
        const items = screen.getAllByRole('listitem');

        expect(items.map(item => item.textContent)).toEqual(['mobile', 'smartwatch']);
    });

    it('should allow to select provided category', () => {
        const categories = [{ key: 'mobile', label: 'mobile' }, { key: 'smartwatch', label: 'smartwatch' }];
        const onSelect = jest.fn();

        render(<Categories onSelect={onSelect} categories={categories} />);
        const category = screen.getByText('mobile');
        userEvent.click(category);

        expect(onSelect).toHaveBeenCalledWith('mobile');
        expect(screen.getByTestId('selected-category')).toEqual(category);
    });
});
