# react-native-image-grid
React Native component that handles the complexities of building a grid of photos with a flexible number of photos per row

## Install

`npm install react-native-image-grid --save`

## Usage

```
import React from 'react-native';
import PhotoGrid from 'react-native-image-grid';
let { Image, TouchableOpacity, Text } = React;

class BestGrid extends React.Component {

  constructor() {
    super();
    this.state = { items: [] };
  }

  componentDidMount() {
    // Build an array of 60 photos
    let items = Array.apply(null, Array(60)).map((v, i) => {
      return { id: i, src: 'http://placehold.it/200x200?text='+(i+1) }
    });
    this.setState({ items });
  }

  render() {
    return(
      <PhotoGrid
        data = { this.state.items }
        itemsPerRow = { 3 }
        itemMargin = { 1 }
        itemPaddingHorizontal={1}
        renderHeader = { this.renderHeader }
        renderItem = { this.renderItem }
        onEndReached={this._handleLoadMore} //optional
      />
    );
  }

  renderHeader() {
    //Header of the Screen
    return <Text style={{ padding: 16, fontSize: 20, color: 'white', backgroundColor: 'navy' }}>React App</Text>;
  }

  renderItem(item, itemSize, itemPaddingHorizontal) {
    return(
      <TouchableOpacity
        key = { item.id }
        style = {{ width: itemSize, height: itemSize, paddingHorizontal: itemPaddingHorizontal }}
        onPress = { () => {
          // Do Something
        }}>
        <Image
          resizeMode = "cover"
          style = {{ flex: 1 }}
          source = {{ uri: item.src }}
        />
      </TouchableOpacity>
    )
  }

}

export default BestGrid;
```

 **This repository is a fork of [`react-native-photo-grid`](https://github.com/christopherabouabdo/react-native-photo-grid) with improvements**
