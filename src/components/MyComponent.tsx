import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MyComponentProps {
  title: string; // The title text to display
  subtitle?: string; // Optional subtitle text
}

const MyComponent: React.FC<MyComponentProps> = ({
  title,
  subtitle,
}) => {
  return (
    <View style={[styles.container]}>
      <Text style={[styles.title]}>{title}</Text>
      {subtitle && <Text style={[styles.subtitle]}>{subtitle}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
});

export default MyComponent;
