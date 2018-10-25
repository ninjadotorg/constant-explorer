import React from 'react';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';

class Footer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <footer className="footer">
        <div className="uk-container">
          <Grid container spacing={24} style={{marginBottom: 0}}>
            <Grid item xs={12} sm={3}>
              Constant Explorer ver-0.0.1
            </Grid>
            {/*<Grid item xs={12} sm={3}>
              <ul>
                <li className="head-list">Community</li>
                <li><a rel="noopener noreferrer" target="_blank" href="/"><span>a</span></a></li>
                <li><a rel="noopener noreferrer" target="_blank" href="/"><span>a</span></a></li>
                <li><a rel="noopener noreferrer" target="_blank" href="/"><span>a</span></a></li>
                <li><a rel="noopener noreferrer" target="_blank" href="/"><span>a</span></a></li>
                <li><a rel="noopener noreferrer" target="_blank" href="/"><span>a</span></a></li>
              </ul>
            </Grid>
            <Grid item xs={12} sm={3}>
              <ul>
                <li className="head-list">Documents</li>
                <li><a rel="noopener noreferrer" target="_blank" href="/"><span>a</span></a></li>
                <li><Link to="/download"><span>a</span></Link></li>
              </ul>
            </Grid>
            <Grid item xs={12} sm={3}>
              <ul>
                <li className="head-list">Developer Resources</li>
                <li><a rel="noopener noreferrer" target="_blank" href="/"><span>a</span></a></li>
                <li><a rel="noopener noreferrer" target="_blank" href="/"><span>a</span></a></li>
                <li><a rel="noopener noreferrer" target="_blank" href="/"><span>a</span></a></li>
                <li>
                  <a rel="noopener noreferrer" target="_blank" href="/">
                    <span>
                      a
                    </span>

                  </a>

                </li>
              </ul>
            </Grid>*/}
            {/*<Grid item xs={12} className="copyright">
              Copyright © 2018 a
              <div>
                <a rel="noopener noreferrer" target="_blank" href="/">Privacy Policy</a>
                <a rel="noopener noreferrer" target="_blank" href="/">Cookie Policy</a>
                <a rel="noopener noreferrer" target="_blank" href="/">Terms of Use</a>
              </div>
            </Grid>*/}
          </Grid>
        </div>
      </footer>
    );
  }
}

export default Footer;
