import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

interface ProfileCardProps {
  name: string;
  role: string;
  avatarUrl: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  role,
  avatarUrl,
}) => {
  const { width, height } = useWindowDimensions();
  const isTablet = width > 768;
  const isSmallPhone = width < 375;

  // Responsive sizing
  const cardPadding = isTablet ? 30 : isSmallPhone ? 10 : 20;
  const avatarSize = isTablet ? 120 : isSmallPhone ? 60 : 80;
  const titleSize = isTablet ? 28 : isSmallPhone ? 16 : 22;
  const subtitleSize = isTablet ? 18 : isSmallPhone ? 12 : 14;

  return (
    <View
      style={[
        styles.card,
        {
          padding: cardPadding,
          flexDirection: isTablet ? 'row' : 'column',
          alignItems: 'center',
        },
      ]}
    >
      {/* Avatar */}
      <View
        style={[
          styles.avatarContainer,
          {
            width: avatarSize,
            height: avatarSize,
            marginBottom: isTablet ? 0 : 15,
            marginRight: isTablet ? 20 : 0,
          },
        ]}
      >
        <Image
          source={{ uri: avatarUrl }}
          style={{
            width: avatarSize,
            height: avatarSize,
            borderRadius: avatarSize / 2,
          }}
        />
      </View>

      {/* Info */}
      <View style={[styles.info, { alignItems: isTablet ? 'flex-start' : 'center' }]}>
        <Text style={[styles.name, { fontSize: titleSize }]}>{name}</Text>
        <Text style={[styles.role, { fontSize: subtitleSize }]}>{role}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    margin: 16,
  },
  avatarContainer: {
    borderRadius: 100,
    overflow: 'hidden',
    backgroundColor: '#e0e0e0',
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  role: {
    color: '#666',
  },
});

export default ProfileCard;