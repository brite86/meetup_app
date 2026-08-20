import { useNavigate } from 'react-router-dom';

import NewMeetupForm from '../components/meetups/NewMeetupForm';

function NewMeetupPage() {
  const navigate = useNavigate();

  function addMeetupHandler(meetupData) {
    fetch(
      'https://react-meetups-a6ea2-default-rtdb.firebaseio.com/meetups.json',
      {
        method: 'POST',
        body: JSON.stringify(meetupData),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Could not save meetup.');
        }

        return response.json();
      })
      .then((data) => {
        console.log('Meetup saved:', data);
        navigate('/');
      })
      .catch((error) => {
        console.error('Error saving meetup:', error);
      });
  }

  return (
    <section>
      <h1>Add New Meetup</h1>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </section>
  );
}

export default NewMeetupPage;