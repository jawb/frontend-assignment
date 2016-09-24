import React from 'react'
import classes from './Sidebar.scss'
import Marker from '../Marker'
import { connect } from 'react-redux'

export const Sidebar = ({markers}) => (
  <div className={classes.sidebar}>
    {markers.map((marker, i) =>
        marker.hidden ? null :
            <Marker key={i} id={marker.id} x={marker.x} y={marker.y} />)}
  </div>
)

const mapStateToProps = ({grid: {markers}}) => ({markers})

export default connect(mapStateToProps)(Sidebar)
