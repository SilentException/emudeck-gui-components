import React, { useEffect, useState, useContext } from 'react';
import { GlobalContext } from 'context/globalContext';
import { BtnSimple } from 'getbasecore/Atoms';

import CardSettings from 'components/molecules/CardSettings/CardSettings';
import StoreGame from 'components/molecules/StoreGame/StoreGame';
import Main from 'components/organisms/Main/Main';

import './store-front.scss';

/* eslint-disable */
import {
  logo_genesis,
  logo_snes,
  logo_gb,
  logo_mastersystem,
  icon_32X,
  icon_5200,
  icon_7800,
  icon_X68000,
  icon_amiga,
  icon_arcade,
  icon_atari,
  icon_atarist,
  icon_c64,
  icon_col,
  icon_cpc,
  icon_cps1,
  icon_cps2,
  icon_cps3,
  icon_dos,
  icon_fairchild,
  icon_nes,
  icon_fds,
  icon_gb,
  icon_gba,
  icon_gbc,
  icon_gg,
  icon_gw,
  icon_itv,
  icon_lynx,
  icon_genesis,
  icon_megaduck,
  icon_mastersystem,
  icon_mastersystemx,
  icon_neocd,
  icon_neogeo,
  icon_ngp,
  icon_ody,
  icon_pce,
  icon_pcecd,
  icon_pico,
  icon_poke,
  icon_ports,
  icon_ps,
  icon_satella,
  icon_scummvm,
  icon_search,
  icon_segacd,
  icon_segasgone,
  icon_snes,
  icon_sgb,
  icon_sgfx,
  icon_sufami,
  icon_supervision,
  icon_tic,
  icon_vb,
  icon_vdp,
  icon_vectrex,
  icon_ws,
  icon_zxs,
} from 'components/utils/images/systems';

const icon = {
  // eslint-disable-next-line camelcase, no-unused-vars
  icon_32X,
  icon_5200,
  icon_7800,
  icon_X68000,
  icon_amiga,
  icon_arcade,
  icon_atari,
  icon_atarist,
  icon_c64,
  icon_col,
  icon_cpc,
  icon_cps1,
  icon_cps2,
  icon_cps3,
  icon_dos,
  icon_fairchild,
  icon_nes,
  icon_fds,
  icon_gb,
  icon_gba,
  icon_gbc,
  icon_gamegear: icon_gg,
  icon_gw,
  icon_itv,
  icon_lynx,
  icon_genesis,
  icon_megaduck,
  icon_mastersystem,
  icon_mastersystemx,
  icon_neocd,
  icon_neogeo,
  icon_ngp,
  icon_ody,
  icon_pce,
  icon_pcecd,
  icon_pico,
  icon_poke,
  icon_ports,
  icon_ps,
  icon_satella,
  icon_scummvm,
  icon_search,
  icon_segacd,
  icon_segasgone,
  icon_snes,
  icon_sgb,
  icon_sgfx,
  icon_sufami,
  icon_supervision,
  icon_tic,
  icon_vb,
  icon_vdp,
  icon_vectrex,
  icon_ws,
  icon_zxs,
};
/* eslint-enable */

