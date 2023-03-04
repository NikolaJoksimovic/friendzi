import { React } from "react";

const DashboardNav = ({ userInfo }) => {
  console.log(userInfo);
  const instagramLink =
    "https://www.instagram.com/" + userInfo.ig_at.substring(1);

  console.log(instagramLink);
  return (
    <header className='center-flex'>
      <div className='dashboard-header-body'>
        <div className='profile-img-container profile-img-container-dashboard'>
          <img
            style={{ outline: "2px solid var(--clr-secondary)" }}
            src={
              userInfo.profileImg
                ? userInfo.profileImg
                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            }
            alt='default_profile_pic.png'
          />
        </div>
        <div
          className='user-name center-flex'
          style={{ flexDirection: "column", alignItems: "start" }}
        >
          <span style={{ display: "inline-block" }}>
            {userInfo.firstName} {userInfo.lastName}
          </span>
          <span
            style={{
              display: "inline-block",
              fontSize: "1em",
              color: "var(--clr-secondary)",
            }}
          >
            <a className='link' href={instagramLink} target='_blank'>
              {userInfo.ig_at}
            </a>
          </span>
        </div>
      </div>
    </header>
  );
};

export default DashboardNav;
