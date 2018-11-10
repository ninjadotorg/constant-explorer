import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTokens } from '@/reducers/constant/action';

class Tokens extends React.Component {
  static propTypes = {
    tokens: PropTypes.object.isRequired,
    actionGetTokens: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    const { actionGetTokens, tokens } = props;

    this.state = {
      tokens,
    };

    actionGetTokens();
  }

  render() {
    const { tokens } = this.state;

    return (
      <div className="c-explorer-page c-explorer-page-tokens">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="c-breadcrumb">
                <ul>
                  <li><Link to="/">Explorer</Link></li>
                  <li><Link to="/tokens">Tokens</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-12">
              <div className="block content">
                <div className="block-heading">
                  Tokens
                </div>
                <table className="c-table">
                  <thead>
                    <tr>
                      <th>Token id</th>
                      <th>Token name</th>
                      <th>Token symbol</th>
                      <th>Token amount</th>
                      <th>TXs</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tokens.list.length ? tokens.list.map(token => (
                      <tr>
                        <td className="c-hash">{token.ID}</td>
                        <td className="c-hash">{token.Name}</td>
                        <td className="c-hash">{token.Symbol}</td>
                        <td className="c-hash">{token.Amount}</td>
                        <td className="c-hash">{token.ListTxs.length}</td>
                      </tr>
                    )) : <tr><td style={{ textAlign: 'center' }} colSpan={4}>Empty</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default connect(
  state => ({
    tokens: state.constant.tokens,
  }),
  ({
    actionGetTokens: getTokens,
  }),
)(Tokens);
