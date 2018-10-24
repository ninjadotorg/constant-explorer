import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setNotFound, clearNotFound } from '@/reducers/app/action';

class DynamicImport extends React.Component {
  static propTypes = {
    load: PropTypes.func.isRequired,
    children: PropTypes.any.isRequired,
    loading: PropTypes.func.isRequired,
    isNotFound: PropTypes.bool,
    setNotFound: PropTypes.func.isRequired,
    clearNotFound: PropTypes.func.isRequired,
  }

  static defaultProps = {
    isNotFound: false,
  }

  constructor(props) {
    super(props);
    const {
      loading, isNotFound, clearNotFound: propsClearNotFound, setNotFound: propsSetNotFound,
    } = this.props;
    this.state = {
      component: loading,
    };

    if (isNotFound) {
      propsSetNotFound();
    } else {
      propsClearNotFound();
    }
  }

  componentDidMount() {
    const { load } = this.props;
    load()
      .then((component) => {
        this.setState(() => ({
          component: component.default ? component.default : component,
        }));
      });
  }

  render() {
    const { component } = this.state;
    const { children } = this.props;
    return children(component);
  }
}

export default connect(null, ({ setNotFound, clearNotFound }))(DynamicImport);
