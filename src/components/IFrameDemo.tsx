import React from 'react';

interface IFrameDemoProps {
    path: string;
    title?: string;
}

const IFrameDemo: React.FC<IFrameDemoProps> = ({ path, title = "iframe" }) => {
    return <iframe src={path} title={title} />;
};

export default IFrameDemo;
