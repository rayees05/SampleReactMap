import React, {useState, useEffect} from 'react';
import {Dimensions} from 'react-native';
import axios, * as others from 'axios';
import moment from 'moment/moment';
import {useSelector, useDispatch} from 'react-redux';
import {Marker} from 'react-native-maps';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Modal,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {
  storeData,
  setlat,
  setlon,
  settimes,
  setshowmarker,
  setAlldata,
} from '../redux/Action';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
const MapViewPage = ({navigation}) => {
  const dispatch = useDispatch();
  const [popup, setPopUp] = useState(false);
  const [lactionDatatitle, setLcationDatatitle] = useState();
  const [latitude, setlatitude] = useState();
  const [longitude, setlongitude] = useState();
  const [time, setTime] = useState();
  const [markershow, setMarkershow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {width, height} = Dimensions.get('window');
  const {locationText, lat, lon, showmarker, allData} = useSelector(
    state => state.res_no,
  );
  const savingData = () => {
    setPopUp(false);
    setMarkershow(false);
    dispatch(storeData(lactionDatatitle.address.county));
    dispatch(setlat(latitude));
    dispatch(setlon(longitude));
    dispatch(settimes(time));
    dispatch(setshowmarker(false));
    dispatch(
      setAlldata({
        locationName: lactionDatatitle,
        latitude: latitude,
        longitude,
        longitude,
        time: time,
      }),
    );
  };
  useEffect(() => {
    console.log(showmarker);
    showmarker ? setMarkershow(true) : null;
  }, [showmarker]);
  const locationdata = event => {
    setIsLoading(true);
    // console.log(event.nativeEvent.coordinate, 'event');
    setlatitude(event.nativeEvent.coordinate.latitude);
    setlongitude(event.nativeEvent.coordinate.longitude);

    setTime(moment().format('hh:mm:ss a'));
    axios
      .get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=10.6677032&lon=75.988872&zoom=18&addressdetails=1`,
      )
      .then(res => {
        // console.log(res.data);
        setLcationDatatitle(res.data);
        // lactionData.push(res.data);
        setPopUp(true);
        setIsLoading(false);
      })
      .catch(e => {
        console.log(e);
      });
  };
  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="light-content" />
      <MapView
        onPress={e => locationdata(e)}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: lat,
          longitude: lon,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        {markershow && (
          <Marker
            coordinate={{latitude: lat, longitude: lon}}
            title={locationText}
            // description={marker.description}
          />
        )}
      </MapView>
      <Modal transparent={true} visible={isLoading}>
        <View
          style={{
            position: 'absolute',
            width: width,
            height: height,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator
            style={{flex: 1, position: 'absolute'}}
            size="large"
          />
        </View>
      </Modal>
      <Modal
        transparent={true}
        visible={popup}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#000000aa',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: width * 0.6,
                height: height * 0.3,
                backgroundColor: '#ffffff',
                alignSelf: 'center',
                justifyContent: 'center',
                borderRadius: 15,
              }}>
              <Text
                style={{
                  alignSelf: 'center',
                  fontWeight: '700',
                  fontSize: 16,
                  padding: 10,
                }}>
                Save your location Here
              </Text>
              <View
                style={{
                  flex: 3,
                  paddingTop: 10,
                  marginHorizontal: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={styles.textStyle}>
                  place :{lactionDatatitle && lactionDatatitle.address.county}
                </Text>
                <Text style={styles.textStyle}>{latitude && latitude}</Text>
                <Text style={styles.textStyle}>{longitude && longitude}</Text>
                <Text style={styles.textStyle}>{time}</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  paddingBottom: 10,
                }}>
                <TouchableOpacity
                  onPress={savingData}
                  style={{
                    padding: 10,
                    borderRadius: 5,
                    backgroundColor: 'green',
                    marginHorizontal: 10,
                    alignItems: 'center',
                    bottom: 0,
                  }}>
                  <Text>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* <ActivityIndicator
              style={{flex: 1, position: 'absolute'}}
              size="large"
            /> */}
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  textStyle: {
    color: '#000000',
    fontSize: 14,
  },
});
export default MapViewPage;
