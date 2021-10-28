import "./user.css";
import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUser,
  updateUser,
  uploadImage,
} from "../../redux/actions/userAction";

export default function User() {
  const { userId } = useParams();

  const dispatch = useDispatch();

  const data = useSelector((state) => state.users.data);
  const requesting = useSelector((state) => state.users.requesting);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [steamId, setSteamId] = useState("");
  const [balance, setBalance] = useState(0);
  const [status, setStatus] = useState(1);
  const [avatar, setAvatar] = useState("");

  // Upload file
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      status,
      firstName,
      lastName,
      email,
      phone,
      steamId,
      avatar,
      balance: parseInt(balance) || 0,
    };
    dispatch(updateUser(userId, user));
  };

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  useEffect(() => {
    if (isFilePicked) {
      dispatch(uploadImage(selectedFile));
    }
  }, [dispatch, isFilePicked, selectedFile]);

  useEffect(() => {
    setFirstName(data?.firstname ?? "");
    setLastName(data?.lastname ?? "");
    setEmail(data?.email ?? "");
    setPhone(data?.phone ?? "");
    setSteamId(data?.steam_id ?? "");
    setBalance(data?.balance ?? 0);
    setStatus(data?.status ?? 1);
    setAvatar(data?.avatar ?? "");
  }, [data]);

  useEffect(() => {
    dispatch(getUser(userId));
  }, [dispatch, userId]);

  return (
    <div className="user">
      {requesting ? (
        <>Loading</>
      ) : data ? (
        <>
          <div className="userTitleContainer">
            <h1 className="userTitle">Edit User</h1>
            <Link to="/newUser">
              <button className="userAddButton">Create</button>
            </Link>
          </div>
          <div className="userContainer">
            <div className="userShow">
              <div className="userShowTop">
                <img src={avatar} alt="" className="userShowImage" />
                <div className="userShowTopTitle">
                  <span className="userShowUsername">
                    {firstName} {lastName}
                  </span>
                  <span className="userShowUserTitle">Normal User</span>
                </div>
              </div>
              <div className="userShowBottom">
                <span className="userShowTitle">Account Details</span>
                <div className="userShowInfo">
                  <PermIdentity className="userShowIcon" />
                  <span className="userShowInfoTitle">{data.username}</span>
                </div>
                <div className="userShowInfo">
                  <CalendarToday className="userShowIcon" />
                  <span className="userShowInfoTitle">
                    {data.created_at_string}
                  </span>
                </div>
                <span className="userShowTitle">Contact Details</span>
                <div className="userShowInfo">
                  <PhoneAndroid className="userShowIcon" />
                  <span className="userShowInfoTitle">{phone}</span>
                </div>
                <div className="userShowInfo">
                  <MailOutline className="userShowIcon" />
                  <span className="userShowInfoTitle">{email}</span>
                </div>
                <div className="userShowInfo">
                  <LocationSearching className="userShowIcon" />
                  <span className="userShowInfoTitle">{steamId}</span>
                </div>
              </div>
            </div>
            <div className="userUpdate">
              <span className="userUpdateTitle">Edit</span>
              <form className="userUpdateForm" onSubmit={handleSubmit}>
                <div className="userUpdateLeft">
                  <div className="userUpdateItem">
                    <label>Username</label>
                    <input
                      type="text"
                      placeholder="Please enter your username"
                      value={data.username}
                      className="userUpdateInput"
                      disabled
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>Status</label>
                    <select
                      name="active"
                      id="active"
                      value={status}
                      onChange={({ target }) => setStatus(target.value)}
                    >
                      <option value={1}>Active</option>
                      <option value={0}>Inactive</option>
                    </select>
                  </div>
                  <div className="userUpdateItem">
                    <label>Balance</label>
                    <input
                      type="number"
                      placeholder="Please enter balance"
                      className="userUpdateInput"
                      value={balance}
                      onChange={({ target }) => setBalance(target.value)}
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>First name</label>
                    <input
                      type="text"
                      placeholder="Please enter your first name"
                      className="userUpdateInput"
                      value={firstName}
                      onChange={({ target }) => setFirstName(target.value)}
                      pattern=".{2,}"
                      title="Two or more characters"
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>Last name</label>
                    <input
                      type="text"
                      placeholder="Please enter your last name"
                      className="userUpdateInput"
                      value={lastName}
                      onChange={({ target }) => setLastName(target.value)}
                      pattern=".{2,}"
                      title="Two or more characters"
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>Email</label>
                    <input
                      type="email"
                      placeholder="user@gmail.com"
                      className="userUpdateInput"
                      value={email}
                      required
                      onChange={({ target }) => setEmail(target.value)}
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>Phone</label>
                    <input
                      type="text"
                      placeholder="0363629810"
                      className="userUpdateInput"
                      value={phone}
                      onChange={({ target }) => setPhone(target.value)}
                      pattern=".{10,}"
                      title="Ten characters"
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>SteamID</label>
                    <input
                      type="text"
                      placeholder="76561199183767931 or 350986604"
                      className="userUpdateInput"
                      value={steamId}
                      onChange={({ target }) => setSteamId(target.value)}
                      pattern=".{17,}"
                      title="Seventeen characters"
                    />
                  </div>
                </div>
                <div className="userUpdateRight">
                  <div className="userUpdateUpload">
                    <img src={avatar} alt="" className="userUpdateImg" />
                    <label htmlFor="file">
                      <Publish className="userUpdateIcon" />
                    </label>
                    <input
                      type="file"
                      id="file"
                      style={{ display: "none" }}
                      onChange={changeHandler}
                    />
                  </div>
                  <button className="userUpdateButton">Update</button>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        <>Data is empty</>
      )}
    </div>
  );
}
