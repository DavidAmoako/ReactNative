import { 
    StyleSheet, 
    Text, 
    View, 
} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function index() {
  return (
    <SafeAreaView
      style={styles.container}
      edges={['top', 'left', 'right']}>
      <Text style={styles.text}>
        index
        </Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: '#333',
  },
})