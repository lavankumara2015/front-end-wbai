
// import axios from 'axios';
// import React, { useEffect, useState } from 'react'


//  const ProfileImage = () => {

// const [profile ,setProfile]=useState([])

// useEffect(()=>{
//     let config = {
//         method: 'get',
//         maxBodyLength: Infinity,
//         url: 'https://graph.facebook.com/v19.0/918096255759/whatsapp_business_profile',
//         headers: { 
//           'Authorization': 'Bearer EABqxsZAVtAi8BOZBMGEsiohnaijzS57i5EeILZAJfRMcWiZAcDcVHqOJKx7NiUxjC3X1BbWTblq3arre7hqA11dENXbODiVXLy5FIfQthfUZBQhEb6XrdqsK5HZBGw64HTVgusFAV9H9j5vaZA6LZA2ZCpGuIAXnGviFLjZBdpCidUZAFQHVlgfBRUWZATH4bnsU7gbgghoDJzIxF3R4yxPRjXET'
//         }
//       };
//       axios.request(config)
//       .then((response) => {
//         console.log(JSON.stringify(response.data));
//         // setProfile(response.data)
//       })
//       .catch((error) => {
//         console.log(error);
//       });
      
// },[])

//   return (
//     <>
//     <div>profileImage</div>
//     <div>
//         {/* <img src={profile.data.profile_picture_url} alt="" /> */}
//     </div>
//     </>
//   )
// }

// export default ProfileImage

import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ProfileImage = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('https://graph.facebook.com/v19.0/918096255759/whatsapp_business_profile', {
          headers: {
            'Authorization': 'Bearer EABqxsZAVtAi8BOx56tk2WvuKm7ml2wzhHEjz2cYVBncIYyY0LaXT9oGPHZBJiVkiYbxONVBKa4TElygigtzx3Tp9RuOhZB01db1OGOr1y0Pgb1QdLYPnpeQWZCJBVl7Rnal1XnjvfkaIVZBPrhfK4sQrxdRp455jW0M46c2NHSkdaQTH5CFbQcsUxKAzoQy4mVUoHJsmeFR5ehlZCoqYUZD',
          }
        });
        setProfile(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <>
      <div>Profile Image</div>
      <div>
        {profile && profile.profile_picture_url && (
          <img src={profile.profile_picture_url} alt="Profile" />
        )}
      </div>
    </>
  );
};

export default ProfileImage;

