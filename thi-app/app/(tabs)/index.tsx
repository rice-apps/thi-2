import { Button } from 'react-native-paper'
import { Text, View } from '../../components/Themed'

export default function LoginPage() {
  return (
    <View className='justify-center'>
      <Text className='p-4 '>Placeholder login page</Text>
      <Button
        className='mt-20'
        mode='contained'
        // onPress={() => Alert.alert('Paper button is working!')}
      >
        Login
      </Button>
    </View>
  )
}