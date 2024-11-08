import { Suspense, cloneElement, useEffect, useState } from "react";
import { Loader } from "@react-three/drei";

function Ready({ setReady }) {
  useEffect(() => () => void setReady(true), []);
  return null;
}

export default function Intro({ children }) {
  const [clicked, setClicked] = useState(false);
  const [ready, setReady] = useState(false);
  return (
    <>
      <Suspense fallback={<Ready setReady={setReady} />}>
        {cloneElement(children, { ready: clicked && ready })}
      </Suspense>
      {!clicked && !ready && <Loader />}
      {!clicked && ready && (
        <div className={`fullscreen bg`}>
          <div className="stack">
            <a href="#" onClick={() => setClicked(true)}>
              click to continue
            </a>
          </div>
        </div>
      )}
    </>
  );
}
