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
    const { container } = renderWithRouter(<App />);
    const moreDetailsPoke = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsPoke);

    const gameLocationsPoke = screen.getByRole('heading',
      { name: /game locations of pikachu/i, level: 2 });
    expect(gameLocationsPoke).toBeInTheDocument();

    const locationsPokes = container.querySelector('.pokemon-habitat');
    expect(locationsPokes).toBeInTheDocument();

    const imgLocation1 = screen.getAllByAltText('Pikachu location')[0];
    expect(imgLocation1).toBeInTheDocument();
    expect(imgLocation1).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');

    const nameMap01 = screen.getByText(/kanto viridian forest/i);
    expect(nameMap01).toBeInTheDocument();

    const imgLocation2 = screen.getAllByAltText('Pikachu location')[1];
    expect(imgLocation2).toBeInTheDocument();
    expect(imgLocation2).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');

    const nameMapa02 = screen.getByText(/kanto power plant/i);
    expect(nameMapa02).toBeInTheDocument();
  });

  test('Test se o usuário pode favoritar o pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);
    const moreDetailsPoke = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsPoke);

    const checkboxFavPoke = screen.getByRole('checkbox',
      { name: /pokémon favoritado\?/i });
    expect(checkboxFavPoke).toBeInTheDocument();
    userEvent.click(checkboxFavPoke);

    expect(checkboxFavPoke).toBeChecked();
    const favStar = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(favStar).toBeInTheDocument();
    userEvent.click(checkboxFavPoke);

    expect(checkboxFavPoke).not.toBeChecked();
    (expect(favStar)).not.toBeInTheDocument();
  });
});
