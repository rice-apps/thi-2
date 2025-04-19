import React, { useState, useCallback } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  Platform
} from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { useDropzone } from 'react-dropzone';

interface AddScheduleProps {
  visible: boolean;
  onClose: () => void;
  setImageURL: React.Dispatch<React.SetStateAction<string[]>>;
  imageURL: string[];
}

export default function AddSchedule({ visible, onClose, setImageURL,imageURL}: AddScheduleProps) {
  const screenWidth = Dimensions.get('window').width * 0.3;
//   const [imageURL, setImageURL] = useState<string[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const urls = acceptedFiles.map((file) => URL.createObjectURL(file));
    setImageURL(prev => [...prev, ...urls]);

  }, [setImageURL]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/png': ['.png', '.jpeg', '.jpeg'], },
    multiple: true,
    onDrop, 
  });

  return (
    <View>
      <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
        {/* overlay */}
        <View className="flex-1 justify-center items-center bg-black/50">
          {/* right-side sliding panel */}
          <View
            style={{
              position: 'absolute',
              right: 0,
              width: screenWidth,
              backgroundColor: 'white',
              height: '100%',
              shadowColor: '#000',
              shadowOffset: { width: -4, height: 0 },
              shadowOpacity: 0.2,
              shadowRadius: 6,
              elevation: 5,
            }}
          >
            {/* Header */}
            <View className="flex flex-row bg-[#105366] h-[64px] items-center justify-between px-6">
              <Text className="text-white text-xl font-semibold">Add Schedule</Text>
              <FontAwesome6 name="xmark" size={22} color="white" onPress={onClose} />
            </View>

            {/* Body */}
            <ScrollView contentContainerStyle={{ padding: 16 }}>
              <Text className="font-bold text-xl mb-2 p-4">Insert any pictures here</Text>

              {/* Dropzone */}
              {Platform.OS === 'web' ? (
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-xl p-6 flex items-center justify-center ${
                  isDragActive ? 'bg-[#e0f7fa] border-[#105366]' : 'bg-gray-100 border-gray-300'
                }`}
              >
                <input {...getInputProps()} />
                <Text className="text-base text-center">
                  {isDragActive
                    ? 'Drop the image here...'
                    : 'Drag file here to upload'}
                </Text>
              </div>
            ) : (
              <View className="border border-gray-300 rounded-xl p-4 bg-gray-100">
                <Text className="text-base text-center text-gray-600">
                  Image upload is only available on web.
                </Text>
              </View>
            )}

            


              {/* Image Preview */}
              {imageURL.map((url: any,idx: React.Key | null | undefined) =>(
                <Image
                key={idx}
                source={{ uri: url }}
                className="w-full h-[150px] rounded-xl mt-4"
                  resizeMode="cover"
                />
              ))}
      
            </ScrollView>

            {/* Footer */}
            <View className="flex flex-row bg-white h-[64px] items-center justify-between px-6">
              <Text className="text-base text-[#105366] font-semibold" onPress={onClose}>
                Cancel
              </Text>
              <TouchableOpacity
                className="shadow bg-[#105366] rounded-lg pt-2 pr-6 pl-6 pb-2"
                onPress={onClose}
              >
                <Text className="text-lg text-white font-semibold">Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
