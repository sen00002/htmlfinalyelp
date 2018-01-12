import React, {Component} from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, List, ListItem, Spinner } from 'native-base';
import { connect } from "react-redux";
import ListItems from "./listitems";

class listmaster extends Component {

    render() {
        let finallist = this.props.data.slice(0);
        finallist.sort(function(a, b){
            return a.distance - b.distance;
        });
        const slist = finallist.map((item) => {
            return (
                <ListItems {...item} key={item.id}/>
            );
        });

        return (
            <List>
                {slist}
            </List>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.data
    };
};

export default connect(mapStateToProps)(listmaster);