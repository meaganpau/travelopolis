import React, { Component } from 'react';
import axios from 'axios';
import styled from 'react-emotion';
import { Link, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import TripsList from '../components/TripsList'
import ContentContainer from '../components/ContentContainer';
import DoubleTitle from '../components/DoubleTitle';
import Footer from '../components/Footer';

const InnerContainer = styled('article')`
  max-width: 1029px;
  margin: 0 auto;
`

const BreadcrumbContainer = styled('div')`
  img {
    margin-right: 10px;
    transform: translateY(-3px);
  }

  a {
    text-decoration: none;
    color: ${props => props.theme.color.font};
    
    &:hover {
      span {
        border-bottom: 2px solid ${props => props.theme.color.font};
      }
    }
  }
`

class Trip extends Component {
    state = {
        status: 'Loading...',
        user: '',
        notFound: ''
    };  

    getUser = async userSlug => {
        try {
            const res = await axios.get(`/api/users/slug/${userSlug}`)
            if (res.data[0]) {
                this.setState({ user: res.data[0] });
            } else {
                this.setState({ notFound: 'true' })
            }
        } catch (e) {
            console.log(e);
            this.setState({ status: 'Error loading user.' });
        };
    }

    componentDidMount() {
        this.getUser(this.props.match.params.userSlug)
    }
    
    render() {
        const { user, status, notFound } = this.state;

        const Title = () => (
            user ? <DoubleTitle>{user.firstName} {user.lastName}'s Trips</DoubleTitle> : null
        )

        return (
            <React.Fragment>
                <Header />
                <ContentContainer>
                    <BreadcrumbContainer>
                        <Link to="/explore">
                            <img src="../../images/left-chevron.svg" alt="Left"/>
                            <span>Explore</span>
                        </Link>
                    </BreadcrumbContainer>
                    <InnerContainer>
                        <Title />
                        { notFound ? <Redirect to="/404" /> : null }
                        {user ? <TripsList userId={user._id} userSlug={user.slug} /> : status }
                    </InnerContainer>
                </ContentContainer>
                <Footer />
            </React.Fragment>
        )
    }
};

export default Trip;
