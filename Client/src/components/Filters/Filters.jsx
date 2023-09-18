// STYLES
import styles from './Filters.module.css';

// DEPENDENCIES
import {useState, useRef} from 'react';
import {useDispatch} from 'react-redux';

// ACTIONS
import {orderFilter, statusFilter, genderFilter} from '../../redux/actions/actions.js';

function Filters() {

    // HOOKS
    const dispatch = useDispatch();
    const genderRef = useRef();
    const orderRef = useRef();
    const statusRef = useRef();

    // STATES
    const initialFiltersState = {order: 'N', status: 'All', gender: 'All'};
    const [filtersState, setfiltersState] = useState(initialFiltersState);

    // HANDLERS
    const orderHandler = (e) => {
        setfiltersState({...filtersState, order: e.target.value});
        dispatch(orderFilter(e.target.value));
        if (filtersState.status !== 'All') dispatch(statusFilter(filtersState.status));
        if (filtersState.gender !== 'All') dispatch(genderFilter(filtersState.gender));
    }
    
    const statusHandler = (e) => {
        setfiltersState({...filtersState, status: e.target.value});
        dispatch(statusFilter(e.target.value));
        if (filtersState.gender !== 'All') dispatch(genderFilter(filtersState.gender));
        if (filtersState.order !== 'N') dispatch(orderFilter(filtersState.order));
    }

    const genderHandler = (e) => {
        setfiltersState({...filtersState, gender: e.target.value}); 
        dispatch(genderFilter(e.target.value)); 
        if (filtersState.status !== 'All') dispatch(statusFilter(filtersState.status));
        if (filtersState.order !== 'N') dispatch(orderFilter(filtersState.order));
    }

    const resetHandler = () => {
        setfiltersState(initialFiltersState)
        dispatch(orderFilter('N'));
        dispatch(statusFilter('All'));
        dispatch(genderFilter('All'));
        orderRef.current.value = 'N';
        statusRef.current.value = 'All';
        genderRef.current.value = 'All';
    }

    return (
        <>
            <div className={styles.filters}>
                <select ref={orderRef} onChange={orderHandler}>
                    <option value="N">No order</option>
                    <option value="A">Ascending</option>
                    <option value="D">Descending</option>
                </select>
                <select ref={statusRef} onChange={statusHandler}>
                    <option value="All">All status</option>
                    <option value="Alive">Alive</option>
                    <option value="Dead">Dead</option>
                    <option value="unknown">Unknown</option>
                </select>
                <select ref={genderRef} onChange={genderHandler}>
                    <option value="All">All genders</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Genderless">Genderless</option>
                    <option value="unknown">Unknown</option>
                </select>
                <button onClick={resetHandler}>Reset filters</button>
            </div>
        </>
    )
}

export default Filters;