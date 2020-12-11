import React, { PureComponent } from 'react';
import styled from 'styled-components';
import headerImage from '../../assets/img/header.jpg'; 

// Components
import List from '../List/List';
import FilterRow from '../FilterRow/FilterRow';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';  
import { Container, Row } from 'react-bootstrap';

// Redux
import { connect } from 'react-redux';

class Main extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            renderKey: 0,                       // Need for rerender child component
            serviceList: [],                    // Original array include services
            resultList: [],                     // Result array after sorting and search
            searchValue: "",                    // Search string
            isLoad: false,                      // Data load indicator
            isAll: false,                       // Pagination end's indicator (if 'true' - we in end)
            renderCount: 9,                     // Elem-per-page counter
            currentValueSelect: {               // Default sorting value
                label: "по имени мастера",
                value: 1
            },
        }
    }

    searchHandler = (e) => {
        let { renderKey, serviceList, renderCount, isAll } = this.state;

        this.setState({
            searchValue: e.target.value,
            isLoad: false
        })

        // Result array
        let res = [];

        // If search string is empty - return original array
        // Else - let search
        if(e.target.value.length === 0){
            res = serviceList;
        } else {
            // We need use 'toLowerCase' for case-insensitive search
            // Search work for 'name', 'decription' and 'service' fields
            serviceList.forEach((service) => {
                if(service.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1){
                    res.push(service)
                    return
                }
                if(service.service.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1){
                    res.push(service)
                    return
                }
                if(service.description.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1){
                    res.push(service)
                    return
                }
            })
        }

        // Increment value for call rerender child component 'List'
        renderKey += 1;

        // Pagination check 
        // If array's length < elem-per-page counter - then we in end
        if(res.length <= renderCount){
            isAll = true
        } else {
            isAll = false
        }

        // Save results
        this.setState({
            resultList: res,
            renderKey: renderKey,
            isLoad: true,
            isAll: isAll
        })
    }

    filterList = (sortingVal) => {
        let { resultList, renderKey, renderCount, isAll } = this.state
        
        // Cases is a type of sorting (full list of types you can see in 'FilterRow' component)
        switch(sortingVal.value) {
            case 1:
                resultList.sort((a, b) => a.name > b.name ? 1 : -1);
                break;
            case 2: 
                resultList.sort((a, b) => Number(a.price) < Number(b.price) ? 1 : -1);
                break;
            case 3:
                resultList.sort((a, b) => Number(a.price) > Number(b.price) ? 1 : -1);
                break;
            case 4:
                resultList.sort((a, b) => a.time < b.time ? 1 : -1);
                break;
            case 5:
                resultList.sort((a, b) => a.time > b.time ? 1 : -1);
                break;            
        }     

        // Increment value for call rerender child component 'List'
        renderKey += 1;

        // Pagination check 
        // If array's length < elem-per-page counter - then we in end
        if(resultList.length <= renderCount){
            isAll = true
        } else {
            isAll = false
        }

        // Save results
        this.setState({
            resultList: resultList,
            renderKey: renderKey,
            isAll: isAll,
        });   
    }

    clickPagination = () => {
        let { resultList, renderCount, isAll, renderKey } = this.state;

        // Increase elem-per-page counter
        renderCount += 6;

        // Increase renderKey for call rerender 'List' component
        renderKey += 1;

        // Pagination check 
        // If array's length < elem-per-page counter - then we in end
        if(resultList.length <= renderCount){
            isAll = true
        } else {
            isAll = false
        }

        // Save results
        this.setState({
            isAll: isAll,
            renderCount: renderCount,
            renderKey: renderKey
        })
    }

    // Function for save filter's value 
    // and call filter function
    changeHandlerSelect = (val) => {
        this.filterList(val);
        this.setState({
            currentValueSelect: val
        })
    }

    componentDidMount = () => {
        // Start header animation
        setTimeout(() => {
            let elem = document.getElementById("first-header-title");
            elem.style.opacity = 1;
        }, 1000);
        setTimeout(() => {
            let elem = document.getElementById("second-header-title");
            elem.style.opacity = 1;
        }, 4000);

        // Get data from Redux store
        this.setState({
            serviceList: this.props.serviceList,
            resultList: this.props.serviceList,
            isLoad: true
        })
    }

    render() {
        let {currentValueSelect, resultList, isLoad, renderKey, renderCount, isAll, searchValue } = this.state
        
        return (
            <Container fluid style={{background: "#000328", color: "#000328"}}>
                <Row>
                    <HeaderImg src={headerImage} />
                    <FirstHeaderTitle id="first-header-title">
                        <FirstRow>Мы приветствуем Вас в самой лучшей парикмахерской!</FirstRow>
                    </FirstHeaderTitle>
                    <SecondHeaderTitle id="second-header-title">
                        <FirstRow>Вы можете выбрать услугу по фильтрам ниже</FirstRow>
                    </SecondHeaderTitle>
                </Row>                                 
                <FilterRow 
                    searchValue={searchValue} 
                    currentValue={currentValueSelect} 
                    handlerChange={this.changeHandlerSelect}
                    searchHandler={this.searchHandler}
                />  
                { isLoad ? 
                    <List 
                        serviceList={resultList} 
                        key={renderKey} 
                        renderCount={renderCount} 
                        isAll={isAll}
                        clickPagination={this.clickPagination}
                    /> 
                    : null 
                }                    
            </Container>
        )
    }
}

function mapStateToProps(state) {
    return {
      serviceList : state.servicesList,       
    }
}

export default connect(mapStateToProps, null)(Main);

const HeaderImg = styled.img`
    width: 100%;
    height: 85vh;

    @media(max-width: 768px) {
        height: 70vh;
    }
`;

const FirstHeaderTitle = styled.div`
    opacity: 0;
    transition: opacity 2s linear;

    min-width: 10%;
    min-height: 10%;
    width: 350px;
    height: 350px;
    background: rgba(255, 255, 255, 0.65);

    position: absolute;
    top: 10vh;
    left: 10%;
    border-radius: 50%;

    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 992px) {
        top: 100px;
        left: 150px;

        width: 300px;
        height: 300px;
    }

    @media (max-width: 768px) {
        top: 105px;
        left: 5px;

        width: calc(100% - 10px);
        height: 200px;
    }
`;

const SecondHeaderTitle = styled.div`
    opacity: 0;
    transition: opacity 2s linear;

    min-width: 20%;
    min-height: 20%;
    width: 400px;
    height: 400px;
    background: rgba(255, 255, 255, 0.65);

    position: absolute;
    top: 40vh;
    left: 30%;
    border-radius: 50%;

    text-align: center;

    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 992px) {
        top: 305px;
        left: 400px;

        width: 300px;
        height: 300px;
    }

    @media (max-width: 768px) {
        top: 325px;
        left: 5px;

        width: calc(100% - 10px);
        height: 200px;
    }
`;

const FirstRow = styled.p`
    text-align: center;

    font-weight: 600;
    font-size: 20px;
`;
