import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Logo from '../../components/logo/logo';
import ReviewForm from '../../components/review-form/review-form';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import UserBlock from '../../components/user-block/user-block';

import { AppRoute } from '../../const';
import { Film } from '../../types/film';
import { useAppSelector } from '../../hooks';

function AddReviewScreen(): JSX.Element {
  const { films } = useAppSelector((state) => state);

  const params = useParams();
  const film = films.find((item: Film) => String(item.id) === params.id);

  if (film === undefined) {
    return <NotFoundScreen />;
  }

  return (
    <section className="film-card film-card--full" style={{ background: film.backgroundColor }}>
      <Helmet>
        <title>WTW. Review</title>
      </Helmet>
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film.backgroundImage} alt={film.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo />

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`/films/${film.id}`} className="breadcrumbs__link">{film.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link className="breadcrumbs__link" to={AppRoute.AddReview}>Add review</Link>
              </li>
            </ul>
          </nav>

          <UserBlock />
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={film?.posterImage} alt={film?.name} width="218" height="327"/>
        </div>
      </div>

      <div className="add-review">
        <ReviewForm />
      </div>
    </section>
  );
}

export default AddReviewScreen;
