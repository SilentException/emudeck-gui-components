import React, { useEffect, useState, useContext } from 'react';

import { GlobalContext } from 'context/globalContext';

import Main from 'components/organisms/Main/Main';

import { BtnSimple } from 'getbasecore/Atoms';

import { Alert } from 'getbasecore/Molecules';

import Card from 'components/molecules/Card/Card';
import SelectorMenu from 'components/molecules/SelectorMenu/SelectorMenu';

import cloudSyncOn from 'assets/CloudSync.png';
import cloudSyncOff from 'assets/CloudSync.png';

import box from 'assets/cloud/box.png';
import dropbox from 'assets/cloud/dropbox.png';
import gdrive from 'assets/cloud/gdrive.png';
import nextcloud from 'assets/cloud/nextcloud.png';
import onedrive from 'assets/cloud/onedrive.png';
import pcloud from 'assets/cloud/pcloud.png';

function CloudSync({
  disabledNext,
  disabledBack,
  downloadComplete,
  onClick,
  onClickInstall,
  next,
  back,
  data,
  disableButton,
}) {
  const { state, setState } = useContext(GlobalContext);
  const { cloudSync } = state;

  return (
    <>
      <p className="lead">
        Sync your saves and save states to the cloud. After selecting one of the
        cloud providers below, this feature is currently in beta, so use it with
        caution.
      </p>
      <Main>
        <p>Select one of the following providers:</p>

        <div className="cards cards--mini">
          <Card
            css={cloudSync == 'Emudeck-Box' && 'is-selected'}
            onClick={() => onClick('Emudeck-Box')}
          >
            <img src={box} alt="Box" />
            <span className="h6">Box</span>
          </Card>
          <Card
            css={cloudSync == 'Emudeck-DropBox' && 'is-selected'}
            onClick={() => onClick('Emudeck-DropBox')}
          >
            <img src={dropbox} alt="dropbox" />
            <span className="h6">DropBox</span>
          </Card>
          <Card
            css={cloudSync == 'Emudeck-GDrive' && 'is-selected'}
            onClick={() => onClick('Emudeck-GDrive')}
          >
            <img src={gdrive} alt="gdrive" />
            <span className="h6">Google Drive</span>
          </Card>
          <Card
            css={cloudSync == 'Emudeck-NextCloud' && 'is-selected'}
            onClick={() => onClick('Emudeck-NextCloud')}
          >
            <img src={nextcloud} alt="nextcloud" />
            <span className="h6">Nextcloud</span>
          </Card>
          <Card
            css={cloudSync == 'Emudeck-OneDrive' && 'is-selected'}
            onClick={() => onClick('Emudeck-OneDrive')}
          >
            <img src={onedrive} alt="onedrive" />
            <span className="h6">OneDrive</span>
          </Card>
          <Card
            css={cloudSync == 'Emudeck-pCloud' && 'is-selected'}
            onClick={() => onClick('Emudeck-pCloud')}
          >
            <img src={pcloud} alt="Emudeck-pCloud" />
            <span className="h6">pCloud</span>
          </Card>
        </div>
        {cloudSync !== '' && cloudSync !== false && (
          <BtnSimple
            css="btn-simple--1"
            type="button"
            aria="Install SaveSync"
            onClick={() => onClickInstall()}
            disabled={disableButton}
          >
            {disableButton && 'Please wait...'}

            {disableButton || 'Install Cloud Sync'}
          </BtnSimple>
        )}
        <BtnSimple
          css="btn-simple--1"
          type="button"
          aria="Uninstall SaveSync"
          onClick={() => onClickUninstall()}
          disabled={disableButton}
        >
          {disableButton && 'Please wait...'}

          {disableButton || 'Uninstall'}
        </BtnSimple>
      </Main>
    </>
  );
}

export default CloudSync;
