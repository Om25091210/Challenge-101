const valid = (firstname, lastname, email, password, phone_number) => {
  if (!firstname || !lastname || !email || !password || !phone_number)
    return 'Please enter all the required fields.';

  if (!validateEmail(email)) return 'Invalid email. Please check';

  if (firstname.length < 3) return 'Name must be at least 3 characters.';

  if (password.length < 6) return 'Password must be at least 6 characters.';

  if (phone_number.length < 10)
    return 'Phone number must be at least 10 characters.';
};

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export default valid;

export const locationformvalidate = (values) => {
  const errors = {};
  const regex = /^[a-zA-Z]+$/;
  if (!values.city) {
    errors.city = 'City is required!';
  } else if (!regex.test(values.city)) {
    errors.city = 'City cannot contain Numbers';
  }
  if (!values.state) {
    errors.state = 'State is required';
  } else if (!regex.test(values.state)) {
    errors.state = 'State cannot contain Numbers';
  }
  if (!values.zipcode) {
    errors.zipcode = 'Zipcode is required';
  } else if (values.zipcode.length > 6) {
    errors.zipcode = 'Invalid zipcode';
  }
  if (!values.country) {
    errors.country = 'Country is required';
  }
  if (!values.line1) {
    errors.line1 = 'Address Line is required';
  } else if (values.line1.length < 5) {
    errors.line1 = 'Address is too short characters.';
  } else if (values.line1.length > 20) {
    errors.line1 = 'Address Cannot exceed more 20 characters.';
  }
  if (!values.line2) {
    errors.line2 = 'Address Line is required';
  } else if (values.line2.length < 5) {
    errors.line2 = 'Address is too short characters.';
  } else if (values.line2.length > 20) {
    errors.line2 = 'Address Cannot exceed more 20 characters.';
  }
  return errors;
};

export const teamformvalidate = (values) => {
  const errors = {};
  const regex = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/;
  const year_regex = /^\d{4}$/;
  if (!values.name) {
    errors.name = 'Team Name is requried';
  }
  if (!year_regex.test(values.founded)) {
    errors.founded = 'Invalid Year Format';
  }
  if (!values.game) {
    errors.game = 'Select Atleast one game';
  }
  if (!values.prizepool) {
    errors.prizepool = 'Prize cannot be empty';
  }
  if (!values.country) {
    errors.country = 'Country is required';
  }
  if (!regex.test(values.website)) {
    errors.website = 'Invalid Website Link';
  }
  if (!values.description) {
    errors.description = 'Description is required';
  } else if (values.description.length < 15) {
    errors.description = 'Description should be minimum of 15 characters.';
  } else if (values.description.length > 250) {
    errors.description = 'Description Cannot exceed more 60 characters.';
  }
  if (!values.achievements) {
    errors.achievements = 'Achievements is required';
  }
  if (!values.sponsor) {
    errors.sponsor = 'Select Atleast one Sponosr.';
  }
  if (!values.rigs) {
    errors.rigs = 'Select Atleast one Rigs.';
  }
  if (!values.arena) {
    errors.arena = 'Select Atleast one Arena';
  }
  if (!values.role) {
    errors.role = 'Select Atleast one Team Role';
  }
  if (!regex.test(values.sociallink)) {
    errors.sociallink = 'Invalid Social Link';
  }
  return errors;
};

export const tournamentformvalidate = (values) => {
  const regex = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/;
  const errors = {};
  if (!values.name) {
    errors.name = 'Tournament Name is requried';
  }
  if (!values.game) {
    errors.game = 'Select Atleast one game';
  }
  if (!values.prizepool) {
    errors.prizepool = 'Prize cannot be empty';
  }
  if (!values.participants) {
    errors.participants = 'Participant is Required.';
  }
  if (!values.entranceFee) {
    errors.entranceFee = 'Entrance Fee is Required.';
  }
  if (!values.startDate) {
    errors.startDate = 'Start Date is Required.';
  }
  if (!values.startTime) {
    errors.startTime = 'Start Time is Required.';
  }
  if (!values.endDate) {
    errors.endDate = 'End Date is Required.';
  }
  if (!values.endTime) {
    errors.endTime = 'End Time is Required.';
  }
  if (!values.location) {
    errors.location = 'Location is Required.';
  }
  if (!values.organizer) {
    errors.organizer = 'Select Atleast One Organizer.';
  }
  if (!values.sponsor) {
    errors.sponsor = 'Select Atleast One Sponser.';
  }
  if (!values.description) {
    errors.description = 'Description is required';
  } else if (values.description.length < 15) {
    errors.description = 'Description should be minimum of 15 characters.';
  } else if (values.description.length > 60) {
    errors.description = 'Description Cannot exceed more 60 characters.';
  }
  if (!regex.test(values.sociallink)) {
    errors.sociallink = 'Invalid Social Link';
  }
  if (!regex.test(values.website)) {
    errors.website = 'Invalid Website Link';
  }
  return errors;
};

export const teamsquadformvalidate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Tournament Name is requried';
  }
  if (!values.location) {
    errors.location = 'Location is required';
  }
  if (!values.players) {
    errors.players = 'Atleast One player is required';
  }
  return errors;
};
