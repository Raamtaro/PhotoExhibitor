import React, {useState, useEffect} from 'react'

const MeshImageWrapper = ({image, index}) => {
    const [aspectRatio, setAspectRatio] = useState(1)


    //Dynamically assign grid positions
    const gridPositions = [
        { column: '2 / span 3' },
        { column: '4 / span 3' },
        { column: '3 / span 3' },
        { column: '1 / span 3' },
        { column: '4 / span 3' },
        { column: '3 / span 3' },
        { column: '1 / span 3' },
    ];

    const position = gridPositions[index % 7];
    const style = {
        gridColumn: position.column,
        gridRow: index + 1, // Ensure each image is on a unique row
    };

    useEffect(()=> {
        const img = new Image()
        img.src = image.url

        img.onload = () => {
            setAspectRatio(img.naturalWidth / img.naturalHeight);
        }
    }, [image.url])
    return (
        <>
            <figure className={`img-wrap`}
                style={{...style, height: `calc((100vw * 0.40))`
            }}
            >
                <img className="img" src={image.url} alt={`Blur Exhibit ${index + 1}`} />
                <figcaption><strong>BE{`${image.id < 10 ? '0' : ''}${image.id}`}</strong></figcaption>
            </figure>
        </>
    )
}

export default MeshImageWrapper