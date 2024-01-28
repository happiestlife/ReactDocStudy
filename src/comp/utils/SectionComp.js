const SectionComp = ({title, children, desc, content}) => {
    console.log(content);
    return (
        <>
            <div>
                <h3>{title}</h3>
                {children}
                <div>{desc}</div>
            </div>
            <br />
        </>
    );
};

export default SectionComp;