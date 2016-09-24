import cloneDeep from 'lodash/cloneDeep'
import flatten from 'lodash/flatten'


const calculateCorrectness = (markers, grid) => {
    const filledSquares = flatten(grid).filter(square => square.filled !== false)
    if (filledSquares.length < 4) return false
    return filledSquares.reduce((p, c, i)  => {
        if (!p) return false
        const marker = markers[c.filled]
        return c.x === marker.x && c.y === marker.y
    })
}

// ------------------------------------
// Constants
// ------------------------------------
export const DROP_MARKER = 'DROP_MARKER'
export const DELETE_MARKER = 'DELETE_MARKER'

// ------------------------------------
// Actions
// ------------------------------------
export const dropMarker = (id, x, y) => ({
    type: DROP_MARKER,
    id, x, y
})

export const deleteMarker = (x, y, id) => ({
    type: DELETE_MARKER,
    x, y, id
})

export const actions = {
    dropMarker,
    deleteMarker
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {

    [DROP_MARKER]: (state, action) => {
        const {id, x, y} = action
        const {markers, grid} = state
        const cloneMarkers = [...markers]
        cloneMarkers[id].hidden = true
        const cloneGrid = cloneDeep(grid)
        cloneGrid[y][x].filled = id
        return {
            ...state,
            markers: cloneMarkers,
            grid: cloneGrid,
            correct: calculateCorrectness(cloneMarkers, cloneGrid)
        }
    },

    [DELETE_MARKER]: (state, action) => {
        const {id, x, y} = action
        const {markers, grid} = state
        const cloneMarkers = [...markers]
        cloneMarkers[id].hidden = false
        const cloneGrid = cloneDeep(grid)
        cloneGrid[y][x].filled = false

        return {
            ...state,
            markers: cloneMarkers,
            grid: cloneGrid,
            correct: calculateCorrectness(cloneMarkers, cloneGrid)
        }
    }
}


// ------------------------------------
// Reducer
// ------------------------------------

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const createState = (size, numberOfMarkers) => {
    const markers = [...Array(numberOfMarkers).keys()].map(x =>
        ({id: x, x: getRandomInt(0, size-1), y:getRandomInt(0, size-1)}))
    
    const grid = [...Array(10).keys()].map(y =>
                    [...Array(10).keys()].map(x => 
                        ({x, y, filled: false})))

    return {grid, markers, correct: false}
}

const initialState = createState(10, 4)

export default (state = initialState, action) => {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
