import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Chance from 'chance';

import OtpInput from '../../src/lib/index.jsx';

const chance = new Chance();
const randomDigit = (min = 0, max = 9) => chance.integer({ min, max }).toFixed();

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
      const otp = [randomDigit(), randomDigit(), randomDigit(), randomDigit()];
      const { container } = render(<OtpInput value={otp.join('')} />);

      const inputs = container.querySelectorAll('input');
      inputs.forEach((input, i) => expect(input).toHaveValue(otp[i]));
    });
  });

  describe('prop: onChange', () => {
    it('defaults onChange to console.log', async () => {
      const char = randomDigit();
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
        const char = randomDigit();
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
      const placeholder = chance.string({ length: 5, alpha: true, casing: 'lower' });
      const { container } = render(<OtpInput numInputs={5} placeholder={placeholder} />);

      const inputs = container.querySelectorAll('input');
      inputs.forEach((input, i) => expect(input).toHaveAttribute('placeholder', placeholder[i]));
    });

    it('shows error when placeholder length not the same as numInputs', async () => {
      const log = jest.spyOn(console, 'error').mockImplementation(() => {});

      const placeholder = chance.string({ length: 5, alpha: true, casing: 'lower' });
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
      const boxShadow = `${randomDigit()}px ${randomDigit()}px ${randomDigit()}px lavender`;
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
      const len = +randomDigit(3, 9);
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
      const boxShadow = `${randomDigit()}px ${randomDigit()}px ${randomDigit()}px aliceblue`;
      const { container } = render(<OtpInput isDisabled={false} disabledStyle={{ boxShadow }} />);

      const inputs = container.querySelectorAll('input');
      inputs.forEach((input) => {
        expect(input).not.toHaveAttribute('style', expect.stringContaining(`box-shadow: ${boxShadow};`));
      });
    });

    it('does apply disabledStyle when isDisabled is true', async () => {
      const boxShadow = `${randomDigit()}px ${randomDigit()}px ${randomDigit()}px aliceblue`;
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
      const len = +randomDigit(3, 9);
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
      const boxShadow = `${randomDigit()}px ${randomDigit()}px ${randomDigit()}px dodgerblue`;
      const { container } = render(<OtpInput focusStyle={{ boxShadow }} />);
      const input = container.querySelector('input');

      expect(input).not.toHaveFocus();
      expect(input).toHaveAttribute('aria-label', expect.stringContaining('Character 1'));

      // BUG: on first render focusStyle is applied even when input is not focused
      expect(input).not.toHaveAttribute('style', expect.stringContaining(`box-shadow: ${boxShadow};`));
    });

    it('does apply focusStyle when input is focused', async () => {
      const boxShadow = `${randomDigit()}px ${randomDigit()}px ${randomDigit()}px dodgerblue`;
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
      const boxShadow = `${randomDigit()}px ${randomDigit()}px ${randomDigit()}px rebeccapurple`;
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
      const boxShadow = `${randomDigit()}px ${randomDigit()}px ${randomDigit()}px firebrick`;
      const { container } = render(<OtpInput errorStyle={{ boxShadow }} />);

      const inputs = container.querySelectorAll('input');
      inputs.forEach((input) => {
        expect(input).not.toHaveAttribute('style', expect.stringContaining(`box-shadow: ${boxShadow}`));
      });
    });

    it('does not apply errorStyle when hasErrored is false', async () => {
      const boxShadow = `${randomDigit()}px ${randomDigit()}px ${randomDigit()}px firebrick`;
      const { container } = render(<OtpInput hasErrored={false} errorStyle={{ boxShadow }} />);

      const inputs = container.querySelectorAll('input');
      inputs.forEach((input) => {
        expect(input).not.toHaveAttribute('style', expect.stringContaining(`box-shadow: ${boxShadow}`));
      });
    });

    it('does apply errorStyle when hasErrored is true', async () => {
      const boxShadow = `${randomDigit()}px ${randomDigit()}px ${randomDigit()}px firebrick`;
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
});
