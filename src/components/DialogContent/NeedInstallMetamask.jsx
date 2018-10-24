import React from 'react';
import { DIALOG } from '@/reducers/app/action';

class NeedInstallMetamask extends React.PureComponent {
  static type = DIALOG.STATUS.WARNING;

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div>Temp content: Need install metamask</div>;
  }
}

export default NeedInstallMetamask;
