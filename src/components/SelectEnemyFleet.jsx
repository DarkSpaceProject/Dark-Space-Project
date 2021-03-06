import React, { Component, PropTypes } from 'react';
import clone from 'clone';
import { Link } from 'react-router';

export default class SelectEnemyFleet extends Component {

  constructor(props) {
    super(props);
    this.state = {
      points: 0,
      enemySpaceFleet : [],
      pointsAlert : false,
      addDisabled: true
    };
  }

  handleOnSelectChangePoints() {

    const { navesState } = this.props;

    const tieInterceptorNumber = this.refs.tieInterceptor.options.selectedIndex;
    const tieFighterNumber = this.refs.tieFighter.options.selectedIndex;
    const tieAdvancedNumber = this.refs.tieAdvanced.options.selectedIndex;
    const tieInterceptor = clone(navesState[3]);
    const tieFighter = clone(navesState[4]);
    const tieAdvanced = clone(navesState[5]);

    let totalPoints = (tieInterceptor.points * tieInterceptorNumber) + (tieFighter.points * tieFighterNumber) + (tieAdvanced.points * tieAdvancedNumber);
    let enemySpaceFleetArray = [];
    let i = 0;
    for (let j = 0; j < tieInterceptorNumber; j++) {
      enemySpaceFleetArray[i] = tieInterceptor;
      i++;
    }
    for (let j = 0; j < tieFighterNumber; j++) {
      enemySpaceFleetArray[i] = tieFighter;
      i++;
    }
    for (let j = 0; j < tieAdvancedNumber; j++) {
      enemySpaceFleetArray[i] = tieAdvanced;
      i++;
    }

    this.setState({
      points : totalPoints,
      playerSpaceFleet : enemySpaceFleetArray,
      pointsAlert : totalPoints > 100 ? true : false,
      addDisabled: enemySpaceFleetArray.length === 0 || totalPoints > 100 ? true : false
    });
  }

  handleAddButtonClick(e) {
    e.stopPropagation();
    const { navesState, onChangeFleet } = this.props;
    const idCampaign = this.props.params.idCampaign;

    const tieInterceptorNumber = this.refs.tieInterceptor.options.selectedIndex;
    const tieFighterNumber = this.refs.tieFighter.options.selectedIndex;
    const tieAdvancedNumber = this.refs.tieAdvanced.options.selectedIndex;
    const tieInterceptor = clone(navesState[3]);
    const tieFighter = clone(navesState[4]);
    const tieAdvanced = clone(navesState[5]);

    let enemySpaceFleetArray = [];
    let i = 0;
    for (let j = 0; j < tieInterceptorNumber; j++) {
      enemySpaceFleetArray[i] = tieInterceptor;
      i++;
    }
    for (let j = 0; j < tieFighterNumber; j++) {
      enemySpaceFleetArray[i] = tieFighter;
      i++;
    }
    for (let j = 0; j < tieAdvancedNumber; j++) {
      enemySpaceFleetArray[i] = tieAdvanced;
      i++;
    }

    onChangeFleet(enemySpaceFleetArray, idCampaign);

  }

  render() {

    return (
      <div className="row">
        <div className="col-xs-12">
          <div className="titlePadding">
            <h2>Select the enemy fleet</h2>
          </div>
          <div className="titlePadding">
            <h4 className="col-xs-6 col-md-2 roundh text-center">Points {this.state.points} of 100</h4>
          </div>
          <div className="col-xs-12"></div>
          <div className="input-group input-group-xs">
            <span className="input-group-addon">Tie Interceptor (18 Puntos)</span>
              <select className="form-control" ref="tieInterceptor" onChange={e => this.handleOnSelectChangePoints(e)}>
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
          </div>
          <div className="input-group input-group-xs">
            <span className="input-group-addon">Tie Fighter (12 Puntos)</span>
              <select className="form-control" ref="tieFighter" onChange={e => this.handleOnSelectChangePoints(e)}>
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
          </div>
          <div className="input-group input-group-xs">
            <span className="input-group-addon">Tie Advanced (22 Puntos)</span>
              <select className="form-control" ref="tieAdvanced" onChange={e => this.handleOnSelectChangePoints(e)}>
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
          </div>
          <div className="alertPadding">
            <div className={`${!this.state.pointsAlert ? 'hidden' : "alert alert-danger  col-xs-11" }`} role="alert"><strong>Oppps!</strong> "Please value of your fleet can't exceed 100 points"</div>
          </div>
          <div className="col-xs-12">
            <div className="col-xs-2"></div>
            <div className="col-xs-3">
              <Link to="/campaign" style={{color: 'inherit', textDecoration: 'inherit'}}><p className="btn btn-primary btn-md" role="button">Back</p></Link>
            </div>
            <div className="col-xs-3">
            {this.state.addDisabled ? <p className="btn btn-primary btn-md" disabled={this.state.addDisabled} role="button" >Change Enemy Fleet</p>
            :
            <Link to="/campaign" onClick={e => this.handleAddButtonClick(e)} style={{color: 'inherit', textDecoration: 'inherit'}}><p className="btn btn-primary btn-md" disabled={this.state.addDisabled} role="button" >Change Enemy Fleet</p></Link>
            }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SelectEnemyFleet.propTypes = {
  campaignState:PropTypes.array.isRequired,
  playerFleetState:PropTypes.array.isRequired,
  enemyPlayerFleetState:PropTypes.array.isRequired,
  navesState:PropTypes.array.isRequired,
  pointsState:PropTypes.array.isRequired,
  onChangeFleet: PropTypes.func.isRequired
};
