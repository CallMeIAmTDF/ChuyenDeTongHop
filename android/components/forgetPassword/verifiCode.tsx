
import React from 'react';

import {
  StyleSheet,
  View
} from 'react-native';
import SingleDigitInputPros, { SingleDigitInputProps, SingleDigitInputRef } from '../other/singleDigitInputPros';
import ButtonBox from '../other/buttonBox';
interface StatusProps {
  funVoid: () => void;
}
const styles = StyleSheet.create({
  viewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  }
});

const MAX_DIGITS = 6

const VerifiCode: React.FC<StatusProps> = ({funVoid}) => {
  const submitVeri = () => {
    funVoid();
}
  const [singleDigits, setSingleDigits] = React.useState<string[]>([]);
  const addDigit = React.useCallback(
    (digit: string) => {
      if (digit.length > 1) {
        return;
      }
      setSingleDigits(prev => {
        if (prev.length >= MAX_DIGITS) {
          return prev;
        }

        return [...prev, digit];
      });
    },
    [setSingleDigits],
  );

  const removeDigit = React.useCallback(
    ({index}: {index: number}) => {
      setSingleDigits(prev => {
        if (prev.length === 0) {
          return prev;
        }

        return [...prev.slice(0, index), ...prev.slice(index + 1)];
      });
    },
    [setSingleDigits],
  );

  const handleChangeSingleDigit: (
    index: number,
  ) => SingleDigitInputProps['onChangeText'] = React.useCallback(
    index => text => {
      if (text.length > 1 && index < MAX_DIGITS - 1) {
        refs.current[index + 1]?.focus();
        return;
      }

      if (text.length === 1 && index < MAX_DIGITS - 1) {
        addDigit(text);
        refs.current[index + 1]?.focus();
        return;
      }

      if (text.length === 1 && index === MAX_DIGITS - 1) {
        addDigit(text);
        return;
      }

      if (text.length === 0 && index > 0) {
        refs.current[index - 1]?.focus();
        removeDigit({index: index});
        return;
      }

      if (text.length === 0 && index === 0) {
        removeDigit({index: index});
        return;
      }
    },
    [addDigit, removeDigit],
  );

  const refs = React.useRef<SingleDigitInputRef[]>(
    Array.from({length: MAX_DIGITS}),
  );

  return (
    <View>
    <View style={styles.viewContainer}>
      {Array.from({length: MAX_DIGITS}).map((_, index) => (
        <SingleDigitInputPros
          key={`${index}`}
          value={singleDigits[index] || ''}
          ref={r => r && (refs.current[index] = r)}
          onChangeText={handleChangeSingleDigit(index)}
        />
      ))}
    </View>
    <ButtonBox name="Verify" funVoid={submitVeri} background="#459DE4" border={0} colorText="#FFFDFD"/>
    </View>
  );
}

export default VerifiCode;