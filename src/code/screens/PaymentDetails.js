import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Body, Card, CardItem, Container, Content, Icon, Left, Right, Spinner, Thumbnail } from 'native-base';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import { COLOR_CODE } from '../constants/general-css';
import { formatDate } from '../constants/general-helper';

const PaymentDetails = ({ navigation }) => {

    const { guessData } = useContext(AppContext);

    const [loading, setLoading] = useState(true);
    const [paymentDetails, setPaymentDetails] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    'https://parseapi.back4app.com/classes/hotel/bVonXoSUHK',
                    {
                        headers: {
                            'X-Parse-Application-Id': 'Rr9ZKgR2t2f49g5ueLWriacIrvKy8Hwv7P87FSw3',
                            'X-Parse-REST-API-Key': '4C6gLjrbNGoym5m9j9mFQiDzXO5eETLxjUjY9Fzy',
                        },
                    }
                );

                const data = response.data.chosen_hotel.data.get_chosen_hotel;

                setPaymentDetails(data);
                setLoading(false);
            } catch (e) {
                setLoading(false);
                Alert.alert('Error', e);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <View style={styles.center}>
                <View>
                    <Spinner size={'large'} color={COLOR_CODE.primary} />
                    <Text>Fetching Data</Text>
                </View>
            </View>
        );
    }

    const { chosen_hotel_room, chosen_hotel_detail, chosen_hotel_params, chosen_hotel_prices } = paymentDetails;
    const { room_name } = chosen_hotel_room;
    const { images } = chosen_hotel_detail;
    const { hotel_name, total_room, guest_adult, check_in, check_out } = chosen_hotel_params;
    const { is_refundable } = chosen_hotel_prices;

    return (
        <Container>
            <Content showsVerticalScrollIndicator={false} style={{}}>

                <View style={[styles.line, styles.item_center, { paddingVertical: 15, justifyContent: 'flex-end' }]}>
                    <View style={[styles.item_center, { paddingRight: 10 }]}>
                        <View style={[styles.tracking_point]}>
                            <Text style={styles.tracking_num}>1</Text>
                        </View>
                        <Text style={{ fontWeight: 'bold', paddingLeft: 5 }}>Detail Pesanan</Text>
                    </View>
                    <View style={{ width: 20, height: 2, backgroundColor: 'black' }} />
                    <View style={[styles.item_center, { paddingHorizontal: 10, opacity: 0.5 }]}>
                        <View style={[styles.item_center, { paddingRight: 10 }]}>
                            <View style={[styles.tracking_point]}>
                                <Text style={styles.tracking_num}>2</Text>
                            </View>
                            <Text style={{ fontWeight: 'bold', paddingLeft: 5 }}>Pembayaran</Text>
                        </View>
                    </View>
                </View>

                <View style={[styles.line, { paddingVertical: 10, marginHorizontal: 10 }]}>
                    <View style={{ paddingVertical: 5 }}>
                        <Text style={{ fontWeight: 'bold' }}>Detail Pesanan</Text>
                    </View>
                    <View>
                        <Card style={{ borderRadius: 8 }}>
                            <CardItem bordered style={{ borderRadius: 10 }}>
                                <Left style={{ flex: 0.3 }}>
                                    <Thumbnail
                                        square
                                        source={{ uri: images[0].url }}
                                        style={{ width: 60, height: 60, borderRadius: 8 }}
                                    />
                                </Left>
                                <Body style={{ flex: 1 }}>
                                    <Text style={{ fontSize: 12, color: COLOR_CODE.primary, fontWeight: 'bold', paddingBottom: 5 }}>{hotel_name}</Text>
                                    <Text style={[styles.text_gray]}>{room_name}</Text>
                                    <Text style={[styles.text_gray]}>{`${total_room} Kamar - ${guest_adult} Tamu`}</Text>
                                </Body>
                            </CardItem>
                        </Card>
                    </View>
                    <View style={styles.row_desc}>
                        <Text style={{ fontWeight: 'bold' }}>Check-In</Text>
                        <Text style={[styles.text_gray]}>{formatDate(check_in)}</Text>
                    </View>
                    <View style={styles.row_desc}>
                        <Text style={{ fontWeight: 'bold' }}>Check-Out</Text>
                        <Text style={[styles.text_gray]}>{formatDate(check_out)}</Text>
                    </View>
                    {is_refundable && (
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Icon name="bitcoin-circle" type="Foundation" style={{ fontSize: 16, color: COLOR_CODE.secondary, paddingHorizontal: 5 }} />
                            <Text style={{ fontSize: 12, color: COLOR_CODE.secondary, fontWeight: 'bold' }}>Dapat direfund jika dibatalkan</Text>
                        </View>
                    )}
                </View>

                <View style={{ marginHorizontal: 10, paddingVertical: 10, borderBottomWidth: 0 }}>
                    <View style={{ paddingVertical: 5 }}>
                        <Text style={{ fontWeight: 'bold' }}>Detail Pemesan</Text>
                    </View>
                    <View style={{ paddingBottom: 15 }}>
                        <Card style={{ borderRadius: 8 }}>
                            <CardItem bordered style={{ borderRadius: 10 }}>
                                <Body style={{ flex: 1 }}>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Tn. Andreas Andreas</Text>
                                    <Text style={styles.user}>andreasandreas@gmail.com</Text>
                                    <Text style={styles.user}>+628 22 2222 2222</Text>
                                </Body>
                                <Right>
                                    <TouchableOpacity>
                                        <Text style={styles.text_link}>Ubah</Text>
                                    </TouchableOpacity>
                                </Right>
                            </CardItem>
                        </Card>
                    </View>

                    <TouchableOpacity disabled>
                        <View style={[styles.item_center, { paddingBottom: 10 }]}>
                            <View style={styles.radio}>
                                <View style={[styles.radio_select, { backgroundColor: COLOR_CODE.white }]} />
                            </View>
                            <Text style={{ paddingLeft: 5 }}>Saya memesan untuk sendiri</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity disabled>
                        <View style={[styles.item_center, { paddingBottom: 10 }]}>
                            <View style={styles.radio}>
                                <View style={[styles.radio_select, { backgroundColor: COLOR_CODE.primary }]} />
                            </View>
                            <Text style={{ paddingLeft: 5 }}>Saya memesan untuk orang lain</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ marginHorizontal: 10, paddingVertical: 10, borderBottomWidth: 0, borderColor: COLOR_CODE.gray }}>
                    <View style={{ paddingVertical: 5 }}>
                        <Text style={{ fontWeight: 'bold' }}>Data Tamu</Text>
                    </View>
                    <View>
                        {guessData.map((guess, index) => {
                            const { name, gender } = guess;

                            return (
                                <Card key={index} noShadow style={{ borderRadius: 8 }}>
                                    <CardItem bordered style={{ borderRadius: 10, borderTopWidth: 0, borderBottomWidth: 0 }}>
                                        <Body style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                            <FontAwesome6 name={'user-tie'} style={{ fontSize: 25 }} />
                                            <Text style={{ fontSize: 14, fontWeight: 'bold', paddingHorizontal: 10 }}>{`${gender ? 'Tn. ' : 'Ny. '}${name}`}</Text>
                                        </Body>
                                    </CardItem>
                                </Card>
                            );
                        })}

                        <TouchableOpacity onPress={() => navigation.navigate('Update')}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingTop: 10, paddingBottom: 20 }}>
                                <Text style={styles.text_link}>Ubah Data Tamu</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Content>
        </Container>
    );
};

const styles = StyleSheet.create({
    center: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    line: {
        borderBottomWidth: 0.6,
        borderColor: COLOR_CODE.gray,
    },
    item_center: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tracking_point: {
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOR_CODE.primary,
    },
    tracking_num: {
        fontSize: 12,
        fontWeight: '500',
        color: 'white',
    },
    text_gray: {
        fontSize: 12,
        color: COLOR_CODE.gray,
        fontWeight: '500',
    },
    row_desc: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
    },
    user: {
        fontSize: 12,
        color: COLOR_CODE.gray,
        fontWeight: '500',
    },
    text_link: {
        color: COLOR_CODE.primary,
        textDecorationLine: 'underline',
    },
    radio: {
        width: 18,
        height: 18,
        borderRadius: 9,
        borderWidth: 1,
        borderColor: COLOR_CODE.primary,
        justifyContent: 'center',
        alignItems: 'center'
    },
    radio_select: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },
});

export default PaymentDetails;
