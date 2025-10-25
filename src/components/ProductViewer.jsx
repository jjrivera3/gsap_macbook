import useMacbookStore from "../store";
import "../styles/sections/_product-viewer.scss";
import { Canvas } from "@react-three/fiber";
import { Box, OrbitControls } from "@react-three/drei";

const ProductViewer = () => {
  const { color, scale, setColor, setScale } = useMacbookStore();

  return (
    <section id="product-viewer" className="product-viewer">
      <h2 className="product-viewer__title">Take a closer look.</h2>

      <div className="product-viewer__controls">
        <p className="product-viewer__info">
          MacBook Pro {scale === 0.08 ? '14"' : '16"'} in Space Black {color}
        </p>

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
              onClick={() => setScale(0.08)}
              className={`product-viewer__size ${
                scale === 0.08 ? "product-viewer__size--active" : ""
              }`}
            >
              14&quot;
            </div>
            <div
              onClick={() => setScale(0.1)}
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
        camera={{ position: [0, 2, 5], fov: 50, near: 0.1, far: 100 }}
      >
        <Box
          position={[0, 0, 0]}
          scale={10 * scale}
          material-color={color}
        ></Box>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </section>
  );
};

export default ProductViewer;
