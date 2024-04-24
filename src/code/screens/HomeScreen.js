import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container, Button } from 'native-base';
import { COLOR_CODE } from '../constants/general-css';

const HomeScreen = ({ navigation }) => {
    return (
        <Container>
            <View style={styles.center}>
                <Button style={styles.btn} onPress={() => navigation.navigate('Details')}>
                    <Text style={{ color: 'white' }}>Go to Payment Details</Text>
                </Button>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        alignSelf: 'center',
        paddingHorizontal: 10,
        borderRadius: 8,
        backgroundColor: COLOR_CODE.primary,
    },
});

export default HomeScreen;
