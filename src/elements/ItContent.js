import React from 'react';
import {ScrollView} from 'react-native';
import ItView from './ItView';

export default function ItContent(props) {
  const {scrollable, style} = props;
  return (
    <ItView {...props} style={style}>
      {scrollable ? (
        <ScrollView
          keyboardShouldPersistTaps="always"
          contentContainerStyle={style}>
          <ItView style={style}>{props.children}</ItView>
        </ScrollView>
      ) : (
        props.children
      )}
    </ItView>
  );
}
