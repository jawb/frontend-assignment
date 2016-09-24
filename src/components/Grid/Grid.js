import React from 'react'
import { connect } from 'react-redux'
import classes from './Grid.scss'
import Square from '../Square'


export const Grid = ({grid}) => (
  <div className={classes.grid}>
    {grid.grid.map((row, y) => (
        <div className={classes.row} key={'row-'+y}>
            {row.map((col, x) =>
                <div className={classes.square} key={'cell-'+x+'-'+y}>
                    <Square x={col.x} y={col.y} filled={col.filled} />
                </div>
            )}
        </div>
    ))}
  </div>
)

const mapStateToProps = ({grid}) => ({grid})

export default connect(mapStateToProps)(Grid)
