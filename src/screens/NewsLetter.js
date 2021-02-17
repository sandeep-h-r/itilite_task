import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet, FlatList} from 'react-native';
import NewsLetterCard from '../components/NewsLetterCard';
import ItContainer from '../elements/ItContainer';
import * as newsletterAction from '../actions/newsletterAction';
import {normalize} from '../constants/Platform';
import ItView from '../elements/ItView';
import {COLORS} from '../constants/Colors';

export default function NewsLetter() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.newsletter.fetchingData);

  useEffect(() => {
    get_newsLetterData();
  }, []);

  const get_newsLetterData = async () => {
    dispatch(newsletterAction.isLoading());
    const params = {
      lang: 'en',
      country: 'US',
      topic: 'technology',
    };
    await dispatch(newsletterAction.getNewsLetterData(params));
  };

  const newsletterData = useSelector(
    (state) => state.newsletter.newsletterData,
  );

  const onRefresh = () => {
    get_newsLetterData();
  };

  return (
    <ItContainer
      title={'Newsletter'}
      homeButton
      noFooter
      loader={isLoading}
      containerStyle={{backgroundColor: COLORS.TERTIARY}}>
      <FlatList
        data={newsletterData}
        keyExtractor={(item, index) => index}
        onRefresh={() => {
          onRefresh();
        }}
        refreshing={isLoading}
        renderItem={(item, index) => {
          return <NewsLetterCard dataItem={item.item} />;
        }}
        ListFooterComponent={() => {
          return <ItView style={styles.footer} />;
        }}
      />
    </ItContainer>
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingBottom: normalize(100),
    backgroundColor: COLORS.TERTIARY,
  },
});
