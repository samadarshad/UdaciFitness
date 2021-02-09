import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { white } from '../utils/colors'
import MetricCard from './MetricCard'

class EntryDetail extends Component {

    componentDidMount() {
        this.setTitle(this.props.route.params.entryId);
    }

    setTitle = (entryId) => {
        if (!entryId) return;
        const year = entryId.slice(0, 4)
        const month = entryId.slice(5, 7)
        const day = entryId.slice(8)

        this.props.navigation.setOptions({
            title: `${month}/${day}/${year}`
        });
    };

    render() {
        const { entryId, metrics } = this.props
        return (
            <View style={styles.container}>
                <MetricCard metrics={metrics} date={entryId} />
                <Text> Entry Detail - {JSON.stringify(entryId)} </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        padding: 15,
    }
})

function mapStateToProps(state, { route }) {
    const { entryId } = route.params
    return {
        entryId,
        metrics: state[entryId][0]
    }
}

export default connect(mapStateToProps)(EntryDetail)