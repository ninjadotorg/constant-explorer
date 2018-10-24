import { ACTIONS as APP_ACTIONS } from '@/reducers/app/action';
import NeedInstallMetamask from '@/components/DialogContent/NeedInstallMetamask';
import NeedUnlockMetamask from '@/components/DialogContent/NeedUnlockMetamask';
import Log from '@/services/log';
import Web3 from 'web3';

export const ACTIONS = {
  METAMASK_DETECTING: 'METAMASK_DETECTING',
  METAMASK_DETECTED: 'METAMASK_DETECTED',
  METAMASK_UNLOCKED: 'METAMASK_UNLOCKED',
};

export const needInstall = buttonDialogFn => (dispatch) => {
  dispatch({
    type: APP_ACTIONS.SHOW_DIALOG,
    payload: NeedInstallMetamask,
    dialogType: NeedInstallMetamask.type,
    buttonDialogFn,
  });
};

export const needUnlock = () => (dispatch) => {
  dispatch({
    type: APP_ACTIONS.SHOW_DIALOG,
    payload: NeedUnlockMetamask,
    dialogType: NeedUnlockMetamask.type,
    dialogHideCloseButton: true,
  });
};

export const detect = () => async (dispatch) => {
  dispatch({ type: ACTIONS.METAMASK_DETECTING });
  let installed = false;
  let web3App = null;

  if (typeof web3 !== 'undefined' && web3.currentProvider.isMetaMask) {
    installed = true;
    if (window.ethereum) {
      web3App = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else {
      web3App = new Web3();
      web3App.setProvider(web3.currentProvider);
    }
  }

  dispatch({ type: ACTIONS.METAMASK_DETECTED, payload: installed, web3: web3App });

  return {
    installed,
    web3App,
  };
};

const callUnclock = (callNeedUnlock, dispatch) => {
  if (callNeedUnlock) {
    dispatch(needUnlock());
  } else {
    Log.Info('.');
  }
};

const checkAccounts = (web3App, callNeedUnlock, dispatch, loop = false) => {
  let reload = true;
  setTimeout(() => { if (reload) window.location.reload(); }, 1000);
  web3App.eth.getAccounts()
    .then((r) => {
      reload = false;
      if (!r.length > 0) {
        if (!loop) {
          callUnclock(callNeedUnlock, dispatch);
        }
        setTimeout(() => checkAccounts(web3App, callNeedUnlock, dispatch, true), 1000);
      } else {
        dispatch({ type: ACTIONS.METAMASK_UNLOCKED, address: r[0] });
        dispatch({ type: APP_ACTIONS.CLOSE_DIALOG });
      }
    }).catch(() => {
      reload = false;
      const { accounts } = web3App.eth;
      if (!accounts.length > 0) {
        if (!loop) {
          callUnclock(callNeedUnlock, dispatch);
        }
        setTimeout(() => checkAccounts(web3App, callNeedUnlock, dispatch, true), 1000);
      } else {
        dispatch({ type: ACTIONS.METAMASK_UNLOCKED, address: accounts[0] });
        dispatch({ type: APP_ACTIONS.CLOSE_DIALOG });
      }
    });
};

export const fullFlow = (callNeedUnlock = true) => async (dispatch) => {
  let reload = true;
  setTimeout(() => { if (reload) window.location.reload(); }, 100);
  const { installed, web3App } = await detect(true)(dispatch);
  reload = false;
  if (!installed) {
    dispatch(needInstall(() => { window.location.reload(); }));
  } else {
    checkAccounts(web3App, callNeedUnlock, dispatch);
  }
};
