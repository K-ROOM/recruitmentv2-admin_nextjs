"use client";

import React from 'react';
import Avatar from 'react-avatar';

const Profile_Image = ({ name }: any) => {

    return (
        <>
            <Avatar name={name} size="50" round={true} />
        </>
    );
};
  
export default Profile_Image;