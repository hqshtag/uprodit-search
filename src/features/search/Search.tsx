import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../app/hooks'
import {  searchUsers } from './searchSlice';

type Props = {}

const Search = (props: Props) => {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false)
    const [firedOnce, setFiredOnce] = useState(false);
    const [resultCount, setResultCount] = useState(0);

    useEffect(() => {
        setLoading(true)
        setFiredOnce(true);
        dispatch(searchUsers({
            usecase: 'perso',
            startIndex: 0,
            maxResults: 2,
            keyword: ''
        })).then(unwrapResult).then(res=>{
            setLoading(false);
            setResultCount(res?.length || 0);
        })
        
        console.log('i fire once');
    }, [dispatch])

    return (
        <>
            <div>{loading ? 'Searching...' : 'Search Complete'}</div>
            {!loading && firedOnce ? (<p>{`Loaded ${resultCount} result`}</p>) : null}
        </>
        )
}

export default Search