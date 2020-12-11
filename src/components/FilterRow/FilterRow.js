import React, { PureComponent } from 'react';
import styled from 'styled-components';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';  
import { Row, Col, InputGroup, FormControl } from 'react-bootstrap';

// Select lib
import Select from 'react-select';


class FilterRow extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            // Filter options
            options: [
                {
                    label: "по имени мастера",
                    value: 1
                },
                {
                    label: "по цене (по убыванию)",
                    value: 2
                },
                {
                    label: "по цене (по возрастанию)",
                    value: 3
                },
                {
                    label: "по времени работы (по убыванию)",
                    value: 4
                },
                {
                    label: "по времени работы (по возрастанию)",
                    value: 5
                }
            ]
        }
    }

    render() {
        let { options } = this.state;

        let { currentValue, 
              handlerChange, 
              searchHandler, 
              searchValue 
            } = this.props;
        
        return (
            <Row style={{minHeight: "15vh"}}>   
                <Col lg={{ span: 3, offset: 1}} md={{ span: 6, offset: 0}} xs={12}>
                    <Type>
                        Сортировать
                    </Type>
                    <Select
                        className="basic-single"
                        classNamePrefix="select"
                        defaultValue={currentValue}
                        value={currentValue}
                        isSearchable={true}
                        name="color"
                        options={options}
                        onMenuClose={this.scrollToTop}
                        onChange={(val) => handlerChange(val)}
                    />
                </Col>
                <Col lg={{ span: 3, offset: 3}} md={{ span: 6, offset: 0}} xs={12}>
                    <Type>
                        Ищите и обрящете
                    </Type>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text>Поиск</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            onChange={searchHandler}
                            value={searchValue}
                        />
                    </InputGroup>
                </Col>
            </Row>
        )
    }   
}

export default FilterRow;

const Type = styled.h3`
    margin-top: 2vh;
    color: white;
`;