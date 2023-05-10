import React, { useState } from 'react';

function PasswordUpdate() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [info, setInfo] = useState('');
  const [answerOption, setAnswerOption] = useState('');
  const [answerText, setAnswerText] = useState('');

  const handlePasswordUpdate = () => {
    if (oldPassword !== 'vecaparole') {
      setInfo('Nepareiza vecā parole!');
      return;
    }

    if (newPassword !== confirmPassword) {
      setInfo('Jaunā un apstiprinātā parole nesakrīt!');
      return;
    }

    fetch('http://localhost:3004/passwords', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ newPassword })
    })
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          setInfo('Parole nomainīta veiksmīgi!');
          setOldPassword(newPassword);
        } else {
          setInfo('Paroles atjaunošanas kļūda!');
        }
      })
      .catch(error => {
        console.error('Kļūda:', error);
      });
  };

  const handleOptionChange = (e) => {
    const selectedOption = e.target.value;
    setAnswerOption(selectedOption);
  };

  const handleTextChange = (e) => {
    const textValue = e.target.value;
    setAnswerText(textValue);
  };

  return (
    <div>
      <h1>Password Update</h1>

      <label htmlFor="oldPassword">Old Password:</label>
      <input
        type="password"
        id="oldPassword"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
      /><br />

      <label htmlFor="newPassword">New Password:</label>
      <input
        type="password"
        id="newPassword"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      /><br />

      <label htmlFor="confirmPassword">Confirm Password:</label>
      <input
        type="password"
        id="confirmPassword"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      /><br />

      <button onClick={handlePasswordUpdate}>Update Password</button>

      <div>{info}</div>

      <h2>Question</h2>
      <label>
        <input
          type="radio"
          value="1"
          name="question"
          checked={answerOption === '1'}
          onChange={handleOptionChange}
        />
        Option 1
      </label>
      <label>
        <input
          type="radio"
          value="2"
          name="question"
          checked={answerOption === '2'}
          onChange={handleOptionChange}
        />
        Option 2
      </label>
      <label>
        <input
          type="radio"
          value="3"
          name="question"
          checked={answerOption === '3'}
          onChange={handleOptionChange}
        />
        Option 3
      </label>

      <input
        type="text"
        value={answerText}
        onChange={handleTextChange}
      />
    </div>
  );
}

export default PasswordUpdate;
