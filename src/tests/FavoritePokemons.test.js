import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testando o componente <FavoritePokemons.js />', () => {
  test('Se exibido na tela "No Favorite pokemon found", qnd n houver pokeFav', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorites');
    const localStoIdFavPoke = localStorage.getItem('favoritePokemonIds');
    expect(localStoIdFavPoke).toEqual(null);
    const notFavPoke = screen.getByText(/no favorite pokemon found/i);
    expect(notFavPoke).toBeInTheDocument();
  });
  test('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    const fire = screen.getByRole('button', { name: /fire/i });
    userEvent.click(fire);
    const pokeName = screen.getByText(/charmander/i);
    expect(pokeName).toBeInTheDocument();
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/4');
    const checkboxFav = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(checkboxFav);
    const localStoIdFavPoke = localStorage.getItem('favoritePokemonIds');
    expect(localStoIdFavPoke).toEqual('[4]');
  });
});
