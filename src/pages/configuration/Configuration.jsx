import { Info } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  getConfiguration,
  updateConfiguration,
} from "../../redux/actions/configurationAction";
import "./configuration.css";

export default function Configuration() {
  const { configId } = useParams();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.configurations.data);
  const requesting = useSelector((state) => state.configurations.requesting);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();

    const config = {
      status,
      title,
      description,
    };
    dispatch(updateConfiguration(configId, config));
  };
  useEffect(() => {
    setTitle(data?.title ?? "");
    setDescription(data?.description ?? "");
    setStatus(data?.status ?? 1);
  }, [data]);

  useEffect(() => {
    dispatch(getConfiguration(configId));
  }, [dispatch, configId]);

  return (
    <div className="configuration">
      {requesting ? (
        <>Loading</>
      ) : (
        <>
          <div className="configurationTitleContainer">
            <h1 className="configurationTitle">Edit Config</h1>
            <Link to="newConfig">
              <button className="configurationAddButton">Create</button>
            </Link>
          </div>
          <div className="configurationContainer">
            <div className="configurationShow">
              <div className="configurationShowBottom">
                <span className="configurationShowTitle">
                  Configuration Details
                </span>
                <div className="configurationShowInfo">
                  <Info className="configurationShowIcon" />
                  <span className="configurationShowInfoTitle">{title}</span>
                </div>
                <div className="configurationShowInfo">
                  <Info className="configurationShowIcon" />
                  <span className="configurationShowInfoTitle">
                    {description}
                  </span>
                </div>
              </div>
            </div>
            <div className="configurationUpdate">
              <span className="configurationUpdateTitle">Edit</span>
              <form className="configurationUpdateForm" onSubmit={handleSubmit}>
                <div className="configurationUpdateLeft">
                  <div className="configurationUpdateItem">
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
                  <div className="configurationUpdateItem">
                    <label>Title</label>
                    <input
                      type="text"
                      placeholder="Please enter your title"
                      value={title}
                      className="configurationUpdateInput"
                      onChange={({ target }) => setTitle(target.value)}
                      required
                    />
                  </div>
                  <div className="configurationUpdateItem">
                    <label>Description</label>
                    <input
                      type="text"
                      placeholder="Please enter your description"
                      value={description}
                      className="configurationUpdateInput"
                      onChange={({ target }) => setDescription(target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="configurationUpdateRight">
                  <button className="configurationUpdateButton">Update</button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
