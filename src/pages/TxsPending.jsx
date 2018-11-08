import React from 'react';
import PropTypes from 'prop-types';

class TxsPending extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    const { match } = this.props;
    const { txHash } = match.params;

    this.state = {
      txHash,
    };
  }

  render() {
    const { txHash } = this.state;

    return (
      <div className="c-explorer-page c-explorer-page-txs-pending">
        <div className="container">
          <div className="row">
            <div className="col-12">

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TxsPending;
