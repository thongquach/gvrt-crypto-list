import { Text, type TextProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'secondary';
  fontWeight?: 'default' | 'semiBold';
  color?: 'default' | 'secondary' | 'danger' | 'success';
};

export function ThemedText({
  style,
  type = 'default',
  fontWeight = 'default',
  color = 'default',
  ...rest
}: ThemedTextProps) {
  const defaultColor = useThemeColor({}, 'text');

  return (
    <Text
      style={[
        typeStyles[type],
        color === 'default' ? { color: defaultColor } : colorStyles[color],
        fontWeightStyles[fontWeight],
        style,
      ]}
      {...rest}
    />
  );
}

const typeStyles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  secondary: {
    fontSize: 13,
  },
});

const colorStyles = StyleSheet.create({
  secondary: {
    color: Colors.text.secondary,
  },
  danger: {
    color: Colors.text.danger,
  },
  success: {
    color: Colors.text.success,
  },
});

const fontWeightStyles = StyleSheet.create({
  default: {
    fontWeight: 'normal',
  },
  semiBold: {
    fontWeight: '600',
  },
});
