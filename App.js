import React, { } from 'react';
import { StatusBar, Platform } from 'react-native';
import { Root, StyleProvider } from 'native-base';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ContextProvider } from './src/code/context/AppContext';
import Navigator from './src/code/route/Route';

import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';

const App = () => {
    return (
        <SafeAreaProvider>
            <StyleProvider style={getTheme(material)}>
                <Root>
                    <ContextProvider>

                        <SafeAreaView
                            style={{ flex: 1 }}
                            edges={['right', 'bottom', 'top', 'left']}
                            forceInset={{ top: 'always', horizontal: 'never' }}
                        >
                            <StatusBar
                                backgroundColor="#221F20"
                                barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
                            />
                            <Navigator />
                        </SafeAreaView>
                    </ContextProvider>

                </Root>
            </StyleProvider>

        </SafeAreaProvider>

    );
};

export default App;
