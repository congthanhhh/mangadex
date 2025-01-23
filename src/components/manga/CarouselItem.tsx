import { Carousel, Col, Row } from "antd"

import { assets } from '../../assets/assets'
import { useEffect, useRef, useState } from "react";
const CarouselItem = () => {
    const contentStyle: React.CSSProperties = {
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',

    };
    return (
        <>
            <div className="w-full my-4">
                <Carousel autoplay className="w-full m-h-80">
                    {/* loop o day */}
                    <div className="w-full h-80 bg-[#364d79] rounded">
                        <a href="#">
                            <img className="h-full w-full object-contain" src={assets.carouselImg} />
                        </a>
                    </div>
                </Carousel>
            </div>
        </>
    )
}

export default CarouselItem