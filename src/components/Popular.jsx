import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

const Card = styled.div`
  min-height: 25rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;

  img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 20%;
  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;

function Popular() {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const check = localStorage.getItem('popular');
      let jsonData = JSON.parse(check);
      if (!check) {
        // On le met dans lke check car meme si on met en dehors il va quand meme utiliser l'API
        const data = await fetch(
          `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=5&tags=vegetarian`
        );
        const json = await data.json();
        jsonData = json.recipes;
        // Dans le local storage on peut seulement sauvegarder des types string
        localStorage.setItem('popular', JSON.stringify(jsonData));
      }
      setPopular(jsonData);
    };
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);
  // Le ,[] permet de dire only render when mounted
  // Pensez a relancer l'application quand on cree pour la premiere fois un fetch

  return (
    <Wrapper>
      <h3>Popular Picks</h3>
      <Splide
        options={{
          perPage: 4,
          arrows: false,
          pagination: false,
          drag: 'free',
          gap: '5rem',
        }}
      >
        {popular.map((recipe, index) => {
          return (
            <SplideSlide key={index}>
              <Card>
                <p>{recipe.title}</p>
                <img src={recipe.image} alt={recipe.title} />
                <Gradient />
              </Card>
            </SplideSlide>
          );
        })}
      </Splide>
    </Wrapper>
  );
}

export default Popular;
