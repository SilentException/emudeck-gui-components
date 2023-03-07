import React, { useContext } from 'react';
import { GlobalContext } from 'context/globalContext';
import Main from 'components/organisms/Main/Main';

import { Alert } from 'getbasecore/Molecules';
import Card from 'components/molecules/Card/Card';
import CardSettings from 'components/molecules/CardSettings/CardSettings';
import {
  iconSuccess,
  iconCloud,
  iconCompress,
  iconGear,
  iconList,
  iconMigrate,
  iconPlugin,
  iconPrize,
  iconUninstall,
  iconQuick,
  iconCustom,
  iconDoc,
  iconBooks,
  iconJoystick,
  iconPackage,
} from 'components/utils/images/images';

const Welcome = ({ onClick, alert, alertCSS, functions, settingsCards }) => {
  const { state } = useContext(GlobalContext);
  const { mode, second, system, gamemode } = state;
  const pendingUpdate = localStorage.getItem('pending_update');

  return (
    <>
      {second === false && (
        <p className="lead">Select how you want to set up your device:</p>
      )}

      {pendingUpdate === 'true' && second === true && (
        <p className="lead">
          You have a pending update, its recommended to update so you have the
          latest version of EmuDeck's configuration and optimization for your
          emulators.
        </p>
      )}
      {pendingUpdate === 'false' && second === true && (
        <p className="lead">Quick actions:</p>
      )}

      <Main>
        {/*
            Second install screen
          */}
        {second === true && (
          <>
            <div className="container--grid">
              {pendingUpdate === 'true' && (
                <>
                  <div data-col-sm="4">
                    <CardSettings
                      css="is-highlighted"
                      btnCSS="btn-simple--1"
                      icon={iconQuick}
                      iconSize="md"
                      title="Quick Update"
                      onClick={() => onClick('easy')}
                      description="This option automatically updates your emulators & settings in one click. Chose this option if you haven't customized your emulator outside of EmuDeck's options"
                      button="Update and overwrite my configuration"
                    />
                  </div>
                  <div data-col-sm="4">
                    <CardSettings
                      css="is-highlighted"
                      btnCSS="btn-simple--1"
                      icon={iconCustom}
                      iconSize="md"
                      title="Custom Update"
                      onClick={() => onClick('expert')}
                      description="This option allows you to customize your emulators & settings. Chose this one if you have customized your emulators outside of EmuDeck's options and want to preserve them"
                      button="Update and let me keep my configuration"
                    />
                  </div>
                </>
              )}

              {pendingUpdate === 'false' && (
                <>
                  {gamemode || (
                    <div data-col-sm="3">
                      <CardSettings
                        css="is-highlighted"
                        btnCSS="btn-simple--1"
                        icon={iconJoystick}
                        iconSize="md"
                        title="Steam Rom Manager"
                        onClick={() => functions.openSRM()}
                        description="Launch SRM to add more games to your Steam Library"
                        button="Add more games"
                      />
                    </div>
                  )}
                  <div data-col-sm="3">
                    <CardSettings
                      css="is-highlighted"
                      btnCSS="btn-simple--1"
                      icon={iconGear}
                      iconSize="md"
                      title="Quick Settings"
                      onClick={() => functions.navigate('/settings')}
                      description="Customize bezels, shaders, aspect ratio, auto save and more"
                      button="Configure"
                    />
                  </div>
                  {/* <div data-col-sm="3">
                        <CardSettings
                          css="is-highlighted"
                          btnCSS="btn-simple--1"
                          icon={iconGear}
                          iconSize="md"
                          title="EmuDeck Store"
                          onClick={() => functions.navigate('/store-front')}
                          description="Download free non-commercial homebrew games"
                          button="Configure"
                        />
                      </div> */}
                  {system != 'win32' && (
                    <div data-col-sm="3">
                      <CardSettings
                        css="is-highlighted"
                        btnCSS="btn-simple--1"
                        icon={iconPackage}
                        iconSize="md"
                        title="Update Emulators"
                        onClick={() => functions.navigate('/update-emulators')}
                        description="Update all your installed emulators right from EmuDeck"
                        button="Update"
                      />
                    </div>
                  )}
                </>
              )}
            </div>

            <hr />
            <p className="lead">Tools & Stuff:</p>

            <div className="container--grid">
              {settingsCards.map((item) => {
                if (item.status === false) {
                  return;
                }
                if (system === 'win32' && item.title != 'Custom Reset') {
                  return;
                }

                if (gamemode === true && item.title == 'Steam Rom Manager') {
                  return;
                }

                if (gamemode === true && item.title == 'Cloud Backup') {
                  return;
                }

                return (
                  <div data-col-sm="3" key={item.title}>
                    <CardSettings
                      icon={item.icon[0]}
                      iconSize="sm"
                      title={item.title}
                      button={item.button}
                      btnCSS={item.btnCSS}
                      onClick={item.function}
                      description={item.description}
                      type={item.type}
                      href={item.href}
                    />
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/*
              First install screen
            */}
        {second === false && (
          <div className="container--grid">
            <div data-col-sm="5">
              <Card
                css={mode === 'easy' && 'is-selected'}
                onClick={() => onClick('easy')}
              >
                <span className="h3">
                  {second === false && 'Easy Mode'}
                  {second === true && 'Quick Update'}
                </span>
                <p>
                  {second === false &&
                    'This mode automatically installs and configures your device with our recommended settings so you can start playing right away.'}
                  {second === true &&
                    'This mode automatically updates EmuDeck in one click. New settings will be applied and new emulators will be installed. If you ran custom mode previously, you will retain any choices made. Customizations made, excluding per-game settings, will be overwritten.'}
                </p>
              </Card>
            </div>

            <div data-col-sm="5">
              <Card
                css={mode === 'expert' && 'is-selected'}
                onClick={() => onClick('expert')}
              >
                <span className="h3">
                  {second === false && 'Custom Mode'}
                  {second === true && 'Custom Update'}
                </span>
                <p>
                  {second === false &&
                    'This mode allows you to customize how EmuDeck installs to your system. Configure Aspect Ratios, Bezels, Filters, RetroAchievments, Emulators, EmulationStation-DE themes, and Cloud Saves.'}
                  {second === true &&
                    'This mode allows you to customize how EmuDeck updates. New settings will be applied and new emulators will be installed. If you ran custom mode previously, you will retain any choices made. Customizations made, excluding per-game settings, will be overwritten.'}
                </p>
              </Card>
            </div>
          </div>
        )}

        {alert && (
          <>
            <br />
            <div className="container--grid">
              <div data-col-sm="10">
                <Alert css={alertCSS}>
                  <div dangerouslySetInnerHTML={{ __html: alert }} />
                </Alert>
              </div>
            </div>
          </>
        )}
      </Main>
    </>
  );
};

export default Welcome;
