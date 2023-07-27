import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Page() {
  const [postInfo, setPostInfo] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:400/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
      });
    });
  }, []);
  //prettier-ignore
  return (
  <div>Post Page here</div>
  );
}
