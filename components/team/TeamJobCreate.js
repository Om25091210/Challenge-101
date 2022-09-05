import { useState, useEffect, useMemo } from 'react';
import baseURL from '@utils/baseURL';
import axios from 'axios';
import countryList from 'react-select-country-list';
import 'rc-time-picker/assets/index.css';
import { toast } from 'react-toastify';
import { EditorState } from 'draft-js';
import dynamic from 'next/dynamic';
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

const TeamJobCreate = ({ user, profile }) => {
  const [teamroles, setTeamroles] = useState([]);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  let edited2 = draftToHtml(convertToRaw(editorState.getCurrentContent()));

  const [state, setState] = useState({
    name: '',
    role: '',
    owner: '',
    location: '',
    startDate: '',
    endDate: '',
    salary: 0,
    description: '',
    currency: '$',
    experience: ''
  });

  const options = useMemo(() => countryList().getData(), []);
  useEffect(() => {
    //TeamRole
    axios
      .get(`${baseURL}/api/all/teamroles`)
      .then((res) => setTeamroles(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let jobData = state;
    state.description = edited2;

    try {
      console.log(jobData);
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobData)
      };
      const dt = fetch(
        `${baseURL}/api/jobs/create`,
        requestOptions
      ).then((data) => data.json());
      $('a.model_close').parent().removeClass('show_model');
      toast.success('Your Job has been successfully created!! ');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
  };

  function handleChange(e) {
    if (e.target.options) {
      var options = e.target.options;
      var value = [];
      for (var i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          value.push(options[i].value);
        }
      }
      setState({ ...state, [e.target.name]: value });
    } else if (e.target.files) {
      setState({ ...state, [e.target.name]: e.target.files[0] });
    } else {
      setState({ ...state, [e.target.name]: e.target.value });
    }
  }

  const handleChangeCheck = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="common_form">
        <>
          <div className="form-group">
            <label for="exampleFormControlInput1">Job Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Job Title..."
              name="name"
              onChange={handleChange}
              value={state.name}
            />
          </div>

          <div className="form-group">
            <label for="exampleFormControlInput1">Job Type</label>
            <select
              name="role"
              className="form-control"
              onChange={handleChangeCheck}
              value={state.role}
            >
              <option value="">Select Opportunity Type...</option>
              {teamroles &&
                teamroles.map((tr, itdx) => (
                  <option key={itdx} value={tr}>
                    {tr}
                  </option>
                ))}
            </select>
          </div>

          <div className="form-group">
            <label for="exampleFormControlInput1">Job Owner</label>
            <select
              className="game_search_result mscrollbar"
              name="owner"
              value={state.owner}
              onChange={handleChangeCheck}
            >
              <option value="">Select Job Owner...</option>
              <option value={profile?.current_team?._id}>
                {profile?.current_team?.name}
              </option>
            </select>
          </div>

          <div className="form-group">
            <label for="exampleFormControlInput1">Location (Optional)</label>
            <select
              className="game_search_result mscrollbar"
              name="location"
              placeholder="Select Opportunity Type..."
              value={state.location}
              onChange={handleChangeCheck}
            >
              <option value="">Select Location...</option>
              {options.map((opt) => (
                <>
                  <option value={opt.value}>{opt.label}</option>
                </>
              ))}
            </select>
          </div>

          <div className="edit_four">
            <div className="form-group">
              <label htmlFor="startDate">application Start Date:</label>
              <input
                type="date"
                placeholder="MM/DD/YYYY"
                name="startDate"
                onChange={handleChange}
                value={state.startDate}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="endDate">application End Date:</label>
              <input
                type="date"
                placeholder="MM/DD/YYYY"
                name="endDate"
                onChange={handleChange}
                value={state.endDate}
                className="form-control"
              />
            </div>

            <div className="form-group" style={{ height: '70px' }}>
              <label for="exampleFormControlInput1">
                Money Included (Optional)
              </label>
              <div className="prize_boxs">
                {' '}
                <select
                  name="currency"
                  id="currency"
                  onChange={handleChangeCheck}
                  value={state.currency}
                >
                  <option value="$">USD($)- Dollars</option>
                  <option value="Rs">INR (Rs) - Rupees</option>
                </select>
                <input
                  type="number"
                  className="form-control"
                  placeholder=""
                  name="salary"
                  onChange={handleChange}
                  value={state.salary}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="endDate">Experience</label>
              <input
                type="number"
                name="experience"
                onChange={handleChangeCheck}
                value={state.experience}
                className="form-control"
              />
            </div>
          </div>

          <div className="form-group">
            <Editor
              editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={setEditorState}
              toolbar={{
                options: ['inline', 'list'],
                inline: {
                  options: ['bold']
                },
                block: {
                  options: ['blocktype']
                },
                list: {
                  options: ['unordered']
                }
              }}
            />
          </div>

          <input type="submit" className="btn" value="Create Job" />
        </>
      </form>
    </>
  );
};

export default TeamJobCreate;
