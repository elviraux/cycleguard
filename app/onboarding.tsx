import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { useRouter } from 'expo-router';
import { OnboardingScreen } from '@/components/OnboardingScreen';
import { UterusIcon } from '@/components/icons/UterusIcon';
import { DataLeakIcon } from '@/components/icons/DataLeakIcon';
import { ShieldIcon } from '@/components/icons/ShieldIcon';
import { HandPhoneIcon } from '@/components/icons/HandPhoneIcon';
import { EncryptedBackupIcon } from '@/components/icons/EncryptedBackupIcon';
import { SecurityIcon } from '@/components/icons/SecurityIcon';

const screens = [
  {
    id: '1',
    title: 'Your Cycle. Your Space.',
    body: 'A private tracker that lives only on your device.',
    icon: <UterusIcon size={120} />,
  },
  {
    id: '2',
    title: "You Control Your Data",
    body: "Many apps use your sensitive cycle data. We don't. Track your cycle with peace of mind.",
    icon: <DataLeakIcon size={120} />,
  },
  {
    id: '3',
    title: 'Your Data Stays on Your Phone',
    body: 'Nothing is stored online. Nothing leaves your device.',
    icon: <ShieldIcon size={120} />,
  },
  {
    id: '4',
    title: 'Track Freely',
    body: 'Cycle insights with zero data exposure.',
    icon: <HandPhoneIcon size={120} />,
  },
];

export default function OnboardingFlow() {
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / event.nativeEvent.layoutMeasurement.width);
    setCurrentIndex(index);
  };

  const goToNext = () => {
    if (currentIndex < screens.length + 2) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    }
  };

  const goToPremium = () => {
    flatListRef.current?.scrollToIndex({
      index: 4,
      animated: true,
    });
  };

  const skipPremium = () => {
    flatListRef.current?.scrollToIndex({
      index: 5,
      animated: true,
    });
  };

  const goToSetup = () => {
    router.push('/setup');
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    // Premium screen
    if (index === 4) {
      return (
        <OnboardingScreen
          title="Upgrade Your Privacy"
          body="Local encrypted backup, deeper insights, stealth mode."
          icon={<EncryptedBackupIcon size={120} />}
          primaryButton={{
            title: 'Unlock Premium →',
            onPress: skipPremium, // For now, just continue
          }}
          secondaryButton={{
            title: 'Maybe Later',
            onPress: skipPremium,
          }}
        />
      );
    }

    // Start securely screen
    if (index === 5) {
      return (
        <OnboardingScreen
          title="You're in Control"
          body="Simple, accurate, 100% private."
          icon={<SecurityIcon size={120} />}
          primaryButton={{
            title: 'Start Tracking →',
            onPress: goToSetup,
          }}
        />
      );
    }

    // Regular onboarding screens
    return (
      <OnboardingScreen
        title={item.title}
        body={item.body}
        icon={item.icon}
        primaryButton={{
          title: index === screens.length - 1 ? 'Benefits →' : index === 2 ? 'Why It Matters →' : index === 1 ? 'Learn More →' : 'Continue →',
          onPress: index === screens.length - 1 ? goToPremium : goToNext,
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={[...screens, { id: 'premium' }, { id: 'start' }]}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        bounces={false}
        getItemLayout={(data, index) => ({
          length: 400, // Approximate width
          offset: 400 * index,
          index,
        })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
