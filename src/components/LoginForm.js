import styled from 'styled-components';

export default function LoginForm({ onLogin }) {
  return (
    <Form
      autoComplete="off"
      onSubmit={handleLogin}
      aria-labelledby="name-label"
    >
      <label id="name-label" htmlFor="name">
        What is your name?
      </label>
      <input required placeholder="Write here ..." id="name" name="name" />
      <label htmlFor="color">Would you like to choose a color?</label>
      <input id="color" name="color" type="color" defaultValue="#e6ccb2" />
      <button>Click here to submit</button>
    </Form>
  );

  function handleLogin(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const color = event.target.elements.color.value;

    if (name) {
      onLogin({ name, color });
    }
  }
}

const Form = styled.form`
  display: grid;
  gap: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;

  input {
    flex: 1 1;
    border: 1px solid grey;
    border-radius: 5px;
    outline: none;
    padding: 1px;
    ::placeholder {
      color: #c8cbca;
    }
  

  button {
    height: 1.5rem;
    background: #edede9;
    color: grey;
    border: none;
    border-radius: 5px;
  }
`;
