import React, { useState } from 'react'
import LeftSide from './LeftSide'
import RightSide from './RightSide'
import schedule from '../schedule.json';

const Main = () => {

    const [remaining, setRemaing] = useState(schedule.map(sch => {
        return {
            ...sch,
            home_team_score: '',
            home_team_wickets: '',
            home_team_overs: '',
            away_team_score: '',
            away_team_wickets: '',
            away_team_overs: '',
            result: '',
            error: true
        }
    }))
  return (
    <div className='text-white d-flex'>
        <div className='w-50 bg-tertiary'>
            <LeftSide remaining={remaining} setRemaing={setRemaing} />
        </div>
        <div className='w-50 bg-tertiary'>
            <RightSide remaining={remaining} setRemaing={setRemaing} />
        </div>
    </div>
  )
}

export default Main