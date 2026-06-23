import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Share, Alert } from 'react-native';

const ResultScreen = ({ route }) => {
  const { script, transcript, title } = route.params;
  const [activeTab, setActiveTab] = useState('script');

  const handleShare = async () => {
    try {
      await Share.share({ message: activeTab === 'script' ? script : transcript, title: title || 'Script' });
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title || 'Generated Script'}</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tab, activeTab === 'script' && styles.tabActive]} onPress={() => setActiveTab('script')}>
          <Text style={[styles.tabText, activeTab === 'script' && styles.tabTextActive]}>Script</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, activeTab === 'transcript' && styles.tabActive]} onPress={() => setActiveTab('transcript')}>
          <Text style={[styles.tabText, activeTab === 'transcript' && styles.tabTextActive]}>Transcript</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.text}>{activeTab === 'script' ? script : transcript}</Text>
      </ScrollView>

      <TouchableOpacity style={styles.button} onPress={handleShare}>
        <Text style={styles.buttonText}>Share</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { backgroundColor: '#6200EE', padding: 16 },
  title: { fontSize: 18, fontWeight: '700', color: '#fff' },
  tabContainer: { flexDirection: 'row', backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center', borderBottomWidth: 3, borderBottomColor: 'transparent' },
  tabActive: { borderBottomColor: '#6200EE' },
  tabText: { fontSize: 14, fontWeight: '600', color: '#999' },
  tabTextActive: { color: '#6200EE' },
  content: { flex: 1, padding: 16 },
  text: { fontSize: 14, lineHeight: 22, color: '#333', backgroundColor: '#fff', padding: 12, borderRadius: 8 },
  button: { backgroundColor: '#6200EE', padding: 16, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' }
});

export default ResultScreen;
