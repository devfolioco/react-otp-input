import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Chance from 'chance';

import OtpInput from '../../src/lib/index.jsx';

const chance = new Chance();
const randomDigit = () => chance.integer({ min: 0, max: 9 }).toFixed();

describe('OtpInput', () => {
  it('renders with minimal props', async () => {
    const { container } = render(<OtpInput />);

    const inputs = container.querySelectorAll('input');
    inputs.forEach((input, i) => {
      expect(input).toHaveAttribute('aria-label', expect.stringContaining(`Character ${i + 1}`));
    });
  });

  describe('defaults', () => {
    it('default numInputs is 4', async () => {
      const { container } = render(<OtpInput />);

      const inputs = container.querySelectorAll('input');
      expect(inputs.length).toBe(4);
    });

    it('default onChange is console.log', async () => {
      const log = jest.spyOn(console, 'log').mockImplementation(() => {});

      const { container } = render(<OtpInput />);

      const inputs = container.querySelectorAll('input');
      inputs.forEach((input) => {
        const char = randomDigit();
        userEvent.type(input, char);
        expect(log).toBeCalledWith(char);
      });
    });

    it('default isDisabled is false', async () => {
      const { container } = render(<OtpInput />);

      const inputs = container.querySelectorAll('input');
      inputs.forEach((input) => {
        expect(input).not.toHaveAttribute('disabled');
      });
    });

    it('default shouldAutoFocus is false', async () => {
      render(<OtpInput />);

      expect(document.activeElement.tagName).toBe('BODY');

      const { container } = render(<OtpInput shouldAutoFocus={true} />);

      expect(document.activeElement.tagName).toBe('INPUT');
      const firstInput = container.querySelector('input');
      expect(firstInput).toHaveFocus();
    });

    it('default value is empty', async () => {
      const { container } = render(<OtpInput />);

      const inputs = container.querySelectorAll('input');
      inputs.forEach((input) => expect(input).toHaveValue(''));
    });

    it('default isInputSecure is false', async () => {
      const { container } = render(<OtpInput />);

      const inputs = container.querySelectorAll('input');
      inputs.forEach((input) => expect(input.type).toBe('text'));
    });
  });
});
