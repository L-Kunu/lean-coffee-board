import { useState } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import Entry from './components/Entry';
import EntryForm from './components/EntryForm';
import LoginForm from './components/LoginForm.js';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function App() {
  const [user, setUser] = useState({});

  const {
    data: entries,
    error: entriesError,
    mutate: mutateEntries,
  } = useSWR('/api/entries', fetcher, {
    refreshInterval: 1000,
  });

  if (entriesError) return <h1>Sorry, could not fetch... try again</h1>;

  return (
    <>
      {user.name ? (
        <BoardGrid>
          <StyledHeader>Lean Coffee Board</StyledHeader>
          <EntryList role="list">
            {entries
              ? entries.map(
                  ({ text, author, color, createdAt, _id, tempId }) => (
                    <li key={_id ?? tempId}>
                      <Entry
                        text={text}
                        author={author}
                        color={color}
                        createdAt={createdAt}
                        onDelete={() => handleDelete(_id)}
                      />
                    </li>
                  )
                )
              : '... loading! ...'}
          </EntryList>
          <EntryForm onSubmit={handleNewEntry} />
        </BoardGrid>
      ) : (
        <LoginGrid>
          <LoginForm onLogin={setUser} />
        </LoginGrid>
      )}
    </>
  );

  async function handleNewEntry(text) {
    const newEntry = {
      text,
      author: user.name ?? 'Anonymous',
      color: user.color,
      tempId: Math.random(),
    };

    mutateEntries([...entries, newEntry], false);

    await fetch('/api/entries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEntry),
    });

    mutateEntries();
  }

  async function handleDelete(_id) {
    const filteredEntries = entries.filter(entry => entry._id !== _id);
    mutateEntries(filteredEntries, false);

    await fetch('/api/entries', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _id }),
    });

    mutateEntries();
  }
}

const LoginGrid = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
`;

const BoardGrid = styled.div`
  display: grid;
  padding: 0 20px 12px;
  grid-template-rows: auto 1fr auto;
  height: 100vh;
`;

const StyledHeader = styled.h1`
  background-color: #b5838d;
  box-shadow: 0 4px 8px 0 rgb(39, 50, 47, 0.25);
  color: white;
  font-family: 'Sacramento', cursive;
  font-size: 3.5rem;
  font-weight: bold;
  padding: 0;
  margin: 0;
  text-align: center;
`;

const EntryList = styled.ul`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-auto-rows: 100px;
  list-style: none;
  padding: 20;
  overflow-y: auto;
`;
