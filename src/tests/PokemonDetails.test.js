import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testando o componente <PokemonDetails.js />', () => {
  test('Teste se as informações detalhadas do Pokémon selecionado ta na tela', () => {
    renderWithRouter(<App />);
    const moreDetailsPoke = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsPoke);

    expect(moreDetailsPoke).not.toBeInTheDocument();

    const pokeDetailsHeading = screen.getByRole('heading', { name: /pikachu details/i });
    expect(pokeDetailsHeading).toBeInTheDocument();

    const detailsSummary = screen.getByRole('heading', { name: /summary/i });
    expect(detailsSummary).toBeInTheDocument();

    const pokeDetails = screen.getByText(/this intelligent pokémon roasts hard berries/i);
    expect(pokeDetails).toBeInTheDocument();
  });

  test('Teste se existe uma seção com os mapas contendo as localizações', () => {
    renderWithRouter(<App />);
    console.log(renderWithRouter());
    const moreDetailsPoke = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsPoke);

    const gameLocationsPoke = screen.getByRole('heading',
      { name: /game locations of pikachu/i, level: 2 });
    expect(gameLocationsPoke).toBeInTheDocument();
  });
});
