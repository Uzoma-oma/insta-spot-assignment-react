import React from "react";

export default function ProfileHeader({ profile, onEditProfile }) {
  return (
    <div className="profile-header">
      <img
        id="profileImage"
        src="../src/assets/images/Avatar.png"
        alt="Avatar-image"
        className="profile-image"
      />
      <div>
        <h1 id="profileName">{profile.name}</h1>
        <p id="profileProfession">{profile.profession}</p>
      </div>
      <button className="edit-profile-btn" onClick={onEditProfile}>
        Edit Profile
      </button>
    </div>
    
  );
}
