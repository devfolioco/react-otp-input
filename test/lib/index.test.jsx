import React, { useState } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Chance from 'chance';

import OtpInput from '../../src/lib/index.jsx';

const chance = new Chance();
const digit = (min = 0, max = 9) => chance.integer({ min, max }).toFixed();

const OtpWrapped = (props) => {
  const [value, setValue] = useState('');
  const { onChange, ...rest } = props;
  const handleChange = (v) => {
    setValue(v);
    onChange && onChange(v);
  };
  return <OtpInput {...rest} value={value} onChange={handleChange} />;
};

describe('OtpInput', () => {
  it('renders with minimal props', async () => {
    const { container } = render(<OtpInput />);

    const inputs = container.querySelectorAll('input');
    inputs.forEach((input, i) => {
      expect(input).toHaveAttribute('aria-label', expect.stringContaining(`Character ${i + 1}`));
      expect(input).toHaveAttribute('maxlength', '1');
      expect(input).toHaveAttribute('autocomplete', 'off');
      expect(input).toHaveAttribute('style', expect.stringContaining('text-align: center;'));
      expect(input).toHaveValue('');
    });
  });

  describe('prop: value', () => {
    it('sets inputs to empty when value is unset', async () => {
      const { container } = render(<OtpInput />);

      const inputs = container.querySelectorAll('input');
      inputs.forEach((input) => expect(input).toHaveValue(''));
    });

    it('sets inputs corretly matching value', async () => {
      const otp = chance.string({ numeric: true, length: 4 });
      const { container } = render(<OtpInput value={otp} />);

      const inputs = container.querySelectorAll('input');
      inputs.forEach((input, i) => expect(input).toHaveValue(otp[i]));
    });
  });

  describe('prop: onChange', () => {
    it('defaults onChange to console.log', async () => {
      const char = chance.character({ alpha: true, numeric: true });
      const log = jest.spyOn(console, 'log').mockImplementation(() => {});

      const { container } = render(<OtpInput />);

      const input = container.querySelector('input');
      userEvent.type(input, char);
      expect(log).toBeCalledWith(char);
    });

    it('calls onChange when an input is changed', async () => {
      const onChange = jest.fn();
      const { container } = render(<OtpInput onChange={onChange} />);

      const inputs = container.querySelectorAll('input');
      inputs.forEach((input) => {
        const char = chance.character({ alpha: true, numeric: true });
        userEvent.type(input, char);
        expect(onChange).toBeCalledWith(char);
      });
    });
  });

  describe('prop: placeholder', () => {
    it('does not set a placeholder when placeholder is unset', async () => {
      const { container } = render(<OtpInput />);

      const inputs = container.querySelectorAll('input');
      inputs.forEach((input) => expect(input).not.toHaveAttribute('placeholder'));
    });

    it('does set a placeholder when placeholder is set', async () => {
      const placeholder = chance.string({ alpha: true, length: 5 });
      const { container } = render(<OtpInput numInputs={5} placeholder={placeholder} />);

      const inputs = container.querySelectorAll('input');
      inputs.forEach((input, i) => expect(input).toHaveAttribute('placeholder', placeholder[i]));
    });

    it('shows error when placeholder length not the same as numInputs', async () => {
      const log = jest.spyOn(console, 'error').mockImplementation(() => {});

      const placeholder = chance.string({ alpha: true, length: 5 });
      const numInputs = placeholder.length - 1;
      const { container } = render(<OtpInput numInputs={numInputs} placeholder={placeholder} />);

      expect(log).toBeCalledWith('Length of the placeholder should be equal to the number of inputs.');
    });
  });

  describe('prop: inputStyle', () => {
    it('handles inputStyle as string', async () => {
      const { container } = render(<OtpInput inputStyle="test-input-style" />);

      const inputs = container.querySelectorAll('input');
      inputs.forEach((input) => {
        expect(input).toHaveAttribute('class', expect.stringContaining('test-input-style'));
      });
    });

    it('handles inputStyle as style object', async () => {
      const boxShadow = `${digit()}px ${digit()}px ${digit()}px lavender`;
      const { container } = render(<OtpInput inputStyle={{ boxShadow }} />);

      const inputs = container.querySelectorAll('input');
      inputs.forEach((input) => {
        expect(input).toHaveAttribute('style', expect.stringContaining(`box-shadow: ${boxShadow}`));
      });
    });
  });

  describe('prop: numInputs', () => {
    it('shows 4 inputs when numInputs is unset', async () => {
      const { container } = render(<OtpInput />);

      const inputs = container.querySelectorAll('input');
      expect(inputs.length).toBe(4);
    });

    it('shows number of inputs equal to numInputs', async () => {
      const len = +digit(3, 9);
      const { container } = render(<OtpInput numInputs={len} />);

      const inputs = container.querySelectorAll('input');
      expect(inputs.length).toBe(len);
      inputs.forEach((input, i) => {
        expect(input).toHaveAttribute('aria-label', expect.stringContaining(`Character ${i + 1}`));
      });
    });
  });

  describe('prop: isDisabled', () => {
    it('does not set inputs disabled when isDisabled is unset', async () => {
      const { container } = render(<OtpInput />);

      const inputs = container.querySelectorAll('input');
      inputs.forEach((input) => expect(input).not.toHaveAttribute('disabled'));
    });

    it('does not set inputs disabled when isDisabled is false', async () => {
      const { container } = render(<OtpInput isDisabled={false} />);

      const inputs = container.querySelectorAll('input');
      inputs.forEach((input) => expect(input).not.toHaveAttribute('disabled'));
    });

    it('sets inputs disabled when isDisabled is true', async () => {
      const { container } = render(<OtpInput isDisabled={true} />);

      const inputs = container.querySelectorAll('input');
      inputs.forEach((input) => expect(input).toHaveAttribute('disabled'));
    });

    it('does not apply disabledStyle when isDisabled is false', async () => {
      const boxShadow = `${digit()}px ${digit()}px ${digit()}px aliceblue`;
      const { container } = render(<OtpInput isDisabled={false} disabledStyle={{ boxShadow }} />);

      const inputs = container.querySelectorAll('input');
      inputs.forEach((input) => {
        expect(input).not.toHaveAttribute('style', expect.stringContaining(`box-shadow: ${boxShadow};`));
      });
    });

    it('does apply disabledStyle when isDisabled is true', async () => {
      const boxShadow = `${digit()}px ${digit()}px ${digit()}px aliceblue`;
      const { container } = render(<OtpInput isDisabled={true} disabledStyle={{ boxShadow }} />);

      const inputs = container.querySelectorAll('input');
      inputs.forEach((input) => {
        expect(input).toHaveAttribute('style', expect.stringContaining(`box-shadow: ${boxShadow};`));
      });
    });
  }); // isDisabled

  describe('prop: isInputSecure', () => {
    it('sets inputs to type text when isInputSecure unset', async () => {
      const { container } = render(<OtpInput />);

      const inputs = container.querySelectorAll('input');
      inputs.forEach((input) => expect(input.type).toBe('text'));
    });

    it('sets inputs to type text when isInputSecure is false', async () => {
      const { container } = render(<OtpInput isInputSecure={false} />);

      const inputs = container.querySelectorAll('input');
      inputs.forEach((input) => expect(input.type).toBe('text'));
    });

    it('sets inputs to type password when isInputSecure is true', async () => {
      const { container } = render(<OtpInput isInputSecure={true} />);

      const inputs = container.querySelectorAll('input');
      inputs.forEach((input) => expect(input.type).toBe('password'));
    });
  }); // isInputSecure

  describe('prop: separator', () => {
    it('creates the right separators', async () => {
      const len = +digit(3, 9);
      const separator = <span data-testid="test-separator"></span>;

      render(<OtpInput numInputs={len} separator={separator} />);

      const separators = screen.getAllByTestId('test-separator');
      expect(separators).toHaveLength(len - 1);
    });
  });

  describe('prop: shouldAutoFocus', () => {
    it('does not focus when shouldAutoFocus is unset', async () => {
      render(<OtpInput />);
      expect(document.activeElement.tagName).toBe('BODY');
    });

    it('does not focus when shouldAutoFocus is false', async () => {
      render(<OtpInput shouldAutoFocus={false} />);
      expect(document.activeElement.tagName).toBe('BODY');
    });

    it('does focus the first input when shouldAutoFocus is true', async () => {
      const { container } = render(<OtpInput shouldAutoFocus={true} />);
      const input = container.querySelector('input');

      expect(document.activeElement.tagName).toBe('INPUT');
      expect(input).toHaveFocus();
      expect(input).toHaveAttribute('aria-label', expect.stringContaining('Character 1'));
    });

    it.skip('[BUG] does not apply focusStyle when input is not focused', async () => {
      const boxShadow = `${digit()}px ${digit()}px ${digit()}px dodgerblue`;
      const { container } = render(<OtpInput focusStyle={{ boxShadow }} />);
      const input = container.querySelector('input');

      expect(input).not.toHaveFocus();
      expect(input).toHaveAttribute('aria-label', expect.stringContaining('Character 1'));

      // BUG: on first render focusStyle is applied even when input is not focused
      expect(input).not.toHaveAttribute('style', expect.stringContaining(`box-shadow: ${boxShadow};`));
    });

    it('does apply focusStyle when input is focused', async () => {
      const boxShadow = `${digit()}px ${digit()}px ${digit()}px dodgerblue`;
      const { container } = render(<OtpInput focusStyle={{ boxShadow }} />);
      const inputs = container.querySelectorAll('input');

      inputs.forEach((input, i) => {
        input.focus();
        expect(input).toHaveFocus();
        expect(input).toHaveAttribute('style', expect.stringContaining(`box-shadow: ${boxShadow};`));
      });
    });
  });

  describe('prop: isInputNum', () => {
    it('sets input type to tel when isInputNum is true', async () => {
      const { container } = render(<OtpInput isInputNum={true} />);

      const inputs = container.querySelectorAll('input');
      inputs.forEach((input, i) => {
        expect(input.type).toBe('tel');
        expect(input).toHaveAttribute('aria-label', expect.stringContaining(`Digit ${i + 1}`));
      });
    });
  });

  describe('prop: containerStyle', () => {
    it('handles containerStyle as string', async () => {
      const { container } = render(<OtpInput containerStyle="test-class" />);

      const wrapper = container.children[0];
      expect(wrapper).toHaveAttribute('class', 'test-class');
    });

    it('handles containerStyle as style object', async () => {
      const boxShadow = `${digit()}px ${digit()}px ${digit()}px rebeccapurple`;
      const { container } = render(<OtpInput containerStyle={{ boxShadow }} />);

      const wrapper = container.children[0];
      expect(wrapper).toHaveAttribute('style', expect.stringContaining(`box-shadow: ${boxShadow}`));
    });
  });

  describe('prop: className', () => {
    it('sets inputs class when className is set', async () => {
      const { container } = render(<OtpInput className="test-class" />);

      const inputs = container.querySelectorAll('input');
      inputs.forEach((input) => {
        expect(input.parentElement).toHaveAttribute('class', 'test-class');
      });
    });
  });

  describe('prop: hasErrored', () => {
    it('does not apply errorStyle when hasErrored is unset', async () => {
      const boxShadow = `${digit()}px ${digit()}px ${digit()}px firebrick`;
      const { container } = render(<OtpInput errorStyle={{ boxShadow }} />);

      const inputs = container.querySelectorAll('input');
      inputs.forEach((input) => {
        expect(input).not.toHaveAttribute('style', expect.stringContaining(`box-shadow: ${boxShadow}`));
      });
    });

    it('does not apply errorStyle when hasErrored is false', async () => {
      const boxShadow = `${digit()}px ${digit()}px ${digit()}px firebrick`;
      const { container } = render(<OtpInput hasErrored={false} errorStyle={{ boxShadow }} />);

      const inputs = container.querySelectorAll('input');
      inputs.forEach((input) => {
        expect(input).not.toHaveAttribute('style', expect.stringContaining(`box-shadow: ${boxShadow}`));
      });
    });

    it('does apply errorStyle when hasErrored is true', async () => {
      const boxShadow = `${digit()}px ${digit()}px ${digit()}px firebrick`;
      const { container } = render(<OtpInput hasErrored={true} errorStyle={{ boxShadow }} />);

      const inputs = container.querySelectorAll('input');
      inputs.forEach((input) => {
        expect(input).toHaveAttribute('style', expect.stringContaining(`box-shadow: ${boxShadow}`));
      });
    });
  });

  describe('prop: data-testid', () => {
    it('sets data-testid in each input as expected', async () => {
      const { container } = render(<OtpInput data-testid="test-id" />);
      const inputs = container.querySelectorAll('input');

      inputs.forEach((input, i) => {
        expect(input).toHaveAttribute('data-testid', `test-id-${i}`);
      });
    });
  });

  describe('prop: data-cy', () => {
    it('sets data-cy in each input as expected', async () => {
      const { container } = render(<OtpInput data-cy="test-cy" />);
      const inputs = container.querySelectorAll('input');

      inputs.forEach((input, i) => {
        expect(input).toHaveAttribute('data-cy', `test-cy-${i}`);
      });
    });
  });

  describe('typing otp values', () => {
    it('accepts valid values and moves focus to next input', async () => {
      const { container } = render(<OtpWrapped />);
      const inputs = container.querySelectorAll('input');

      inputs.forEach((input, i) => {
        const char = chance.character({ alpha: true, numeric: true });
        userEvent.type(input, char);
        expect(input).toHaveValue(char);

        const nextInput = inputs[i + 1] ?? input;
        expect(nextInput).toHaveFocus();
      });
    });

    it('isInputNum: accepts valid values and moves focus to next input', async () => {
      const { container } = render(<OtpWrapped isInputNum={true} />);
      const inputs = container.querySelectorAll('input');

      inputs.forEach((input, i) => {
        // non numbers have not effect
        const char = chance.character({ alpha: true, symbols: true });
        userEvent.type(input, char === '[' ? '[[' : char); // see https://testing-library.com/docs/ecosystem-user-event/#keyboardtext-options
        expect(input).toHaveValue('');
        expect(input).toHaveFocus();

        // numbers are accepted
        const digit = chance.character({ numeric: true });
        userEvent.type(input, digit);
        expect(input).toHaveValue(digit);

        const nextInput = inputs[i + 1] ?? input;
        expect(nextInput).toHaveFocus();
      });
    });
  });

  describe('onPaste', () => {
    it('calls onChange with the pasted value', async () => {
      const otp = chance.string({ numeric: true, length: 4 });
      const onChange = jest.fn();

      const { container } = render(<OtpWrapped onChange={onChange} />);
      const input = container.querySelector('input');

      expect(onChange).toBeCalledTimes(0);
      userEvent.paste(input, otp, { clipboardData: { getData: () => otp } });

      expect(onChange).toBeCalledTimes(1);
      expect(onChange).toBeCalledWith(otp);

      const inputs = container.querySelectorAll('input');
      inputs.forEach((input, i) => expect(input).toHaveValue(otp[i]));
    });
  });

  describe('onKeyDown', () => {
    it('Backspace: clears the input and focuses previous input when backspace is pressed', async () => {
      const { container } = render(<OtpWrapped />);
      const inputs = container.querySelectorAll('input');
      const [first, second, third] = inputs;

      userEvent.type(first, '1');
      userEvent.type(second, '2');
      userEvent.type(second, '{backspace}');

      expect(second).toHaveValue('');
      expect(first).toHaveValue('1');
      expect(first).toHaveFocus();
    });

    it('Delete: clears the input and keeps focus when delete is pressed', async () => {
      const { container } = render(<OtpWrapped />);
      const inputs = container.querySelectorAll('input');
      const [first, second, third] = inputs;

      userEvent.type(first, '1');
      userEvent.type(second, '2');
      userEvent.type(second, '{delete}');

      expect(second).toHaveValue('');
      expect(second).toHaveFocus();
    });

    it('ArrowLeft: moves focus to prev input', async () => {
      const { container } = render(<OtpWrapped numInputs={digit(3, 9)} />);
      const inputs = [...container.querySelectorAll('input')].reverse();

      inputs.forEach((input, i) => {
        userEvent.type(input, '{arrowleft}');
        const nextInput = inputs[i + 1] ?? input;
        expect(nextInput).toHaveFocus();
      });
    });

    it('ArrowRight: moves focus to next input', async () => {
      const { container } = render(<OtpWrapped numInputs={digit(3, 9)} />);
      const inputs = container.querySelectorAll('input');

      inputs.forEach((input, i) => {
        userEvent.type(input, '{arrowright}');
        const nextInput = inputs[i + 1] ?? input;
        expect(nextInput).toHaveFocus();
      });
    });

    it('Space: input is not changed', async () => {
      const otp = chance.string({ numeric: true, length: 4 });
      const onChange = jest.fn();

      const { container } = render(<OtpWrapped onChange={onChange} />);
      const inputs = container.querySelectorAll('input');

      expect(onChange).toBeCalledTimes(0);
      userEvent.paste(inputs[0], otp, { clipboardData: { getData: () => otp } });
      expect(onChange).toBeCalledTimes(1);

      inputs.forEach((input, i) => {
        expect(input).toHaveValue(otp[i]);
        userEvent.type(input, '{space}');
        expect(input).toHaveValue(otp[i]);
        expect(input).toHaveFocus();
      });

      expect(onChange).toBeCalledTimes(1);
    });
  });
});
