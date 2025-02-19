import { StyleSheet, View, useWindowDimensions } from 'react-native';

import { ChatInput } from '../components/ChatInput';
import { ChatMessages } from '../components/ChatMessages';
import { Header } from '../components/Header';
import { ThemedView } from '../components/ThemedView';
import { useChat } from '../hooks/useChat';
import { ThemedText } from '../components/ThemedText';

export default function ChatScreen() {
  const { chatInput, messages, sendMessage, setChatInput } = useChat();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const isTablet = width >= 768 && width < 1024;

  return (
    <ThemedView style={styles.container}>
      <Header />
      <View style={styles.mainContent}>
        {/* Side Panel for Desktop */}
        {isDesktop && (
          <View style={styles.sidePanel}>
            <ThemedText weight="semibold" size="lg" style={styles.sidePanelTitle}>
              Recent Chats
            </ThemedText>
            {/* Add recent chats list here */}
          </View>
        )}

        <View style={styles.chatContainer}>
          {/* Chat Input Section */}
          <View style={styles.inputSection}>
            <ChatInput
              chatInput={chatInput}
              setChatInput={setChatInput}
              sendMessage={sendMessage}
              style={[
                styles.chatInput,
                isTablet && styles.tabletInput,
                isDesktop && styles.desktopInput
              ]}
            />
          </View>

          {/* Messages Section */}
          <ChatMessages 
            messages={messages} 
            style={styles.messages} 
          />
        </View>

        {/* Context Panel for Desktop */}
       
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
  },
  sidePanel: {
    width: 280,
    borderRightWidth: 1,
    borderRightColor: 'rgba(229, 229, 229, 0.3)',
    padding: 16,
    display: 'none', // Initially hidden, shown in desktop
  },
  contextPanel: {
    width: 300,
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(229, 229, 229, 0.3)',
    padding: 16,
  },
  sidePanelTitle: {
    marginBottom: 16,
  },
  contextTitle: {
    marginBottom: 16,
  },
  chatContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  inputSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(229, 229, 229, 0.3)',
  },
  chatInput: {
    width: '100%',
    maxWidth: '100%',
  },
  tabletInput: {
    maxWidth: 600,
    alignSelf: 'center',
  },
  desktopInput: {
    maxWidth: 800,
    alignSelf: 'center',
  },
  messages: {
    flex: 1,
  },
}); 