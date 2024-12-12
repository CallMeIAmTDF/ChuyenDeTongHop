import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  TextInput,
  TextInputProps,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: 35,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: "#459DE4",
    marginHorizontal: 5,
  },
  textInput: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export type SingleDigitInputProps = {
  onChangeText: NonNullable<TextInputProps['onChangeText']>;
  value: NonNullable<TextInputProps['value']>;
};

export type SingleDigitInputRef = {
  focus: () => void;
  blur: () => void;
};

export default React.forwardRef<
  SingleDigitInputRef,
  SingleDigitInputProps
>(function SingleDigitInput(props, ref) {
  const inputRef = React.useRef<TextInput>(null);

  React.useImperativeHandle(
    ref,
    () => ({
      focus: () => {
        inputRef.current?.focus();
      },
      blur: () => {
        inputRef.current?.blur();
      },
    }),
    [],
  );
  const handlePress: NonNullable<TouchableOpacityProps['onPress']> =
    React.useCallback(() => {
      inputRef.current?.focus();
    }, []);

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <TextInput
        ref={inputRef}
        style={styles.textInput}
        value={props.value}
        keyboardType={'numeric'}
        onChangeText={props.onChangeText}
        maxLength={1}
      />
    </TouchableOpacity>
  );
});