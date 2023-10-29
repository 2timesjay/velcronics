import '../shared/App.css'
import React from 'react';

function ThreeGallery() {
  return (
    <div className="ThreeGallery">
      <div>
        <a href="/projects/visualizations/webgl_instancing_raycast/">
          <img src="/three.png" className="logo three" alt="ThreeJS logo" />
        </a>
      </div>
    </div>
  )
}

export default ThreeGallery;