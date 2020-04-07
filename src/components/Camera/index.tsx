import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Camera } from 'expo';
import * as Permissions from 'expo-permissions'; 

async function cameraInit(cb: (data: boolean) => void) {
    const camera = await Permissions.askAsync(Permissions.CAMERA);
    const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    const hasCameraPermission =  camera.status === 'granted' && audio.status === 'granted';
    console.log(hasCameraPermission)
    if (cb) {
        cb(hasCameraPermission);
    }
}

export const MyCamera: React.FC = () => {
    const [hasCameraPermission, setCameraPermission] = React.useState<boolean>(false);
    const [camera, setCamera] = React.useState<RNCamera | null>(null);
    React.useEffect(() => {
        cameraInit(setCameraPermission);
    }, []);

    const takePicture = async() => {
        if (camera) {
            const options = { quality: 0.5, base64: true };
            const data = await camera.takePictureAsync(options);
            console.log(data.uri);
        }
    };

    return hasCameraPermission ? (

        <View style={styles.container}>
        <RNCamera
            ref={setCamera}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
            }}
            androidRecordAudioPermissionOptions={{
                title: 'Permission to use audio recording',
                message: 'We need your permission to use your audio',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
            }}
            onGoogleVisionBarcodesDetected={({ barcodes }) => {
                console.log(barcodes);
            }}
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity onPress={takePicture} style={styles.capture}>
                <Text style={{ fontSize: 14 }}> SNAP </Text>
            </TouchableOpacity>
        </View>
      </View>
    ) : <View><Text>Нет доступа к камере</Text></View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        height: 300,
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
});
