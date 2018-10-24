import React from 'react';
import PropTypes from 'prop-types';

class Page2 extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    const {
      match,
    } = this.props;

    const { address } = match.params;

    this.state = {
      address,
    };
  }

  render() {
    const { address } = this.state;
    return (
      <div>
        {`page2 ${address}`}
      </div>
    );
  }
}

export default Page2;
