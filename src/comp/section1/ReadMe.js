import Markdown from "react-markdown";
import { useEffect, useState } from "react";

const Section1ReadMe = () => {
    const [markdown, setMarkdown] = useState("");

    // useEffect(() => {
    //     fetch("../public/Section1.md")
    //     .then(res => res.text())
    //     .then(txt => {
    //         setMarkdown(txt);
    //         console.log('markdown');
    //         console.log(txt);
    //     });
    // }, []);

    console.log(markdown);

    return (
        <div style={{justifyContent: "center"}}>
            <Markdown>{markdown}</Markdown>
        </div>
    );
};

export default Section1ReadMe;