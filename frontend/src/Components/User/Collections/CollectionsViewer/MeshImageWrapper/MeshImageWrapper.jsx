import React, {forwardRef, useState, useEffect} from 'react'

const MeshImageWrapper = forwardRef((props, ref) => {
    const [aspectRatio, setAspectRatio] = useState(1)
    const {image, index} = props
    /**
     * http://localhost:5173/user/collections/13/view
     */
    return (
        <>
            <figure className={`image-container`}>
                <img ref={ref} className="image" src={image.url} alt={`Blur Exhibit ${index + 1}`} />
                <figcaption><strong>YN{`${image.id < 10 ? '0' : ''}${image.id}`}</strong></figcaption>
            </figure>
        </>
    )
})

export default MeshImageWrapper