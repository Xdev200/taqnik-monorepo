import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Platform, useWindowDimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

type ColorType = {
  text: string;
  background: string;
  surface: string;
  primary: string;
  secondary: string;
  border: string;
  tint: string;
};

interface ChatInputProps {
  chatInput: string;
  setChatInput: (text: string) => void;
  sendMessage: () => void;
  style?: object;
}

export const ChatInput = ({ chatInput, setChatInput, sendMessage, style }: ChatInputProps) => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme] as ColorType;
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;

  return (
    <BlurView 
      intensity={colorScheme === 'dark' ? 40 : 80} 
      tint={colorScheme}
      style={[styles.inputContainer, style]}
    >
      <View style={[
        styles.inputWrapper,
        { backgroundColor: colorScheme === 'dark' ? colors.surface : colors.background }
      ]}>
        {isDesktop && (
          <Ionicons 
            name="search" 
            size={20} 
            color={colors.secondary}
            style={styles.searchIcon}
          />
        )}
        <TextInput
          style={[
            styles.input,
            { color: colors.text }
          ]}
          placeholder={"Type your message..."}
          value={chatInput}
          onChangeText={setChatInput}
          onSubmitEditing={sendMessage}
          returnKeyType="send"
          multiline={false}
          placeholderTextColor={colors.secondary}
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            !chatInput.trim() && styles.sendButtonDisabled,
            { backgroundColor: chatInput.trim() ? colors.primary : colors.surface }
          ]}
          onPress={sendMessage}
          disabled={!chatInput.trim()}
        >
          <Ionicons 
            name="send" 
            size={20} 
            color={chatInput.trim() ? colors.background : colors.secondary} 
          />
        </TouchableOpacity>
      </View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(229, 229, 229, 0.3)',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 24,
    padding: 4,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  input: {
    flex: 1,
    height: 44,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#0F172A',
    fontWeight: '500',
  },
  sendButton: {
    width: 40,
    height: 40,
    backgroundColor: '#0EA5E9',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 2,
  },
  sendButtonDisabled: {
    backgroundColor: '#E2E8F0',
  },
  searchIcon: {
    marginLeft: 12,
  },
}); 