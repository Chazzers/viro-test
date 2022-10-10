import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  ViroARScene,
  ViroText,
  ViroTrackingStateConstants,
  ViroARSceneNavigator,
  ViroBox,
  ViroARPlane,
  ViroARImageMarker,
  ViroARTrackingTargets,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroQuad,
  ViroAnimations,
} from '@viro-community/react-viro';

const HelloWorldSceneAR = () => {
  const [box, setBox] = useState('Initializing AR...');
  const [animation, setAnimation] = useState(false);

  function onInitialized(state, reason) {
    console.log('guncelleme', state, reason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setBox({scale: [0, 0, 0], position: [0, 0, 0]});
    } else if (state === ViroTrackingStateConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
  function playAnimation() {
    setAnimation(true);
  }

  return (
    <ViroARScene
      onTrackingUpdated={onInitialized}
      onAnchorFound={playAnimation}>
      <ViroARPlane minHeight={0.1} minWidth={0.1} alignment={'Horizontal'}>
        <ViroAmbientLight color="#FFFFFF" />
        <Viro3DObject
          source={require('./res/spongebob/lowpolytree.obj')}
          resources={[require('./res/spongebob/lowpolytree.mtl')]}
          scale={box.scale}
          position={box.position}
          highAccuracyEvents={true}
          rotation={[45, 90, 90]}
          type="OBJ"
          transformBehaviors={['billboard']}
          animation={{name: 'loopRotate', run: animation}}
        />
      </ViroARPlane>
    </ViroARScene>
  );
};

export default () => {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: HelloWorldSceneAR,
      }}
      style={styles.f1}
    />
  );
};

ViroARTrackingTargets.createTargets({
  targetOne: {
    source: require('./res/hiro.png'),
    orientation: 'Up',
    physicalWidth: 0.165,
  },
});

ViroAnimations.registerAnimations({
  loopRotate: {
    properties: {
      scaleX: 0.2,
      scaleY: 0.2,
      scaleZ: 0.2,
    },
    easing: 'Bounce',
    duration: 1000,
    loop: true,
  },
});

var styles = StyleSheet.create({
  f1: {flex: 1},
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
