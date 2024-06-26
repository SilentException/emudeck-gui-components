import { useTranslation } from 'react-i18next';
import React, { useContext } from 'react';
import { GlobalContext } from 'context/globalContext';
import PropTypes from 'prop-types';
import Main from 'components/organisms/Main/Main';
import Card from 'components/molecules/Card/Card';

function ParserSelector({ onClick, images }) {
  const { t, i18n } = useTranslation();
  const { state } = useContext(GlobalContext);
  const { installEmus, system } = state;
  const installEmusArray = Object.values(installEmus);
  return (
    <>
      <Main>
        <div className="cards cards--mini">
          {installEmusArray.map((item) => {
            if (system === 'win32') {
              if (item.id === 'rmg' || item.id === 'ares') {
                return;
              }
            }

            if (
              item.id !== 'ra' &&
              item.id !== 'ppsspp' &&
              item.id !== 'mgba' &&
              item.id !== 'melonds' &&
              item.id !== 'rmg' &&
              item.id !== 'duckstation' &&
              item.id !== 'scummvm' &&
              item.id !== 'flycast'
            ) {
              return;
            }

            const img = images[item.id];
            // eslint-disable-next-line consistent-return
            return (
              <Card
                css={item.status === true && 'is-selected'}
                key={item.id}
                onClick={() => onClick(item.id)}
              >
                <img src={img} alt={item.name} />
                <span className="h6">{item.name}</span>
              </Card>
            );
          })}
        </div>
      </Main>
    </>
  );
}

ParserSelector.propTypes = {
  onClick: PropTypes.func,
  images: PropTypes.array,
};

ParserSelector.defaultProps = {
  onClick: '',
  images: '',
};

export default ParserSelector;
