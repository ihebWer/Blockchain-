import { NavLink } from 'react-router-dom';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAuth } from './AuthContext';
import '../Style/Header.scss';

const Header = () => {
  const { isAdmin, isConnected, handleDisconnect } = useAuth();

  return (
    <header className="site-header">
      <a href="/" id="branding" className="pull-left">
        <img src="../images/logo.png" alt="" className="logo" />
        <div className="logo-text">
          <p><b>Universal <br /> paintball</b></p>
        </div>
      </a>
      <div className="main-navigation">
        <button type="button" className="menu-toggle"><i className="fa fa-bars"></i></button>
        <ul className="menu">
          <li className="menu-item">
            <NavLink to="/" activeClassName="active">Accueil</NavLink>
          </li>
          <li className="menu-item">
            <NavLink to="/about" activeClassName="active">A propos</NavLink>
          </li>
          <li className="menu-item">
            <NavLink to="/offer" activeClassName="active">Nos Offres</NavLink>
          </li>
          <li className="menu-item">
            <NavLink to="/contact" activeClassName="active">Contact</NavLink>
          </li>
          {isAdmin && (
            <li className="menu-item">
              <NavLink to="/admin" activeClassName="active">Espace Admin</NavLink>
            </li>
          )}
        </ul>
        {isConnected ? (
          <button onClick={handleDisconnect} className="connect-button">
            Déconnecter
          </button>
        ) : (
          <ConnectButton.Custom>
            {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
              const ready = mounted;
              const connected = ready && account && chain;

              return (
                <div
                  {...(!ready && {
                    'aria-hidden': true,
                    'style': {
                      opacity: 0,
                      pointerEvents: 'none',
                      userSelect: 'none',
                    },
                  })}
                >
                  {(() => {
                    if (!connected) {
                      return (
                        <button onClick={openConnectModal} className="connect-button">
                          Connecter
                        </button>
                      );
                    }
                    if (chain.unsupported) {
                      return (
                        <button onClick={openChainModal} className="connect-button">
                          Réseau non supporté
                        </button>
                      );
                    }
                    return (
                      <button onClick={openAccountModal} className="connect-button">
                        {account.displayName}
                      </button>
                    );
                  })()}
                </div>
              );
            }}
          </ConnectButton.Custom>
        )}
      </div>
      <div className="mobile-navigation"></div>
    </header>
  );
};

export default Header;
