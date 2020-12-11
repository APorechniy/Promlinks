import React, { PureComponent } from 'react';
import styled from 'styled-components';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';  
import { Row, Col, Button, Modal } from 'react-bootstrap';


class List extends PureComponent {
    constructor(props){
        super(props);

        this.state = {
            // Data for render modal
            isOpenModal: false,
            modalContent: {},
        }
    }

    showModal = (service) => {
        this.setState({
            isOpenModal: true,
            modalContent: service,
        })
    }

    closeModal = () => {
        this.setState({
            isOpenModal: false,
        })
    }

    render() {
        let { serviceList, 
              renderCount, 
              isAll, 
              clickPagination 
            } = this.props;

        let { isOpenModal, 
              modalContent 
            } = this.state;
        
        return (
            <Row>
                { serviceList.length > 0 ? 
                    serviceList.map((service, index) => {
                        if(index < renderCount) { 
                            return (
                                <Col lg={4} md={4} xs={12} key={service.id} style={{ marginTop: "15px"}}>
                                    <Card onClick={e => this.showModal(service)}>
                                        <Name>Мастер: {service.name}</Name>
                                        <Service>Название услуги: {service.service}</Service>
                                        <Price>Цена: {service.price} ₽</Price>
                                    </Card>
                                </Col>
                            )
                        } else {
                            return null
                        }
                    })
                    :
                    <EmptyList>
                        <h2>По Вашему запросу ничего не найдено :(</h2>
                     
                        <h3>Пожалуйста, попробуйте ещё раз...</h3>
                    </EmptyList>
                }
                { !isAll ? 
                    <Col lg={{span: 4, offset: 4}} md={{span: 4, offset: 4}} 
                        style={{ 
                            marginTop: "3vh", 
                            marginBottom: "3vh", 
                            display: "flex", 
                            justifyContent: "center"
                    }}>
                        <Button 
                            variant="outline-primary" 
                            style={{ width: "90%", height: "50px" }}
                            onClick={clickPagination}
                        >
                            Показать ещё
                        </Button> 
                    </Col>
                    :
                    <Col lg={{span: 6, offset: 3}} md={{span: 6, offset: 3}} style={{ 
                            marginTop: "3vh", 
                            marginBottom: "3vh", 
                            display: "flex", 
                            flexDirection: "column", 
                            justifyContent: "center", 
                            color: "white",
                            textAlign: "center"
                        }}>
                        <h1>Не нашли то, что Вам нужно?</h1>
                        <h2>Обратитесь к менеджеру по телефону 8(800)-555-35-35</h2>
                    </Col>
                }
                <Modal show={isOpenModal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                    <Modal.Title>{modalContent.service}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Name>Мастер: {modalContent.name}</Name>
                        <Description>{modalContent.description}</Description>
                        <Price>Цена: {modalContent.price} ₽</Price>
                        <Time>Время работы: {modalContent.time < 1 ? 'меньше часа' : (modalContent.time + ' ч.')}</Time>
                    </Modal.Body>
                </Modal>
            </Row>
        )
    }   
}

export default List;

const Card = styled.div`
    height: 30vh;
    margin-top: 2vh;

    background: white;

    border-radius: 20px;
    box-shadow: 0 0 5px 2px white;

    text-align: left;
    padding-left: 5%;
    padding-top: 5%;

    color: #000328;
    cursor: pointer;
`;

const Name = styled.h1`
    font-size: 30px;
    font-weight: 700;
    font-style: bold;
`;

const Service = styled.h2`
    font-size: 20px;
    font-weight: 500;
    font-style: normal;
    
    margin-top: 7%;
`;

const Description = styled.h2`
    font-size: 20px;
    font-weight: 500;
    font-style: normal;

    margin-top: 7%;
`;

const Time = styled.h2`
    font-size: 20px;
    font-weight: 500;
    font-style: bold;
`;

const Price = styled.h2`
    font-size: 20px;
    font-weight: 500;
    font-style: bold;
    margin-top: 7%;
`;

const EmptyList = styled.div`
    width: 100%;
    height: 500px;

    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    flex-direction: column;

    color: white;
`;