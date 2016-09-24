import React, {Component} from 'react'
import classes from './Square.scss'
import classNames from 'classnames'
import { connect } from 'react-redux'
import {DropTarget} from 'react-dnd'
import {MARKER_TYPE} from '../../constants/dnd'
import {actions} from '../../store/grid'


export class Square extends Component {
    deleteMarker = () => {
        const {x, y, filled} = this.props
        this.props.dispatch(actions.deleteMarker(x, y, filled))
    }

    render() {
        const {x, y, filled, connectDropTarget, isOver} = this.props
        
        return connectDropTarget(
            <div className={classNames(classes.square, {[classes.active]: isOver})}>
                {filled !== false ?
                    <div className={classes.marker} title="Delete" onClick={this.deleteMarker}>
                    <i className="glyphicon glyphicon-trash" /> Marker {filled+1}</div>
                : 
                    <div className={classes.text}>({x},{y})</div>
                }
            </div>
        )
    }
}

const dropSpecs = {
    drop(props, monitor, component) {
        const {id} = monitor.getItem()
        props.dispatch(actions.dropMarker(id, props.x, props.y))
    },

    canDrop(props, monitor) {
        return props.filled === false
    }
}

const DropTargetF = DropTarget(MARKER_TYPE, dropSpecs, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
}))

export default connect()(DropTargetF(Square))
