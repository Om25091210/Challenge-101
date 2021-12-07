import { useState } from 'react';

const chatInput = ({ sendMessage }) => {
  const [text, setText] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    sendMessage(text);
    setText('');
  };

  return (
    <form className="p-2 bg-gray-100" onSubmit={onSubmit}>
      <div className="card-footer type_msg">
        <div className="input-group">
          <textarea
            className="form-control"
            placeholder="Type your message..."
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <div className="input-group-append">
            <button type="submit" className="btn btn-primary">
              <i className="fa fa-location-arrow"></i>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default chatInput;
