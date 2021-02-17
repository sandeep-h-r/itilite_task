import {ToastAndroid} from 'react-native';
import {isIos} from '../constants/Platform';

function ItToast(props) {
  const {message, duration, position} = props;

  return isIos()
    ? null
    : ToastAndroid.showWithGravity(
        message,
        duration ? ToastAndroid[duration] : ToastAndroid.SHORT,
        position ? ToastAndroid[position] : ToastAndroid.CENTER,
      );
}
export default ItToast;
