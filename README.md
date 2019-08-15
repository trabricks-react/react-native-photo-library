# `react-native-photo-library`

![platforms](https://img.shields.io/badge/platforms-Android%20%7C%20iOS-brightgreen.svg?style=flat-square&colorB=191A17)
[![npm](https://img.shields.io/npm/v/react-native-photo-library.svg?style=flat-square)](https://www.npmjs.com/package/react-native-photo-library)
[![npm](https://img.shields.io/npm/dm/react-native-photo-library.svg?style=flat-square&colorB=007ec6)](https://www.npmjs.com/package/react-native-photo-library)
[![github issues](https://img.shields.io/github/issues/trabricks/react-native-photo-library.svg?style=flat-square)](https://github.com/trabricks/react-native-photo-library/issues)
[![github closed issues](https://img.shields.io/github/issues-closed/trabricks/react-native-photo-library.svg?style=flat-square&colorB=44cc11)](https://github.com/trabricks/react-native-photo-library/issues?q=is%3Aissue+is%3Aclosed)
[![Issue Stats](https://img.shields.io/issuestats/i/github/trabricks/react-native-photo-library.svg?style=flat-square&colorB=44cc11)](http://github.com/trabricks/react-native-photo-library/issues)

Copy to Cameraroll And Date between added.

## Getting started

`$ npm install react-native-photo-library --save`

### Mostly automatic installation

`$ react-native link react-native-photo-library`


## Migrating from the core `react-native` module
This module was created when the CameraRoll was split out from the core of React Native. To migrate to this module you need to follow the installation instructions above and then change you imports from:

```javascript
import { CameraRoll } from "react-native";
```

to:

```javascript
import CameraRoll from "react-native-photo-library";
```


###Compared to @react-native-community/react-native-cameraroll
react-native-cameraroll functionality is similar, but there are several major differencies:
- Start and end can be set by date.
- You can change the alignment.
 

## Usage

`CameraRoll` provides access to the local camera roll or photo library.


### Methods

* [`saveToCameraRoll`](#savetocameraroll)
* [`getPhotos`](#getphotos)

---

# Reference

## Methods

### `saveToCameraRoll()`

```javascript
CameraRoll.saveToCameraRoll(tag, [type]);
```

Saves the photo or video to the camera roll or photo library.

On Android, the tag must be a local image or video URI, such as `"file:///sdcard/img.png"`.

On iOS, the tag can be any image URI (including local, remote asset-library and base64 data URIs) or a local video file URI (remote or data URIs are not supported for saving video at this time).

If the tag has a file extension of .mov or .mp4, it will be inferred as a video. Otherwise it will be treated as a photo. To override the automatic choice, you can pass an optional `type` parameter that must be one of 'photo' or 'video'.

Returns a Promise which will resolve with the new URI.

**Parameters:**

| Name | Type                   | Required | Description                                                |
| ---- | ---------------------- | -------- | ---------------------------------------------------------- |
| tag  | string                 | Yes      | See above.                                                 |
| type | enum('photo', 'video') | No       | Overrides automatic detection based on the file extension. |

---

### `getPhotos()`

```javascript
CameraRoll.getPhotos(params);
```

Returns a Promise with photo identifier objects from the local camera roll of the device matching shape defined by `getPhotosReturnChecker`.

**Parameters:**

| Name   | Type   | Required | Description                                      |
| ------ | ------ | -------- | ------------------------------------------------ |
| params | object | Yes      | Expects a params with the shape described below. |

* `first` : {number} : The number of photos wanted in reverse order of the photo application (i.e. most recent first for SavedPhotos). Required.
* `after` : {string} : A cursor that matches `page_info { end_cursor }` returned from a previous call to `getPhotos`.
* `groupTypes` : {string} : Specifies which group types to filter the results to. Valid values are:
  * `Album`
  * `All` // default
  * `Event`
  * `Faces`
  * `Library`
  * `PhotoStream`
  * `SavedPhotos`
* `groupName` : {string} : Specifies filter on group names, like 'Recent Photos' or custom album titles.
* `assetType` : {string} : Specifies filter on asset type. Valid values are:
  * `All`
  * `Videos`
  * `Photos` // default
* `mimeTypes` : {Array} : Filter by mimetype (e.g. image/jpeg).
* `orderByAsc` : {boolean} : Is sort asc by CreatedDate. 
* `beginCreated` : {number} : Start of Timestamp
* `endCreated` : {number} : End of Timestamp


Returns a Promise which when resolved will be of the following shape:

* `edges` : {Array<node>} An array of node objects
  * `node`: {object} An object with the following shape:
    * `type`: {string}
    * `group_name`: {string}
    * `image`: {object} : An object with the following shape:
      * `uri`: {string}
      * `filename`: {string}
      * `height`: {number}
      * `width`: {number}
      * `isStored`: {boolean}
      * `playableDuration`: {number}
    * `timestamp`: {number}
    * `location`: {object} : An object with the following shape:
      * `latitude`: {number}
      * `longitude`: {number}
      * `altitude`: {number}
      * `heading`: {number}
      * `speed`: {number}
* `page_info` : {object} : An object with the following shape:
  * `has_next_page`: {boolean}
  * `start_cursor`: {string}
  * `end_cursor`: {string}

#### Example

Loading images:

```javascript
_handleButtonPress = () => {
   CameraRoll.getPhotos({
       first: 20,
       assetType: 'Photos',
     })
     .then(r => {
       this.setState({ photos: r.edges });
     })
     .catch((err) => {
        //Error Loading Images
     });
   };
render() {
 return (
   <View>
     <Button title="Load Images" onPress={this._handleButtonPress} />
     <ScrollView>
       {this.state.photos.map((p, i) => {
       return (
         <Image
           key={i}
           style={{
             width: 300,
             height: 100,
           }}
           source={{ uri: p.node.image.uri }}
         />
       );
     })}
     </ScrollView>
   </View>
 );
}
```  
