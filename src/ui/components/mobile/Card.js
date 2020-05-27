// import liraries
import React, { Component } from 'react'
import { Text, Card, CardItem, Icon, Left, Body, View, Right } from 'native-base'
import { StyleSheet, Image } from 'react-native'
import _ from 'lodash';


// create a component
export default class AppCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            characterLength: 120
        }
    }
    renderCardHeader() {
        const { title } = this.props;
        return (
            <View>
                <Text>{title}</Text>
            </View>
        )
    }
    renderCardBody() {
        const { summary } = this.props
        return (
            <View>
                {summary ? <Text>{summary}</Text> : null}
            </View>
        )
    }

    render() {
        const {  avatar, size,name} = this.props
        return (
            <Card style={styles.cardContainer}>
                <CardItem>
                    <Left>
                        <Image style={{ height: 30, width: 30 }}
                            source={{
                                uri: avatar.avatar_url
                            }}
                        />
                        <Body>
                            {this.renderCardHeader()}
                        </Body>
                    </Left>
                </CardItem>
                <CardItem>
                    <Body>
                        {this.renderCardBody()}
                    </Body>
                </CardItem>
                <CardItem>
                    <Left>
                        <Icon active name="thumbs-up" />
                        <Text>{size}</Text>
                    </Left>
                    <Right>
                        <Icon active name="thumbs-up" />
                        <Text>{name}</Text>
                    </Right>
                </CardItem>
            </Card>
        )
    }
}
const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 20,
        elevation: 5
    },
    headerTextStylePrimary: {
        fontFamily: 'HelveticaNeue-Bold',
        fontSize: 16,
        color: '#808080'
    },
    headerTextStyleSecondary: {
        fontFamily: 'HelveticaNeue-Light',
        fontSize: 14,
        color: '#000000'
    },
    BodyTextStyle: {
        fontFamily: 'HelveticaNeue-Light',
        color: '#808080'
    },
    BodyTextActiveStyle: {
        fontFamily: 'HelveticaNeue-Light',
        color: '#FE9600',
        fontSize: 30,
    },
    cardItem: {
        paddingTop: 0,
        paddingBottom: 10,
    },
})
