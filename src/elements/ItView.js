import * as React from 'react';
import {Surface} from 'react-native-paper';

export default function ItView(props) {
  return <Surface style={props.style}>{props.children}</Surface>;
}
