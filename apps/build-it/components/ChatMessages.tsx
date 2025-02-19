import React from 'react';
import { ScrollView, View, StyleSheet, Platform } from 'react-native';
import Markdown from 'react-native-markdown-display';

import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

interface Message {
  sender: 'user' | 'llm';
  text: string;
}

interface ChatMessagesProps {
  messages: Message[];
  style?: object;
}

export function ChatMessages({ messages, style }: ChatMessagesProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const formatJSON = (text: string) => {
    try {
      const json = JSON.parse(text);
      return `
# ${Object.keys(json)[0]}

${Object.entries(json[Object.keys(json)[0]]).map(([key, value]: [string, any]) => `
## ${key}
${typeof value === 'object' && value !== null 
  ? Object.entries(value).map(([subKey, subValue]: [string, any]) => `
### ${subKey}
${typeof subValue === 'object' && subValue !== null 
  ? Object.entries(subValue).map(([k, v]) => `- **${k}**: ${v}`).join('\n')
  : subValue
}`).join('\n')
  : value
}`).join('\n')}
`;
    } catch (e) {
      return text;
    }
  };

  const markdownStyles = {
    body: {
      color: colors.text,
      fontSize: 15,
      lineHeight: 24,
    },
    code_block: {
      backgroundColor: colorScheme === 'light' ? '#f7fafc' : '#1a202c',
      padding: 16,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colorScheme === 'light' ? '#edf2f7' : '#2d3748',
      marginVertical: 12,
    },
    code_inline: {
      fontFamily: 'SpaceMono',
      backgroundColor: colorScheme === 'light' ? '#f7fafc' : '#1a202c',
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 4,
      fontSize: 14,
      color: colorScheme === 'light' ? '#4a5568' : '#a0aec0',
    },
    heading1: {
      color: colors.text,
      marginVertical: 24,
      fontSize: 24,
      fontWeight: 'bold',
    },
    heading2: {
      color: colors.text,
      marginTop: 24,
      marginBottom: 16,
      fontSize: 20,
      fontWeight: '600',
    },
    heading3: {
      color: colors.text,
      marginTop: 20,
      marginBottom: 12,
      fontSize: 18,
      fontWeight: '500',
    },
    list_item: {
      marginVertical: 6,
      color: colors.text,
    },
    paragraph: {
      marginVertical: 12,
      lineHeight: 24,
      color: colors.text,
    },
    link: {
      color: colors.tint,
    },
    strong: {
      color: colors.text,
      fontWeight: '600',
    },
  };

  return (
    <ScrollView 
      style={[
        styles.container,
        { backgroundColor: colors.background },
        style
      ]}
      contentContainerStyle={styles.contentContainer}
    >
      {messages.map((message, index) => (
        <View
          key={index}
          style={[
            styles.messageWrapper,
            message.sender === 'user' ? styles.userMessageWrapper : styles.aiMessageWrapper
          ]}
        >
          <View
            style={[
              styles.messageBubble,
              message.sender === 'user' 
                ? { backgroundColor: colors.primary }
                : { backgroundColor: colors.surface }
            ]}
          >
            <Markdown
              style={{
                body: [
                  styles.messageText,
                  { 
                    color: message.sender === 'user' 
                      ? colors.background 
                      : colors.text 
                  }
                ],
                code_block: [
                  styles.codeBlock,
                  { 
                    backgroundColor: colorScheme === 'dark' 
                      ? 'rgba(0, 0, 0, 0.2)' 
                      : 'rgba(0, 0, 0, 0.05)' 
                  }
                ],
                code_inline: styles.inlineCode,
                link: styles.link,
              }}
            >
              {message.text}
            </Markdown>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  contentContainer: {
    padding: 16,
    gap: 16,
  },
  messageWrapper: {
    maxWidth: '80%',
  },
  userMessageWrapper: {
    alignSelf: 'flex-end',
  },
  aiMessageWrapper: {
    alignSelf: 'flex-start',
  },
  messageBubble: {
    borderRadius: 20,
    padding: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  userMessage: {
    backgroundColor: '#0EA5E9',
    borderTopRightRadius: 4,
  },
  aiMessage: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 4,
  },
  userMessageText: {
    color: '#FFFFFF',
    fontSize: 15,
    lineHeight: 22,
  },
  aiMessageText: {
    color: '#0F172A',
    fontSize: 15,
    lineHeight: 22,
  },
  codeBlock: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    padding: 12,
    borderRadius: 8,
    fontFamily: 'SpaceMono',
    fontSize: 14,
  },
  inlineCode: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontFamily: 'SpaceMono',
    fontSize: 14,
  },
  link: {
    color: '#0EA5E9',
    textDecorationLine: 'underline',
  },
}); 