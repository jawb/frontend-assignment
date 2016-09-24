import React, {Component} from 'react'
import classes from './Marker.scss'
import {MARKER_TYPE} from '../../constants/dnd'
import {DragSource} from 'react-dnd'
import { connect } from 'react-redux'
import classNames from 'classnames'


export class Marker extends Component {
    render() {
        const {id, x, y, connectDragSource, isDragging} = this.props
        
        return connectDragSource(
            <div className={classNames(classes.marker, {[classes.dragging]: isDragging})}>
                Marker {id+1}: ({x}, {y})
            </div>
        )
    }
}

const collect = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
})

const specs = {
    beginDrag: ({id}) => ({id})
}

const DragSourceF = DragSource(MARKER_TYPE, specs, collect)

export default connect()(DragSourceF(Marker))
