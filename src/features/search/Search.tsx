import { unwrapResult } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { useAppDispatch } from '../../app/hooks'
import { SearchQuerySettings } from '../../services/search/types';
import { searchImage, searchUsers } from './searchSlice';
import SearchInput from '../../components/SearchInput';
import Pagination from '../../components/Pagination';
import UserList from '../../components/UserList';
import useDebounce from '../../hooks/useDebounce';


const Search = () => {
    const dispatch = useAppDispatch();
    const users = useSelector((state: RootState) => state.search.users);
    
    const [keyword, setKeyword] = useState('');
    const [loading, setLoading] = useState(false);
    const [firedOnce, setFiredOnce] = useState(false);
    const [resultCount, setResultCount] = useState(0);

    const [page, setPage] = useState(1);
    const maxResults = 10;

    const debouncedKeyword = useDebounce(keyword, 800);

    useEffect(() => {
        setLoading(true)
        setFiredOnce(true);
        let qs: SearchQuerySettings = {
            startIndex: page - 1/* + resultCount*/,
            maxResults,
        }
        if(firedOnce && debouncedKeyword && debouncedKeyword.length >= 3){
            qs.terms = debouncedKeyword
        }
        dispatch(searchUsers(qs)).then(unwrapResult).then(res => {
            setLoading(false);
            setResultCount(res?.length || 0);
            if (res) {
                for (let k = 0; k < res.length; k++) {
                    const data = res[k];
                    dispatch(searchImage(parseInt(data.image_id)));
                }
            }
        }).catch(err => {
            console.error(err);
            setLoading(false);

        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, page, debouncedKeyword/*, keyword*/])


    /***Pagination handlers */

    const updatePage = (value: number) => {
        setPage(value);
    };


    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        let value = e.target.value;
        setKeyword(value);
    };

    return (
        <>
            <div className="search-params">
            <SearchInput handleChange={handleTextChange} value={keyword} placeholder="Start typing..." />
            {firedOnce && (
                <Pagination currentPage={page}
                    totalCount={resultCount}
                    pageSize={maxResults}
                    onPageChange={updatePage}
                    disabledNavigation={false} />

            )}
            <div>{loading ? 'Loading...' :  null }</div>
            </div>
            <UserList users={users} />
            {!loading && firedOnce ? (<p>{`Loaded ${resultCount} result`}</p>) : null}

        </>
    )
}

export default Search