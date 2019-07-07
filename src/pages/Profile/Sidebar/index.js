import React from 'react';
import { Query } from "react-apollo";
import UserDetails from './UserDetails';
import UserActivity from './UserActivity';
import {GET_LOGGEDIN_USER} from "../../../GraphQL";


export default function Sidebar() {
  const fakeUser = {
    username: 'username123',
    name: 'Fake Name',
    age: 23,
    city: 'Fake City',
    country: 'Fakeee',
    friendCount: 10,
    countryCount: 20,
    cityCount: 30
  }
  return (
    <Query query={GET_LOGGEDIN_USER}>
    {({ loading, error, data}) => {
      console.log(data)
      if (loading) return "loading"
      if (error) return "Something went wrong"
      return (
        <div className="sidebar">    
        <UserDetails
          username={data.getLoggedInUser.username}
          city={data.getLoggedInUser.Place_living ? data.getLoggedInUser.Place_living.city : null}
          country={data.getLoggedInUser.Place_living ? data.getLoggedInUser.Place_living.city : null}
        />
        <UserActivity
          friendCount={fakeUser.friendCount}
          countryCount={fakeUser.countryCount}
          cityCount={fakeUser.cityCount}
        />
        {/* TODO: move tags to component */}
        <div className="user-tags">
          <span className="tag tag-green">Nature Lover</span>
          <span className="tag tag-blue">Like a Local</span>
          <span className="tag tag-yellow">Foodie</span>
          <span className="tag tag-red">Historian</span>
        </div>
      </div>
        )
         }}
    </Query>
  )
}