function StoreFront() {
  const { state } = useContext(GlobalContext);

  const { storagePath } = state;

  const [statePage, setStatePage] = useState({
    installing: false,
    modal: false,
    game: {
      title: undefined,
      pictures: { titlescreens: [undefined], screenshots: [undefined] },
    },
    games: null,
    featured: [],
  });
  const { modal, game, installing, games, featured } = statePage;

  const [stateSystem, setStateSystem] = useState({
    system: null,
  });
  const { system } = stateSystem;
  const ipcChannel = window.electron.ipcRenderer;
  useEffect(() => {
    ipcChannel.sendMessage('get-store-featured');
    ipcChannel.once('get-store-featured', (store) => {
      // No versioning found, what to do?

      

      setStatePage({
        ...statePage,
        featured: store.featured,
      });
    });
  }, []);

  useEffect(() => {
    ipcChannel.sendMessage('get-store');
    ipcChannel.once('get-store', (store) => {
      // No versioning found, what to do?

      

      setStatePage({
        ...statePage,
        games: store.store,
      });
    });
  }, [featured]);
  const toggleModal = (item) => {
    if (item) {
      setStatePage({
        ...statePage,
        game: item,
        modal: !modal,
      });
    } else {
      setStatePage({
        ...statePage,
        modal: !modal,
        game: {
          title: undefined,
          pictures: { titlescreens: [undefined], screenshots: [undefined] },
        },
      });
    }
  };

  const installGame = (game, system, title) => {
    setStatePage({
      ...statePage,
      installing: title,
    });
    
    ipcChannel.sendMessage('installGame', [game, storagePath, system]);
    ipcChannel.once('installGame', (error, stdout, stderr) => {
      
      if (stdout.includes('true')) {
        alert('Game Installed.\nGo back to EmulationStation to play it');
      } else {
        alert('There was an error installing the game');
      }
      setStatePage({
        ...statePage,
        installing: false,
      });
    });
  };

  const unInstallGame = (game, system, title) => {
    setStatePage({
      ...statePage,
      installing: title,
    });
    ipcChannel.sendMessage('unInstallGame', [game, storagePath, system]);
    ipcChannel.once('unInstallGame', (error, stdout, stderr) => {
      
      if (stdout.includes('true')) {
        alert('Game Uninstalled');
      } else {
        alert('There was an error installing the game');
      }
      setStatePage({
        ...statePage,
        installing: false,
      });
    });
  };

  const showSystem = (id) => {
    const showThis = games.filter((item) => item.system === id);
    setStateSystem({
      system: showThis,
    });
  };
  let extraCSS;
  // eslint-disable-next-line no-unused-expressions
  system !== null ? (extraCSS = 'is-hidden') : (extraCSS = '');

  return (
    <>
      <Main>
        <div className={`featured-games-list ${extraCSS}`}>
          <p className="h4">Featured games</p>
          <hr />
          <ul>
            {featured.map((item) => {
              return (
                <StoreGame
                  disabled={installing === item.title}
                  key={item.title}
                  title={item.title}
                  img={item.pictures.titlescreens[0]}
                  tags={item.tags}
                  css="store-game--featured"
                  onMore={() => toggleModal(item)}
                  onInstall={() =>
                    installGame(item.file, item.system, item.title)
                  }
                />
              );
            })}
          </ul>
        </div>

        <div className="container--grid">
          {games != null &&
            games.map((item) => {
              return (
                <div data-col-md="2">
                  <CardSettings
                    disabled={installing === item.title}
                    key={item.name}
                    css="is-highlighted"
                    btnCSS="btn-simple--1"
                    icon={icon[`icon_${item.system}`]}
                    iconSize="md"
                    title={item.name}
                    onClick={() => showSystem(item.system)}
                  />
                </div>
              );
            })}
        </div>

        <div className="games-details">
          {system !== null &&
            system.map((item) => {
              return (
                <>
                  <p className="h4">{item.name}</p>
                  <hr />
                  <ul className="games-list">
                    {item.games.map((item) => {
                      return (
                        <StoreGame
                          disabled={installing === item.title}
                          key={item.title}
                          title={item.title}
                          img={item.pictures.titlescreens[0]}
                          system={logo_gb}
                          onMore={() => toggleModal(item)}
                          onInstall={() =>
                            installGame(item.file, item.system, item.title)
                          }
                        />
                      );
                    })}
                  </ul>
                </>
              );
            })}
        </div>
      </Main>

      <div className={`game-details ${modal ? 'is-shown' : ''}`}>
        <div className="game-details__box">
          <div className="game-details__head">
            <div className="container--grid">
              <div data-col-sm="6">
                <span className="h2">{game.title}</span>
                <div className="game-details__tags">
                  {game.tags &&
                    game.tags.map((item) => {
                      return (
                        <small
                          key={item}
                          className="tag"
                          style={{ background: `var(--${item})` }}
                        >
                          {item}
                        </small>
                      );
                    })}
                </div>
                <p>{game.description}</p>
                <BtnSimple
                  css="btn-simple--1"
                  type="button"
                  aria="Next"
                  onClick={() =>
                    installGame(game.file, game.system, game.title)
                  }
                  disabled={installing === game.title}
                >
                  Install
                </BtnSimple>
                <BtnSimple
                  css="btn-simple--3"
                  type="button"
                  aria="Next"
                  onClick={() =>
                    unInstallGame(game.file, game.system, game.title)
                  }
                  disabled={installing === game.title}
                >
                  Uninstall
                </BtnSimple>
              </div>
              <div data-col-sm="6">
                <img src={game.pictures.screenshots[0]} alt="Screenshot" />
                {/* <div className="game-details__thumbnails">
                      {game.pictures.screenshots.map((item, i) => {
                        return <img src={item} alt="Screenshot" />;
                      })}
                    </div> */}
              </div>
            </div>
          </div>
          <div className="game-details__footer">
            <BtnSimple
              css="btn-simple--1"
              type="button"
              aria="Next"
              onClick={() => toggleModal()}
            >
              Close
            </BtnSimple>
          </div>
        </div>
      </div>
    </>
  );
}
export default StoreFront;
