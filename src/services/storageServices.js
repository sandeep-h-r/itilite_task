import _ from 'lodash';
import AsyncStorage from '@react-native-community/async-storage';

const store = {
  get(key) {
    if (!Array.isArray(key)) {
      return AsyncStorage.getItem(key).then((value) => {
        return JSON.parse(value);
      });
    } else {
      return AsyncStorage.multiGet(key).then((values) => {
        return values.map((value) => {
          return JSON.parse(value[1]);
        });
      });
    }
  },

  save(key, value) {
    if (!Array.isArray(key)) {
      return AsyncStorage.setItem(key, JSON.stringify(value));
    } else {
      var pairs = key.map(function (pair) {
        return [pair[0], JSON.stringify(pair[1])];
      });
      return AsyncStorage.multiSet(pairs);
    }
  },

  update(key, value) {
    return store.get(key).then((item) => {
      value = typeof value === 'string' ? value : _.merge({}, item, value);
      return AsyncStorage.setItem(key, JSON.stringify(value));
    });
  },

  delete(key) {
    if (Array.isArray(key)) {
      return AsyncStorage.multiRemove(key);
    } else {
      return AsyncStorage.removeItem(key);
    }
  },

  clear() {
    return AsyncStorage.clear();
  },

  keys() {
    return AsyncStorage.getAllKeys();
  },

  push(key, value) {
    return store.get(key).then((currentValue) => {
      if (currentValue === null) {
        // if there is no current value populate it with the new value
        return store.save(key, [value]);
      }
      if (Array.isArray(currentValue)) {
        return store.save(key, [...currentValue, value]);
      }
      throw new Error(
        `Existing value for key "${key}" must be of type null or Array, received ${typeof currentValue}.`,
      );
    });
  },
};

export default store;
