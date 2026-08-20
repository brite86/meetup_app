import { useEffect, useState } from 'react';

import MeetupList from '../components/meetups/MeetupList';

function AllMeetupsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    fetch(
      'https://react-meetups-a6ea2-default-rtdb.firebaseio.com/meetups.json'
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Could not fetch meetups.');
        }

        return response.json();
      })
      .then((data) => {
        const meetups = [];

        for (const key in data) {
          meetups.push({
            id: key,
            ...data[key],
          });
        }

        setLoadedMeetups(meetups);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <section>
        <h1>All Meetups</h1>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section>
      <h1>All Meetups</h1>

      {loadedMeetups.length === 0 ? (
        <p>No meetups found.</p>
      ) : (
        <MeetupList meetups={loadedMeetups} />
      )}
    </section>
  );
}

export default AllMeetupsPage;