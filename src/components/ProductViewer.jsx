import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import useMacbookStore from "../store";
import "../styles/sections/_product-viewer.scss";
import ModelSwitcher from "./three/ModelSwitcher";
import StudioLights from "./three/StudioLights";

const ProductViewer = () => {
  const { color, scale, setColor, setScale } = useMacbookStore();
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  // Raw store scale used to decide 14 vs 16
  const rawScale = scale;

  // Display scale can be adjusted for mobile without breaking logic
  const displayScale = isMobile ? scale - 0.03 : scale;

  return (
    <section id="product-viewer" className="product-viewer">
      <h2 className="product-viewer__title">Take a closer look.</h2>

      <div className="product-viewer__controls">
        <div className="product-viewer__control-group">
          <div className="product-viewer__color-controls">
            <div
              onClick={() => setColor("#adb5bd")}
              className={`product-viewer__color product-viewer__color--light ${
                color === "#adb5bd" ? "product-viewer__color--active" : ""
              }`}
            />
            <div
              onClick={() => setColor("#171717")}
              className={`product-viewer__color product-viewer__color--dark ${
                color === "#171717" ? "product-viewer__color--active" : ""
              }`}
            />
          </div>

          <div className="product-viewer__size-controls">
            <div
              onClick={() => setScale(0.08)} // 14"
              className={`product-viewer__size ${
                scale === 0.08 ? "product-viewer__size--active" : ""
              }`}
            >
              14&quot;
            </div>
            <div
              onClick={() => setScale(0.1)} // 16"
              className={`product-viewer__size ${
                scale === 0.1 ? "product-viewer__size--active" : ""
              }`}
            >
              16&quot;
            </div>
          </div>
        </div>
      </div>

      <Canvas
        id="canvas"
        camera={{ position: [0, 2, 5], fov: 60, near: 0.1, far: 100 }}
      >
        <StudioLights />
        <ModelSwitcher
          rawScale={rawScale}
          displayScale={displayScale}
          isMobile={isMobile}
        />
      </Canvas>
    </section>
  );
};

export default ProductViewer;
