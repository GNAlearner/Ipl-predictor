import React from 'react'
import results from '../results.json';

const LeftSide = ({ remaining, setRemaing }) => {

    const handleChange = (e, index) => {
        const tempData = [ ...remaining ];
        tempData[index][e.target.name] = Number(e.target.value);
        const currentMatch = tempData[index];
        if(!currentMatch.home_team_score || isNaN(currentMatch.home_team_score) || currentMatch.home_team_score < 0 || currentMatch.home_team_score > 300 ||
            currentMatch.home_team_score % 1 > 0){
            tempData[index]['result'] = 'Please enter valid home team score'
            tempData[index]['error'] = true;
        } else if(!currentMatch.home_team_wickets || isNaN(currentMatch.home_team_wickets) || currentMatch.home_team_wickets < 0 || currentMatch.home_team_wickets > 10 ||
            currentMatch.home_team_wickets % 1 > 0){
            tempData[index]['result'] = 'Please enter valid home team wickets'
            tempData[index]['error'] = true;
        } else if(!currentMatch.home_team_overs || isNaN(currentMatch.home_team_overs) || currentMatch.home_team_overs < 0 || currentMatch.home_team_overs > 20 ||
            (currentMatch.home_team_overs < 10 && currentMatch.home_team_overs.toString().length > 3) ||
            (currentMatch.home_team_overs > 10 && currentMatch.home_team_overs.toString().length > 4) ||
            (currentMatch.home_team_overs - Math.floor(currentMatch.home_team_overs)) * 10 > 5){
            tempData[index]['result'] = 'Please enter valid home team overs'
            tempData[index]['error'] = true;
        } else if(!currentMatch.away_team_score || isNaN(currentMatch.away_team_score) || currentMatch.away_team_score < 0 || currentMatch.away_team_score > 300 ||
            currentMatch.away_team_score % 1 > 0){
            tempData[index]['result'] = 'Please enter valid away team score'
            tempData[index]['error'] = true;
        } else if(!currentMatch.away_team_wickets || isNaN(currentMatch.away_team_wickets) || currentMatch.away_team_wickets < 0 || currentMatch.away_team_wickets > 10 ||
            currentMatch.away_team_wickets % 1 > 0){
            tempData[index]['result'] = 'Please enter valid away team wickets'
            tempData[index]['error'] = true;
        } else if(!currentMatch.away_team_overs || isNaN(currentMatch.away_team_overs) || currentMatch.away_team_overs < 0 || currentMatch.away_team_overs > 20 ||
            (currentMatch.away_team_overs < 10 && currentMatch.away_team_overs.toString().length > 3) ||
            (currentMatch.away_team_overs > 10 && currentMatch.away_team_overs.toString().length > 4) ||
            (currentMatch.away_team_overs - Math.floor(currentMatch.away_team_overs)) * 10 > 5){
            tempData[index]['result'] = 'Please enter valid away team overs'
            tempData[index]['error'] = true;
        } else if(currentMatch.home_team_score > currentMatch.away_team_score) {
            tempData[index]['result'] = `${currentMatch.home_team} wins`
            tempData[index]['error'] = false;
        } else if(currentMatch.home_team_score < currentMatch.away_team_score) {
            tempData[index]['result'] = `${currentMatch.away_team} wins`
            tempData[index]['error'] = false;
        } else {
            tempData[index]['result'] = 'Match will drawn'
            tempData[index]['error'] = false;
        }
        setRemaing(tempData)
    }

    return (
        <div className='main overflow-y-scroll'>
            <div className='d-flex m-2'>
                <div className='px-2 mx-1 match-no'>M.No</div>
                <div className='w-25 text-center'>Home Team</div>
                <div className='w-25 text-center'>Away Team</div>
                <div className='w-25 text-center'>Result</div>
            </div>
            {results.map(res => <div className='d-flex text-dark m-2' key={res.match_no}>
                <div className='bg-white p-2 m-1 text-center match-no'>{res.match_no}</div>
                <div className={`${res.home_team} p-2 m-1 w-25 fw-bold text-center`}>{res.home_team}</div>
                <div className={`${res.away_team} p-2 m-1 w-25 fw-bold text-center`}>{res.away_team}</div>
                <div className='text-white p-2 m-1 w-25 fw-bold text-nowrap'>{res.result}</div>
            </div>)}
            <div className='m-3 text-center'>Enter the scores of both teams to predict the final points table</div>
            <div className='d-flex align-items-center m-2'>
                <div className='m-1 match-no'>M.No</div>
                <div className='w-25 text-center'>Teams</div>
                <div className='mx-5 text-center'>Score</div>
                <div>Overs</div>
                <div className='w-25 mx-auto'>Result</div>
            </div>
            {remaining.map((sch, index) => <div className='d-flex text-dark m-2' key={sch.match_no}>
                <div className='bg-white p-2 m-1 text-center match-no'>{sch.match_no}</div>
                <div className='w-25'>
                    <div className={`${sch.home_team} p-2 m-1 fw-bold text-center`}>{sch.home_team}</div>
                    <div className={`${sch.away_team} p-2 m-1 fw-bold text-center`}>{sch.away_team}</div>
                </div>
                <div>
                    <div>
                        <input className='m-1 p-1 score' name='home_team_score' value={sch.home_team_score} onChange={(e)=> handleChange(e, index)} />
                        <span className='text-white'>-</span>
                        <input className='m-1 p-1 match-no' name='home_team_wickets' value={sch.home_team_wickets} onChange={(e)=> handleChange(e, index)} />
                    </div>
                    <div>
                        <input className='m-1 p-1 score' name='away_team_score' value={sch.away_team_score} onChange={(e)=> handleChange(e, index)} />
                        <span className='text-white'>-</span>
                        <input className='m-1 p-1 match-no' name='away_team_wickets' value={sch.away_team_wickets} onChange={(e)=> handleChange(e, index)} />
                    </div>
                </div>
                <div>
                    <div>
                        <input className='m-1 ms-3 p-1 score' name='home_team_overs' value={sch.home_team_overs} onChange={(e)=> handleChange(e, index)} />
                    </div>
                    <div>
                        <input className='m-1 ms-3 p-1 score' name='away_team_overs' value={sch.away_team_overs} onChange={(e)=> handleChange(e, index)} />
                    </div>
                </div>
                <div className={`${sch.error ? 'text-warning' : 'text-white'} p-2 m-1 w-25 fw-bold`}>{sch.result}</div>
            </div>)}
        </div>
    )
}

export default LeftSide