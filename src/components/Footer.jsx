import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

class Footer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <footer className="footer">
        <div className="container">
          <Grid container spacing={24} style={{ marginBottom: 0 }}>
            <Grid item xs={12} sm={3}>
              Constant Explorer ver-0.0.1
            </Grid>
          </Grid>
        </div>
      </footer>
    );
  }
}

export default Footer;
