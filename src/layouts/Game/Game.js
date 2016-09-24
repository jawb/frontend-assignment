import React, {Component} from 'react'
import classes from './Game.scss'
import '../../styles/core.scss'
import Sidebar from '../../components/Sidebar'
import Grid from '../../components/Grid'
import Check from '../../components/Check'
import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'


const DragDropContextF = DragDropContext(HTML5Backend)

export class Game extends Component {
    render() {
        return (
            <div className={'fluid-container ' + classes.container}>
              <div className={classes.sidebar}>
                  <Sidebar />
              </div>
              <div className={classes.main}>
                  <div className={classes.grid}>
                      <Grid />
                  </div>
                  <div className={classes.check}>
                      <Check />
                  </div> 
              </div>
            </div>
        )
    }
}

export default DragDropContextF(Game)
