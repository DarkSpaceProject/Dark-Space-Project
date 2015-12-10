import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      current: true,
      collapsed: false
    };
  }

handlerSetState(nav){
  this.setState({
    current: nav,
    collapsed: false
  });
}

handlerCollapsed(stateCollapsed){
     if (stateCollapsed !== true){
        this.setState({
          collapsed: true,
        });
        console.log('Lo pongo true');
    }else {
      this.setState({
          collapsed: false,
        });
      console.log('Lo pongo false');
    }
}


  render() {
    return (
      <div className="userStyle">
       <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" onClick={() => this.handlerCollapsed(this.state.collapsed)} data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="active" to="/"><span className="navbar-brand" onClick={() => this.handlerSetState('/') }>Dark Space Project</span></Link>
            </div>
            <div className= { (this.state.collapsed === true) ? "collapse navbar-collapse in" : "collapse navbar-collapse" } id="bs-example-navbar-collapse-1" >
            <ul className="nav navbar-nav">
              { (this.state.current === '/campaign') ? <li className="active"><Link to="/campaign" onClick={() => this.handlerSetState('/campaign') }>Campaign</Link></li> : <li><Link to="/campaign" onClick={() => this.handlerSetState('/campaign') }>Campaign</Link></li> }
              { (this.state.current === '/points') ? <li className="active"><Link to="/points" onClick={() => this.handlerSetState('/points') }>Points</Link></li> : <li><Link to="/points" onClick={() => this.handlerSetState('/points') }>Points</Link></li> }
              { (this.state.current === '/tutorial') ? <li className="active"><Link to="/tutorial" onClick={() => this.handlerSetState('/tutorial') }>Tutorial</Link></li> : <li><Link to="/tutorial" onClick={() => this.handlerSetState('/tutorial') }>Tutorial</Link></li> }
            </ul>
          </div>
        </div>
        </nav>
      {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  // Injected by React RouterConfirmDialog
  children: PropTypes.node
};
