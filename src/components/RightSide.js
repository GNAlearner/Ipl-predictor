import React from 'react'
import data from '../results.json';

const RightSide = ({ remaining }) => {

    const teams = ['CSK', 'DC', 'GT', 'KKR', 'LSG', 'MI', 'PBKS', 'RCB', 'RR', 'SRH'];

    const finalData = [...data, ...remaining];

    const oversToBalls = (overs) => {
        const wholeOvers = Math.floor(overs);
        const decimalOvers = overs - wholeOvers;
        const totalBalls = (wholeOvers * 6) + (decimalOvers * 10);
        return totalBalls;
    }

    const pointsTable = teams.map(team => {
        const res = {
            name: team,
            played: 0,
            won: 0,
            drawn: 0,
            points: 0,
            run_rate: 0
        }
        let run_scored = 0;
        let balls_taken = 0;
        let run_given = 0;
        let balls_bowled = 0;
        finalData.forEach(mat => {
            if (!mat.error) {
                if (mat.home_team === team) {
                    res.played = res.played + 1;
                    run_scored = run_scored + mat.home_team_score;
                    if (mat.home_team_wickets === 10) {
                        balls_taken = balls_taken + 120;
                    } else {
                        balls_taken = balls_taken + oversToBalls(mat.home_team_overs);
                    }
                    run_given = run_given + mat.away_team_score;
                    if (mat.away_team_wickets === 10) {
                        balls_bowled = balls_bowled + 120;
                    } else {
                        balls_bowled = balls_bowled + oversToBalls(mat.away_team_overs);
                    }
                    if (mat.home_team_score > mat.away_team_score) {
                        res.won = res.won + 1;
                        res.points = res.points + 2;
                    }
                } else if (mat.away_team === team) {
                    res.played = res.played + 1;
                    run_scored = run_scored + mat.away_team_score;
                    if (mat.away_team_wickets === 10) {
                        balls_taken = balls_taken + 120;
                    } else {
                        balls_taken = balls_taken + oversToBalls(mat.away_team_overs);
                    }
                    run_given = run_given + mat.home_team_score;
                    if (mat.home_team_wickets === 10) {
                        balls_bowled = balls_bowled + 120;
                    } else {
                        balls_bowled = balls_bowled + oversToBalls(mat.home_team_overs);
                    }
                    if (mat.away_team_score > mat.home_team_score) {
                        res.won = res.won + 1;
                        res.points = res.points + 2;
                    }
                } else if ((mat.home_team === team || mat.away_team === team) && mat.home_team_score === mat.away_team_score) {
                    res.drawn = res.drawn + 1;
                    res.points = res.points + 1;
                }
            }
        })
        res.run_rate = ((run_scored / (balls_taken / 6)) - (run_given / (balls_bowled / 6)));
        return res;
    })

    pointsTable.sort((a, b) => {
        if (b.points !== a.points) {
            return b.points - a.points;
        } else {
            return b.run_rate - a.run_rate;
        }
    });

    return (
        <div className='p-2'>
            <div className='d-flex border-bottom'>
                <div className='w-25 m-1 px-2'>Teams</div>
                <div className='w-25 text-center'>Played</div>
                <div className='w-25 ms-5 text-center'>Won</div>
                <div className='w-25 ms-5 text-center'>Drawn</div>
                <div className='w-25 ms-5 text-center'>Points</div>
                <div className='w-25 ms-5 text-center'>Net Run Rate</div>
            </div>
            {pointsTable.map((team, index) => <div className='d-flex' key={index}>
                <div className={`${team.name} text-center w-25 m-1 px-2`}>{team.name}</div>
                <div className='w-25 text-center'>{team.played}</div>
                <div className='w-25 ms-5 text-center'>{team.won}</div>
                <div className='w-25 ms-5 text-center'>{team.drawn}</div>
                <div className='w-25 ms-5 text-center'>{team.points}</div>
                <div className='w-25 ms-5 text-center'>{team.run_rate.toFixed(3)}</div>
            </div>)}
        </div>
    )
}

export default RightSide