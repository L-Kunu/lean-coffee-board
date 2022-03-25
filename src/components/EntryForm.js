import styled from 'styled-components';
import ScreenReaderOnly from './ScreenReaderOnly.js';

const TEXT_MIN_LENGTH = 3;

export default function EntryForm({ onSubmit }) {
  return (
    <Form
      onSubmit={handleSubmit}
      aria-labelledby="entry-form-name"
      autoComplete="off"
    >
      <label htmlFor="text">
        <ScreenReaderOnly>Entry text</ScreenReaderOnly>
      </label>
      <input
        name="text"
        id="text"
        placeholder="Add your contribution here ..."
        type="text"
        minLength={TEXT_MIN_LENGTH}
      />
      <PlusButton id="entry-form-name">
        <ScreenReaderOnly>Create new entry</ScreenReaderOnly>
        <div aria-hidden="true">+</div>
      </PlusButton>
    </Form>
  );

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const text = form.elements.text.value;
    if (text.length >= TEXT_MIN_LENGTH) {
      onSubmit(text);
      form.reset();
    }
  }
}

const Form = styled.form`
  display: flex;
  justify-content: space-between;

  input {
    flex: 1 1;
    border: none;
    outline: none;
    ::placeholder {
      color: #c8cbca;
    }
`;

const PlusButton = styled.button`
  border-radius: 50%;
  line-height: 0;
  width: 40px;
  height: 40px;
  border: none;
  margine: 4px;
  padding-top: 4px;
  font-size: 30px;

  &:hover {
    background-color: black;
    color: white;
    transition: 0.4s;
  }
  &:active {
    background-color: black;
    color: white;
    transition: 0.4s;
  }

  div {
    margin-top: -1px;
  }
`;
