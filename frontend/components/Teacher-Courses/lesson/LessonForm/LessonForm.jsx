import { useState, useEffect } from "react";
import ResourceList from "../../Resource/Resource";
import Message from '../../../Message/Message'
export default function LessonForm(props) {
  const [videoPreviewUrl, setVideoPreviewUrl] = useState(
    props.lesson.videoFile instanceof File
      ? null
      : props.lesson.videoFile || null
  );

  const [msg, setMsg] = useState(null);

  const showMessage = (message, type = 'info') => {
    setMsg({ message, type });
  };

  const [resources, setResources] = useState(
    props.lesson.resources?.length > 0
      ? props.lesson.resources
      : [{ name: "", url: "", isSaved: false }]
  );

  useEffect(() => {
    const updated = [...props.lessons];
    updated[props.id].resources = resources;
    props.updateLessons(updated);
  }, [resources]);

  function addResource() {
    setResources([...resources, { name: "", url: "", isSaved: false }]);
  }

  function onchange(index, name, value) {
    const updatedLessons = [...props.lessons];
    updatedLessons[index][name] = value;
    props.updateLessons(updatedLessons);

    if (name === "videoFile" && value instanceof File) {
      const previewUrl = URL.createObjectURL(value);
      setVideoPreviewUrl(previewUrl);
    }
  }

  function handleSave() {
    if (props.lesson.isSaved) return;
    if (!props.lesson.title || !props.lesson.description) {
      showMessage("Please provide all the fields", 'danger');
      return;
    }
    if (!props.lesson.videoFile) {
      showMessage("Please upload a video file", 'danger');
      return;
    }
    props.save(props.id);
  }

  return (
    <div className="lesson">
      {msg && <Message
          message={msg.message}
          type={msg.type}
          onClose={() => setMsg(null)}
        />}
      {msg && <Message
          message={msg.message}
          type={msg.type}
          onClose={() => setMsg(null)}
        />}
      <div className="lesson-container">
        <h3>Lesson {props.id + 1}</h3>
        {!props.lesson.isSaved && props.id > 0 && (
          <button onClick={() => props.delete(props.id)}>x</button>
        )}
      </div>

      <div className="video-container">
        <span>Upload Lesson Video</span>
        <div
          className="input-container"
          onClick={() =>
            !props.lesson.isSaved &&
            document.getElementById(`video-input${props.id}`).click()
          }
        >
          {!videoPreviewUrl && <p>Click here to upload</p>}
          <input
            id={`video-input${props.id}`}
            type="file"
            name="videoFile"
            style={{ display: "none" }}
            accept="video/*"
            onChange={(e) =>
              onchange(props.id, e.target.name, e.target.files[0])
            }
            disabled={props.lesson.isSaved}
          />
          {videoPreviewUrl && (
            <video
              width="320"
              height="240"
              controls
              style={{ marginTop: "10px", borderRadius: "10px" }}
              src={
                props.lesson.videoFile instanceof File
                  ? videoPreviewUrl
                  : props.lesson.videoFile
              }
            />
          )}
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            placeholder="Lesson Title"
            value={props.lesson.title}
            onChange={(e) =>
              onchange(props.id, e.target.name, e.target.value)
            }
            disabled={props.lesson.isSaved}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            placeholder="Lesson Description"
            value={props.lesson.description}
            onChange={(e) =>
              onchange(props.id, e.target.name, e.target.value)
            }
            disabled={props.lesson.isSaved}
          />
        </div>
      </div>

      <div className="resources-container">
        <ResourceList
          resources={resources}
          setResources={setResources}
          disabled={props.lesson.isSaved}
        />
      </div>

      <div className="buttons-container">
        {!props.lesson.isSaved && (
          <>
            {resources.length === 0 && (
              <button onClick={addResource}>Add Resource</button>
            )}
            <button onClick={handleSave}>Save This Lesson</button>
          </>
        )}
        {props.lesson.isSaved && (
          <button disabled style={{ backgroundColor: "gray" }}>
            ✅ Saved
          </button>
        )}
      </div>
    </div>
  );
}
