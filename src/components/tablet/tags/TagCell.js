import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Text } from 'react-native'
import { Colors, Metrics } from '../../../utils'
import tinycolor from 'tinycolor2';

class TagCell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tag: this.props.tag,
        }
    }

    onChangeTitle = (newTitle) => {
        let newTag = this.state.tag;
        newTag['title'] = newTitle;
        this.setState({
            tag: newTag
        })
    }
    componentDidMount() {
        const { tag, editId, editing } = this.props;
        if (editing && tag.id === editId) {
            this.textInputRef.focus();
        }
    }

    render() {
        const { topRightIcon, topRightOnPress, bottomRightIcon, bottomRightOnPress, bottomLeftIcon, bottomLeftOnPress, editId, editing } = this.props;
        const { tag } = this.state;
        const isEditable = editing && tag.id === editId;

        let cellColor = tag.color ? tag.color : Colors.tagColors[Math.floor(Math.random() * 5)];
        cellColor = editing ? (tag.id === editId ? cellColor : Colors.deactivated) : cellColor;
        const colorObj = tinycolor(cellColor);
        const cellColorHex = colorObj.toHexString();

        const borderColor = { borderColor: cellColorHex }

        return (
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={40}>
            <View
                style={[styles.cardBox, borderColor]}
                elevation={5}>
                <View style={styles.cardInner}>
                    {isEditable ?
                        (<TextInput
                            ref={(input) => { this.textInputRef = input; }}
                            style={styles.cardText}
                            onChangeText={(this.onChangeTitle)}
                            value={tag.title}
                            placeholder="New Tag"
                            multiline={true}
                            editable={isEditable}
                            autoFocus={isEditable}
                        // maxHeight={60}
                        />) :
                        (<Text style={styles.cardText}>
                            {tag.title}
                        </Text>)
                    }
                </View>
                {/* Top right button */}
                {isEditable &&
                    <TouchableOpacity
                        onPress={() => { topRightOnPress(tag) }}
                        style={styles.topRightButton}
                        hitSlop={{ top: 20, bottom: 25, left: 25, right: 25 }}
                        disabled={!(isEditable)}
                    >
                        <View style={styles.topRightButtonColor}>
                            <View
                                style={[styles.topRightButtonShape, { borderBottomColor: cellColorHex }]}
                            />
                        </View>
                        <View style={styles.topRightIconStyle}>
                            {topRightIcon()}
                        </View>
                    </TouchableOpacity>
                }
                {/* Bottom left button */}
                {isEditable &&
                    <TouchableOpacity
                        onPress={() => { bottomLeftOnPress(tag) }}
                        style={styles.bottomLeftButton}
                        hitSlop={{ top: 20, bottom: 25, left: 25, right: 25 }}
                        disabled={!(isEditable)}
                    >
                        <View style={styles.bottomLeftButtonColor}>
                            <View
                                style={[styles.bottomLeftButtonShape, { borderBottomColor: cellColorHex }]}
                            />
                        </View>
                        <View style={styles.bottomLeftIconStyle}>
                            {bottomLeftIcon()}
                        </View>
                    </TouchableOpacity>
                }
                {/* Bottom right button */}
                <TouchableOpacity
                    onPress={() => {
                        bottomRightOnPress(tag);
                    }}
                    style={styles.bottomRightButton}
                    hitSlop={{ top: 10, bottom: 25, left: 25, right: 25 }}>
                    <View style={styles.bottomRightButtonColor}>
                        <View
                            style={[styles.bottomRightButtonShape, { borderTopColor: cellColorHex }]}
                        />
                    </View>
                    <View style={styles.bottomRightIconStyle}>
                        {bottomRightIcon()}
                    </View>
                </TouchableOpacity>
            </View>
            </KeyboardAvoidingView>

        )
    }
}

const styles = StyleSheet.create({
    cell: {
        justifyContent: 'center'
    },
    coloredLine: {
        width: '100%',
        borderWidth: 1,
        position: 'absolute',
        top: 45.5
    },
    cardBox: {
        position: 'absolute',
        left: 26, // 25 +1
        width: 150,
        height: 80,
        backgroundColor: 'hsl(210, 36%, 96%)', // gray-9
        borderWidth: 3,
        borderRadius: Metrics.cornerRadius,
        padding: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        overflow: 'hidden',

    },
    cardInner: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: Metrics.baseMargin / 2,
        paddingVertical: Metrics.baseMargin / 6,
    },
    cardText: {
        flex: 1,
        flexWrap: 'wrap',
        fontSize: 16,
        textAlign: 'center',
        height: 60

    },
    /* Bottom right button */
    bottomRightButton: {
        marginTop: 'auto',
        alignSelf: 'flex-end'
    },
    bottomRightButtonColor: {
        position: 'absolute',
        bottom: -4,
        right: -4,
        transform: [{ rotate: '180deg' }]
    },
    bottomRightButtonShape: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderRightWidth: 30,
        borderTopWidth: 30,
        borderRightColor: 'transparent',
        borderTopColor: 'red'
    },
    bottomRightIconStyle: {
    },

    /* Top right button */
    topRightButton: {
        position: 'absolute',
        marginTop: 'auto',
        alignSelf: 'flex-end',
    },
    topRightButtonColor: {
        position: 'absolute',
        top: 0,
        right: 0,
        transform: [{ rotate: '180deg' }]
    },
    topRightButtonShape: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderRightWidth: 30,
        borderBottomWidth: 30,
        borderRightColor: 'transparent',
        borderTopColor: 'red',
        borderBottomColor: 'red'
    },
    topRightIconStyle: {
        bottom: -4,
        right: 4
    },
    /* Bottom left button */
    bottomLeftButton: {
        marginTop: 'auto',
        alignSelf: 'flex-start',
    },
    bottomLeftButtonColor: {
        position: 'absolute',
        top: -13,
        left: -4,
        transform: [{ rotate: '90deg' }]
    },
    bottomLeftButtonShape: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 30,
        borderBottomWidth: 30,
        borderLeftColor: 'transparent',
        borderTopColor: 'red',
        borderBottomColor: 'red'
    },
    bottomLeftIconStyle: {
        bottom: -1,
        left: -1,
    }
})

TagCell.propTypes = {
    // tags: PropTypes.array.isRequired,
    // actions: PropTypes.object.isRequired,
    // navigation: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
    return {
        // tags: selectors.sortedTagsSelector(state),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        //         actions: bindActionCreators(actions.tag, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TagCell)
