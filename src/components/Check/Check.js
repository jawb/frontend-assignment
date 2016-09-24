import React from 'react'
import { IndexLink, Link } from 'react-router'
import classes from './Check.scss'
import { connect } from 'react-redux'


export const Check = ({correct}) => (
  <div>
    {correct ?
        <h1 className='text-success'><i className='glyphicon glyphicon-ok' /> Correct</h1>
    :
        <h1 className='text-danger'><i className='glyphicon glyphicon-remove' /> Wrong !</h1>
    }
  </div>
)

const mapStateToProps = ({grid: {correct}}) => ({correct})

export default connect(mapStateToProps)(Check)
