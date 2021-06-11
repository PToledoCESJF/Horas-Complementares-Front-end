import React, { createContext, useReducer } from 'react'
import { activities } from '../util/data/database'

const initialState = { activities }
const ActivityContext = createContext({})

export const ActivityProvider = props => {

    const actions = {
        createActivity(state, action) {
            const activity = action.payload
            activity.id = Math.random()
            return {
                ...state,
                activities: [...state.activities, activity],
            }
        },
        updateActivity(state, action){
            const updated = action.payload
            return {
                ...state,
                activities: state.activities.map(a => a.id === updated.id ? updated : a)
            }
        },
        deleteActivity(state, action) {
            const activity = action.payload
            return {
                ...state,
                activities: state.activities.filter(a => a.id !== activity.id)
            }
        }
    }

    const reducer = (state, action) => {
        const fn = actions[action.type]
        return fn ? fn(state, action) : state
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <ActivityContext.Provider value={{ state, dispatch }}>
            {props.children}
        </ActivityContext.Provider>
    )
}

export default ActivityContext