import React from 'react';

import { Modal, ModalProps, View, Text, Pressable, StyleSheet, Platform } from 'react-native'

interface WarnModalProps extends ModalProps {
  warnText: string;
  closeButtonText: string;
  onPress: () => void;
}

export function WarnModal({
    warnText,
    closeButtonText,
    onPress,
    ...rest
  }: WarnModalProps) {
  

  return (
    <Modal
      animationType="slide"
      transparent={true}
      {...rest}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{warnText}</Text>
          <Pressable
            style={[styles.buttonModal, styles.buttonClose]}
            onPress={onPress}
          >
            <Text style={styles.textStyle}>{closeButtonText}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingVertical: 70,
    paddingHorizontal: 30
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: '#1f1e25',
    color: '#fff',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginTop: 30,
    borderRadius: 7
  },
  // Styles do Modal
  centeredView: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 70,
    paddingHorizontal: 30
  },
  modalView: {
    backgroundColor: "#1f1e25",
    borderRadius: 7,
    paddingVertical: 70,
    paddingHorizontal: 30,
    width: '100%',
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonModal: {
    borderRadius: 7,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 15,
    textAlign: "center"
  }
});