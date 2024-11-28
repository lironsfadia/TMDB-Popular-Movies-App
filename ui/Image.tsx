import FastImage from 'react-native-fast-image';

const Image = () => (
  <FastImage
    style={{ flex: 1 }} // Using style prop instead of className
    source={{
      uri: 'https://unsplash.it/400/400?image=1',
      headers: { Authorization: 'someAuthToken' },
      priority: FastImage.priority.normal,
    }}
    resizeMode={FastImage.resizeMode.contain}
  />
);

export default Image;
