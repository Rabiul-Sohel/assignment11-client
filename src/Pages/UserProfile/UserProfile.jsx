
import { Helmet } from 'react-helmet';
import Container from '../../Utility/Container';

const UserProfile = () => {
    return (
        <Container>
            <Helmet>
                <title>Foodie | User Profile</title>
            </Helmet>
            <h2>THis is user Profile</h2>
        </Container>
    );
};

export default UserProfile;