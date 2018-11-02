import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import PropTypes from 'prop-types';

class Block extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    const { match } = this.props;
    const { blockHash } = match.params;

    this.state = {
      blockHash,
    };
  }

  render() {
    const { blockHash } = this.state;
    return (
      <div className="block-page">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <Card>
                <CardContent>
                  {blockHash}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Block;
