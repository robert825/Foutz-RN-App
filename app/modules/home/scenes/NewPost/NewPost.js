
import React from 'react';
import { View, TextInput, ScrollView, TouchableHighlight } from 'react-native';

import {Actions} from 'react-native-router-flux'
import {connect} from 'react-redux';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import styles from "./styles"

const colors = [
    "#EB623A", "#FF553F", "#4F6384", "#E9C9B4", "#F7CDC2",
    "#EFDFC8", "#4E57D4", "#E6A78C",
    "#FE7D72", "#5096CF", "#F99B70", "#646A6A",
]

class NewPost extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: (props.edit) ? props.post.text : "",
            color: (props.edit) ? props.post.color : "#0000FF",
            //title: (props.edit) ? props.post.title: ""
        };

        this.onChangeText = this.onChangeText.bind(this);
        this.onSelectColor = this.onSelectColor.bind(this);
    }

    componentDidMount() {
        Actions.refresh({showButton: false});
    }

    onChangeText(text) {
        const { color } = this.state;

        const showButton = (text.trim().length > 0);

        const edit = (this.props.edit); //check if in edit mode

        let data = {text, color, edit, title}

        if (edit) data['post'] = this.props.post;

        this.setState({text})

        Actions.refresh({showButton, data});
    }

    onSelectColor(color) {
        this.setState({color});
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <TextInput
                        multiline={false}
                        onChangeText={this.onChangeText}
                        placeholder={"Enter title"}
                        style={[styles.textInput, {backgroundColor: "#FFFFFF"}]}
                        value={this.state.title}
                        autoFocus={true}
                        placeholderTextColor={"#000000"}
                    />
                </View>
                <View style={styles.topContainer}>
                    <TextInput
                        multiline={true}
                        onChangeText={this.onChangeText}
                        placeholder={"Write your post here"}
                        style={[styles.textInput, {backgroundColor: "#FFFFFF"}]}
                        value={this.state.text}
                        autoFocus={true}
                        placeholderTextColor={"#000000"}
                    />
                </View>
                {/* <View style={styles.bottomContainer}>
                    <ScrollView contentContainerStyle={{alignItems:"center"}}
                                horizontal showsHorizontalScrollIndicator={false}>
                        {
                            colors.map((color, idx) => {
                                return (
                                    <TouchableHighlight
                                        key={idx}
                                        underlayColor={"transparent"}
                                        onPress={() => this.onSelectColor(color)}>
                                        <View style={[
                                            styles.color,
                                            {backgroundColor: color},
                                            (this.state.color === color) && {borderWidth: 3, borderColor: "white"}
                                        ]}/>
                                    </TouchableHighlight>
                                )
                            })
                        }
                    </ScrollView>
                    </View> */}
                <KeyboardSpacer />
            </View>
        );
    }
}

export default connect(null, {})(NewPost);