import React from 'react';
import {StyleSheet, Linking} from 'react-native';
import {Button, Card} from 'react-native-paper';
import {COLORS} from '../constants/Colors';
import {normalize} from '../constants/Platform';
import ItText from '../elements/ItText';
import ItView from '../elements/ItView';
import moment from 'moment';

export default function NewsLetterCard(props) {
  const {dataItem} = props;
  return (
    <Card style={styles.cardContainer}>
      <Card.Title
        title={dataItem.title}
        titleNumberOfLines={10}
        titleStyle={styles.text_align}
      />
      <Card.Cover source={{uri: dataItem.urlToImage}} />
      <Card.Content>
        <ItText
          type={'Body_2'}
          style={[styles.text_align, {marginTop: normalize(10)}]}>
          {dataItem.description}
        </ItText>
        <ItView
          style={{
            backgroundColor: COLORS.TRANSPARENT,
            marginTop: normalize(10),
          }}>
          <ItText type={'Caption'} style={styles.text_align}>
            {`Source: ${dataItem.source.name}`}
          </ItText>
          <ItText type={'Caption'} style={styles.text_align}>
            {`Published on: ${moment(dataItem.publishedAt).format(
              'DD MMM YYYY hh:mm A',
            )}`}
          </ItText>
        </ItView>
      </Card.Content>
      <Card.Actions style={styles.cardAction}>
        <Button
          onPress={() => {
            Linking.openURL(dataItem.url);
          }}>
          View Post
        </Button>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    margin: normalize(15),
    padding: normalize(5),
    backgroundColor: COLORS.BACKGROUND,
    borderRadius: normalize(10),
  },
  text_align: {
    textAlign: 'justify',
  },
  cardAction: {
    justifyContent: 'flex-end',
  },
});
