import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Container, Content, Button, Icon, Item, Input, ActionSheet } from 'native-base';
import { COLOR_CODE } from '../constants/general-css';
import { AppContext } from '../context/AppContext';
import _ from 'lodash';
import { makeID } from '../constants/general-helper';

const UpdateGuess = ({ navigation }) => {
    const { guessData, setGuessData } = useContext(AppContext);
    const [guessDataTemp, setGuessDataTemp] = useState(guessData);

    const handleAddGuess = () => {
        const newItem = {
            id: makeID(5),
            name: '',
            gender: true,
        };

        const guess = [...guessDataTemp, newItem];

        setGuessDataTemp(guess);
    };


    const handleDeleteItem = (id) => {
        const filter = guessDataTemp.filter((o) => o.id !== id);
        const item = guessDataTemp.find(o => o.id === id);

        Alert.alert('Perhatian!', `Hapus tamu dengan nama ${item?.gender ? 'Tn.' : 'Ny.'} ${item?.name} ?`, [
            { text: 'batal' },
            {
                text: 'hapus',
                onPress: () => {
                    setGuessDataTemp(filter);
                },
            },
        ]);
    };

    const handleInput = (t, id) => {
        let editedData = [...guessDataTemp];
        const item = editedData.findIndex(o => o.id === id);

        editedData[item].name = t;
        setGuessDataTemp(editedData);

    };

    const handleSelect = (g, id) => {
        let editedData = [...guessDataTemp];
        const item = editedData.findIndex(o => o.id === id);

        editedData[item].gender = g;
        setGuessDataTemp(editedData);

    };

    const handleSaveChange = () => {
        setGuessData(guessDataTemp);

        navigation.goBack();
    };

    return (
        <Container>
            <Content>
                <View style={{ marginHorizontal: 10, paddingVertical: 10 }}>
                    <View style={{ paddingVertical: 5 }}>
                        <Text style={[styles.text_bold, { fontSize: 16 }]}>Data Tamu</Text>
                    </View>

                    {guessDataTemp?.length < 1 ? (
                        <View style={{ flexDirection: 'row', justifyContent: 'center', paddingVertical: 20 }}>
                            <Text>Guess not found</Text>
                        </View>
                    ) : (
                        <ScrollView>
                            {guessDataTemp?.map((guess, idx) => {
                                const { id, name, gender } = guess;

                                const g = [{ id: 1, title: 'Tn.', gender: true }, { id: 2, title: 'Ny.', gender: false }];

                                return (
                                    <View key={id} style={[styles.item_center, { width: '100%', paddingVertical: 10 }]}>
                                        <View style={[styles.item_input, { width: '20%', marginLeft: 5, justifyContent: 'center' }]}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    const GENDER = g.map((o) => o.title);
                                                    GENDER.push('BATAL');

                                                    ActionSheet.show(
                                                        {
                                                            options: GENDER,
                                                            cancelButtonIndex: GENDER.length - 1,
                                                            title: 'Pilih gender',
                                                        },
                                                        (buttonIndex) => {
                                                            if (buttonIndex < GENDER.length - 1) {
                                                                handleSelect(g[buttonIndex].gender, id);
                                                            }
                                                        }
                                                    );
                                                }}
                                                style={[styles.item_center, styles.btn_select]}
                                            >
                                                <Text style={styles.text_bold}>{`${gender ? 'Tn.' : 'Ny.'}`}</Text>
                                                <Icon name="chevron-down" type="Entypo" style={styles.icon_down} />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ width: '60%', justifyContent: 'center', alignItems: 'center', marginLeft: 15 }}>
                                            <Item style={[styles.item_input, { paddingHorizontal: 10 }]}>
                                                <Input
                                                    value={name}
                                                    onChangeText={(t) => handleInput(t, id)}
                                                    style={{ color: COLOR_CODE.primary, fontSize: 14 }}
                                                />
                                            </Item>
                                        </View>
                                        <View style={{ width: '15%', alignItems: 'center' }}>
                                            <TouchableOpacity onPress={() => handleDeleteItem(id)}>
                                                <Icon name="trash" type="Fontisto" style={{ color: 'red' }} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                );
                            })}
                        </ScrollView>
                    )}

                    <TouchableOpacity onPress={handleAddGuess}>
                        <View style={{ alignItems: 'center', paddingVertical: 15 }}>
                            <Text style={{ fontWeight: 'bold', color: COLOR_CODE.secondary, textDecorationLine: 'underline' }}>
                                + Tambah data baru
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </Content>
            <View style={{ width: '100%', paddingHorizontal: 10, paddingTop: 10, paddingBottom: 20 }}>
                <Button
                    block
                    onPress={handleSaveChange}
                    style={{ backgroundColor: COLOR_CODE.secondary, borderRadius: 10 }}
                >
                    <Text style={{ fontWeight: 'bold', color: COLOR_CODE.white }}>
                        Simpan
                    </Text>
                </Button>
            </View>
        </Container >
    );
};

const styles = StyleSheet.create({
    item_center: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    btn_select: {
        justifyContent: 'center',
        backgroundColor: COLOR_CODE.white,
        borderRadius: 8,
    },
    text_bold: {
        fontWeight: 'bold',
        color: COLOR_CODE.primary,
    },
    icon_down: {
        color: COLOR_CODE.primary,
        marginLeft: 5,
        marginRight: 0,
    },
    item_input: {
        height: 45,
        backgroundColor: COLOR_CODE.white,
        borderBottomWidth: 0,
        borderColor: '#3f51b5',
        borderRadius: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 1.2,
    },
});

export default UpdateGuess;
