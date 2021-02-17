import React from 'react';
import {WebView} from 'react-native-webview';
import ItHeader from '../elements/ItHeader';

export default function WebSearch() {
  return (
    <>
      <ItHeader backButton noFooter title={'Web Search'} />
      <WebView source={{uri: 'https://google.com/'}} />
    </>
  );
}
