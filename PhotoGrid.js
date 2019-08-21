'use strict';

import React, { Component } from 'react';
import {
    Dimensions,
    FlatList,
    StyleSheet,
    View,
} from 'react-native';

let styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    }
});

class PhotoGrid extends React.Component {

    constructor() {
        super();
    }

    buildRows(items, itemsPerRow = 3) {
        return items.reduce((rows, item, idx) => {
            // If a full row is filled create a new row array
            if(idx % itemsPerRow === 0 && idx > 0) rows.push([]);
            rows[rows.length-1].push(item);
            return rows;
        }, [[]]);
    }

    _handleLoadMore = () =>{
        this.props.onEndReached();
    }

    _keyExtractor(item, index) {
        return index.toString();
      }

    render() {
        let rows = this.buildRows(this.props.data, this.props.itemsPerRow);
        return (
            <FlatList
                { ...this.props }
                data = { rows }
                renderItem = { this.renderItem.bind(this) }
                style = {{ flex: 1 }}
                keyExtractor={this._keyExtractor.bind(this)}
                onEndReached={this._handleLoadMore}
                onEndReachedThreshold={0.5} />
        );
    }

    renderItem(items) {
        // Calculate the width of a single item based on the device width
        // and the desired margins between individual items
        let deviceWidth = Dimensions.get('window').width;
        let itemsPerRow = this.props.itemsPerRow;
        let margin = this.props.itemMargin || 1;

        let totalMargin = margin * (itemsPerRow - 1);
        let itemWidth = Math.floor( (deviceWidth) / itemsPerRow );
        let adjustedMargin = this.props.itemPaddingHorizontal * 2;
        return (
            <View style = {[ styles.row, { marginBottom: adjustedMargin } ]}>
                { items.item.map(item => this.props.renderItem(item, itemWidth, this.props.itemPaddingHorizontal)) }
                { itemsPerRow - items.item.length > 0 && <View style={{ width: itemWidth * (itemsPerRow - items.item.length)}} />}
            </View>
        );
    }

}

export default PhotoGrid;
