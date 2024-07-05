import { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import "../Style/Acceuil.scss";
import Button from "react-bootstrap/Button";
import GoogleMap from "./GoogleMap";
import FloatingChat from "./Chat";
import Carousel from "./Carousel";
import Calendar from "./Calendrier";
import News from "./News";

export default class Acceuil extends Component {
  state = {
    expandedIndex: -1,
  };

  handleToggle = (index) => {
    this.setState({
      expandedIndex: this.state.expandedIndex === index ? -1 : index,
    });
  };

  render() {
    const { expandedIndex } = this.state;
    return (
      <div id="site-content">
        <div className="container">
          <Header />
          <Carousel />
          <FloatingChat />

          <main className="main-content">
            <div className="features-row row">
              <div className="col-md-4 feature-container">
                <div className="feature">
                  <figure className="feature-image">
                    <img src="/public/dummy/feature-image-1.jpg" alt="" />
                  </figure>
                  <h2 className="feature-title">À propos de nous</h2>
                  <p>
                    Nous sommes passionnés par le paintball et dédiés à offrir
                    des expériences inoubliables à nos membres.
                    {expandedIndex === 0 && (
                      <span>
                        {" "}
                        Notre mission est de promouvoir le sport et de créer une
                        communauté accueillante où les joueurs de tous niveaux
                        peuvent se rencontrer, s'entraîner et s'amuser.
                        Rejoignez-nous pour découvrir un monde d'excitation et
                        de camaraderie.
                      </span>
                    )}
                    <button
                      onClick={() => this.handleToggle(0)}
                      className="read-more-button"
                    >
                      {expandedIndex === 0 ? "Lire moins" : "Lire la suite"}
                    </button>
                  </p>
                </div>
              </div>
              <div className="col-md-4 feature-container">
                <div className="feature">
                  <figure className="feature-image">
                    <img src="/public/dummy/feature-image-2.jpg" alt="" />
                  </figure>
                  <h2 className="feature-title">Notre Club</h2>
                  <p>
                    Notre club de paintball est un lieu de rencontre pour les
                    amateurs et les passionnés de tous âges.
                    {expandedIndex === 1 && (
                      <span>
                        {" "}
                        Avec des installations modernes, des terrains variés et
                        un personnel qualifié, nous offrons un environnement
                        sécurisé et amusant pour tous. Que vous soyez un
                        débutant ou un joueur expérimenté, notre club est
                        l'endroit idéal pour améliorer vos compétences et
                        profiter du jeu.
                      </span>
                    )}
                    <button
                      onClick={() => this.handleToggle(1)}
                      className="read-more-button"
                    >
                      {expandedIndex === 1 ? "Lire moins" : "Lire la suite"}
                    </button>
                  </p>
                </div>
              </div>
              <div className="col-md-4 feature-container">
                <div className="feature">
                  <figure className="feature-image">
                    <img src="/public/dummy/feature-image-3.jpg" alt="" />
                  </figure>
                  <h2 className="feature-title">Entraînements</h2>
                  <p>
                    Nos sessions d'entraînement sont conçues pour aider les
                    joueurs à développer leurs compétences et leur stratégie sur
                    le terrain.
                    {expandedIndex === 2 && (
                      <span>
                        {" "}
                        Encadrés par des instructeurs expérimentés, nos
                        entraînements couvrent tous les aspects du paintball, de
                        la précision du tir à la coordination en équipe.
                        Participez à nos entraînements pour devenir un joueur
                        plus performant et confiant.
                      </span>
                    )}
                    <button
                      onClick={() => this.handleToggle(2)}
                      className="read-more-button"
                    >
                      {expandedIndex === 2 ? "Lire moins" : "Lire la suite"}
                    </button>
                  </p>
                </div>
              </div>
            </div>

            <div className="cta-container">
              <div className="cta-section" data-bg-image="/public/dummy/feature-image-1.jpg">
                <h2 className="cta-title">Faire partie de l'équipe</h2>
                <p>
                  Venez tester votre esprit d'équipe et vos compétences
                  stratégiques sur notre terrain de paintball exceptionnel. Ne
                  manquez pas cette aventure excitante, inscrivez-vous dès
                  aujourd'hui !
                </p>
                <Link to="/recherche">
                  <Button className="extraordinary-button" variant="primary">
                    Réservez-Maintenant
                  </Button>
                </Link>
              </div>
              <div className="cta-section" data-bg-image="/Users/iheb/Desktop/test/hello-world-web/public/dummy/section-bg.jpg">
                <h2 className="cta-title">Évaluation de votre expérience</h2>
                <p>
                  Votre opinion est précieuse ! Aidez-nous à nous améliorer en
                  partageant votre expérience après votre session de paintball.
                  Cliquez sur "Évaluez" ci-dessous pour nous faire part de vos
                  commentaires. Merci pour votre contribution !
                </p>
                <Link to="/evaluation">
                  <Button className="extraordinary-button">Évaluez</Button>
                </Link>
              </div>
            </div>

            <div className="content-row">
              <div className="">
                <h2 className="section-title">News</h2>
                <News />
                <ul className="news">
                  <li>
                    <small className="date">10.07.2014</small>
                    <h2 className="entry-title">
                      Le paintball est un sport passionnant qui combine
                      stratégie et travail d'équipe.
                      {expandedIndex === 3 && (
                        <span>
                          {" "}
                          Les joueurs utilisent des marqueurs pour tirer des
                          billes de peinture.
                        </span>
                      )}
                      <button
                        onClick={() => this.handleToggle(3)}
                        className="read-more-button"
                      >
                        {expandedIndex === 3 ? "Lire moins" : "Lire la suite"}
                      </button>
                    </h2>
                  </li>
                  <li>
                    <small className="date">10.07.2014</small>
                    <h2 className="entry-title">
                      Les événements de paintball vont des tournois compétitifs
                      aux jeux de scénario.
                      {expandedIndex === 4 && (
                        <span>
                          {" "}
                          Ils attirent des joueurs de tous niveaux, prêts à
                          s'amuser.
                        </span>
                      )}
                      <button
                        onClick={() => this.handleToggle(4)}
                        className="read-more-button"
                      >
                        {expandedIndex === 4 ? "Lire moins" : "Lire la suite"}
                      </button>
                    </h2>
                  </li>
                  <li>
                    <small className="date">10.07.2014</small>
                    <h2 className="entry-title">
                      Les tournois de paintball rassemblent des équipes pour des
                      compétitions intenses.
                      {expandedIndex === 5 && (
                        <span>
                          {" "}
                          Les jeux de scénario plongent les participants dans
                          des missions thématiques.
                        </span>
                      )}
                      <button
                        onClick={() => this.handleToggle(5)}
                        className="read-more-button"
                      >
                        {expandedIndex === 5 ? "Lire moins" : "Lire la suite"}
                      </button>
                    </h2>
                  </li>
                  <li>
                    <small className="date">10.07.2014</small>
                    <h2 className="entry-title">
                      Participer à un événement de paintball renforce les liens
                      d'équipe et permet de se défouler.
                      {expandedIndex === 6 && (
                        <span>
                          {" "}
                          C'est une aventure palpitante pour tous, parfaite pour
                          les fêtes entre amis.
                        </span>
                      )}
                      <button
                        onClick={() => this.handleToggle(6)}
                        className="read-more-button"
                      >
                        {expandedIndex === 6 ? "Lire moins" : "Lire la suite"}
                      </button>
                    </h2>
                  </li>
                </ul>
              </div>

              <div className="col-md-5 calendar-map-container">
                <Calendar className="calendar" />
                <GoogleMap className="google-map" />
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    );
  }
}
