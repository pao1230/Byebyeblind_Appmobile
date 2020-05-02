import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  PanResponder,
  Button,
  Platform,
} from 'react-native';
import Svg from 'react-native-svg';

import {
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryCursorContainer,
  round,
  VictoryZoomContainer,
} from 'victory-native';

function generateSampleData_DAY() {
  const data = [];
  const tNow = new Date();
  while (tNow.getHours() > 0) {
    data.push({x: new Date(tNow), y: Math.floor(Math.random() * 500)});
    tNow.setHours(tNow.getHours() - 1);
  }

  return data;
}

function generateSampleData_WEEK() {
  const data = [];
  const tNow = new Date();
  while (tNow.getDay() > 0) {
    data.push({x: new Date(tNow), y: Math.floor(Math.random() * 500)});
    tNow.setDate(tNow.getDate() - 1);
  }

  return data;
}

function generateSampleData_1MONTH() {
  const data = [];
  const tNow = new Date();
  let d = 30;
  while (d--) {
    data.push({x: new Date(tNow), y: Math.floor(Math.random() * 500)});
    tNow.setDate(tNow.getDate() - 1);
  }

  return data;
}

export class GraphPage extends Component {
  constructor() {
    super();
    this.state = {
      data: generateSampleData_DAY(),
    };
  }

  handleZoom(domain) {
    this.setState({selectedDomain: domain});
  }

  handleBrush(domain) {
    this.setState({zoomDomain: domain});
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      // onStartShouldSetResponder: (ev, gs) => true,
      // onResponderGrant: (ev, gs) => true,
      // onResponderMove: (ev, gs) => ture,
      onMoveShouldSetPanResponder: (ev, gs) => true,
      onMoveShouldSetPanResponderCapture: (ev, gs) => true,
      onPanResponderMove: (ev, gs) => {
        // The X,Y position of the touch, relative to the root element
        // console.log(`page_x: ${ev.nativeEvent.pageX}`);
        // console.log(`page_y: ${ev.nativeEvent.pageY}`);
        // The X,Y position of the touch, relative to the element
        // console.log(`location_x: ${ev.nativeEvent.locationX}`);
        // console.log(`location_y: ${ev.nativeEvent.locationY}`);
        // The node id of the element receiving the touch event
        // console.log(`target: ${ev.nativeEvent.target}`);
      },
    });
  }

  //ขนาดหน้าจอโทรศัพท์ที่ใช้เทส width:731, height:411
  render() {
    const chart = (
      <VictoryChart
        events={[
          {
            childName: 'line',
            target: 'data',
            eventHandlers: {
              onPress: () => {
                console.log('touch line');
                return [
                  {
                    childName: 'line',
                    mutation: (props) => {
                      const fill = props.style.fill;
                      return fill === '#030303'
                        ? null
                        : {style: {fill: '#030303'}};
                    },
                  },
                ];
              },
            },
          },
        ]}
        padding={{top: 22, bottom: 10, left: 45, right: 11}}
        width={700}
        height={205}
        scale={{x: 'time'}}
        containerComponent={
          <VictoryZoomContainer
            responsive={false}
            zoomDimension="x"
            zoomDomain={this.state.zoomDomain}
            onZoomDomainChange={this.handleZoom.bind(this)}
          />
        }>
        <VictoryLine
          name="line"
          data={this.state.data}
          style={{
            data: {stroke: 'tomato'},
          }}
          animate={{
            duration: 2000,
            onLoad: {duration: 1000},
          }}
          interpolation="linear"
        />

        <VictoryScatter
          name="scatter"
          data={this.state.data}
          size={5}
          style={{
            data: {fill: '#c43a31'},
          }}
          labels={({datum}) => datum.y}
        />
      </VictoryChart>
    );
    return (
      <View>
        <View style={styles.setBtnDate}>
          <Button
            onPress={() => {
              this.setState(() => ({data: generateSampleData_DAY()}));
            }}
            title="DAY"
          />

          <Button
            onPress={() => {
              this.setState(() => ({data: generateSampleData_WEEK()}));
            }}
            title="WEEK"
          />

          <Button
            onPress={() => {
              this.setState(() => ({data: generateSampleData_1MONTH()}));
            }}
            title="MONTH"
          />
          <Text>{this.props.answer}</Text>
        </View>

        <View
          {...this._panResponder.panHandlers}
          //     onStartShouldSetResponder={(ev) => true}
          //     // onMoveShouldSetResponder={(ev) => false}
          //     onResponderGrant={this.onTouchEvent.bind(this, "onResponderGrant")}
          //     // onResponderReject={this.onTouchEvent.bind(this, "onResponderReject")}
          //     onResponderMove={this.onTouchEvent.bind(this, "onResponderMove")}
          // // onResponderRelease={this.onTouchEvent.bind(this, "onResponderRelease")}
          // // onResponderTerminationRequest={(ev) => true}
          // // onResponderTerminate={this.onTouchEvent.bind(this, "onResponderTerminate")}
        >
          {Platform.OS === 'ios' ? chart : <Svg>{chart}</Svg>}
        </View>

        <View>
          <View style={styles.cardview}>
            <View style={styles.displayincard}>
              <Text>เปิด</Text>
              <Text>สูงสุด</Text>
              <Text>ล่าสุด</Text>
            </View>

            <View style={styles.displayincard}>
              <Text>ราคาปิด</Text>
              <Text>ต่ำสุด</Text>
              <Text>VOL</Text>
            </View>

            <View style={styles.displaynamebank}>
              <Text>Bangkok Bank</Text>
            </View>
          </View>

          <View style={styles.seticonbtn}>
            <TouchableOpacity
              onPress={() => {
                alert('You tapped the button Voice');
              }}>
              <View style={styles.setbtnvoice}>
                <Image
                  style={styles.sizeImgbtn}
                  source={require('../assets/microphone.png')}
                />
                <Text style={styles.btnfont}>Voice</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                alert('You tapped the button Favorite');
              }}>
              <View style={styles.setbtnfavorite}>
                <Image
                  style={styles.sizeImgbtn}
                  source={require('../assets/star.png')}
                />
                <Text style={styles.btnfont}>Favorite</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  setBtnDate: {
    flexDirection: 'row',
    marginTop: 10,
    borderRadius: 10,
    justifyContent: 'space-around',
  },
  cardview: {
    marginLeft: 30,
    width: 670,
    height: 55,
    backgroundColor: '#85C1E9',
  },
  displayincard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  displaynamebank: {
    alignItems: 'center',
  },
  seticonbtn: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    //backgroundColor: '#01273C'
  },
  setbtnvoice: {
    width: 130,
    height: 70,
    backgroundColor: '#FBD1A7',
    marginTop: 10,
    borderRadius: 30,
    marginBottom: 10,
    flexDirection: 'row',
  },
  sizeImgbtn: {
    width: 45,
    height: 45,
    marginLeft: 5,
    marginTop: 10,
  },
  btnfont: {
    width: 130,
    height: 70,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 2,
  },
  setbtnfavorite: {
    width: 130,
    height: 70,
    backgroundColor: '#FBD1A7',
    marginTop: 10,
    borderRadius: 30,
    marginBottom: 10,
    flexDirection: 'row',
    marginLeft: 400,
  },
});
