import React from 'react';
import { StyleSheet } from 'react-native';
import { Paragraph, TextContainer } from '../theme/Styles';

const NoEvents = () => {
    return (
        <TextContainer style={styles.container}>
            <Paragraph style={styles.errorMessage}>There are no upcoming events to show at the moment.</Paragraph>
        </TextContainer>
    );
};

const styles = StyleSheet.create({
    errorMessage: {
        fontSize: 22,
        textAlign: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
    }
});

export default NoEvents;