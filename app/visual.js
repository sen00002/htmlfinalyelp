import React, {Component} from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, List, ListItem, Card, CardItem, Spinner, Thumbnail } from 'native-base';
import { connect } from "react-redux";
import * as actions from "./actions";
import MasterList from "./listmaster";
import { Image } from "react-native";

class Main extends Component {

    render() {
        let mainContent = {};
        let backButton = [];

        if(this.props.clickBack){
            mainContent = <MasterList/>;
        }
        else if(this.props.clickItem){

            let distance = Math.round((this.props.clickItem.distance / 1000) * 100) / 100;

            backButton =
                <Left>
                    <Button transparent onPress={this.props.backToList}>
                        <Icon active name="home" />
                    </Button>
                </Left>;

            mainContent =
                <Card  style={{backgroundColor: '#f7f7f7' }} >
                    <CardItem padder>
                        <Left>
                            <Body>
                            <Image source={{uri: this.props.clickItem.image_url}} style={{height: 247, width: null, flex: 1}}/>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem cardBody padder style={{ backgroundColor: '#34A34F' }} >
                        <Text full>{this.props.clickItem.name}</Text>
                    </CardItem>
                    <CardItem cardBody padder style={{ backgroundColor: '#34A34F' }} >
                        <Text full>{distance}km</Text>
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Text>Rating: {this.props.clickItem.rating}</Text>
                        </Left>
                        <Body>
                            <Text>Price: {this.props.clickItem.price}</Text>
                        </Body>
                        <Right>
                            <Text>{this.props.clickItem.phone}</Text>
                        </Right>
                    </CardItem>
                </Card>;

        }
        else if(this.props.clickFetching){
            mainContent = <Spinner/>;
        }
        else if(!this.props.data[0]) {
            mainContent = <Button full light onPress={this.props.fetchData}><Text>Load</Text></Button>;
        }
        else{
            mainContent = <MasterList/>;
        }

        return (
            <Container>
                <Header>
                    {backButton}
                    <Body>
                    <Title> htmlfinalyelp </Title>
                    </Body>
                </Header>
                <Content>
                    {mainContent}
                </Content>
                <Footer>
                    <FooterTab full>
                        <Button>
                            <Icon name="person" />
                            <Text> Rajat Sen</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.data,
        clickItem: state.clickItem,
        clickFetching: state.clickFetching,
        clickBack: state.clickBack,
        backToList: state.backToList,
        fetchData: state.fetchData
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: () => dispatch(actions.fetchData()),
        backToList: () => dispatch(actions.backToMasterList())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);